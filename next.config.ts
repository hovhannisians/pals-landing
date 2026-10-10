import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The docs and the blog read their Markdown from content/ at build time.
  outputFileTracingIncludes: { "/docs/**": ["./content/docs/**"], "/blog/**": ["./content/blog/**"] },
  // Development only: let a phone or another computer on the local network load the dev server's scripts.
  // Without this, Next blocks them and the page renders but nothing interactive works.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*", "*.local"],
};

export default nextConfig;
