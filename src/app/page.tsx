"use client";
import "./page.css";
import { useState, useCallback, useEffect, useRef } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

// ── Photo data ────────────────────────────────────────────────────────────────
type PhotoId = "main" | "hackathons" | "teams" | "community";

interface Photo {
  id: PhotoId;
  src: string;
  alt: string;
  icon: string;
  label: string;
  keyword: string;    // matches hoveredCard keys
  overlayText: string;
}

const ALL_PHOTOS: Photo[] = [
  { id: "main", src: "/aboutme.JPG", alt: "About Me", icon: "", label: "About Me", keyword: "", overlayText: "Rui Zhe (Rexton)" },
  { id: "hackathons", src: "/aboutme1.JPG", alt: "Hackathons", icon: "", label: "Hackathons", keyword: "hackathons", overlayText: "HACKATHONS" },
  { id: "teams", src: "/aboutme2.JPG", alt: "Leading Teams", icon: "", label: "Leading Teams", keyword: "teams", overlayText: "LEADING TEAMS" },
  { id: "community", src: "/aboutme3.jpg", alt: "Community Initiatives", icon: "", label: "Community", keyword: "community", overlayText: "COMMUNITY INITIATIVES" },
];

/** Hook: returns true while the section is in the viewport */
function useSectionVisible(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mainPhotoId, setMainPhotoId] = useState<PhotoId>("main");
  const [swapping, setSwapping] = useState(false);

  const { ref: sectionRef, visible: sectionVisible } = useSectionVisible(0.15);

  const swapMain = useCallback((id: PhotoId) => {
    if (id === mainPhotoId || swapping) return;
    setSwapping(true);
    setMainPhotoId(id);
    setTimeout(() => setSwapping(false), 500);
  }, [mainPhotoId, swapping]);

  const mainPhoto = ALL_PHOTOS.find(p => p.id === mainPhotoId)!;
  const miniPhotos = ALL_PHOTOS.filter(p => p.id !== mainPhotoId);

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-grid">
          {/* Left Column: Text Content */}
          <div className="hero-content">
            <h3 className="title-small">Hi! I'm</h3>
            <h1 className="name"><span className="highlight">Rui Zhe (Rexton)</span></h1>
            <h2 className="subtitle">AI Undergraduate</h2>
            <p className="description">
              Focused on AI, full-stack development, and building data-driven systems that deliver real impact.
            </p>
            <div className="social-bubbles">
              <a href="mailto:ooiruizhe@gmail.com" className="bubble-btn" aria-label="Email">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/rzrexton/" target="_blank" rel="noopener noreferrer" className="bubble-btn" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="https://github.com/RextonRZ" target="_blank" rel="noopener noreferrer" className="bubble-btn" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </a>
              <a href="https://instagram.com/rz_rexton" target="_blank" rel="noopener noreferrer" className="bubble-btn" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
            </div>
          </div>

          {/* Right Column: Profile Media */}
          <div className="hero-media">
            <div className="media-blob">
              <video
                className="profile-video"
                src="/Rui%20Zhe%20Profile.mp4"
                muted
                loop
                playsInline
                autoPlay
              />
              <img
                className="profile-image"
                src="/Rui%20Zhe%20Profile%201.jpg"
                alt="Rui Zhe Profile"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section" ref={sectionRef}>
        <ScrollReveal className="about-reveal" animationClass="animate-pop-in" repeat exitClass="animate-pop-out">
          <div className="about-layout">
            {/* Left: Text Content */}
            <div className="about-content">
              <h2 className="section-title">About Me</h2>
              <p className="about-description">
                A third-year <strong>Computer Science Artificial Intelligence</strong> student at{" "}
                <strong>University of Malaya</strong>, passionate about developing{" "}
                <strong>data-driven projects</strong> using AI, analytics, and{" "}
                <strong>full-stack technologies</strong>. Focused on transforming complex data into{" "}
                <strong>actionable insights</strong> and building solutions that address{" "}
                <strong>real-world challenges</strong>. Having rich experience in{" "}
                <span className={`about-keyword${hoveredCard === "hackathons" ? " about-keyword--active" : ""}`}>
                  participating in hackathons
                </span>
                ,{" "}
                <span className={`about-keyword${hoveredCard === "teams" ? " about-keyword--active" : ""}`}>
                  leading teams
                </span>
                , and{" "}
                <span className={`about-keyword${hoveredCard === "community" ? " about-keyword--active" : ""}`}>
                  organizing community initiatives
                </span>
                , I believe in my ability to <strong>develop practical solutions</strong>, collaborate
                effectively, and tackle challenging projects from start to finish.
              </p>
            </div>

            {/* Right: Floating Photo Panel */}
            <div className="about-photos">
              {/* Main Photo */}
              <div
                className={[
                  "about-main-photo",
                  swapping ? "about-main-swap" : "",
                  sectionVisible ? "photo-enter" : "photo-exit",
                ].filter(Boolean).join(" ")}
              >
                <img
                  key={mainPhoto.src}
                  src={mainPhoto.src}
                  alt={mainPhoto.alt}
                  className="about-main-img"
                />
                <div className="about-main-overlay">
                  <span>{mainPhoto.overlayText}</span>
                </div>
              </div>

              {/* Mini Cards */}
              <div className="about-mini-cards">
                {miniPhotos.map((photo, i) => (
                  <div
                    key={photo.id}
                    className={[
                      "about-mini-card",
                      hoveredCard === photo.keyword ? "about-mini-card--active" : "",
                      sectionVisible ? "mini-enter" : "mini-exit",
                    ].filter(Boolean).join(" ")}
                    onMouseEnter={() => photo.keyword && setHoveredCard(photo.keyword)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => swapMain(photo.id)}
                    style={{
                      animationDelay: sectionVisible ? `${i * 0.15}s` : "0s",
                      cursor: "pointer",
                    }}
                    title={`Click to feature ${photo.label}`}
                  >
                    <img src={photo.src} alt={photo.alt} className="about-mini-img" />
                    <div className="about-mini-label">
                      <span className="about-mini-icon">{photo.icon}</span>
                      <span>{photo.label}</span>
                    </div>
                    <div className="about-mini-glow" />
                    {/* Click hint badge */}
                    <div className="about-mini-swap-hint">⇅</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
