"use client";

import React, { useEffect, useRef } from "react";
import { DRUM_COLORS } from "@/lib/audio/instruments";
import { addRing, setRingHandler } from "@/lib/audio/visuals";
import { useMode } from "../providers/ModeProvider";
import { useJam } from "../providers/JamProvider";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  k: number;
}

interface Ring {
  x: number;
  y: number;
  r: number;
  a: number;
  s: number;
  c: string;
}

/**
 * The BR logo drawn with particles. The pointer pushes them around, and every
 * drum hit sends a ripple through them. In jam mode, tapping the logo plays
 * kick (left half) or snare (right half).
 */
export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -999, y: -999 });
  const { mode } = useMode();
  const { fireHit } = useJam();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let W = 0;
    let H = 0;
    let mask: [number, number][] = [];
    let P: Particle[] = [];
    let rings: Ring[] = [];
    let box = { x: 0, y: 0, w: 0, h: 0 };
    let raf = 0;

    const layout = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const ratio = 74 / 135;
      if (W >= 900) {
        // Wide: logo on the right half, clear of the headline on the left.
        const w = Math.min(W * 0.42, 680, (H - 160) / ratio);
        const h = w * ratio;
        box = { x: W - w - Math.max(32, W * 0.05), y: Math.max(90, (H - h) / 2 - 20), w, h };
      } else {
        // Narrow: logo in the space above the text block.
        const top = 76;
        const avail = Math.max(110, H - top - 400);
        const w = Math.min(W * 0.9, avail * 0.92 / ratio);
        const h = w * ratio;
        box = { x: (W - w) / 2, y: top + (avail - h) / 2, w, h };
      }

      P = mask.map(([u, v]) => {
        const tx = box.x + u * box.w;
        const ty = box.y + v * box.h;
        return reduced
          ? { x: tx, y: ty, vx: 0, vy: 0, tx, ty, k: u }
          : { x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, tx, ty, k: u };
      });
    };

    setRingHandler((i, v, x, y) => {
      // Without coordinates, each drum ripples from its own spot across the logo.
      const px = x ?? box.x + box.w * (0.12 + (i % 5) * 0.19);
      const py = y ?? box.y + box.h * 0.55;
      rings.push({ x: px, y: py, r: 8, a: 0.3 + v * 0.6, s: 5 + v * 9, c: DRUM_COLORS[i % 5] });
      if (reduced) return;
      for (const p of P) {
        const dx = p.x - px;
        const dy = p.y - py;
        const d = Math.hypot(dx, dy) || 1;
        const f = v * 7 * Math.exp(-d / 190);
        p.vx += (dx / d) * f;
        p.vy += (dy / d) * f;
      }
    });

    const img = new Image();
    img.src = "/br-logo-mask.png";
    img.onload = () => {
      const ow = 270;
      const oh = 148;
      const off = document.createElement("canvas");
      off.width = ow;
      off.height = oh;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.drawImage(img, 0, 0, ow, oh);
      const data = octx.getImageData(0, 0, ow, oh).data;
      const step = canvas.clientWidth < 700 ? 4 : 3;
      mask = [];
      for (let j = 0; j < oh; j += step)
        for (let i = 0; i < ow; i += step)
          if (data[(j * ow + i) * 4 + 3] > 110) mask.push([i / ow, j / oh]);
      layout();
    };

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = pointer.current;

      for (const p of P) {
        p.vx += (p.tx - p.x) * 0.055;
        p.vy += (p.ty - p.y) * 0.055;
        const mdx = p.x - mx;
        const mdy = p.y - my;
        const md = mdx * mdx + mdy * mdy;
        if (!reduced && md < 14400) {
          const f = (1 - md / 14400) * 3.2;
          const d = Math.sqrt(md) || 1;
          p.vx += (mdx / d) * f;
          p.vy += (mdy / d) * f;
        }
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;

        // Colour runs deep green → brand green across the logo, and turns
        // mint as particles move fast.
        const k = p.k;
        const s = Math.min(1, Math.hypot(p.vx, p.vy) * 0.18) * 0.75;
        const base = [22 + 7 * k, 164 + 47 * k, 96 + 27 * k];
        const [r, g, b] = base.map((c, j) => Math.round(c + ([182, 247, 212][j] - c) * s));
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(p.x, p.y, 2.8, 2.8);
      }

      ctx.lineWidth = 2;
      rings = rings.filter((r) => r.a > 0.02);
      for (const r of rings) {
        r.r += r.s;
        r.a *= 0.93;
        ctx.globalAlpha = r.a;
        ctx.strokeStyle = r.c;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };

    layout();
    render();
    window.addEventListener("resize", layout);
    return () => {
      window.removeEventListener("resize", layout);
      cancelAnimationFrame(raf);
      setRingHandler(null);
    };
  }, []);

  const local = (e: React.PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top, w: r.width };
  };

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      onPointerMove={(e) => {
        if (e.pointerType === "mouse") pointer.current = local(e);
      }}
      onPointerLeave={() => (pointer.current = { x: -999, y: -999 })}
      onPointerDown={(e) => {
        const { x, y, w } = local(e);
        const zone = x < w / 2 ? 0 : 1;
        if (mode === "jam") fireHit(zone, 0.85, x, y);
        else addRing(zone, 0.6, x, y);
      }}
      className="absolute inset-0 w-full h-full touch-pan-y z-0"
    />
  );
};
