import Link from "next/link";
import WatchlistButton from "@/components/WatchlistButton";
import BackButton from "@/components/BackButton";
async function fetchAnimeDetails(malId: string) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${encodeURIComponent(malId)}/full`,
    {
      next: { revalidate: 300 },
    }
  );
  if (!res.ok) throw new Error("Failed to load anime details");
  const json = await res.json();
  return json?.data;
}

async function fetchAnimeEpisodes(malId: string) {
  // Jikan paginates episodes; first page is enough for demo
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${encodeURIComponent(malId)}/episodes`,
    {
      next: { revalidate: 300 },
    }
  );
  if (!res.ok) throw new Error("Failed to load episodes");
  const json = await res.json();
  return json?.data || [];
}

async function fetchAnimeRelations(malId: string) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${encodeURIComponent(malId)}/relations`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) return [] as any[];
  const json = await res.json();
  return json?.data || [];
}

async function fetchAnimeRecommendations(malId: string) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${encodeURIComponent(
      malId
    )}/recommendations`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) return [] as any[];
  const json = await res.json();
  return json?.data || [];
}

async function fetchAnimeReviews(malId: string) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${encodeURIComponent(malId)}/reviews`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) return [] as any[];
  const json = await res.json();
  return json?.data || [];
}

export default async function AnimePageServer({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const p =
    typeof (params as any)?.then === "function"
      ? await (params as Promise<{ id: string }>)
      : (params as { id: string });

  let anime: any | null = null;
  let episodes: any[] = [];
  let relations: any[] = [];
  let recommendations: any[] = [];
  let reviews: any[] = [];

  try {
    // Add a small delay to ensure loading state is visible
    const [details, eps, rel, recs, revs] = await Promise.all([
      fetchAnimeDetails(p.id).catch(() => null),
      fetchAnimeEpisodes(p.id).catch(() => []),
      fetchAnimeRelations(p.id).catch(() => []),
      fetchAnimeRecommendations(p.id).catch(() => []),
      fetchAnimeReviews(p.id).catch(() => []),
    ]);

    anime = details;
    episodes = eps;
    relations = rel;
    recommendations = recs;
    reviews = revs;
  } catch (error) {
    console.error("Error fetching anime data:", error);
    anime = null;
  }

  if (!anime) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Anime Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The anime you're looking for doesn't exist or couldn't be loaded.
          </p>
          <a
            href="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  const imageUrl =
    anime.images?.jpg?.image_url || anime.images?.webp?.image_url;
  const title = anime.title || anime.title_english || anime.title_japanese;
  const genres = (anime.genres || []).map((g: any) => g.name);
  const description = anime.synopsis;
  const seasonLabel =
    anime.season && anime.year
      ? `${String(anime.season).toUpperCase()} ${anime.year}`
      : anime.year
      ? String(anime.year)
      : null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="mb-4 sm:mb-6">
        <BackButton />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {imageUrl && (
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <img
              src={imageUrl}
              alt={title}
              className="w-48 sm:w-56 md:w-64 lg:w-72 rounded-lg shadow-lg object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold break-words">
            {title}
          </h1>
          {genres.length ? (
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 break-words">
              {genres.join(" · ")}
            </p>
          ) : null}
          {description ? (
            <p className="mt-4 text-sm sm:text-base whitespace-pre-line break-words">
              {description}
            </p>
          ) : null}

          <div className="mt-4 sm:mt-6">
            <WatchlistButton animeId={p.id} />
          </div>
        </div>
      </div>

      {seasonLabel ? (
        <div className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-700 dark:text-gray-300">
          Season: {seasonLabel}
        </div>
      ) : null}

      <section className="mt-8 sm:mt-10">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">
          Episodes
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {episodes.map((ep: any) => (
            <li
              key={ep.mal_id}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-1 min-w-0 mb-2 sm:mb-0">
                <div className="font-medium text-sm sm:text-base">
                  Episode {ep.mal_id}
                </div>
                {ep.title ? (
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 break-words">
                    {ep.title}
                  </div>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/watch/${encodeURIComponent(
                    p.id
                  )}/${encodeURIComponent(ep.mal_id)}`}
                  className="px-3 py-1.5 sm:py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white dark:text-gray-900 text-xs sm:text-sm font-medium transition-colors w-full sm:w-auto text-center"
                >
                  Watch
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Related / Franchise entries */}
      {relations.length > 0 ? (
        <section className="mt-8 sm:mt-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">
            Related
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {relations.map((group: any, idx: number) => (
              <div
                key={`${group.relation}-${idx}`}
                className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="font-medium mb-3 text-sm sm:text-base">
                  {group.relation}
                </div>
                <ul className="space-y-2">
                  {(group.entry || []).map((e: any) => (
                    <li key={e.mal_id}>
                      <Link
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm sm:text-base break-words block"
                        href={`/anime/${encodeURIComponent(String(e.mal_id))}`}
                      >
                        {e.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Recommendations */}
      {recommendations.length > 0 ? (
        <section className="mt-8 sm:mt-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">
            Recommended
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {recommendations
              .slice()
              .sort((a: any, b: any) => (b.votes || 0) - (a.votes || 0))
              .slice(0, 6)
              .map((r: any) => {
                const a = r.entry || r; // Jikan returns { entry: { mal_id, title, images } }
                const rid = String(a.mal_id);
                const rtitle = a.title || a.name;
                const rimg =
                  a.images?.jpg?.image_url || a.images?.webp?.image_url;
                return (
                  <Link
                    key={`${rid}-${rtitle}`}
                    href={`/anime/${encodeURIComponent(rid)}`}
                    className="block bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 group"
                  >
                    {rimg ? (
                      <img
                        src={rimg}
                        alt={rtitle}
                        className="w-full h-32 sm:h-36 md:h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-32 sm:h-36 md:h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                    <div className="p-2 sm:p-3">
                      <div className="font-medium text-xs sm:text-sm truncate leading-tight">
                        {rtitle}
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </section>
      ) : null}

      {/* Reviews */}
      {reviews.length > 0 ? (
        <section className="mt-8 sm:mt-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">
            Reviews
          </h2>
          <ul className="space-y-4 sm:space-y-6">
            {reviews
              .slice()
              .sort(
                (a: any, b: any) =>
                  (b.score ?? b.scores?.overall ?? 0) -
                  (a.score ?? a.scores?.overall ?? 0)
              )
              .slice(0, 5)
              .map((rev: any) => {
                const user = rev.user?.username || rev.user?.url || "Anonymous";
                const score = rev.score ?? rev.scores?.overall;
                const text = (rev.review || "").trim();
                const excerpt =
                  text.length > 400 ? `${text.slice(0, 400)}…` : text;
                return (
                  <li
                    key={`${user}-${rev.date || rev.mal_id || Math.random()}`}
                    className="bg-white dark:bg-gray-900 p-4 sm:p-5 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                      <div className="font-medium text-sm sm:text-base break-words">
                        {user}
                      </div>
                      {score ? (
                        <div className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 w-fit">
                          Score: {score}
                        </div>
                      ) : null}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line break-words leading-relaxed">
                      {excerpt || "No review text."}
                    </p>
                  </li>
                );
              })}
          </ul>
        </section>
      ) : null}

      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2495203542622620"
        data-ad-slot="1000000000"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script
        dangerouslySetInnerHTML={{
          __html: `(window.adsbygoogle = window.adsbygoogle || []).push({});`,
        }}
      ></script>
    </div>
  );
}
