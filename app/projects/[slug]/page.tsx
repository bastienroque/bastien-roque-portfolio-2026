import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/lib/data/projects";
import { Video } from "@/components/ui/Video";
import { posterOf } from "@/lib/media";
import { Eyebrow } from "@/components/ui/Section";
import { buttonClass } from "@/components/ui/Button";
import { RecordSides } from "./RecordSides";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const path = `/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: path },
    openGraph: {
      title: project.title,
      description: project.tagline,
      url: path,
      images: [{ url: posterOf(project.cover.src), alt: project.cover.alt }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = PROJECTS.indexOf(project);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const track = (n: number) => String(n).padStart(2, "0");

  return (
    <main id="main" className="px-5 pt-28 pb-24">
      <div className="max-w-290 mx-auto">
        <Link href="/#work" className="font-mono text-xs uppercase tracking-[0.08em] text-muted hover:text-fg">
          ← All projects
        </Link>

        <header className="mt-8 grid lg:grid-cols-[3fr_2fr] gap-10 items-end">
          <div>
            <Eyebrow>
              Track {track(index + 1)} · {project.kind} · {project.year}
            </Eyebrow>
            <h1 className="mt-3 text-[clamp(40px,8vw,88px)] font-bold tracking-tight leading-[0.95] text-balance">
              {project.title}
            </h1>
            <p className="mt-5 text-[clamp(18px,2.4vw,22px)] text-muted max-w-[44ch]">{project.tagline}</p>
            <div className="flex flex-wrap gap-3 mt-7">
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className={buttonClass("solid")}>
                Live site ↗
              </a>
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className={buttonClass("ghost")}>
                Source ↗
              </a>
            </div>
          </div>

          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-line pt-4 text-[15px]">
            {[{ label: "Role", value: project.role }, ...project.facts].map((f) => (
              <React.Fragment key={f.label}>
                <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted pt-1">{f.label}</dt>
                <dd>{f.value}</dd>
              </React.Fragment>
            ))}
          </dl>
        </header>

        <figure
          className="mt-12 aspect-16/10 rounded-card overflow-hidden shadow-card"
          style={{ backgroundColor: project.color }}
        >
          <Video {...project.cover} />
        </figure>

        <RecordSides
          story={
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Context</h2>
                <p className="mt-3 text-muted leading-relaxed">{project.context}</p>
              </div>
              {project.challenges && (
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">Challenges</h2>
                  <p className="mt-3 text-muted leading-relaxed">{project.challenges}</p>
                </div>
              )}
            </div>
          }
          build={
            <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))]">
              {project.stack.map((g) => (
                <div key={g.group} className="bg-surface border border-line rounded-card p-6">
                  <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{g.group}</h2>
                  <dl className="mt-4 flex flex-col gap-2.5">
                    {g.items.map((i) => (
                      <div key={i.label} className="flex justify-between gap-4 border-b border-line pb-2.5 last:border-0">
                        <dt className="text-muted text-sm">{i.label}</dt>
                        <dd className="text-sm font-medium text-right">{i.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          }
        />

        {project.media.length > 0 && (
          <section className="mt-20" aria-labelledby="tracklist">
            <Eyebrow>Tracklist</Eyebrow>
            <h2 id="tracklist" className="mt-3 text-[clamp(28px,5vw,48px)] font-semibold tracking-tight">
              Features in motion
            </h2>
            <div className="grid gap-6 mt-8 md:grid-cols-2">
              {project.media.map((m, i) => (
                <figure key={m.src} className="flex flex-col gap-3">
                  <div
                    className="aspect-16/10 rounded-card overflow-hidden border border-line"
                    style={{ backgroundColor: project.color }}
                  >
                    <Video {...m} />
                  </div>
                  <figcaption className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-muted">{track(i + 1)}</span>
                    <span className="font-medium">{m.title}</span>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-muted ml-auto">{m.tag}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <nav aria-label="Next project" className="mt-24 pt-8 border-t border-line">
          <Eyebrow>Next track</Eyebrow>
          <Link
            href={`/projects/${next.slug}`}
            className="mt-2 inline-block text-[clamp(32px,6vw,64px)] font-semibold tracking-tight hover:text-accent-fg transition-colors"
          >
            {next.title} →
          </Link>
        </nav>
      </div>
    </main>
  );
}
