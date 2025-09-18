"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function WatchlistButton({ animeId }: { animeId: string }) {
  const [inList, setInList] = useState(false);

  useEffect(() => {
    try {
      const list = JSON.parse(
        localStorage.getItem("watchlist") || "[]"
      ) as string[];
      setInList(list.includes(animeId));
    } catch (e) {
      setInList(false);
    }
  }, [animeId]);

  function toggle() {
    const list = JSON.parse(
      localStorage.getItem("watchlist") || "[]"
    ) as string[];
    if (list.includes(animeId)) {
      const next = list.filter((id) => id !== animeId);
      localStorage.setItem("watchlist", JSON.stringify(next));
      setInList(false);
    } else {
      list.push(animeId);
      localStorage.setItem("watchlist", JSON.stringify(list));
      setInList(true);
    }
  }

  return (
    <Button
      variant={inList ? "secondary" : "default"}
      size="sm"
      onClick={toggle}
    >
      {inList ? "Remove from My List" : "Add to My List"}
    </Button>
  );
}
