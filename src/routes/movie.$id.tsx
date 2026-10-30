import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { movies, theatres } from "@/lib/movies";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/movie/$id")({
  loader: ({ params }) => {
    const movie = movies.find((m) => m.id === params.id);
    if (!movie) throw notFound();
    return { movie };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.movie.title ?? "Movie"} — Book Tickets | CineYatra` },
      { name: "description", content: loaderData?.movie.about ?? "Book movie tickets" },
      { property: "og:title", content: `${loaderData?.movie.title} — CineYatra` },
      { property: "og:description", content: loaderData?.movie.about ?? "" },
      { property: "og:type", content: "video.movie" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MoviePage,
});

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const COLS = 12;
const price = (r: string) => (r < "C" ? 450 : r < "F" ? 250 : 180);

function MoviePage() {
  const { movie } = Route.useLoaderData();
  const days = useMemo(() => Array.from({ length: 5 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d; }), []);
  const [day, setDay] = useState(0);
  const [show, setShow] = useState<{ t: string; time: string } | null>(null);
  const [seats, setSeats] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const booked = useMemo(() => new Set(["A3", "A4", "C7", "D5", "D6", "E9", "G2", "G3", "H10"]), [show]);
  const total = seats.reduce((s, x) => s + price(x[0] ?? "H"), 0);
  const toggle = (id: string) => setSeats((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length >= 10 ? s : [...s, id]));

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      <section className="movie-hero" style={{ "--h": movie.hue } as React.CSSProperties}>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row">
          <div className="poster w-48 shrink-0" style={{ "--h": movie.hue } as React.CSSProperties}>
            <span className="font-display text-xl">{movie.title}</span>
          </div>
          <div>
            <h1 className="font-display text-4xl">{movie.title}</h1>
            <p className="mt-3 inline-block rounded bg-background/20 px-3 py-1">★ {movie.rating}/10 ({movie.votes} votes)</p>
            <p className="mt-3">{movie.lang}</p>
            <p className="opacity-80">{movie.duration} · {movie.genre} · {movie.cert}</p>
            <p className="mt-4 max-w-xl opacity-90">{movie.about}</p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {done ? (
          <div className="mx-auto max-w-md rounded-xl border bg-card p-8 text-center">
            <p className="text-5xl">🎟️</p>
            <h2 className="mt-3 font-display text-2xl">Booking Confirmed!</h2>
            <p className="mt-2 text-muted-foreground">{movie.title} · {show?.t}</p>
            <p className="text-muted-foreground">{days[day]?.toDateString()} · {show?.time}</p>
            <p className="mt-2 font-semibold">Seats: {seats.join(", ")}</p>
            <p className="font-semibold">Paid ₹{total + Math.round(total * 0.1)}</p>
            <p className="mt-2 text-xs text-muted-foreground">Booking ID: CY{Math.floor(Math.random() * 1e8)}</p>
            <Link to="/" className="mt-6 inline-block rounded-md bg-primary px-5 py-2 text-primary-foreground">Back to movies</Link>
          </div>
        ) : !show ? (
          <>
            <div className="mb-6 flex gap-2 overflow-x-auto">
              {days.map((d, i) => (
                <button key={i} onClick={() => setDay(i)} className={`date-pill ${day === i ? "chip-active" : ""}`}>
                  <span className="text-xs">{d.toLocaleDateString("en-IN", { weekday: "short" })}</span>
                  <span className="text-lg font-bold">{d.getDate()}</span>
                  <span className="text-xs">{d.toLocaleDateString("en-IN", { month: "short" })}</span>
                </button>
              ))}
            </div>
            <div className="divide-y rounded-xl border bg-card">
              {theatres.map((t) => (
                <div key={t.name} className="flex flex-col gap-3 p-5 md:flex-row md:items-center">
                  <div className="md:w-64"><p className="font-semibold">{t.name}</p><p className="text-xs text-success">M-Ticket · Food & Beverage</p></div>
                  <div className="flex flex-wrap gap-2">
                    {t.times.map((time) => (
                      <button key={time} onClick={() => setShow({ t: t.name, time })} className="showtime">{time}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-xl border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div><p className="font-semibold">{show.t}</p><p className="text-sm text-muted-foreground">{days[day]?.toDateString()} · {show.time}</p></div>
              <button onClick={() => { setShow(null); setSeats([]); }} className="text-sm text-primary">Change show</button>
            </div>
            <div className="overflow-x-auto">
              <div className="mx-auto w-fit space-y-2">
                {ROWS.map((r) => (
                  <div key={r}>
                    {(r === "A" || r === "C" || r === "F") && (
                      <p className="mb-1 mt-3 border-b pb-1 text-xs text-muted-foreground">₹{price(r)} {r === "A" ? "RECLINER" : r === "C" ? "PRIME" : "CLASSIC"}</p>
                    )}
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 text-xs text-muted-foreground">{r}</span>
                      {Array.from({ length: COLS }, (_, i) => {
                        const id = `${r}${i + 1}`;
                        const isB = booked.has(id), sel = seats.includes(id);
                        return (
                          <button key={id} disabled={isB} onClick={() => toggle(id)} className={`seat ${i === 5 ? "mr-5" : ""} ${isB ? "seat-booked" : sel ? "seat-selected" : ""}`}>{i + 1}</button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div className="screen mt-8">All eyes this way please!</div>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-6 text-xs">
              <span className="flex items-center gap-1"><i className="seat inline-block" /> Available</span>
              <span className="flex items-center gap-1"><i className="seat seat-selected inline-block" /> Selected</span>
              <span className="flex items-center gap-1"><i className="seat seat-booked inline-block" /> Sold</span>
            </div>
          </div>
        )}
      </main>

      {show && !done && seats.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 border-t bg-card p-4">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div><p className="font-semibold">{seats.length} seat(s): {seats.join(", ")}</p><p className="text-xs text-muted-foreground">+ ₹{Math.round(total * 0.1)} convenience fee</p></div>
            <button onClick={() => setDone(true)} className="rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground">Pay ₹{total + Math.round(total * 0.1)}</button>
          </div>
        </div>
      )}
    </div>
  );
}
