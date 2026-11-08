"use client";

import React, { useEffect, useRef } from "react";
import { posterOf } from "@/lib/media";

interface VideoProps {
  src: string;
  alt: string;
  className?: string;
}


/**
 * Muted screen recording that only loads near the viewport and only plays
 * while visible. With reduced motion, it doesn't autoplay and shows controls.
 */
export const Video: React.FC<VideoProps> = ({ src, alt, className = "" }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      video.controls = true;
      video.preload = "metadata";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.15 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={posterOf(src)}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
      className={`block w-full h-full object-cover bg-ink ${className}`}
    />
  );
};
