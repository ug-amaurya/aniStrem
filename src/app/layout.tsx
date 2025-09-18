// "use client"; // this is important so we can use state/hooks
//
// import "./globals.css";
// import Link from "next/link";
// import SearchBar from "@/components/SearchBar";
// import ScrollToTop from "@/components/ScrollToTop";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
//
// export const metadata = {
//   title: "AnimeStream Demo",
//   description: "Demo anime streaming built with Next.js",
// };
//
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [theme, setTheme] = useState<"light" | "dark">("dark");
//
//   // Load stored theme or default to dark
//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme") as "light" | "dark";
//     if (storedTheme) {
//       setTheme(storedTheme);
//       document.documentElement.classList.toggle("dark", storedTheme === "dark");
//     } else {
//       document.documentElement.classList.add("dark"); // default dark
//     }
//   }, []);
//   const toggleTheme = () => {
//     const newTheme = theme === "dark" ? "light" : "dark";
//     setTheme(newTheme);
//     document.documentElement.classList.toggle("dark", newTheme === "dark");
//     localStorage.setItem("theme", newTheme);
//   };
//   return (
//     <html lang="en">
//       <body>
//         <header className="bg-white shadow">
//           <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
//             <Link href="/" className="font-bold text-xl">
//               AnimeStream
//             </Link>
//             <div className="flex-1 flex items-center justify-center">
//               <SearchBar />
//             </div>
//             <nav className="space-x-2 text-sm">
//               <Button asChild variant="ghost" size="sm">
//                 <Link href="/">Home</Link>
//               </Button>
//               <Button asChild size="sm">
//                 <Link href="/mylist">My List</Link>
//               </Button>
//             </nav>
//             <button
//               onClick={toggleTheme}
//               className="px-4 py-2 rounded bg-accent text-foreground"
//             >
//               {theme === "dark" ? "Light Mode" : "Dark Mode"}
//             </button>
//           </div>
//         </header>
//
//         <main className="container mx-auto px-4 py-8">{children}</main>
//         <ScrollToTop />
//       </body>
//     </html>
//   );
// }
import RootLayoutClient from "@/components/ThemeProvider";
import "./globals.css";
import { Suspense } from "react";

export const metadata = {
  title: "AnimeStream Demo",
  description: "Demo anime streaming built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <RootLayoutClient>{children}</RootLayoutClient>
    </Suspense>
  );
}
