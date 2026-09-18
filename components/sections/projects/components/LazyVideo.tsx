"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

export default function LazyVideo({ src, poster, className }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isInView && !prefersReducedMotion) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [isInView]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      loop
      muted
      playsInline
      preload="none"
      className={className}
    >
      {isInView && <source src={src} type="video/mp4" />}
    </video>
  );
}
