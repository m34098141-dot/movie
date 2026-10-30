import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { movies, cities } from "@/lib/movies";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CineYatra — Book Movie Tickets Online in India" },
      { name: "description", content: "Book tickets for the latest Hindi, Telugu, Tamil, Kannada and Malayalam movies near you." },
      { property: "og:title", content: "CineYatra — Book Movie Tickets Online" },
      { property: "og:description", content: "Latest Indian movies, showtimes and seat booking." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const langs = ["All", "Hindi", "Telugu", "Tamil", "Kannada", "Malayalam"];

function Index() {
  const [lang, setLang] = useState("All");
  const [q, setQ] = useState("");
  const list = movies.filter(
    (m) => (lang === "All" || m.lang.includes(lang)) && m.title.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div className="min-h-screen bg-background">
      <Header search={q} onSearch={setQ} />
      <section className="hero-banner px-6 py-14 text-center">
        <p className="text-sm uppercase tracking-widest opacity-80">Now showing across {cities.length} cities</p>
        <h1 className="mt-2 font-display text-4xl md:text-6xl">Lights. Camera. Book!</h1>
        <p className="mt-3 opacity-90">Blockbusters from Bollywood, Tollywood, Kollywood & beyond.</p>
      </section>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl">Recommended Movies</h2>
          <div className="flex flex-wrap gap-2">
            {langs.map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`chip ${lang === l ? "chip-active" : ""}`}>{l}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {list.map((m) => (
            <Link key={m.id} to="/movie/$id" params={{ id: m.id }} className="group">
              <div className="poster" style={{ "--h": m.hue } as React.CSSProperties}>
                <span className="font-display text-xl leading-tight">{m.title}</span>
                <div className="poster-rating">★ {m.rating}/10 · {m.votes} votes</div>
              </div>
              <h3 className="mt-2 font-semibold group-hover:text-primary">{m.title}</h3>
              <p className="text-sm text-muted-foreground">{m.genre}</p>
            </Link>
          ))}
          {list.length === 0 && <p className="col-span-full text-muted-foreground">No movies found.</p>}
        </div>
      </main>
      <footer className="bg-secondary py-6 text-center text-sm text-secondary-foreground">© 2026 CineYatra · Made in India</footer>
    </div>
  );
}
