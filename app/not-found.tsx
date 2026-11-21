import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="min-h-svh bg-bg flex items-center px-5 pt-16">
      <div className="max-w-290 w-full mx-auto">
        <p className="text-sm text-dim">
          <span className="text-accent-deep">$</span> cd {"<this page>"}
        </p>
        <p className="mt-2 text-sm text-muted">
          bash: cd: no such file or directory
        </p>
        <h1 className="mt-8 text-[clamp(80px,20vw,180px)] font-semibold tracking-tighter leading-none text-accent-deep">
          404
        </h1>
        <p className="mt-4 max-w-[48ch] text-muted">
          This page doesn&apos;t exist, or it moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center mt-8 min-h-11 px-5 rounded-md bg-accent text-on-accent text-sm font-medium transition-colors hover:bg-accent-deep hover:text-white"
        >
          cd ~ (home)
        </Link>
      </div>
    </main>
  );
}
