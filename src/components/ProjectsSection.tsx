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
  // The on-screen device frame for the demo. "mobile" uses a portrait phone
  // mockup (for app demos); defaults to the desktop monitor.
  mediaFrame?: "desktop" | "mobile";
  githubUrl?: string;
  demoUrl?: string;
  colabUrl?: string;
  // Figma design file and clickable prototype (design projects).
  figmaUrl?: string;
  figmaProtoUrl?: string;
  position: { top: string; left: string };
  logoSrc: string;
  // Branded fallback avatar when there is no logo image.
  logoBrand?: "grab" | "toxic" | "seyume";
  crowns?: number;
  // Non-champion achievement (e.g. finalist / placement). Rendered as a medal
  // badge — a visually lower tier than the champion crown. The string is used
  // as the accessible label.
  medal?: string;
  // Optional rank engraved on the medal (e.g. "3" for a 3rd-place / 2nd
  // runner-up placement). When omitted the medal shows its default star.
  medalRank?: string;
};

const PROJECTS: Project[] = [
  {
    id: "equallens",
    title: "EqualLens",
    tagline: "AI-Powered Anonymised Talent Acquisition System",
    year: "Kitahack 2025 & HackAttack 2025 Champion Project",
    tags: ["React", "Python", "FastAPI", "Gemini"],
    fullTags: ["React", "Python", "FastAPI", "Firebase", "Google Cloud Run", "Docker", "Logistic Regression", "Speech-to-Text", "Natural Language API", "Document AI", "Cloud Vision API", "MediaPipe", "Gemini", "Gemma 3"],
    description: "An advanced AI-powered Talent Acquisition System that revolutionizes hiring by enhancing efficiency, ensuring fairness, and improving the quality of hires. EqualLens handles bulk CV parsing, bias detection, multi-layered authenticity checks, AI-driven candidate ranking, and an automated interview system with facial recognition and PII redaction.",
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
    position: { top: "0%", left: "14%" },
    logoSrc: "/equallenslogo.png",
    crowns: 2,
  },
  {
    id: "intellimatch",
    title: "IntelliMatch",
    tagline: "AI-Powered Ecosystem Matching Platform",
    year: "Winner project from GDGKL Build With AI MyHack 2026",
    tags: ["Next.js", "FastAPI", "Neo4j", "Gemini 3"],
    fullTags: ["Next.js", "React", "TypeScript", "Python", "FastAPI", "Neo4j", "Firestore", "Firebase Auth", "Google ADK", "Vertex AI", "Vertex AI Embeddings", "ALS Matrix Factorization", "Gemini 3", "Cloud Vision API", "Maps API", "Places API", "Time Zone API"],
    description: "Intelligently connecting startups with mentors, programs, partners, and service providers through adaptive multi-signal matching. Built on a Neo4j knowledge graph with an agent-driven architecture, IntelliMatch combines semantic similarity, graph structure, collaborative filtering, and a nightly reinforcement-learning pipeline to deliver explainable, outcome-driven recommendations across the startup ecosystem.",
    mediaSrcs: ["/IntelliMatch Demo.mp4"],
    mediaType: "video",
    position: { top: "4%", left: "50%" },
    logoSrc: "/intellimatchlogo.png",
    crowns: 1,
  },
  {
    id: "seyume",
    title: "Senyumé",
    tagline: "UI/UX Design for a Gen Z Skincare E-Commerce Storefront",
    year: "2nd Runner-Up · Design Duel 2025",
    tags: ["Figma", "UI/UX Design"],
    fullTags: ["Figma", "UI/UX Design"],
    description: "A Gen Z–focused e-commerce storefront for Senyumé, a Malaysian natural skincare brand, designed end-to-end in Figma for Design Duel 2025. The design pairs warm golden tones with a clean, minimalist layout — intuitive product discovery with a personalised 'Find Your Formulation' tool, an AI chatbot assistant, and an integrated reviews and social-proof gallery drawn from across ASEAN to build trust and drive conversions. It went through multiple wireframe iterations, evolving from a cluttered first pass into a refined black-and-white layout that adds colour and emphasis on hover to guide attention from discovery through to checkout.",
    mediaSrcs: ["/seyumedemo.mp4"],
    mediaType: "video",
    figmaUrl: "https://www.figma.com/design/FjHDt5VrXDXtMWu8L2HmZM/Design-Duel?node-id=356-1408&t=xOaOIja8iZfShtl8-0",
    figmaProtoUrl: "https://www.figma.com/proto/FjHDt5VrXDXtMWu8L2HmZM/Design-Duel?node-id=356-1408&t=xOaOIja8iZfShtl8-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2",
    position: { top: "25%", left: "15%" },
    logoSrc: "/seyumelogo.png",
    logoBrand: "seyume",
    medal: "2nd Runner-Up — Design Duel 2025",
    medalRank: "3",
  },
  {
    id: "supplylah",
    title: "SupplyLah",
    tagline: "AI-Powered Wholesale Order Automation",
    year: "6th Place & Top 15 Finalist · UMHackathon 2026",
    tags: ["Next.js", "FastAPI", "Supabase", "Gemini"],
    fullTags: ["Next.js", "React", "Vercel", "FastAPI", "Python", "MiniLM", "Docker", "AWS EC2", "Supabase", "AWS S3", "Redis", "Gemini", "Groq Whisper", "Twilio", "Resend", "Touch 'n Go", "Lalamove"],
    description: "A multi-agent AI system that sits between wholesale buyers and suppliers on WhatsApp. SupplyLah turns unstructured messages — text, voice notes in Bahasa Rojak, or photos of handwritten lists — into fully processed, logistics-ready orders with zero manual entry: parsing intent, checking live inventory, proposing substitutions, confirming with the buyer, verifying payment, deducting stock atomically, and booking last-mile delivery. Staff monitor the whole pipeline from a real-time Command Centre dashboard.",
    mediaSrcs: [
      "/supplylah01.mp4",
      "/supplylah02.mp4",
      "/supplylah03.mp4",
      "/supplylah04.mp4",
      "/supplylah05.mp4",
      "/supplylah06.mp4",
      "/supplylah07.mp4",
      "/supplylah08.mp4",
      "/supplylah09.mp4",
      "/supplylah10.mp4",
    ],
    mediaType: "video",
    githubUrl: "https://github.com/RextonRZ/SupplyLah",
    position: { top: "29%", left: "50%" },
    logoSrc: "/supplylahlogo.png",
    medal: "6th Place & Top 15 Finalist — UMHackathon 2026",
  },
  {
    id: "grabmate",
    title: "GrabMate",
    tagline: "Handsfree Voice Assistant for Grab Driver-Partners",
    year: "Top 10 Finalist · UMHackathon 2025",
    tags: ["React Native", "FastAPI", "Gemini", "Python"],
    fullTags: ["React Native", "FastAPI", "Python", "Gemini", "OpenAI Whisper","Google Speech-to-Text", "Google Text-to-Speech", "Google Translate", "noisereduce"],
    description: "A voice-first, handsfree AI assistant for Grab's driver-partners (DAX), built for UMHackathon 2025 (Domain 1). GrabMate lets drivers interact entirely by voice in the noisy road conditions of Southeast Asia, combining noise-reduced speech-to-text with an OpenAI Whisper fallback, multilingual detection and translation, Gemini-powered intent handling for navigation and messaging, and natural voice responses. It also layers in traffic-aware routing, experimental flood checks, and camera-based drowsiness detection for safer driving.",
    mediaSrcs: ["/grabmatedemo.mp4"],
    mediaType: "video",
    mediaFrame: "mobile",
    githubUrl: "https://github.com/RextonRZ/Voice-Driven-Driver-Assistant-Final",
    position: { top: "50%", left: "14%" },
    logoSrc: "",
    logoBrand: "grab",
    medal: "Top 10 Finalist — UMHackathon 2025",
  },
  {
    id: "toxicdetector",
    title: "Toxic Comment Detector",
    tagline: "Multilingual Toxicity Detection for English, Malay & Manglish",
    year: "Project Developed in 2026",
    tags: ["Python", "PyTorch", "HuggingFace", "Gradio"],
    fullTags: ["Python", "PyTorch", "HuggingFace", "Transformers", "XLM-RoBERTa", "Gradio", "Captum", "Google Colab"],
    description: "A multilingual toxic-comment classifier for English, Malay, and code-mixed Manglish, built on XLM-RoBERTa. It compares a zero-shot setup (monolingual training only) against a few-shot setup that incorporates around 300 code-mixed examples. This nearly doubled code-mixed F1 (0.42 → 0.71) and recall (0.30 → 0.61) while maintaining performance on English and Malay. The project includes a Gradio demo with confidence scores and Integrated Gradients word-level attribution.",
    mediaSrcs: ["/demotoxiccomment.mp4"],
    mediaType: "video",
    githubUrl: "https://github.com/RextonRZ/malay-english-toxic-detector",
    colabUrl: "https://colab.research.google.com/drive/1askVXzNOZW2zkVLZ9Je1jyMp6vONcjK7?usp=sharing",
    position: { top: "54%", left: "51%" },
    logoSrc: "",
    logoBrand: "toxic",
  },
  {
    id: "saladprotocol",
    title: "Salad Protocol",
    tagline: "AI Nutritionist Chatbot with Food-Image Recognition & Personalised Diet Advice",
    year: "Project Built in 2025",
    tags: ["React", "FastAPI", "Gemini", "TensorFlow"],
    fullTags: ["TypeScript", "React", "Python", "FastAPI", "Firebase", "Firestore", "Google Cloud Storage", "Gemini", "Upstash", "TensorFlow", "scikit-learn"],
    description: "An AI-powered nutritionist chatbot that gives personalised dietary advice and analyses meals from a photo. Salad Protocol pairs a Gemini-powered chat assistant with a custom food-image recognition model for calorie and macro estimation, and a RAG knowledge base (Upstash Vector) grounded in the Malaysian Food Composition Database (MyFCD) and national dietary guidelines — tailoring recommendations to each user's age, height, and weight.",
    mediaSrcs: [
      "/saladprotocol0.mp4",
      "/saladprotocol1.mp4",
      "/saladprotocol2.mp4",
      "/saladprotocol3.mp4",
      "/saladprotocol4.mp4",
    ],
    mediaType: "video",
    githubUrl: "https://github.com/jianwen0414/SaladProtocol_v2",
    position: { top: "75%", left: "15%" },
    logoSrc: "/saladprotocollogo.png",
  },
];

