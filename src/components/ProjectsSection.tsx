"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import "./ProjectsSection.css";

type Project = {
  id: string;
  title: string;
  tagline: string;
  year: string;
  tags: string[];
  fullTags: string[];
  description: string;
  mediaSrcs: string[];
  mediaType: "video" | "gif";
  githubUrl?: string;
  demoUrl?: string;
  position: { top: string; left: string };
  logoSrc: string;
  crowns?: number;
};

const PROJECTS: Project[] = [
  {
    id: "equallens",
    title: "EqualLens",
    tagline: "AI-Powered Talent Acquisition System",
    year: "2025",
    tags: ["React", "Python", "FastAPI", "Gemini"],
    fullTags: ["React", "Python", "FastAPI", "Firebase", "Gemini", "Google Cloud", "Document AI", "MediaPipe"],
    description: "An advanced AI-powered Talent Acquisition System that revolutionizes hiring by enhancing efficiency, ensuring fairness, and improving the quality of hires. EqualLens handles bulk CV parsing, bias detection, multi-layered authenticity checks, AI-driven candidate ranking, and an automated interview system with facial recognition and PII redaction. Champion of two competitions.",
    mediaSrcs: [
      "/equallenspart1.mp4",
      "/equallenspart2.mp4",
      "/equallenspart3.mp4",
      "/equallenspart4.mp4",
      "/equallenspart5.mp4",
      "/equallenspart6.mp4",
    ],
    mediaType: "video",
    githubUrl: "https://github.com/RextonRZ/EqualLens-HATK",
    position: { top: "2%", left: "8%" },
    logoSrc: "/equallenslogo.png",
    crowns: 2,
  },
  {
    id: "beta",
    title: "Project Beta",
    tagline: "Real-time analytics dashboard",
    year: "2025",
    tags: ["Next.js", "TypeScript"],
    fullTags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind"],
    description: "Placeholder description for Beta. Replace later.",
    mediaSrcs: [],
    mediaType: "video",
    githubUrl: "https://github.com/RextonRZ",
    position: { top: "10%", left: "58%" },
    logoSrc: "",
  },
  {
    id: "gamma",
    title: "Project Gamma",
    tagline: "Computer vision pipeline",
    year: "2024",
    tags: ["Python", "PyTorch"],
    fullTags: ["Python", "PyTorch", "OpenCV", "Docker"],
    description: "Placeholder description for Gamma. Replace later.",
    mediaSrcs: [],
    mediaType: "video",
    position: { top: "28%", left: "30%" },
    logoSrc: "",
  },
  {
    id: "delta",
    title: "Project Delta",
    tagline: "Mobile-first chat app",
    year: "2024",
    tags: ["React Native", "Firebase"],
    fullTags: ["React Native", "Firebase", "TypeScript"],
    description: "Placeholder description for Delta. Replace later.",
    mediaSrcs: [],
    mediaType: "video",
    demoUrl: "https://example.com",
    position: { top: "44%", left: "65%" },
    logoSrc: "",
  },
  {
    id: "epsilon",
    title: "Project Epsilon",
    tagline: "Distributed task scheduler",
    year: "2023",
    tags: ["Go", "Redis"],
    fullTags: ["Go", "Redis", "Kubernetes", "gRPC"],
    description: "Placeholder description for Epsilon. Replace later.",
    mediaSrcs: [],
    mediaType: "video",
    githubUrl: "https://github.com/RextonRZ",
    position: { top: "60%", left: "12%" },
    logoSrc: "",
  },
  {
    id: "zeta",
    title: "Project Zeta",
    tagline: "Static site generator",
    year: "2023",
    tags: ["Rust", "WASM"],
    fullTags: ["Rust", "WASM", "TypeScript"],
    description: "Placeholder description for Zeta. Replace later.",
    mediaSrcs: [],
    mediaType: "video",
    githubUrl: "https://github.com/RextonRZ",
    position: { top: "76%", left: "48%" },
    logoSrc: "",
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
  Gemini:        { bg: "#dbeafe", fg: "#1e3a8a" },
  "Google Cloud":{ bg: "#dbeafe", fg: "#1d4ed8" },
  "Document AI": { bg: "#dcfce7", fg: "#065f46" },
  MediaPipe:     { bg: "#ede9fe", fg: "#6d28d9" },
};

function tagStyle(tag: string): React.CSSProperties {
  const c = TAG_COLORS[tag] ?? { bg: "#e5e7eb", fg: "#374151" };
  return { background: c.bg, color: c.fg };
}

function ProjectMonitorMedia({ project }: { project: Project }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIdx(0);
  }, [project.id]);

  if (project.mediaSrcs.length === 0) {
    return <div className="project-monitor-placeholder">▶ Demo coming soon</div>;
  }

  if (project.mediaType === "gif") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={project.mediaSrcs[0]} alt={`${project.title} demo`} />
    );
  }

  const src = project.mediaSrcs[idx];
  const isSingle = project.mediaSrcs.length === 1;

  return (
    <video
      key={src}
      src={src}
      autoPlay
      muted
      playsInline
      loop={isSingle}
      onEnded={() => {
        if (!isSingle) {
          setIdx((i) => (i + 1) % project.mediaSrcs.length);
        }
      }}
    />
  );
}

