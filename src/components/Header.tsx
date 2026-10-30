import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { cities } from "@/lib/movies";

export function Header({ search, onSearch }: { search?: string; onSearch?: (v: string) => void }) {
  const [city, setCity] = useState("Mumbai");
  return (
    <header className="sticky top-0 z-20 border-b bg-card">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
        <Link to="/" className="font-display text-2xl text-primary">cine<span className="text-foreground">yatra</span></Link>
        {onSearch && (
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search for Movies"
            className="hidden flex-1 rounded-md border bg-muted px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring md:block"
          />
        )}
        <select value={city} onChange={(e) => setCity(e.target.value)} className="ml-auto rounded-md bg-transparent text-sm">
          {cities.map((c) => <option key={c}>{c}</option>)}
        </select>
        <button className="rounded-md bg-primary px-4 py-1.5 text-sm text-primary-foreground">Sign in</button>
      </div>
    </header>
  );
}
