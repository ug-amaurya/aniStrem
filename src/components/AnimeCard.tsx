"use client";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

export default function AnimeCard({ anime }: { anime: any }) {
  const imageSrc = anime.cover || anime.image || anime.poster || "";

  return (
    <Link
      href={`/anime/${anime.id}`}
      className="block hover:shadow-lg transition"
    >
      <Card className="overflow-hidden">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={anime.title}
            className="w-full h-64 object-cover"
          />
        ) : null}
        <CardContent className="p-3">
          <h3 className="font-semibold">{anime.title}</h3>
          <p className="text-xs text-gray-500 truncate">
            {(anime.genres || []).join(", ")}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
