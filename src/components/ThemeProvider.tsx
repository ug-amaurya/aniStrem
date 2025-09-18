// app/RootLayoutClient.tsx (client)
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <html lang="en">
      <body>
        {/* <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
            <Link href="/" className="font-bold text-xl">
              AnimeStream
            </Link>
            <div className="flex-1 flex items-center justify-center">
              <SearchBar />
            </div>
            <nav className="space-x-2 text-sm">
              <Button asChild variant="ghost" size="sm">
                <Link href="/">Home</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/mylist">My List</Link>
              </Button>
            </nav>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded bg-accent text-foreground"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </header> */}
        <header className="bg-white dark:bg-gray-900 shadow transition-colors duration-300">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="font-bold text-xl text-gray-900 dark:text-white"
            >
              AnimeStream
            </Link>
            <div className="flex-1 flex items-center justify-center">
              <SearchBar />
            </div>
            <nav className="space-x-2 text-sm">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-gray-900 dark:text-white"
              >
                <Link href="/">Home</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="text-gray-900 dark:text-white"
              >
                <Link href="/mylist">My List</Link>
              </Button>
            </nav>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded bg-accent dark:bg-accent-dark text-foreground dark:text-foreground-dark transition-colors"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
        <ScrollToTop />
      </body>
    </html>
  );
}
