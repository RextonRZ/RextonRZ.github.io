"use client";

import type React from "react";
import { useEffect, useState } from "react";
import "./ProjectsSection.css";

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
