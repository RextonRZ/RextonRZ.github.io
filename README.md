# Personal Portfolio by Rui Zhe (Rexton)

Personal portfolio website built with **Next.js 16** and **React 19**, deployed via GitHub Pages.

**Live site:** [rextonrz.github.io](https://rextonrz.github.io)

![Portfolio Preview](public/portfoliodisplay.gif)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| Styling | Vanilla CSS (per-component modules) |
| Theming | `next-themes` (light / dark) |
| Icons | `lucide-react` |
| Deployment | GitHub Pages |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home — Hero, About Me, Education, Experience
│   ├── layout.tsx            # Root layout (nav, background, theme provider)
│   ├── globals.css           # Global variables, resets, layout utils
│   ├── page.css              # Home page styles
│   ├── awards/page.tsx
│   ├── blog/page.tsx
│   ├── contact/page.tsx
│   ├── experience/page.tsx
│   ├── projects/page.tsx
│   └── skills/page.tsx
└── components/
    ├── Navigation.tsx         # Fixed top nav with smooth scroll + theme toggle
    ├── EducationRoadmap.tsx   # Interactive draggable education timeline
    ├── ExperienceSection.tsx  # Floating card experience section
    ├── BackgroundElements.tsx # Animated background blobs
    ├── ScrollReveal.tsx       # IntersectionObserver scroll animation wrapper
    └── ThemeProvider.tsx      # next-themes wrapper
```

---

## Sections

### Home (`/`)
- **Hero** — Name, title, social links (Email, LinkedIn, GitHub, Instagram), profile video/image
- **About Me** — Bio with interactive photo panel; click mini cards to swap the featured photo
- **Education** — Draggable carousel timeline across 3 institutions (SMJK Chung Ling, Penang Matriculation College, University of Malaya) with floating bubble photo clusters; double-click bubbles to cycle images
- **Experience** — Freely drifting glassmorphism cards at 3 depth layers; cards blur/sharpen dynamically when they overlap; click any card to open a detail modal

### Other pages (in progress)
`/projects` · `/skills` · `/awards` · `/blog` · `/contact`

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Production build
npm run build

# Lint
npm run lint
```

---

## Key Design Details

- **Glassmorphism cards** — `backdrop-filter: blur()` with translucent backgrounds
- **Depth layers** — Experience cards are assigned z-index layers (front / mid / back); when cards physically overlap during drift the back card blurs and dims automatically via JS `getBoundingClientRect` intersection detection
- **Depth cycling** — Each card slowly cycles its opacity and blur independently, so the foreground/background feel shifts over time
- **Dark / Light mode** — Full theme support via CSS custom properties; toggled in the navbar
- **Smooth scroll nav** — Hash links (`/#about`, `/#education`, `/#experience`) use `scrollIntoView` with `scroll-margin-top` to land cleanly below the fixed navbar

---

## Author

**Ooi Rui Zhe (Rexton)**  
Computer Science (Artificial Intelligence) — University of Malaya

[LinkedIn](https://www.linkedin.com/in/rzrexton/) · [GitHub](https://github.com/RextonRZ) · [Email](mailto:ooiruizhe@gmail.com)
