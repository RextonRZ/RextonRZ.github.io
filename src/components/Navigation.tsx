"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "./Navigation.css";

export function Navigation() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Education", path: "/#education" },
    { name: "Experience", path: "/experience" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Awards", path: "/awards" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // Scroll to top for Home
    if (path === "/" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMobileMenuOpen(false);
    } 
    // Smooth scroll for hash links if we are already on the home page
    else if (path.startsWith("/#") && pathname === "/") {
      const hash = path.substring(1); // extracts "#about"
      const targetElement = document.querySelector(hash);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        
        // Update URL to reflect the new hash without triggering Next.js routing
        window.history.pushState(null, "", hash);
      }
      setMobileMenuOpen(false);
    } 
    // Normal Next.js navigation for other pages
    else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo Section */}
        <Link href="/" className="logo-link" onClick={(e) => handleLinkClick(e, "/")}>
          <div className="logo-icon">
            <img 
              src={resolvedTheme === "dark" ? "/rzlogowhite.png" : "/rzlogoblack.png"} 
              alt="Rexton Logo" 
              className="custom-logo"
            />
          </div>
        </Link>
        
        <div className="nav-right">
          {/* Desktop Links */}
          <div className="desktop-links">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.path} 
                className="nav-link"
                onClick={(e) => handleLinkClick(e, link.path)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            {/* Theme Toggle */}
            <button
              className="theme-toggle"
              onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {mounted && currentTheme === "dark" ? (
                <Sun className="icon sun-icon" size={20} />
              ) : (
                <Moon className="icon moon-icon" size={20} />
              )}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.path} 
              className="mobile-nav-link"
              onClick={(e) => handleLinkClick(e, link.path)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