// How many tech tags the collapsed card shows before the "+N more" chip.
// Kept low so the tag list never exceeds two rows on the 360px card.
const COLLAPSED_TAG_LIMIT = 5;

// Brand-logo ids (Iconify "logos" set — colour brand marks, served at
// api.iconify.design). Only tags with a recognisable logo are listed; the rest
// render as text-only pills. Missing ids are hidden gracefully via onError, so
// this map is safe to extend.
const TAG_ICONS: Record<string, string> = {
  React: "logos:react",
  "React Native": "logos:react",
  "Next.js": "logos:nextjs-icon",
  TypeScript: "logos:typescript-icon",
  Python: "logos:python",
  FastAPI: "logos:fastapi",
  Firebase: "logos:firebase",
  Firestore: "logos:firebase",
  "Firebase Auth": "logos:firebase",
  Docker: "logos:docker-icon",
  Neo4j: "logos:neo4j",
  PyTorch: "logos:pytorch",
  HuggingFace: "logos:hugging-face-icon",
  Transformers: "logos:hugging-face-icon",
  Gradio: "logos:gradio",
  Figma: "logos:figma",
  "Google Colab": "devicon:googlecolab",
  OpenCV: "logos:opencv",
  Go: "logos:go",
  Redis: "logos:redis",
  Rust: "logos:rust",
  WASM: "logos:webassembly",
  Kubernetes: "logos:kubernetes",
  PostgreSQL: "logos:postgresql",
  gRPC: "logos:grpc",
  Tailwind: "logos:tailwindcss-icon",
  Supabase: "logos:supabase-icon",
  Twilio: "logos:twilio",
  Resend: "simple-icons:resend",
  Vercel: "logos:vercel-icon",
  "AWS S3": "logos:aws-s3",
  "AWS EC2": "logos:aws-ec2",
  MiniLM: "logos:hugging-face-icon",
  "Groq Whisper": "logos:openai",
  "OpenAI Whisper": "logos:openai",
  "Google Speech-to-Text": "logos:google-cloud",
  "Google Text-to-Speech": "logos:google-cloud",
  "Google Translate": "logos:google-cloud",
  Upstash: "logos:upstash",
  TensorFlow: "logos:tensorflow",
  "scikit-learn": "skill-icons:scikitlearn-light",
  "Google Cloud Storage": "logos:google-cloud",
  Gemini: "logos:google-gemini",
  "Gemini 3": "logos:google-gemini",
  "Gemma 3": "logos:google-gemini",
  "Google Cloud": "logos:google-cloud",
  "Google Cloud Run": "logos:google-cloud",
  "Vertex AI": "logos:google-cloud",
  "Vertex AI Embeddings": "logos:google-cloud",
  "Document AI": "logos:google-cloud",
  "Cloud Vision API": "logos:google-cloud",
  "Speech-to-Text": "logos:google-cloud",
  "Natural Language API": "logos:google-cloud",
  "Google ADK": "logos:google-cloud",
  "Maps API": "logos:google-maps",
  "Places API": "logos:google-maps",
  "Time Zone API": "logos:google-maps",
};

