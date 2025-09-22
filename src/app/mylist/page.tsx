"use client";

import { useEffect, useMemo, useState } from "react";
import AnimeCard from "../../components/AnimeCard";
import BackButton from "../../components/BackButton";

type SimpleAnime = {
  id: string;
  title: string;
  cover?: string;
  genres?: string[];
};

export default function MyListPage() {
  const [ids, setIds] = useState<string[]>([]);
  const [items, setItems] = useState<SimpleAnime[]>([]);
  const [loading, setLoading] = useState(true);

  // Load saved ids from localStorage
  useEffect(() => {
    try {
      const list = JSON.parse(
        localStorage.getItem("watchlist") || "[]"
      ) as string[];
      setIds(list);
    } catch {
      setIds([]);
    }
  }, []);

  // Fetch minimal details for each id
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const results = await Promise.all(
          ids.map(async (id) => {
            try {
              const res = await fetch(
                `https://api.jikan.moe/v4/anime/${encodeURIComponent(id)}`
              );
              if (!res.ok) throw new Error("bad");
              const json = await res.json();
              const a = json?.data;
              return {
                id: String(a?.mal_id ?? id),
                title:
                  a?.title ||
                  a?.title_english ||
                  a?.title_japanese ||
                  String(id),
                cover: a?.images?.jpg?.image_url || a?.images?.webp?.image_url,
                genres: (a?.genres || []).map((g: any) => g.name),
              } as SimpleAnime;
            } catch {
              return { id: String(id), title: String(id) } as SimpleAnime;
            }
          })
        );
        if (!cancelled) setItems(results);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (ids.length) load();
    else {
      setItems([]);
      setLoading(false);
    }
    return () => {
      cancelled = true;
    };
  }, [ids]);

  const empty = useMemo(
    () => !loading && ids.length === 0,
    [ids.length, loading]
  );

  return (
    <section>
      <div className="mb-6">
        <BackButton />
      </div>
      <h1 className="text-3xl font-bold mb-6">My List</h1>
      {loading ? (
        <div>Loading…</div>
      ) : empty ? (
        <div className="text-gray-600">
          Your list is empty. Add anime from a detail page.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((a) => (
            <AnimeCard key={a.id} anime={a as any} />
          ))}
        </div>
      )}
    </section>
  );
}
