import type { SVGProps } from "react";
import { Facebook, Github, Linkedin, type LucideIcon } from "lucide-react";

export type IconComponent = LucideIcon | ((props: SVGProps<SVGSVGElement>) => React.ReactElement);

/**
 * Brand marks Lucide does not ship. Drawn at a 24×24 viewBox so they sit on the
 * same optical grid as the Lucide set, and inheriting `currentColor`.
 */

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.19-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.26.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.25 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.72 2.63 4.17 3.69.58.25 1.04.4 1.4.51.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}

export function GooglePlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3.6 1.84a1.5 1.5 0 0 0-.35.97v18.38c0 .37.13.71.35.97l9.54-10.16L3.6 1.84Zm10.7 9.03 2.9-3.09-9.9-5.6a1.6 1.6 0 0 0-.66-.2l7.66 8.89Zm0 2.26-7.66 8.89c.23-.02.46-.09.66-.2l9.9-5.6-2.9-3.09Zm3.98-3.63 2.35 1.33c.9.51.9 1.83 0 2.34l-2.35 1.33-3.05-3.24 3.05-3.24-.01-.52Z" />
    </svg>
  );
}

const socialIcons: Record<string, IconComponent> = {
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
  whatsapp: WhatsAppIcon,
  googleplay: GooglePlayIcon,
};

/** Looked up by `SocialLink.id`; falls back to a neutral link glyph. */
export function socialIcon(id: string): IconComponent {
  return socialIcons[id] ?? Github;
}
