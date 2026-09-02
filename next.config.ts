import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * No CSP here: the site loads Vercel Analytics and Next's own inline bootstrap
 * scripts, and a hand-maintained `script-src` would either break on the next
 * Next.js release or be so permissive it protects nothing. The headers below
 * are the ones that are unambiguously correct for a static marketing site.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 rejects any `quality` not listed here, at request time.
    qualities: [75, 90],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
