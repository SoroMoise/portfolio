import type { MetadataRoute } from "next";
import { profile } from "@/lib/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.role.fr}`,
    short_name: profile.shortName,
    description: profile.role.fr,
    start_url: "/",
    display: "standalone",
    background_color: "#141416",
    theme_color: "#141416",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}
