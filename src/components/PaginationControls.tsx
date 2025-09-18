"use client";

import Link from "next/link";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PaginationControls({
  page,
  hasNext,
  lastPage,
  q,
}: {
  page: number;
  hasNext: boolean;
  lastPage: number;
  q: string;
}) {
  const buildHref = useCallback(
    (targetPage: number) => {
      const p = new URLSearchParams();
      p.set("page", String(targetPage));
      if (q.trim()) p.set("q", q.trim());
      return `/?${p.toString()}`;
    },
    [q]
  );

  return (
    <div className="flex items-center justify-end gap-6 mb-6">
      <div>
        {page > 1 ? (
          <Button asChild variant="secondary" size="sm">
            <Link href={buildHref(page - 1)}>Prev</Link>
          </Button>
        ) : (
          <span />
        )}
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="pageSelect" className="text-sm text-gray-600">
          Page
        </label>
        <Select
          defaultValue={String(page)}
          onValueChange={(v) => {
            window.location.href = buildHref(Number(v));
          }}
        >
          <SelectTrigger id="pageSelect" className="w-28">
            <SelectValue placeholder="Page" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Array.from(
                { length: Math.min(lastPage, 100) },
                (_, i) => i + 1
              ).map((p) => (
                <SelectItem key={p} value={String(p)}>
                  {p}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        {hasNext ? (
          <Button asChild size="sm">
            <Link href={buildHref(page + 1)}>Next</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
