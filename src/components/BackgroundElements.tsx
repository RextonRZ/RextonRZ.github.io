"use client";

import { useEffect, useState } from "react";
import "./BackgroundElements.css";

export function BackgroundElements() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Light Mode Blobs */}
      <div className="theme-layer blobs-layer">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
      </div>

      {/* Light Mode Clouds */}
      <div className="theme-layer clouds-layer">
        <div className="cloud cloud-1">
          <CloudSvg opacity={0.8} />
        </div>
        <div className="cloud cloud-2">
          <CloudSvg opacity={0.6} />
        </div>
        <div className="cloud cloud-3">
          <CloudSvg opacity={0.9} />
        </div>
        <div className="cloud cloud-4">
          <CloudSvg opacity={0.7} />
        </div>
        <div className="cloud cloud-5">
          <CloudSvg opacity={0.5} />
        </div>
        <div className="cloud cloud-6">
          <CloudSvg opacity={0.75} />
        </div>
        <div className="cloud cloud-7">
          <CloudSvg opacity={0.85} />
        </div>
        <div className="cloud cloud-8">
          <CloudSvg opacity={0.65} />
        </div>
      </div>

      {/* Dark Mode Stars */}
      <div className="theme-layer stars-layer">
        <div className="starfield starfield-1"></div>
        <div className="starfield starfield-2"></div>
        <div className="starfield starfield-3"></div>
        {/* Shooting star */}
        <div className="shooting-star"></div>
      </div>
    </>
  );
}

function CloudSvg({ opacity }: { opacity: number }) {
  return (
    <svg width="200" height="120" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      <path d="M72.5 35C72.5 43.2843 65.7843 50 57.5 50H25C13.9543 50 5 41.0457 5 30C5 18.9543 13.9543 10 25 10C27.0543 10 29.0357 10.3106 30.8936 10.8798C33.7225 4.67384 40.0638 0 47.5 0C58.5457 0 67.5 8.95431 67.5 20C67.5 20.3013 67.4933 20.6011 67.4801 20.8992C70.3644 21.6702 72.5 24.3313 72.5 27.5C72.5 28.0535 72.4172 28.5878 72.2647 29.0963C76.0121 29.8398 78.8333 33.1099 78.8333 37.0833C78.8333 41.4556 75.289 45 70.9167 45H65V35H72.5Z" fill="white" />
      <circle cx="55" cy="30" r="20" fill="white" />
      <circle cx="35" cy="35" r="15" fill="white" />
    </svg>
  );
}