function TechTag({ tag }: { tag: string }) {
  const icon = TAG_ICONS[tag];
  return (
    <span className="project-tag">
      {icon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="project-tag-icon"
          src={`https://api.iconify.design/${icon.replace(":", "/")}.svg`}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            // Recover from transient load failures (the initial page-load burst
            // can drop a few requests) by retrying before giving up.
            const img = e.currentTarget;
            const tries = Number(img.dataset.tries ?? "0");
            if (tries < 3) {
              img.dataset.tries = String(tries + 1);
              const base = img.src.split("?")[0];
              img.src = `${base}?r=${tries + 1}`;
            } else {
              img.style.visibility = "hidden";
            }
          }}
        />
      )}
      {tag}
    </span>
  );
}

function GitHubIcon() {
  return (
    <svg
      className="project-action-icon"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.73-1.34-1.73-1.09-.73.08-.71.08-.71 1.2.08 1.84 1.21 1.84 1.21 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.21a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.13 3 .4 2.29-1.53 3.3-1.21 3.3-1.21.66 1.66.24 2.88.12 3.18.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .31.21.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5z" />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg
      viewBox="0 0 28 24"
      xmlns="http://www.w3.org/2000/svg"
      className="project-crown-svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="crown-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="55%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <path
        d="M3.5 18 L5.5 8 Q5.6 6.8 6.8 7.4 L10.5 10.5 Q11.4 11 11.9 10 L13.4 5.5 Q14 4 14.6 5.5 L16.1 10 Q16.6 11 17.5 10.5 L21.2 7.4 Q22.4 6.8 22.5 8 L24.5 18 Q24.7 19.5 23.2 19.5 L4.8 19.5 Q3.3 19.5 3.5 18 Z"
        fill="url(#crown-gold)"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="14" r="1.2" fill="#ef4444" stroke="rgba(255,255,255,0.6)" strokeWidth="0.3" />
      <circle cx="8" cy="14" r="0.8" fill="#3b82f6" stroke="rgba(255,255,255,0.6)" strokeWidth="0.3" />
      <circle cx="20" cy="14" r="0.8" fill="#3b82f6" stroke="rgba(255,255,255,0.6)" strokeWidth="0.3" />
    </svg>
  );
}

