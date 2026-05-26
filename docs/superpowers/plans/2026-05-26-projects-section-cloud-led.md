# Projects Section (Cloud + LED) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a projects section where 6 placeholder project cards perch on clouds in a natural, scattered layout. Tapping a card expands it in place to reveal a modern slim monitor playing a demo video/GIF, alongside description, full tech stack, and GitHub/demo links.

**Architecture:** A single new client component `ProjectsSection` renders the heading and an absolutely-positioned canvas of cards driven by a `projects` data array. Each card manages collapsed/expanded state via parent-level `expandedId` so only one card is open at a time. Existing `BackgroundElements` provides the sky/clouds/stars — no background work in this section. All styles live in a sibling `.css` file; no changes to `globals.css`.

**Tech Stack:** Next.js 16 (App Router, client components with `"use client"`), React 19, plain CSS modules-by-import, existing CSS variables (`--card-bg`, `--accent`, etc.) from `globals.css`.

**Note on testing:** This project has no test runner (no jest/vitest/playwright in `package.json`). Verification per task uses `npm run lint`, `npm run build` (when meaningful), and `npm run dev` + manual browser inspection. Don't add a test framework.

**Note on Next.js 16:** Per `AGENTS.md`, read `node_modules/next/dist/docs/` before introducing new Next.js patterns. The component is a plain `"use client"` component — no new Next-specific APIs needed.

---

### Task 1: Create empty ProjectsSection component + wire into page

**Files:**
- Create: `src/components/ProjectsSection.tsx`
- Create: `src/components/ProjectsSection.css`
- Modify: `src/app/page.tsx` (replace lines 206–208)

- [ ] **Step 1: Create the empty component file**

Write `src/components/ProjectsSection.tsx`:

```tsx
"use client";

import "./ProjectsSection.css";

export function ProjectsSection() {
  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-heading">Projects</h2>
      <div className="projects-canvas" />
    </section>
  );
}
```

- [ ] **Step 2: Create the empty CSS file**

Write `src/components/ProjectsSection.css`:

```css
.projects-section {
  position: relative;
  padding: 4rem 0 6rem;
}

.projects-heading {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-main);
}

.projects-canvas {
  position: relative;
  width: 100%;
  min-height: 1200px;
}

@media (max-width: 768px) {
  .projects-canvas {
    min-height: auto;
  }
}
```

- [ ] **Step 3: Wire into `page.tsx`**

In `src/app/page.tsx`, add the import after the existing `ExperienceSection` import (line 6):

```tsx
import { ProjectsSection } from "@/components/ProjectsSection";
```

Then replace lines 206–208:

```tsx
{/* Projects Section */}
<section id="projects" className="projects-section">
  <h2 className="projects-heading">Projects</h2>
</section>
```

with:

```tsx
{/* Projects Section */}
<ProjectsSection />
```

- [ ] **Step 4: Verify build + lint**

Run: `npm run lint`
Expected: no errors related to new files.

Run: `npm run dev`, open http://localhost:3000, scroll to the projects section.
Expected: "Projects" heading renders, empty canvas below it, no console errors. Hero/About/Education/Experience unchanged.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectsSection.tsx src/components/ProjectsSection.css src/app/page.tsx
git commit -m "feat(projects): scaffold ProjectsSection component"
```

---

### Task 2: Add project data + types

**Files:**
- Modify: `src/components/ProjectsSection.tsx`

- [ ] **Step 1: Add `Project` type and placeholder data**

At the top of `src/components/ProjectsSection.tsx`, below the `"use client"` and `import` lines, add:

```tsx
type Project = {
  id: string;
  title: string;
  tagline: string;
  year: string;
  tags: string[];
  fullTags: string[];
  description: string;
  mediaSrc: string;
  mediaType: "video" | "gif" | "placeholder";
  githubUrl?: string;
  demoUrl?: string;
  position: { top: string; left: string };
};

