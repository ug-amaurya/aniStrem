"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function VideoSourceForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");

  useEffect(() => {
    const current = searchParams.get("src") || "";
    setValue(current);
  }, [searchParams]);

  const submit = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set("src", value.trim());
      } else {
        params.delete("src");
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams, value]
  );

  return (
    <form onSubmit={submit} className="flex items-center gap-2 mb-3">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Paste HLS (.m3u8) or MP4 URL"
        className="flex-1"
      />
      <Button type="submit">Load</Button>
    </form>
  );
}
