"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import SearchableSelect from "@/components/ui/searchable-select";

// Genre data from Jikan API
const GENRES = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 4, name: "Comedy" },
  { id: 8, name: "Drama" },
  { id: 10, name: "Fantasy" },
  { id: 14, name: "Horror" },
  { id: 7, name: "Mystery" },
  { id: 22, name: "Romance" },
  { id: 24, name: "Sci-Fi" },
  { id: 36, name: "Slice of Life" },
  { id: 30, name: "Sports" },
  { id: 37, name: "Supernatural" },
  { id: 13, name: "Historical" },
  { id: 17, name: "Martial Arts" },
  { id: 18, name: "Mecha" },
  { id: 19, name: "Music" },
  { id: 6, name: "Mythology" },
  { id: 20, name: "Parody" },
  { id: 40, name: "Psychological" },
  { id: 3, name: "Racing" },
  { id: 21, name: "Samurai" },
  { id: 23, name: "School" },
  { id: 29, name: "Space" },
  { id: 11, name: "Strategy Game" },
  { id: 31, name: "Super Power" },
  { id: 32, name: "Vampire" },
  { id: 15, name: "Kids" },
  { id: 42, name: "Seinen" },
  { id: 25, name: "Shoujo" },
  { id: 27, name: "Shounen" },
];

const TYPES = [
  { value: "tv", label: "TV" },
  { value: "movie", label: "Movie" },
  { value: "ova", label: "OVA" },
  { value: "special", label: "Special" },
  { value: "ona", label: "ONA" },
  { value: "music", label: "Music" },
];

const STATUSES = [
  { value: "airing", label: "Currently Airing" },
  { value: "complete", label: "Finished Airing" },
  { value: "upcoming", label: "Not Yet Aired" },
];

// Generate years from 1990 to current year + 1
const YEARS = Array.from(
  { length: new Date().getFullYear() - 1990 + 2 },
  (_, i) => 1990 + i
).reverse();

interface AnimeFiltersProps {
  onApply?: () => void;
}

export default function AnimeFilters({ onApply }: AnimeFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current filter values from URL
  const currentGenre = searchParams.get("genres") || "all";
  const currentType = searchParams.get("type") || "all";
  const currentStatus = searchParams.get("status") || "all";
  const currentYear = searchParams.get("year") || "all";

  const [filters, setFilters] = useState({
    genre: currentGenre,
    type: currentType,
    status: currentStatus,
    year: currentYear,
  });

  // Update local state when URL changes
  useEffect(() => {
    setFilters({
      genre: currentGenre,
      type: currentType,
      status: currentStatus,
      year: currentYear,
    });
  }, [currentGenre, currentType, currentStatus, currentYear]);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Clear existing filter params
    params.delete("genres");
    params.delete("type");
    params.delete("status");
    params.delete("year");
    params.delete("page"); // Reset to page 1 when applying filters

    // Add new filter params if they have values and are not "all"
    if (filters.genre && filters.genre !== "all")
      params.set("genres", filters.genre);
    if (filters.type && filters.type !== "all")
      params.set("type", filters.type);
    if (filters.status && filters.status !== "all")
      params.set("status", filters.status);
    if (filters.year && filters.year !== "all")
      params.set("year", filters.year);

    router.push(`${pathname}?${params.toString()}`);
    onApply?.(); // Close modal after applying filters
  }, [filters, pathname, router, searchParams, onApply]);

  const clearFilters = useCallback(() => {
    setFilters({
      genre: "all",
      type: "all",
      status: "all",
      year: "all",
    });

    const params = new URLSearchParams(searchParams.toString());
    params.delete("genres");
    params.delete("type");
    params.delete("status");
    params.delete("year");
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
    onApply?.(); // Close modal after clearing filters
  }, [pathname, router, searchParams, onApply]);

  const hasActiveFilters = useMemo(() => {
    return (
      (filters.genre && filters.genre !== "all") ||
      (filters.type && filters.type !== "all") ||
      (filters.status && filters.status !== "all") ||
      (filters.year && filters.year !== "all")
    );
  }, [filters]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="text-gray-600 dark:text-gray-400"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Genre Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Genre
          </label>
          <SearchableSelect
            value={filters.genre}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, genre: value }))
            }
            placeholder="Select genre"
            searchPlaceholder="Search genres..."
            options={[
              { value: "all", label: "All Genres" },
              ...GENRES.map((genre) => ({
                value: genre.id.toString(),
                label: genre.name,
              })),
            ]}
          />
        </div>

        {/* Type Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Type
          </label>
          <SearchableSelect
            value={filters.type}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, type: value }))
            }
            placeholder="Select type"
            searchPlaceholder="Search types..."
            options={[
              { value: "all", label: "All Types" },
              ...TYPES.map((type) => ({
                value: type.value,
                label: type.label,
              })),
            ]}
          />
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <SearchableSelect
            value={filters.status}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, status: value }))
            }
            placeholder="Select status"
            searchPlaceholder="Search statuses..."
            options={[
              { value: "all", label: "All Status" },
              ...STATUSES.map((status) => ({
                value: status.value,
                label: status.label,
              })),
            ]}
          />
        </div>

        {/* Year Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Year
          </label>
          <SearchableSelect
            value={filters.year}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, year: value }))
            }
            placeholder="Select year"
            searchPlaceholder="Search years..."
            options={[
              { value: "all", label: "All Years" },
              ...YEARS.map((year) => ({
                value: year.toString(),
                label: year.toString(),
              })),
            ]}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button onClick={applyFilters} className="w-full md:w-auto">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