const PROJECTS: Project[] = [
  {
    id: "alpha",
    title: "Project Alpha",
    tagline: "AI-powered code reviewer",
    year: "2025",
    tags: ["React", "TypeScript", "Python"],
    fullTags: ["React", "TypeScript", "Python", "FastAPI", "OpenAI"],
    description: "Placeholder description. Replace later with real content. Two to three sentences about what the project does and why it exists.",
    mediaSrc: "",
    mediaType: "placeholder",
    githubUrl: "https://github.com/RextonRZ",
    demoUrl: "https://example.com",
    position: { top: "2%", left: "8%" },
  },
  {
    id: "beta",
    title: "Project Beta",
    tagline: "Real-time analytics dashboard",
    year: "2025",
    tags: ["Next.js", "TypeScript"],
    fullTags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind"],
    description: "Placeholder description for Beta. Replace later.",
    mediaSrc: "",
    mediaType: "placeholder",
    githubUrl: "https://github.com/RextonRZ",
    position: { top: "10%", left: "58%" },
  },
  {
    id: "gamma",
    title: "Project Gamma",
    tagline: "Computer vision pipeline",
    year: "2024",
    tags: ["Python", "PyTorch"],
    fullTags: ["Python", "PyTorch", "OpenCV", "Docker"],
    description: "Placeholder description for Gamma. Replace later.",
    mediaSrc: "",
    mediaType: "placeholder",
    position: { top: "28%", left: "30%" },
  },
  {
    id: "delta",
    title: "Project Delta",
    tagline: "Mobile-first chat app",
    year: "2024",
    tags: ["React Native", "Firebase"],
    fullTags: ["React Native", "Firebase", "TypeScript"],
    description: "Placeholder description for Delta. Replace later.",
    mediaSrc: "",
    mediaType: "placeholder",
    demoUrl: "https://example.com",
    position: { top: "44%", left: "65%" },
  },
  {
    id: "epsilon",
    title: "Project Epsilon",
    tagline: "Distributed task scheduler",
    year: "2023",
    tags: ["Go", "Redis"],
    fullTags: ["Go", "Redis", "Kubernetes", "gRPC"],
    description: "Placeholder description for Epsilon. Replace later.",
    mediaSrc: "",
    mediaType: "placeholder",
    githubUrl: "https://github.com/RextonRZ",
    position: { top: "60%", left: "12%" },
  },
  {
    id: "zeta",
    title: "Project Zeta",
    tagline: "Static site generator",
    year: "2023",
    tags: ["Rust", "WASM"],
    fullTags: ["Rust", "WASM", "TypeScript"],
    description: "Placeholder description for Zeta. Replace later.",
    mediaSrc: "",
    mediaType: "placeholder",
    githubUrl: "https://github.com/RextonRZ",
    position: { top: "76%", left: "48%" },
  },
];

const TAG_COLORS: Record<string, { bg: string; fg: string }> = {
  React:         { bg: "#dbeafe", fg: "#1e40af" },
  "Next.js":     { bg: "#dcfce7", fg: "#166534" },
  TypeScript:    { bg: "#fef3c7", fg: "#92400e" },
  Python:        { bg: "#ede9fe", fg: "#6d28d9" },
  PyTorch:       { bg: "#fee2e2", fg: "#991b1b" },
  Go:            { bg: "#cffafe", fg: "#155e75" },
  Rust:          { bg: "#ffedd5", fg: "#9a3412" },
  WASM:          { bg: "#f3e8ff", fg: "#6b21a8" },
  Redis:         { bg: "#fee2e2", fg: "#991b1b" },
  Firebase:      { bg: "#fff7ed", fg: "#9a3412" },
  "React Native":{ bg: "#cffafe", fg: "#155e75" },
  FastAPI:       { bg: "#dcfce7", fg: "#065f46" },
  OpenAI:        { bg: "#f1f5f9", fg: "#0f172a" },
  PostgreSQL:    { bg: "#dbeafe", fg: "#1e3a8a" },
  Prisma:        { bg: "#e0e7ff", fg: "#3730a3" },
  Tailwind:      { bg: "#cffafe", fg: "#0e7490" },
  OpenCV:        { bg: "#fef3c7", fg: "#78350f" },
  Docker:        { bg: "#dbeafe", fg: "#1d4ed8" },
  Kubernetes:    { bg: "#dbeafe", fg: "#1d4ed8" },
  gRPC:          { bg: "#e0e7ff", fg: "#3730a3" },
};

function tagStyle(tag: string): React.CSSProperties {
  const c = TAG_COLORS[tag] ?? { bg: "#e5e7eb", fg: "#374151" };
  return { background: c.bg, color: c.fg };
}
```

- [ ] **Step 2: Verify lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectsSection.tsx
git commit -m "feat(projects): add project data + tag color palette"
```

---

### Task 3: Render collapsed cards on the canvas

**Files:**
- Modify: `src/components/ProjectsSection.tsx`
- Modify: `src/components/ProjectsSection.css`

