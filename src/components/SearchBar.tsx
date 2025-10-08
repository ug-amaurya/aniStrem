"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onOpenFilters?: () => void;
}

export default function SearchBar({ onOpenFilters }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = useMemo(() => searchParams.get("q") || "", [searchParams]);
  const [query, setQuery] = useState(initial);

  useEffect(() => {
    setQuery(initial);
  }, [initial]);

  const submit = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set("q", query.trim());
        params.set("page", "1");
      } else {
        params.delete("q");
        params.set("page", "1");
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, query, router, searchParams]
  );

  return (
    <div className="w-full max-w-4xl flex items-center">
      <form onSubmit={submit} className="flex w-full max-w-sm mx-auto gap-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search anime..."
        />
        <div className="flex ">
          <Button type="submit" size="sm">
            Search
          </Button>
        </div>
      </form>

      <div className="flex justify-center">
        <Button variant="outline" onClick={onOpenFilters} className="text-sm">
          Filters
        </Button>
      </div>
    </div>
  );
}
