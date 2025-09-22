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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        <header className="bg-white dark:bg-gray-900 shadow transition-colors duration-300">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
            {/* Left: Logo */}
            <Link
              href="/"
              className="font-bold text-xl text-gray-900 dark:text-white"
            >
              Watch with Senpai
            </Link>

            {/* Center: Search bar (desktop only) */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <SearchBar />
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2">
              {/* Desktop nav */}
              <nav className="hidden md:flex space-x-2 text-sm">
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

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="px-3 py-2 rounded bg-accent dark:bg-accent-dark text-foreground dark:text-foreground-dark transition-colors"
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>

              {/* Hamburger (mobile only) */}
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="md:hidden p-2 text-gray-900 dark:text-white"
              >
                {mobileOpen ? "✖" : "☰"}
              </button>
            </div>
          </div>

          {/* Mobile nav (collapsible) */}
          {mobileOpen && (
            <div className="md:hidden px-4 pb-4 space-y-4 animate-fade-in">
              <SearchBar />
              <nav className="flex flex-col space-y-2 text-sm">
                <Link href="/" className="text-gray-900 dark:text-white">
                  Home
                </Link>
                <Link href="/mylist" className="text-gray-900 dark:text-white">
                  My List
                </Link>
              </nav>
            </div>
          )}
        </header>

        <main className="container mx-auto px-4 py-8">{children}</main>
        <ScrollToTop />
      </body>
    </html>
  );
}
