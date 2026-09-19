"use client";

import { LazyVideoProps } from "@/types";
import { useEffect, useRef, useState } from "react";

export default function LazyVideo({
  desktopSrc,
  mobileSrc,
  posterDesktopSrc,
  posterMobileSrc,
  className,
  alt,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

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
      aria-label={alt}
      poster={isMobile ? posterMobileSrc : posterDesktopSrc}
      loop
      muted
      playsInline
      preload="none"
      className={className}
    >
      {isInView && (
        <>
          <source src={mobileSrc} media="(max-width: 767px)" type="video/mp4" />
          <source src={desktopSrc} type="video/mp4" />
        </>
      )}
    </video>
  );
}