export function ProjectsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slotRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!expandedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expandedId]);

  useEffect(() => {
    if (!expandedId) return;
    const node = slotRefs.current[expandedId];
    if (!node) return;
    // Wait a frame for the expansion transition to start so size is updated.
    const raf = requestAnimationFrame(() => {
      node.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    return () => cancelAnimationFrame(raf);
  }, [expandedId]);

  const openCard = (id: string) => {
    if (expandedId === id) return;
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (expandedId) {
      setExpandedId(null);
      openTimer.current = setTimeout(() => {
        setExpandedId(id);
        openTimer.current = null;
      }, 160);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-heading">Projects</h2>
      <div
        className="projects-canvas"
        onClick={(e) => {
          if (e.target === e.currentTarget) setExpandedId(null);
        }}
      >
        {PROJECTS.map((p, i) => {
          const isExpanded = expandedId === p.id;
          return (
            <div
              key={p.id}
              ref={(el) => { slotRefs.current[p.id] = el; }}
              className={`project-slot${isExpanded ? " is-expanded" : ""}${expandedId && !isExpanded ? " is-dimmed" : ""}`}
              style={{
                top: p.position.top,
                left: p.position.left,
              }}
            >
              <div className="project-platform">
                <div className="project-halo" aria-hidden="true" />
              </div>
              {isExpanded ? (
                <div
                  className="project-card"
                  role="region"
                  aria-label={p.title}
                  style={{ animationDelay: `${(i * 0.7) % 3}s` }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {p.crowns && p.crowns > 0 ? (
                    <div className="project-crowns" aria-label={`Champion of ${p.crowns} competition${p.crowns > 1 ? "s" : ""}`}>
                      {Array.from({ length: p.crowns }).map((_, ci) => (
                        <span key={ci} className="project-crown" aria-hidden="true">👑</span>
                      ))}
                    </div>
                  ) : null}

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
                      <ProjectMonitorMedia project={p} />
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
                  {p.crowns && p.crowns > 0 ? (
                    <div className="project-crowns" aria-label={`Champion of ${p.crowns} competition${p.crowns > 1 ? "s" : ""}`}>
                      {Array.from({ length: p.crowns }).map((_, ci) => (
                        <span key={ci} className="project-crown" aria-hidden="true">👑</span>
                      ))}
                    </div>
                  ) : null}
                  <div className="project-card-head">
                    <div className="project-logo">
                      {p.logoSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.logoSrc} alt={`${p.title} logo`} className="project-logo-img" />
                      ) : (
                        <div className="project-logo-fallback" aria-hidden="true">
                          {p.title.charAt(0)}
                        </div>
                      )}
                      {p.mediaSrcs.length > 0 && (
                        p.mediaType === "video" ? (
                          <video
                            className="project-logo-preview"
                            src={p.mediaSrcs[0]}
                            muted
                            loop
                            playsInline
                            autoPlay
                            preload="metadata"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            className="project-logo-preview"
                            src={p.mediaSrcs[0]}
                            alt=""
                          />
                        )
                      )}
                    </div>
                    <div className="project-card-text">
                      <h3 className="project-title">{p.title}</h3>
                      <p className="project-tagline">{p.tagline}</p>
                      <span className="project-year-inline">{p.year}</span>
                    </div>
                  </div>
                  <div className="project-tags">
                    {p.tags.map((tag) => (
                      <span key={tag} className="project-tag" style={tagStyle(tag)}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
