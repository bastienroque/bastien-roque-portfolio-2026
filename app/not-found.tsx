import Link from "next/link";

export default function NotFound() {
  return (
    <main className="stage min-h-svh flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="relative z-10 max-w-lg flex flex-col items-center gap-6">
        <span className="font-mono text-xs uppercase tracking-[0.08em] border border-paper-line rounded-full px-4 py-1.5 text-paper-muted">
          404 · Out of time
        </span>
        <h1 className="text-[clamp(100px,25vw,220px)] font-bold tracking-tight leading-none bg-linear-to-br from-accent via-paper to-accent-soft bg-clip-text text-transparent select-none">
          404
        </h1>
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Dropped the beat.</h2>
          <p className="mt-2 text-paper-muted leading-relaxed">
            The page you&apos;re looking for skipped a bar, or doesn&apos;t exist in this arrangement.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center min-h-12 px-8 rounded-full bg-paper text-ink font-medium text-[15px] transition hover:-translate-y-0.5"
        >
          ← Back to the top
        </Link>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[11px] text-paper-muted tracking-[0.08em] uppercase">
        Bar 00 · Beat 0 · Rest
      </div>
    </main>
  );
}
