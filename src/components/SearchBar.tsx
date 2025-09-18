"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
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
    <form onSubmit={submit} className="relative w-full max-w-sm">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search anime..."
      />
      <div className="absolute right-1 top-1/2 -translate-y-1/2">
        <Button type="submit" size="sm">
          Search
        </Button>
      </div>
    </form>
  );
}
