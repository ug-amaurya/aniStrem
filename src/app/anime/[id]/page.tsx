// // "use client"; // enable hooks
//
// import Link from "next/link";
// import WatchlistButton from "../../../components/WatchlistButton";
// // import { useState } from "react";
//
// async function fetchAnimeDetails(malId: string) {
//   const res = await fetch(
//     `https://api.jikan.moe/v4/anime/${encodeURIComponent(malId)}/full`,
//     {
//       next: { revalidate: 300 },
//     }
//   );
//   if (!res.ok) throw new Error("Failed to load anime details");
//   const json = await res.json();
//   return json?.data;
// }
//
// async function fetchAnimeEpisodes(malId: string) {
//   // Jikan paginates episodes; first page is enough for demo
//   const res = await fetch(
//     `https://api.jikan.moe/v4/anime/${encodeURIComponent(malId)}/episodes`,
//     {
//       next: { revalidate: 300 },
//     }
//   );
//   if (!res.ok) throw new Error("Failed to load episodes");
//   const json = await res.json();
//   return json?.data || [];
// }
//
// async function fetchAnimeRelations(malId: string) {
//   const res = await fetch(
//     `https://api.jikan.moe/v4/anime/${encodeURIComponent(malId)}/relations`,
//     { next: { revalidate: 300 } }
//   );
//   if (!res.ok) return [] as any[];
//   const json = await res.json();
//   return json?.data || [];
// }
//
// async function fetchAnimeRecommendations(malId: string) {
//   const res = await fetch(
//     `https://api.jikan.moe/v4/anime/${encodeURIComponent(
//       malId
//     )}/recommendations`,
//     { next: { revalidate: 300 } }
//   );
//   if (!res.ok) return [] as any[];
//   const json = await res.json();
//   return json?.data || [];
// }
//
// async function fetchAnimeReviews(malId: string) {
//   const res = await fetch(
//     `https://api.jikan.moe/v4/anime/${encodeURIComponent(malId)}/reviews`,
//     { next: { revalidate: 300 } }
//   );
//   if (!res.ok) return [] as any[];
//   const json = await res.json();
//   return json?.data || [];
// }
//
// export default async function AnimePage({
//   params,
// }: {
//   params: { id: string } | Promise<{ id: string }>;
// }) {
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(false);
//   const p =
//     typeof (params as any)?.then === "function"
//       ? await (params as Promise<{ id: string }>)
//       : (params as { id: string });
//   let anime: any | null = null;
//   let episodes: any[] = [];
//   let relations: any[] = [];
//   let recommendations: any[] = [];
//   let reviews: any[] = [];
//   try {
//     const [details, eps, rel, recs, revs] = await Promise.all([
//       fetchAnimeDetails(p.id),
//       fetchAnimeEpisodes(p.id),
//       fetchAnimeRelations(p.id),
//       fetchAnimeRecommendations(p.id),
//       fetchAnimeReviews(p.id),
//     ]);
//     anime = details;
//     episodes = eps;
//     relations = rel;
//     recommendations = recs;
//     reviews = revs;
//   } catch {
//     anime = null;
//     episodes = [];
//     relations = [];
//     recommendations = [];
//     reviews = [];
//   }
//
//   if (!anime) return <div>Anime not found</div>;
//
//   const imageUrl =
//     anime.images?.jpg?.image_url || anime.images?.webp?.image_url;
//   const title = anime.title || anime.title_english || anime.title_japanese;
//   const genres = (anime.genres || []).map((g: any) => g.name);
//   const description = anime.synopsis;
//   const seasonLabel =
//     anime.season && anime.year
//       ? `${String(anime.season).toUpperCase()} ${anime.year}`
//       : anime.year
//       ? String(anime.year)
//       : null;
//
//   return (
//     <div>
//       <div className="flex gap-6">
//         {/* eslint-disable-next-line @next/next/no-img-element */}
//         {imageUrl && (
//           <img
//             src={imageUrl}
//             alt={title}
//             className="w-48 rounded shadow object-cover"
//           />
//         )}
//         <div>
//           <h1 className="text-2xl font-bold">{title}</h1>
//           {genres.length ? (
//             <p className="text-sm text-gray-600">{genres.join(" · ")}</p>
//           ) : null}
//           {description ? (
//             <p className="mt-4 whitespace-pre-line">{description}</p>
//           ) : null}
//
//           <div className="mt-4">
//             <WatchlistButton animeId={p.id} />
//           </div>
//         </div>
//       </div>
//
//       {seasonLabel ? (
//         <div className="mt-4 text-sm text-gray-700">Season: {seasonLabel}</div>
//       ) : null}
//
//       <section className="mt-8">
//         <h2 className="text-xl font-semibold mb-3">Episodes</h2>
//         <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//           {episodes.map((ep: any) => (
//             <li
//               key={ep.mal_id}
//               className="flex items-center justify-between bg-white p-3 rounded shadow-sm"
//             >
//               <div>
//                 <div className="font-medium">Episode {ep.mal_id}</div>
//                 {ep.title ? (
//                   <div className="text-xs text-gray-500">{ep.title}</div>
//                 ) : null}
//               </div>
//               <div className="flex items-center gap-2">
//                 <Link
//                   href={`/watch/${encodeURIComponent(
//                     p.id
//                   )}/${encodeURIComponent(ep.mal_id)}`}
//                   className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
//                 >
//                   Watch
//                 </Link>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </section>
//
//       {/* Related / Franchise entries */}
//       {relations.length > 0 ? (
//         <section className="mt-8">
//           <h2 className="text-xl font-semibold mb-3">Related</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             {relations.map((group: any, idx: number) => (
//               <div
//                 key={`${group.relation}-${idx}`}
//                 className="bg-white rounded p-3 shadow-sm"
//               >
//                 <div className="font-medium mb-2">{group.relation}</div>
//                 <ul className="space-y-1">
//                   {(group.entry || []).map((e: any) => (
//                     <li key={e.mal_id}>
//                       <Link
//                         className="text-blue-600 hover:underline"
//                         href={`/anime/${encodeURIComponent(String(e.mal_id))}`}
//                       >
//                         {e.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </section>
//       ) : null}
//
//       {/* Recommendations */}
//       {recommendations.length > 0 ? (
//         <section className="mt-8">
//           <h2 className="text-xl font-semibold mb-3">Recommended</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {recommendations
//               .slice()
//               .sort((a: any, b: any) => (b.votes || 0) - (a.votes || 0))
//               .slice(0, 6)
//               .map((r: any) => {
//                 const a = r.entry || r; // Jikan returns { entry: { mal_id, title, images } }
//                 const rid = String(a.mal_id);
//                 const rtitle = a.title || a.name;
//                 const rimg =
//                   a.images?.jpg?.image_url || a.images?.webp?.image_url;
//                 return (
//                   <Link
//                     key={`${rid}-${rtitle}`}
//                     href={`/anime/${encodeURIComponent(rid)}`}
//                     className="block bg-white rounded overflow-hidden shadow hover:shadow-lg transition"
//                   >
//                     {rimg ? (
//                       // eslint-disable-next-line @next/next/no-img-element
//                       <img
//                         src={rimg}
//                         alt={rtitle}
//                         className="w-full h-40 object-cover"
//                       />
//                     ) : null}
//                     <div className="p-3">
//                       <div className="font-medium text-sm truncate">
//                         {rtitle}
//                       </div>
//                     </div>
//                   </Link>
//                 );
//               })}
//           </div>
//         </section>
//       ) : null}
//
//       {/* Reviews */}
//       {reviews.length > 0 ? (
//         <section className="mt-8">
//           <h2 className="text-xl font-semibold mb-3">Reviews</h2>
//           <ul className="space-y-3">
//             {reviews
//               .slice()
//               .sort(
//                 (a: any, b: any) =>
//                   (b.score ?? b.scores?.overall ?? 0) -
//                   (a.score ?? a.scores?.overall ?? 0)
//               )
//               .slice(0, 5)
//               .map((rev: any) => {
//                 const user = rev.user?.username || rev.user?.url || "Anonymous";
//                 const score = rev.score ?? rev.scores?.overall;
//                 const text = (rev.review || "").trim();
//                 const excerpt =
//                   text.length > 400 ? `${text.slice(0, 400)}…` : text;
//                 return (
//                   <li
//                     key={`${user}-${rev.date || rev.mal_id || Math.random()}`}
//                     className="bg-white p-4 rounded shadow-sm"
//                   >
//                     <div className="flex items-center justify-between mb-2">
//                       <div className="font-medium">{user}</div>
//                       {score ? (
//                         <div className="text-xs px-2 py-0.5 rounded bg-gray-100">
//                           Score: {score}
//                         </div>
//                       ) : null}
//                     </div>
//                     <p className="text-sm text-gray-800 whitespace-pre-line">
//                       {excerpt || "No review text."}
//                     </p>
//                   </li>
//                 );
//               })}
//           </ul>
//         </section>
//       ) : null}
//     </div>
//   );
// }
// app/anime/[id]/page.tsx (server component)
import AnimePageServer from "./AnimePageServer";
import React from "react";

export default function AnimePageWrapper({
  params,
}: {
  params: { id: string };
}) {
  return (
    <React.Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      }
    >
      <AnimePageServer params={params} />
    </React.Suspense>
  );
}