function MedalIcon({ rank }: { rank?: string }) {
  return (
    <svg
      viewBox="0 0 32 40"
      xmlns="http://www.w3.org/2000/svg"
      className="project-medal-svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="medal-disc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6d9b0" />
          <stop offset="50%" stopColor="#cd8a4e" />
          <stop offset="100%" stopColor="#9c5a2c" />
        </linearGradient>
      </defs>
      {/* Ribbons */}
      <path d="M10 2 L16 5 L13 18 L7 15 Z" fill="#3b82f6" stroke="rgba(255,255,255,0.7)" strokeWidth="0.5" strokeLinejoin="round" />
      <path d="M22 2 L16 5 L19 18 L25 15 Z" fill="#ef4444" stroke="rgba(255,255,255,0.7)" strokeWidth="0.5" strokeLinejoin="round" />
      {/* Disc */}
      <circle cx="16" cy="27" r="11" fill="url(#medal-disc)" stroke="rgba(255,255,255,0.85)" strokeWidth="0.9" />
      <circle cx="16" cy="27" r="8" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7" />
      {rank ? (
        // Engraved rank number (e.g. "3" for 3rd place).
        <text
          x="16"
          y="31.4"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="#fff7e6"
          fontFamily="system-ui, sans-serif"
        >
          {rank}
        </text>
      ) : (
        // Default star.
        <path
          d="M16 20.5 L17.6 24.7 L22.1 24.9 L18.5 27.6 L19.8 31.9 L16 29.3 L12.2 31.9 L13.5 27.6 L9.9 24.9 L14.4 24.7 Z"
          fill="#fff7e6"
          stroke="rgba(156,90,44,0.4)"
          strokeWidth="0.4"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

// Renders the achievement badge for a project: champion crowns, or a medal for
// non-champion placements (optionally engraved with a rank). A lone crown is
// mirrored so it sits nicely.
function AwardBadge({ project }: { project: Project }) {
  if (project.crowns && project.crowns > 0) {
    const single = project.crowns === 1;
    return (
      <div
        className={`project-crowns${single ? " project-crowns--single" : ""}`}
        aria-label={`Champion of ${project.crowns} competition${project.crowns > 1 ? "s" : ""}`}
      >
        {Array.from({ length: project.crowns }).map((_, ci) => (
          <span key={ci} className="project-crown">
            <CrownIcon />
          </span>
        ))}
      </div>
    );
  }
  if (project.medal) {
    return (
      <div className="project-medal" aria-label={project.medal}>
        <MedalIcon rank={project.medalRank} />
      </div>
    );
  }
  return null;
}

// Branded fallback avatar for projects without a logo image. Currently only
// "grab" — a Grab-green badge with a steering wheel + wordmark.
function GrabMateLogo() {
  return (
    <div className="grab-logo" aria-label="GrabMate logo">
      <svg className="grab-logo-wheel" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="#ffffff" strokeWidth="2" />
        <circle cx="12" cy="12" r="2.4" fill="#ffffff" />
        <path d="M12 9.6 V4.2 M9.9 13.2 L5.4 16.3 M14.1 13.2 L18.6 16.3" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="grab-logo-text">GrabMate</span>
    </div>
  );
}

// Branded fallback avatar for the toxic comment detector — a speech bubble with
// a warning mark on a crimson badge.
function ToxicLogo() {
  return (
    <div className="toxic-logo" aria-label="Toxic Comment Detector logo">
      <svg className="toxic-logo-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M11 11 H37 a5 5 0 0 1 5 5 V31 a5 5 0 0 1 -5 5 H25 l-9 7 v-7 H11 a5 5 0 0 1 -5 -5 V16 a5 5 0 0 1 5 -5 Z"
          fill="#ffffff"
        />
        <rect x="22" y="17" width="4" height="10" rx="2" fill="#dc2626" />
        <circle cx="24" cy="31" r="2.4" fill="#dc2626" />
      </svg>
      <span className="toxic-logo-text">TOXIC</span>
    </div>
  );
}

// Branded fallback avatar for the Senyumé skincare design — a warm golden badge
// with the wordmark over the brand's signature smile curve.
function SeyumeLogo() {
  return (
    <div className="seyume-logo" aria-label="Senyumé logo">
      <span className="seyume-logo-text">senjumé</span>
      <svg className="seyume-logo-smile" viewBox="0 0 40 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4 3 Q20 14 36 3" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function HoverPreview({ project, active }: { project: Project; active: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Only the hovered card's preview plays — otherwise every card would decode a
  // video in the background, which made the whole page (and modals) lag.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 2;
    if (active) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [active]);

  if (project.mediaSrcs.length === 0) return null;

  if (project.mediaType === "gif") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="project-hover-media" src={project.mediaSrcs[0]} alt="" />
    );
  }

  return (
    <video
      ref={videoRef}
      className="project-hover-media"
      src={project.mediaSrcs[0]}
      muted
      loop
      playsInline
      preload="none"
    />
  );
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

  const count = project.mediaSrcs.length;
  const src = project.mediaSrcs[idx];
  const isSingle = count === 1;
  const go = (delta: number) => setIdx((i) => (i + delta + count) % count);

  return (
    <>
      <video
        key={src}
        src={src}
        controls
        autoPlay
        muted
        playsInline
        loop={isSingle}
        onEnded={() => {
          if (!isSingle) go(1);
        }}
      />
      {!isSingle && (
        <div className="project-clip-nav">
          <button type="button" aria-label="Previous clip" onClick={() => go(-1)}>‹</button>
          <span className="project-clip-count">{idx + 1} / {count}</span>
          <button type="button" aria-label="Next clip" onClick={() => go(1)}>›</button>
        </div>
      )}
    </>
  );
}

// The device frame around a demo: a portrait phone for mobile app demos,
// otherwise the desktop monitor.
function ProjectFrame({ project }: { project: Project }) {
  if (project.mediaFrame === "mobile") {
    return (
      <div className="project-phone">
        <div className="project-phone-screen">
          <ProjectMonitorMedia project={project} />
        </div>
      </div>
    );
  }
  return (
    <div className="project-monitor">
      <div className="project-monitor-dots" aria-hidden="true">
        <span className="dot dot-red" />
        <span className="dot dot-amber" />
        <span className="dot dot-green" />
      </div>
      <div className="project-monitor-screen">
        <ProjectMonitorMedia project={project} />
      </div>
      <div className="project-monitor-stand" aria-hidden="true" />
    </div>
  );
}

export function ProjectsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const expanded = PROJECTS.find((p) => p.id === expandedId) ?? null;

  const closeExpanded = () => setExpandedId(null);

  const openCard = (id: string) => {
    setHoveredId(null);
    setExpandedId(id);
  };

  // Close on Escape and lock background scroll while the modal is open.
  useEffect(() => {
    if (!expandedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeExpanded();
    };
    window.addEventListener("keydown", onKey);
    // Lock the page behind the modal. Lock BOTH html and body so the
    // background can't scroll independently (which produced a second scrollbar).
    const html = document.documentElement;
    const prevBody = document.body.style.overflow;
    const prevHtml = html.style.overflow;
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevBody;
      html.style.overflow = prevHtml;
    };
  }, [expandedId]);

  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-heading">Projects</h2>
      <div className="projects-canvas">
        {PROJECTS.map((p, i) => {
          const previewSide: "left" | "right" = parseFloat(p.position.left) > 35 ? "right" : "left";
          return (
            <div
              key={p.id}
              className={`project-slot project-slot--preview-${previewSide}`}
              style={{
                top: p.position.top,
                left: p.position.left,
              }}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId((cur) => (cur === p.id ? null : cur))}
            >
              <div className="project-platform">
                <div className="project-halo" aria-hidden="true" />
              </div>
              <button
                type="button"
                className="project-card"
                style={{ animationDelay: `${(i * 0.7) % 3}s` }}
                onClick={() => openCard(p.id)}
                aria-expanded={false}
                aria-label={`Open ${p.title}`}
              >
                <AwardBadge project={p} />
                <div className="project-card-head">
                  <div className="project-logo">
                    {p.logoSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.logoSrc} alt={`${p.title} logo`} className="project-logo-img" />
                    ) : p.logoBrand === "grab" ? (
                      <GrabMateLogo />
                    ) : p.logoBrand === "toxic" ? (
                      <ToxicLogo />
                    ) : p.logoBrand === "seyume" ? (
                      <SeyumeLogo />
                    ) : (
                      <div className="project-logo-fallback" aria-hidden="true">
                        {p.title.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="project-card-text">
                    <h3 className="project-title">{p.title}</h3>
                    <p className="project-tagline">{p.tagline}</p>
                    <span className="project-year-inline">{p.year}</span>
                  </div>
                </div>
                <div className="project-tags">
                  {p.fullTags.slice(0, COLLAPSED_TAG_LIMIT).map((tag) => (
                    <TechTag key={tag} tag={tag} />
                  ))}
                  {p.fullTags.length > COLLAPSED_TAG_LIMIT && (
                    <span className="project-tag project-tag--more" aria-label={`${p.fullTags.length - COLLAPSED_TAG_LIMIT} more`}>
                      +{p.fullTags.length - COLLAPSED_TAG_LIMIT} more
                    </span>
                  )}
                </div>
              </button>
              {p.mediaSrcs.length > 0 && (
                <div
                  className={`project-hover-preview${p.mediaFrame === "mobile" ? " project-hover-preview--phone" : ""}`}
                  aria-hidden="true"
                >
                  <div className="project-hover-frame">
                    <HoverPreview project={p} active={hoveredId === p.id && expandedId === null} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {expanded && (
        <div className="project-modal-overlay" onClick={closeExpanded}>
          <div
            className={`project-modal${expanded.mediaFrame === "mobile" ? " project-modal--phone" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label={expanded.title}
            onClick={(e) => e.stopPropagation()}
          >
            <AwardBadge project={expanded} />

            <button
              type="button"
              className="project-close"
              aria-label="Close"
              onClick={closeExpanded}
            >
              ✕
            </button>

            <div className="project-modal-media">
              <ProjectFrame project={expanded} />
            </div>

            <div className="project-modal-content">
              <h3 className="project-title project-title--lg">{expanded.title}</h3>
              <p className="project-modal-tagline">{expanded.tagline}</p>
              <p className="project-description">{expanded.description}</p>

              <div className="project-tags project-tags--full">
                {expanded.fullTags.map((tag) => (
                  <TechTag key={tag} tag={tag} />
                ))}
              </div>

              {(expanded.githubUrl || expanded.colabUrl || expanded.demoUrl || expanded.figmaUrl || expanded.figmaProtoUrl) && (
                <div className="project-actions">
                  {expanded.figmaUrl && (
                    <a
                      className="project-action project-action--figma"
                      href={expanded.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="project-action-icon"
                        src="https://api.iconify.design/logos/figma.svg"
                        alt=""
                        aria-hidden="true"
                      />
                      Figma Design
                    </a>
                  )}
                  {expanded.figmaProtoUrl && (
                    <a
                      className="project-action project-action--figma"
                      href={expanded.figmaProtoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Prototype
                    </a>
                  )}
                  {expanded.githubUrl && (
                    <a
                      className="project-action project-action--github"
                      href={expanded.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubIcon />
                      GitHub
                    </a>
                  )}
                  {expanded.colabUrl && (
                    <a
                      className="project-action project-action--colab"
                      href={expanded.colabUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="project-action-icon"
                        src="https://api.iconify.design/devicon/googlecolab.svg"
                        alt=""
                        aria-hidden="true"
                      />
                      Open in Colab
                    </a>
                  )}
                  {expanded.demoUrl && (
                    <a
                      className="project-action project-action--solid"
                      href={expanded.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
