"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animationClass?: string;
  exitClass?: string;
  threshold?: number;
  /** If true, re-animate every time the element enters/exits the viewport */
  repeat?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  animationClass = "reveal-active",
  exitClass = "",
  threshold = 0.2,
  repeat = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLeft, setHasLeft] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasLeft(false);
          if (!repeat && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (repeat) {
          // Element has left the viewport
          setIsVisible(false);
          setHasLeft(true);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, repeat]);

  const dynamicClass = isVisible
    ? animationClass
    : hasLeft && exitClass
    ? exitClass
    : "";

  return (
    <div ref={ref} className={`${className} ${dynamicClass}`.trim()}>
      {children}
    </div>
  );
}
