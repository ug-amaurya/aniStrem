import VideoPlayer from "../../../../components/VideoPlayer";
import VideoSourceForm from "../../../../components/VideoSourceForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import BackButton from "../../../../components/BackButton";

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="mb-4 sm:mb-6">
        <BackButton />
      </div>

      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 break-words">
        {title}
      </h1>

      <div className="mb-4 sm:mb-6">
        <Suspense>
          <VideoSourceForm />
        </Suspense>
      </div>

      <div className="bg-black rounded-lg shadow-lg overflow-hidden">
        {src ? (
          <VideoPlayer
            src={src}
            title={`${title} — Episode ${params.episodeId}`}
          />
        ) : trailerUrl ? (
          <iframe
            className="w-full aspect-video rounded-lg"
            src={trailerUrl}
            title={`${title} — Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="p-4 sm:p-6 text-white text-sm sm:text-base">
            No source provided. Append ?src=YOUR_VIDEO_URL
          </div>
        )}
      </div>

      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        {prevEpisode ? (
          <Button
            variant="secondary"
            size="sm"
            className="w-full sm:w-auto min-w-[120px]"
            asChild
          >
            <Link
              href={`/watch/${encodeURIComponent(
                params.animeId
              )}/${encodeURIComponent(String(prevEpisode))}${
                src ? `?src=${encodeURIComponent(src)}` : ""
              }`}
            >
              ← Previous
            </Link>
          </Button>
        ) : (
          <div className="w-full sm:w-auto" />
        )}

        {nextEpisode ? (
          <Button size="sm" className="w-full sm:w-auto min-w-[120px]" asChild>
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
