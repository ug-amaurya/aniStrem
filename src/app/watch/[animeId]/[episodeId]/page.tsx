import VideoPlayer from "../../../../components/VideoPlayer";
import VideoSourceForm from "../../../../components/VideoSourceForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

async function fetchAnimeDetails(malId: string) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${encodeURIComponent(malId)}/full`,
    {
      next: { revalidate: 300 },
    }
  );
  if (!res.ok) return null;
  const json = await res.json();

  return json?.data;
}

export default async function WatchPage({
  params,
  searchParams,
}: {
  params: { animeId: string; episodeId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let anime: any | null = null;
  try {
    anime = await fetchAnimeDetails(params.animeId);
  } catch {}

  const title =
    anime?.title ||
    anime?.title_english ||
    anime?.title_japanese ||
    `Anime ${params.animeId}`;
  const ytId: string | undefined = anime?.trailer?.youtube_id || undefined;
  const trailerUrl = ytId ? `https://www.youtube.com/embed/${ytId}` : null;

  const srcParam = searchParams?.src;
  const src = Array.isArray(srcParam) ? srcParam[0] : srcParam;

  const currentEpisode = Number(params.episodeId) || 1;
  const totalEpisodes: number | null =
    typeof anime?.episodes === "number" ? Number(anime.episodes) : null;
  const prevEpisode = currentEpisode > 1 ? currentEpisode - 1 : null;
  const hasNextWhenKnown =
    totalEpisodes !== null ? currentEpisode < totalEpisodes : true;
  const nextEpisode = hasNextWhenKnown ? currentEpisode + 1 : null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <Suspense>
        <VideoSourceForm />
      </Suspense>
      <div className="bg-black rounded shadow">
        {src ? (
          <VideoPlayer
            src={src}
            title={`${title} — Episode ${params.episodeId}`}
          />
        ) : trailerUrl ? (
          <iframe
            className="w-full aspect-video rounded"
            src={trailerUrl}
            title={`${title} — Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="p-6 text-white">
            No source provided. Append ?src=YOUR_VIDEO_URL
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        {prevEpisode ? (
          <Button variant="secondary" size="sm" asChild>
            <Link
              href={`/watch/${encodeURIComponent(
                params.animeId
              )}/${encodeURIComponent(String(prevEpisode))}${
                src ? `?src=${encodeURIComponent(src)}` : ""
              }`}
            >
              ← Prev
            </Link>
          </Button>
        ) : (
          <span />
        )}

        {nextEpisode ? (
          <Button size="sm" asChild>
            <Link
              href={`/watch/${encodeURIComponent(
                params.animeId
              )}/${encodeURIComponent(String(nextEpisode))}${
                src ? `?src=${encodeURIComponent(src)}` : ""
              }`}
            >
              Next →
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
