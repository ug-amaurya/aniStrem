"use client";
import { useEffect, useRef } from "react";

export default function VideoPlayer({
  src,
  title,
}: {
  src: string;
  title?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: any = null;

    const setup = async () => {
      if (src.endsWith(".m3u8") && typeof window !== "undefined") {
        try {
          const HlsModule = await import("hls.js");
          const Hls = HlsModule.default;
          if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
          } else {
            video.src = src; // fallback
          }
        } catch (e) {
          console.error("Failed to load hls.js", e);
          video.src = src;
        }
      } else {
        video.src = src;
      }
    };

    setup();

    return () => {
      if (hls) {
        hls.destroy();
        hls = null;
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="w-full max-h-[70vh] rounded-lg"
      controls
      playsInline
      title={title}
    />
  );
}
