"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AnimePageLoading from "./AnimePageLoading";

interface AnimePageClientProps {
  children: React.ReactNode;
  animeId: string;
}

export default function AnimePageClient({
  children,
  animeId,
}: AnimePageClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [animeId]);

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Anime
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => router.refresh()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <AnimePageLoading />;
  }

  return <>{children}</>;
}
