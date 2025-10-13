"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import AnimeFilters from "@/components/AnimeFilters";

export default function ThemeProvider({
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
  const [showFilters, setShowFilters] = useState(false);

  const openFilters = () => setShowFilters(true);
  const closeFilters = () => setShowFilters(false);

  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2495203542622620"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <header
          className={`${
            theme === "dark" ? "bg-gray-900" : "bg-white"
          } shadow transition-colors duration-300`}
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
            {/* Left: Logo */}
            <Link
              href="/"
              className={`font-bold text-xl ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Watch with Senpai
            </Link>

            {/* Center: Search bar (desktop only) */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <SearchBar onOpenFilters={openFilters} />
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2">
              {/* Desktop nav */}
              <nav className="hidden md:flex space-x-2 text-sm">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                >
                  <Link href="/">Home</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                >
                  <Link href="/mylist">My List</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </nav>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="px-3 py-2 rounded transition-colors"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-accent-foreground)",
                }}
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>

              {/* Hamburger (mobile only) */}
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className={`md:hidden p-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {mobileOpen ? "✖" : "☰"}
              </button>
            </div>
          </div>

          {/* Mobile nav (collapsible) */}
          {mobileOpen && (
            <div className="md:hidden px-4 pb-4 space-y-4 animate-fade-in">
              <SearchBar onOpenFilters={openFilters} />
              <nav className="flex flex-col space-y-2 text-sm">
                <Link
                  href="/"
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                >
                  Home
                </Link>
                <Link
                  href="/mylist"
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                >
                  My List
                </Link>
                <Link
                  href="/login"
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                >
                  Sign Up
                </Link>
              </nav>
            </div>
          )}
        </header>

        <main className="container mx-auto px-4 py-8">{children}</main>
        <ScrollToTop />

        {/* Filter Modal */}
        <Modal isOpen={showFilters} onClose={closeFilters} title="Filter Anime">
          <AnimeFilters onApply={closeFilters} />
        </Modal>
      </body>
    </html>
  );
}
