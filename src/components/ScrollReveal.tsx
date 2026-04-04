"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animationClass?: string;
  threshold?: number;
}

export function ScrollReveal({ 
  children, 
  className = "", 
  animationClass = "reveal-active",
  threshold = 0.2
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once it's visible so it doesn't animate again when scrolling up/down
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <div ref={ref} className={`${className} ${isVisible ? animationClass : ""}`}>
      {children}
    </div>
  );
}
