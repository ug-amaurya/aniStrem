import AnimeCard from "../components/AnimeCard";
import Link from "next/link";
import PaginationControls from "@/components/PaginationControls";

async function fetchAnimeList(
  page: number,
  limit: number = 24,
  q?: string,
  filters?: {
    genres?: string;
    type?: string;
    status?: string;
    year?: string;
  }
) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));

  if (q && q.trim()) {
    params.set("q", q.trim());
  } else {
    params.set("order_by", "members");
    params.set("sort", "desc");
  }

  // Add filter parameters
  if (filters?.genres) params.set("genres", filters.genres);
  if (filters?.type) params.set("type", filters.type);
  if (filters?.status) params.set("status", filters.status);
  if (filters?.year) params.set("year", filters.year);

  const url = `https://api.jikan.moe/v4/anime?${params.toString()}`;

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error("Failed to load anime list");
  const json = await res.json();
  const items = (json?.data || [])
    .map((a: any) => ({
      id: String(a.mal_id),
      title: a.title || a.title_english || a.title_japanese,
      description: a.synopsis,
      cover: a.images?.jpg?.image_url || a.images?.webp?.image_url,
      genres: (a.genres || []).map((g: any) => g.name),
      year: a.year,
      type: a.type,
      status: a.status,
    }))
    .sort((a: any, b: any) => b.title.localeCompare(a.title));
  const hasNext = Boolean(json?.pagination?.has_next_page);
  const lastPage = Number(json?.pagination?.last_visible_page) || page;
  return { items, hasNext, lastPage };
}

export default async function Page({
  searchParams,
}: {
  searchParams?:
    | Promise<{ [key: string]: string | string[] | undefined }>
    | { [key: string]: string | string[] | undefined };
}) {
  const sp =
    typeof (searchParams as any)?.then === "function"
      ? await (searchParams as Promise<{
          [key: string]: string | string[] | undefined;
        }>)
      : (searchParams as
          | { [key: string]: string | string[] | undefined }
          | undefined);

  const page = Number(sp?.page ?? 1) || 1;
  const q = (sp?.q as string) || "";
  const filters = {
    genres: (sp?.genres as string) || "",
    type: (sp?.type as string) || "",
    status: (sp?.status as string) || "",
    year: (sp?.year as string) || "",
  };
  const { items, hasNext, lastPage } = await fetchAnimeList(
    page,
    24,
    q,
    filters
  );

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">
        {q ? `Results for "${q}"` : "All Anime"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {items.map((a: any) => (
          <AnimeCard key={a.id} anime={a} />
        ))}
      </div>
      <PaginationControls
        page={page}
        hasNext={hasNext}
        lastPage={lastPage}
        q={q}
        filters={filters}
      />
    </section>
  );
}
