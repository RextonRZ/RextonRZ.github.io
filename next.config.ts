import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enables static HTML export for GitHub Pages
  images: {
    unoptimized: true, // Required for next/image to work on GitHub Pages
  },
};

export default nextConfig;
