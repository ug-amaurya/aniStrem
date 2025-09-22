"use client";

import Link from "next/link";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  // Generate page numbers with ellipsis logic
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7; // Show up to 7 page numbers

    if (lastPage <= maxVisiblePages) {
      // If total pages is less than max visible, show all
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (page <= 4) {
        // Current page is near the beginning
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(lastPage);
      } else if (page >= lastPage - 3) {
        // Current page is near the end
        pages.push("...");
        for (let i = lastPage - 4; i <= lastPage; i++) {
          pages.push(i);
        }
      } else {
        // Current page is in the middle
        pages.push("...");
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(lastPage);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {/* Previous Button */}
      {page > 1 ? (
        <Button asChild variant="outline" size="sm">
          <Link href={buildHref(page - 1)} className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Prev</span>
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Prev</span>
        </Button>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((pageNum, index) => (
          <div key={index}>
            {pageNum === "..." ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <Button
                asChild
                variant={pageNum === page ? "default" : "outline"}
                size="sm"
                className="min-w-[40px]"
              >
                <Link href={buildHref(pageNum as number)}>{pageNum}</Link>
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      {hasNext ? (
        <Button asChild variant="outline" size="sm">
          <Link href={buildHref(page + 1)} className="flex items-center gap-1">
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
