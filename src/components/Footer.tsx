import Link from "next/link";
import "./Footer.css";

const sections = [
  { name: "About", path: "/#about" },
  { name: "Education", path: "/#education" },
  { name: "Experience", path: "/#experience" },
];

const work = [
  { name: "Projects", path: "/#projects" },
  { name: "Awards", path: "/#awards" },
  { name: "Blog", path: "/blog" },
];

const connect = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/rzrexton/" },
  { name: "GitHub", href: "https://github.com/RextonRZ" },
  { name: "Instagram", href: "https://instagram.com/rz_rexton" },
  { name: "Email", href: "mailto:ooiruizhe@gmail.com" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <h3 className="footer-name">Rexton</h3>
            <p className="footer-bio">
              AI undergraduate at University of Malaya and an AI Engineer.
              Building data-driven systems and AI products and winning
              hackathons along the way.
            </p>
            <div className="footer-socials">
              <a href="mailto:ooiruizhe@gmail.com" aria-label="Email" className="footer-social">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/rzrexton/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="https://github.com/RextonRZ" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-social">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </a>
              <a href="https://instagram.com/rz_rexton" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          <nav className="footer-col" aria-label="Sections">
            <h4 className="footer-col-title">Sections</h4>
            {sections.map((l) => (
              <Link key={l.name} href={l.path} className="footer-link">{l.name}</Link>
            ))}
          </nav>

          <nav className="footer-col" aria-label="Work">
            <h4 className="footer-col-title">Work</h4>
            {work.map((l) => (
              <Link key={l.name} href={l.path} className="footer-link">{l.name}</Link>
            ))}
          </nav>

          <nav className="footer-col" aria-label="Connect">
            <h4 className="footer-col-title">Connect</h4>
            {connect.map((l) => (
              <a
                key={l.name}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="footer-link"
              >
                {l.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <span className="footer-copy">
            <span className="footer-copy-mark">©</span>
            <span>{new Date().getFullYear()}</span>
            <span>Designed &amp; built by</span>
            <span className="footer-copy-name">Ooi Rui Zhe (Rexton)</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