- [ ] **Step 1: Render cards in the component**

In `src/components/ProjectsSection.tsx`, replace the `ProjectsSection` export with:

```tsx
export function ProjectsSection() {
  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-heading">Projects</h2>
      <div className="projects-canvas">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className="project-card"
            style={{
              top: p.position.top,
              left: p.position.left,
              animationDelay: `${(i * 0.7) % 3}s`,
            }}
          >
            <span className="project-year">{p.year}</span>
            <h3 className="project-title">{p.title}</h3>
            <p className="project-tagline">{p.tagline}</p>
            <div className="project-tags">
              {p.tags.map((tag) => (
                <span key={tag} className="project-tag" style={tagStyle(tag)}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add card CSS**

Append to `src/components/ProjectsSection.css`:

```css
.project-card {
  position: absolute;
  width: 280px;
  min-height: 140px;
  padding: 1rem 1.1rem;
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: transform 250ms ease, box-shadow 250ms ease;
  animation: card-float 5s ease-in-out infinite;
  z-index: 2;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(30, 64, 175, 0.18);
}

.project-year {
  position: absolute;
  top: 0.6rem;
  right: 0.9rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  opacity: 0.7;
}

.project-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 0.25rem;
}

.project-tagline {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0 0 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.project-tag {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
}

@keyframes card-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}

@media (prefers-reduced-motion: reduce) {
  .project-card { animation: none; }
}

@media (max-width: 768px) {
  .project-card {
    position: static;
    width: 100%;
    max-width: 360px;
    margin: 0 auto 1.5rem;
    animation: none;
  }
}
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`, scroll to projects.
Expected: 6 cards scattered at varied positions, gently floating, with title/year/tagline/tags rendered. Hover lifts card.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectsSection.tsx src/components/ProjectsSection.css
git commit -m "feat(projects): render collapsed cards with float animation"
```

---

### Task 4: Add cloud (light mode) / glow halo (dark mode) under each card

**Files:**
- Modify: `src/components/ProjectsSection.tsx`
- Modify: `src/components/ProjectsSection.css`

- [ ] **Step 1: Add a `CardCloud` SVG helper inside `ProjectsSection.tsx`**

Add this function just above the `ProjectsSection` export:

```tsx
function CardCloud() {
  return (
    <svg
      className="project-card-cloud"
      width="320"
      height="120"
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M72.5 35C72.5 43.2843 65.7843 50 57.5 50H25C13.9543 50 5 41.0457 5 30C5 18.9543 13.9543 10 25 10C27.0543 10 29.0357 10.3106 30.8936 10.8798C33.7225 4.67384 40.0638 0 47.5 0C58.5457 0 67.5 8.95431 67.5 20C67.5 20.3013 67.4933 20.6011 67.4801 20.8992C70.3644 21.6702 72.5 24.3313 72.5 27.5C72.5 28.0535 72.4172 28.5878 72.2647 29.0963C76.0121 29.8398 78.8333 33.1099 78.8333 37.0833C78.8333 41.4556 75.289 45 70.9167 45H65V35H72.5Z"
        fill="white"
      />
      <circle cx="55" cy="30" r="20" fill="white" />
      <circle cx="35" cy="35" r="15" fill="white" />
    </svg>
  );
}
```

- [ ] **Step 2: Render cloud + halo wrapper around each card**

Replace each card's outer markup in `PROJECTS.map(...)` so the card sits inside a wrapper that also holds the cloud:

```tsx
{PROJECTS.map((p, i) => (
  <div
    key={p.id}
    className="project-slot"
    style={{
      top: p.position.top,
      left: p.position.left,
    }}
  >
    <div className="project-platform">
      <CardCloud />
      <div className="project-halo" aria-hidden="true" />
    </div>
    <div
      className="project-card"
      style={{ animationDelay: `${(i * 0.7) % 3}s` }}
    >
      <span className="project-year">{p.year}</span>
      <h3 className="project-title">{p.title}</h3>
      <p className="project-tagline">{p.tagline}</p>
      <div className="project-tags">
        {p.tags.map((tag) => (
          <span key={tag} className="project-tag" style={tagStyle(tag)}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
))}
```

- [ ] **Step 3: Update CSS — remove `top`/`left` from `.project-card`, move to `.project-slot`; add cloud + halo styles**

In `src/components/ProjectsSection.css`, replace the existing `.project-card` rule block with:

```css
.project-slot {
  position: absolute;
  width: 280px;
}

.project-platform {
  position: absolute;
  left: 50%;
  bottom: -50px;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 1;
}

.project-card-cloud {
  display: block;
  filter: drop-shadow(0 8px 16px rgba(30, 64, 175, 0.12));
}

.project-halo {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.35) 0%, rgba(139, 92, 246, 0) 70%);
  filter: blur(8px);
  display: none;
}

[data-theme='dark'] .project-card-cloud { display: none; }
[data-theme='dark'] .project-halo       { display: block; }

.project-card {
  position: relative;
  width: 280px;
  min-height: 140px;
  padding: 1rem 1.1rem;
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: transform 250ms ease, box-shadow 250ms ease;
  animation: card-float 5s ease-in-out infinite;
  z-index: 2;
}
```

And update the mobile fallback to apply to `.project-slot`:

```css
@media (max-width: 768px) {
  .project-slot {
    position: static;
    width: 100%;
    max-width: 360px;
    margin: 0 auto 4rem;
  }
  .project-card { animation: none; width: 100%; }
  .project-platform { bottom: -40px; }
}
```

- [ ] **Step 4: Verify in browser**

Run: `npm run dev`.
Expected — light mode: a small fluffy white cloud appears just below each card. Dark mode (use site's theme toggle): cloud disappears, soft purple glow appears beneath each card; existing starfield is visible.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectsSection.tsx src/components/ProjectsSection.css
git commit -m "feat(projects): add cloud platforms (light) and glow halos (dark)"
```

---

### Task 5: Expanded-card state + close on outside/ESC

**Files:**
- Modify: `src/components/ProjectsSection.tsx`
- Modify: `src/components/ProjectsSection.css`

- [ ] **Step 1: Add expansion state + handlers**

In `src/components/ProjectsSection.tsx`, add the `useState` / `useEffect` imports and rewrite `ProjectsSection`:

```tsx
"use client";

import { useEffect, useState } from "react";
import "./ProjectsSection.css";
```

Replace the existing `ProjectsSection` export with:

```tsx
export function ProjectsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!expandedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expandedId]);

  const openCard = (id: string) => {
    if (expandedId === id) return;
    if (expandedId) {
      setExpandedId(null);
      setTimeout(() => setExpandedId(id), 160);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-heading">Projects</h2>
      <div
        className={`projects-canvas${expandedId ? " has-expanded" : ""}`}
        onClick={(e) => {
          // Outside-click on the canvas (not on a card) collapses.
          if (e.target === e.currentTarget) setExpandedId(null);
        }}
      >
        {PROJECTS.map((p, i) => {
          const isExpanded = expandedId === p.id;
          return (
            <div
              key={p.id}
              className={`project-slot${isExpanded ? " is-expanded" : ""}${expandedId && !isExpanded ? " is-dimmed" : ""}`}
              style={{
                top: p.position.top,
                left: p.position.left,
              }}
            >
              <div className="project-platform">
                <CardCloud />
                <div className="project-halo" aria-hidden="true" />
              </div>
              <button
                type="button"
                className="project-card"
                style={{ animationDelay: `${(i * 0.7) % 3}s` }}
                onClick={() => openCard(p.id)}
                aria-expanded={isExpanded}
                aria-label={`Open ${p.title}`}
              >
                <span className="project-year">{p.year}</span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-tagline">{p.tagline}</p>
                <div className="project-tags">
                  {p.tags.map((tag) => (
                    <span key={tag} className="project-tag" style={tagStyle(tag)}>
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add CSS for `.is-expanded`, `.is-dimmed`, button reset**

Append to `src/components/ProjectsSection.css`:

```css
.project-card {
  /* override button defaults */
  font: inherit;
  color: inherit;
  text-align: left;
  display: block;
}

.project-slot.is-dimmed {
  opacity: 0.35;
  transform: scale(0.95);
  pointer-events: none;
}

.project-slot {
  transition: opacity 300ms ease, transform 300ms ease;
}

.project-slot.is-expanded {
  z-index: 10;
}

.project-slot.is-expanded .project-card {
  animation: none;
  cursor: default;
  width: 560px;
  min-height: 480px;
  padding: 1.25rem 1.5rem;
}

.project-slot.is-expanded .project-platform {
  opacity: 0;
  transition: opacity 200ms ease;
}

@media (max-width: 768px) {
  .project-slot.is-expanded .project-card {
    width: 100%;
    min-height: 0;
  }
}
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`.
Expected: clicking a card expands it (the inner content stays the same for now — full expanded layout comes next task). Other cards dim and scale down. ESC and clicking the canvas background collapse.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectsSection.tsx src/components/ProjectsSection.css
git commit -m "feat(projects): expand/collapse state with ESC and outside-click"
```

---

### Task 6: Expanded card contents — LED screen, description, full tags, actions, close button

**Files:**
- Modify: `src/components/ProjectsSection.tsx`
- Modify: `src/components/ProjectsSection.css`

- [ ] **Step 1: Render expanded contents conditionally inside the card**

In `src/components/ProjectsSection.tsx`, replace the inner content of the `<button className="project-card" ...>` JSX so it switches based on `isExpanded`. Replace the existing button block:

```tsx
<button
  type="button"
  className="project-card"
  style={{ animationDelay: `${(i * 0.7) % 3}s` }}
  onClick={() => openCard(p.id)}
  aria-expanded={isExpanded}
  aria-label={`Open ${p.title}`}
>
  <span className="project-year">{p.year}</span>
  <h3 className="project-title">{p.title}</h3>
  <p className="project-tagline">{p.tagline}</p>
  <div className="project-tags">
    {p.tags.map((tag) => (
      <span key={tag} className="project-tag" style={tagStyle(tag)}>
        {tag}
      </span>
    ))}
  </div>
</button>
```

with this (note: switches to a `<div role="button">` when expanded so inner buttons aren't nested):

```tsx
{isExpanded ? (
  <div
    className="project-card"
    role="dialog"
    aria-modal="true"
    aria-label={p.title}
    style={{ animationDelay: `${(i * 0.7) % 3}s` }}
    onClick={(e) => e.stopPropagation()}
  >
    <button
      type="button"
      className="project-close"
      aria-label="Close"
      onClick={() => setExpandedId(null)}
    >
      ✕
    </button>

    <div className="project-monitor">
      <div className="project-monitor-dots" aria-hidden="true">
        <span className="dot dot-red" />
        <span className="dot dot-amber" />
        <span className="dot dot-green" />
      </div>
      <div className="project-monitor-screen">
        {p.mediaType === "video" && p.mediaSrc ? (
          <video src={p.mediaSrc} autoPlay muted loop playsInline />
        ) : p.mediaType === "gif" && p.mediaSrc ? (
          <img src={p.mediaSrc} alt={`${p.title} demo`} />
        ) : (
          <div className="project-monitor-placeholder">▶ Demo coming soon</div>
        )}
      </div>
      <div className="project-monitor-stand" aria-hidden="true" />
    </div>

    <h3 className="project-title project-title--lg">{p.title}</h3>
    <p className="project-description">{p.description}</p>

    <div className="project-tags project-tags--full">
      {p.fullTags.map((tag) => (
        <span key={tag} className="project-tag" style={tagStyle(tag)}>
          {tag}
        </span>
      ))}
    </div>

    <div className="project-actions">
      {p.githubUrl && (
        <a
          className="project-action project-action--outline"
          href={p.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      )}
      {p.demoUrl && (
        <a
          className="project-action project-action--solid"
          href={p.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Live Demo
        </a>
      )}
    </div>
  </div>
) : (
  <button
    type="button"
    className="project-card"
    style={{ animationDelay: `${(i * 0.7) % 3}s` }}
    onClick={() => openCard(p.id)}
    aria-expanded={false}
    aria-label={`Open ${p.title}`}
  >
    <span className="project-year">{p.year}</span>
    <h3 className="project-title">{p.title}</h3>
    <p className="project-tagline">{p.tagline}</p>
    <div className="project-tags">
      {p.tags.map((tag) => (
        <span key={tag} className="project-tag" style={tagStyle(tag)}>
          {tag}
        </span>
      ))}
    </div>
  </button>
)}
```

- [ ] **Step 2: Add expanded-content CSS**

Append to `src/components/ProjectsSection.css`:

```css
.project-close {
  position: absolute;
  top: 0.6rem;
  right: 0.8rem;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.06);
  border: none;
  color: var(--text-main);
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
.project-close:hover { background: rgba(0, 0, 0, 0.12); }
[data-theme='dark'] .project-close { background: rgba(255, 255, 255, 0.1); }
[data-theme='dark'] .project-close:hover { background: rgba(255, 255, 255, 0.2); }

.project-monitor {
  background: linear-gradient(180deg, #1a1a1a, #0a0a0a);
  border-radius: 14px;
  padding: 6px;
  margin-bottom: 1rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  position: relative;
}

.project-monitor-dots {
  position: absolute;
  top: 12px;
  left: 14px;
  display: flex;
  gap: 5px;
  z-index: 2;
}
.dot { width: 8px; height: 8px; border-radius: 50%; display: block; }
.dot-red   { background: #ef4444; }
.dot-amber { background: #f59e0b; }
.dot-green { background: #22c55e; }

.project-monitor-screen {
  background: #000;
  border-radius: 8px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.project-monitor-screen video,
.project-monitor-screen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.project-monitor-placeholder {
  color: #7df9ff;
  font-family: monospace;
  font-size: 0.95rem;
  letter-spacing: 1px;
  text-shadow: 0 0 6px #7df9ff;
}

.project-monitor-stand {
  width: 40px;
  height: 3px;
  background: #333;
  border-radius: 2px;
  margin: 4px auto 0;
}

.project-title--lg { font-size: 1.5rem; margin: 0.25rem 0 0.5rem; }

.project-description {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0 0 0.85rem;
}

.project-tags--full { margin-bottom: 1rem; }

.project-actions {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.project-action {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 150ms ease, box-shadow 150ms ease;
}
.project-action:hover { transform: translateY(-2px); }

.project-action--solid {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
}

.project-action--outline {
  background: transparent;
  color: var(--text-main);
  border: 1px solid var(--card-border);
}
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`.
Expected:
- Click card → expands, monitor with "▶ Demo coming soon" placeholder appears, then title, description, full tags, action buttons (only those with URLs).
- Click ✕ → closes.
- ESC → closes.
- Click on the canvas background → closes.
- Click another card while one is open → first closes, second opens (~160ms gap).
- GitHub/Demo buttons open in new tab.

- [ ] **Step 4: Verify lint + build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectsSection.tsx src/components/ProjectsSection.css
git commit -m "feat(projects): expanded card with LED monitor, description, actions"
```

---

### Task 7: Polish — tighten animations, dimming, reduced motion, final review

**Files:**
- Modify: `src/components/ProjectsSection.css`

- [ ] **Step 1: Smooth out card size transition**

In `.project-card`, ensure size changes animate. Modify the `.project-card` rule in `src/components/ProjectsSection.css` so its `transition` line reads:

```css
  transition:
    width 350ms cubic-bezier(0.4, 0, 0.2, 1),
    min-height 350ms cubic-bezier(0.4, 0, 0.2, 1),
    padding 350ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 250ms ease,
    box-shadow 250ms ease;
```

- [ ] **Step 2: Strengthen reduced-motion handling**

Append to `src/components/ProjectsSection.css`:

```css
@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-slot {
    transition-duration: 150ms !important;
  }
  .project-card { animation: none !important; }
}
```

- [ ] **Step 3: Verify behavior**

Run: `npm run dev`.
Expected:
- Expanding feels smooth (width/height/padding ease).
- In OS reduced-motion mode, floating stops and expand is near-instant.
- Toggle dark mode via the existing theme toggle — clouds disappear under cards, glow halos appear, starfield shows, expanded view still readable.
- Resize browser below 768px — cards stack vertically, each with its cloud/halo above it; expanded card grows to full width.

- [ ] **Step 4: Final lint + build**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectsSection.css
git commit -m "feat(projects): polish transitions and reduced-motion handling"
```

---

## Self-Review Notes

- **Spec coverage:** Sky/cloud reuse (Task 1+4), 6 placeholder cards at varied positions (Task 2+3), card content title/tagline/tags/year (Task 3), cloud under card / glow halo (Task 4), tap-to-expand in place with neighbor dimming (Task 5), LED screen + description + full tags + GitHub/demo + close button (Task 6), ESC / outside-click / ✕ close (Tasks 5–6), single-card-open invariant (Task 5), mobile stack (Task 3+5+6), reduced-motion (Tasks 3+7), `globals.css` and `BackgroundElements` untouched (verified by file list), hero/about/education/experience untouched (only `page.tsx:206–208` changes in Task 1).
- **Type consistency:** `Project`, `TAG_COLORS`, `tagStyle`, `CardCloud`, `PROJECTS`, `expandedId`, `openCard` referenced consistently across tasks.
- **No placeholders:** every code block is complete; no TODO/TBD markers.
