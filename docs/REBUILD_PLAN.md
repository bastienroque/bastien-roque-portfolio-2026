# Portfolio 2026 — Rebuild Plan

_Drafted 2026-11-08 from the planning interview._

## Progress

- [x] **Phase 1, foundations.** Server-rendered sections with client islands; `ModeProvider` (arrival chooser, `?mode=` links, remembered choice) and `JamProvider` (mix, transport, keys); one token system in `globals.css`; dead code and the old `data/` removed.
- [x] **Phase 2, real content.** 4 real projects in `lib/data/projects.ts`; static `/projects/[slug]` pages with metadata, Side A/B and video tracklist.
- [x] **Jam engine.** It was missing entirely: lookahead `Scheduler`, instruments for every sequencer event, 3 missing bands added (5 total).
- [x] **Polish, round 1.** Poster frames for all 36 videos; band chips flash as members play; nav highlights the current section; sitemap, robots, per-page canonical/OG, Person JSON-LD (`NEXT_PUBLIC_SITE_URL` sets the domain).
- [x] **Content & brand.** Email set; History section removed; palette moved to the favicon green (#1dd37b / ink #02180e); logo image used in the top bar and arrival screen.
- [ ] Phase 3/4 polish, then Phase 5 (domain → `metadataBase`, OG images, Lighthouse, deploy).

## Decisions so far

| Topic | Decision |
|---|---|
| Direction | Finish the **music / drum-themed** version already in progress |
| Audience | Mixed: recruiters, clients, peers |
| Music theme | Personal (Bastien drums) and **central** to the concept |
| Modes | **Two modes**: _Quick view_ (readable portfolio) and _Jam mode_ (interactive) |
| Arrival | Visitor **chooses on arrival**: "Quick look or jam session?" |
| Sound | **Silent by default**, explicit opt-in button |
| Mobile | Full jam mode with **touch drum pads** |
| Projects | The **4 real projects** (CDF, Attestation Express, Qui le demande, Random FM) |
| Project pages | Keep **detail pages** at `/projects/[slug]` |
| History | **Removed** (decided 2026-11-08) |
| Your music | A short mention in About; no recordings |
| SEO / perf | **Do it properly**: server-rendered content, client-only audio "islands" |
| Timeline | 1–2 months |
| Git | Leave the working tree as is for now (see risk note below) |

## Current state (what I found)

- `app/page.tsx` is one big `"use client"` component that owns all audio and UI state, so nothing is server-rendered.
- The new sections use **placeholder content**: fake projects (Loopback, Tuneable, Soundcheck) in `lib/data/projects.ts` and fake jobs in `lib/data/history.ts`.
- The real project content is in `data/projects-pages.ts` (4 projects), with its media in `public/projects/*`. **Nothing imports `data/` anymore**, so it's orphaned but intact.
- `tailwind.config.ts` isn't wired into Tailwind v4 (`globals.css` has no `@config`), so it's probably dead code.
- The audio engine in `lib/audio/*` (context, sequencer, instruments, generator) is fairly self-contained, which is good for isolating it.

## Proposed information architecture

```
/                 Arrival chooser → Quick view | Jam mode  (choice remembered)
  Quick view:     Hero · About (incl. drumming) · Stack · Work · Contact
  Jam mode:       Same content, plus transport bar, drum pads, BPM/meter, bands playing
/projects/[slug]  Real project detail pages (server-rendered)
```

Mapping to today's sections (to confirm):

- **Hero**: keep.
- **Groove** (bands = tech stack): becomes **Stack**. It reads as a list in Quick view and as playable bands in Jam mode.
- **Logic** (velocity, routing, meters… as dev metaphors): moves into **Jam mode only**, as captions for the controls.
- **Work**: keep, with real projects.
- **History**: removed.
- **Book**: becomes **Contact** (copy email and links).
- **New: About**: short bio plus the drumming mention.

## Phases

1. **Foundations**
   - Split `app/page.tsx` into server-rendered sections plus a client `JamProvider` that holds the audio state.
   - Add mode state (`quick` | `jam`) and the arrival chooser, remembered in localStorage with a URL override (`?mode=jam`).
   - Delete dead code (`tailwind.config.ts` if confirmed unused) and merge `data/` into `lib/data/`.
2. **Real content**
   - Migrate the 4 projects from `data/projects-pages.ts` into the new types, and rebuild `/projects/[slug]` with their media.
   - Replace the placeholder history and write the About copy.
3. **Quick view**: a polished, fast, accessible reading experience. This is what recruiters see.
4. **Jam mode**: wire up the transport, pads, keyboard (A S D F G), touch pads on mobile, and canvas visuals. Add the opt-in sound button.
5. **Polish and ship**: metadata/OG per page, `prefers-reduced-motion`, keyboard and a11y checks, Lighthouse pass, then deploy.

## Open questions (next interview round)

- Are the 4 projects all worth keeping? Is there a hero project?
- Hosting: Vercel? Domain?
- Visual identity: keep the current palette and fonts, or rethink them?
- Contact: email only, or also GitHub, LinkedIn, CV PDF?
- Languages: English only, or EN/PT/FR?

## Risk note

About 28 files of uncommitted work sit on `main`, including deletions of the old site. One bad command or file overwrite could lose it. I'd suggest a checkpoint commit on a branch before Phase 1 starts.
