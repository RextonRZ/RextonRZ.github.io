# Projects Section — Cloud + LED Screen Design

**Date:** 2026-05-26
**Scope:** Redesign the `#projects` section of the portfolio homepage. Hero / About / Education / Experience sections are NOT changed.

## Concept

Projects are "stored in the cloud." Each project is a glassmorphism card perched on a fluffy cloud, scattered naturally across the sky. Tapping a card expands it in place to reveal a modern slim monitor playing the project's demo video/GIF, alongside the project description, tech stack, and action links.

## Visual System (reuse, don't reinvent)

- **Background:** Reuse the site-wide `BackgroundElements` component (clouds in light mode, stars in dark mode). No new background layer.
- **Tokens:** Use existing CSS vars from `globals.css` (`--card-bg`, `--card-border`, `--shadow`, `--accent`, `--text-main`, `--text-muted`).
- **Font:** Inherited Outfit from `globals.css`.

## Section Layout

- Heading "Projects" stays where it is (already present in `page.tsx`).
- Below the heading: a relatively-positioned container, height ≈ 1100–1300px (enough to fit ~6 cards at natural positions without overlap on desktop).
- Inside, 6 placeholder project cards are absolutely positioned at hand-tuned `top`/`left` percentages — varied heights, varied horizontal offsets, no grid. Positions stored as data so they're easy to tweak.
- Each card has its own cloud (light mode) or glow halo (dark mode) underneath it.
- On screens < 768px, layout collapses to a single vertical column (cards stacked, still with clouds beneath each).

## Card States

### Collapsed Card

- Size: ~280 × 140 px on desktop.
- Glassmorphism: `background: var(--card-bg)`, `backdrop-filter: blur(10px)`, `border: 1px solid var(--card-border)`, `border-radius: 16px`, `box-shadow: var(--shadow)`.
- Gentle floating animation: `translateY` oscillates ±6px over 4–6s, per-card phase offset so they don't sync.
- Content (top → bottom):
  - Year in top-right corner (e.g. "2025"), small + muted.
  - Project title (bold, ~1.1rem).
  - Tagline, one line, truncated with ellipsis (~0.85rem, muted).
  - Tech-stack tags row: 2–4 colored pills (e.g. `React` blue, `Python` purple, `TypeScript` yellow). Tag color palette defined once in code keyed by tech name.
- Cursor pointer; on hover: lift slightly (`translateY -4px`), shadow deepens.
- Cloud beneath card (light mode only): `<CloudSvg>` positioned ~30–40px below card center, larger than card width, with slight blur. In dark mode, replace with a soft radial glow.

### Expanded Card

- Trigger: click anywhere on the collapsed card.
- Same card grows in place to ~560 × 480 px (desktop) via CSS transition (transform/width/height, ~350ms ease-out).
- Other cards: `opacity: 0.35`, `pointer-events: none`, scale down to 0.95.
- Expanded card content (top → bottom):
  1. **Close button** (✕) top-right.
  2. **LED Screen** — modern slim monitor:
     - Outer bezel: `linear-gradient(180deg, #1a1a1a, #0a0a0a)`, `border-radius: 14px`, padding ~6px.
     - Inner screen: 16:9 aspect, `background: #000`, contains autoplaying muted looping `<video>` (or `<img>` for GIF).
     - Three traffic-light dots (red/amber/green) top-left of bezel.
     - Stand strip below bezel (small dark bar).
  3. **Project title** (larger, ~1.5rem).
  4. **Description** paragraph (2–3 sentences, `--text-muted`).
  5. **Full tech-stack tag list** (more than the collapsed view shows).
  6. **Action row:** "GitHub" button (outline) + "Live Demo" button (filled, `--accent`). Buttons hide individually if URL absent.
- Click outside the expanded card or the ✕ button → collapses back. ESC also closes.
- Only one card may be expanded at a time. Clicking another collapsed card while one is open: close current, then open the new one (sequential, ~150ms gap).

## Data Shape

A single `projects` array in `ProjectsSection.tsx`:

```ts
type Project = {
  id: string;
  title: string;
  tagline: string;
  year: string;
  tags: string[];           // collapsed view (truncated to first 3-4)
  fullTags: string[];       // expanded view
  description: string;
  mediaSrc: string;         // /demo-alpha.mp4 or /demo-alpha.gif
  mediaType: "video" | "gif";
  githubUrl?: string;
  demoUrl?: string;
  position: { top: string; left: string };  // e.g. { top: "5%", left: "10%" }
};
```

Six placeholder entries with dummy content, dummy positions, and placeholder media (gray boxes or a single shared placeholder video) ship initially. Real content swaps in later.

## Animations

- **Card float:** keyframe animation `cardFloat` with translateY between -6px and +6px, duration 4–6s per card, `animation-delay` staggered.
- **Cloud drift (light mode):** reuses existing `clouds-layer` from `BackgroundElements`. Per-card cloud underneath is static.
- **Expand:** CSS transition on `width`, `height`, `transform`, `border-radius` ~350ms `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Other cards dim:** `transition: opacity 300ms, transform 300ms`.
- **LED screen "power on":** when expanded, screen fades from black → video plays, ~200ms delay after expand starts.
- `prefers-reduced-motion`: disable floating + cloud drift; keep expand/collapse but reduce duration to 150ms.

## File Plan

- **NEW** `src/components/ProjectsSection.tsx` — client component holding all logic, data, and JSX.
- **NEW** `src/components/ProjectsSection.css` — section-scoped styles (cards, clouds-under-card, LED screen, animations, tag colors).
- **MODIFY** `src/app/page.tsx` — replace the empty `<section id="projects">...</section>` (lines 206–208) with `<ProjectsSection />`. Import added at top.
- **NO CHANGES** to `globals.css`, `BackgroundElements`, hero, about, education, experience sections.

## Accessibility

- Card is a `<button>` (or `<div role="button" tabIndex={0}>`) — keyboard activatable with Enter/Space.
- Expanded view: `role="dialog"`, `aria-modal="true"` semantics; focus moves to close button on open and back to the card on close.
- ESC closes expanded view.
- LED screen video has `aria-label` matching project title; tech tags have visible text (no icon-only).

## Out of Scope

- Real project content & media (placeholders only).
- Reusing this component on other pages.
- Filter / search / sort controls.
- Project detail routes (`/projects/[id]`).
- Touch-drag interactions (clouds don't move on drag).

## Acceptance Criteria

1. Section renders 6 placeholder cards perched on clouds at varied positions.
2. Cards float gently and out of sync.
3. Light mode shows clouds under cards; dark mode shows glow halos instead and reveals starfield.
4. Clicking a card expands it in place; other cards dim.
5. Expanded view shows monitor with looping placeholder media, title, description, full tags, GitHub & demo buttons.
6. ✕, outside-click, and ESC all collapse the expanded card.
7. Mobile (<768px): cards stack vertically; expand still works full-width.
8. `prefers-reduced-motion` disables floating animations.
9. Hero / About / Education / Experience sections are visually unchanged.
