/**
 * Deep links into WhatsApp with the message already composed.
 *
 * `wa.me` is a plain URL, so this needs no backend at all — which makes it the
 * one contact route that keeps working even when no mail transport is
 * configured. It also happens to be the channel most of the site's audience
 * actually uses.
 */

export type WhatsAppDraft = {
  name?: string;
  subject?: string;
  message?: string;
};

export type WhatsAppLabels = {
  /** Opening line, e.g. "Bonjour Moïse, je vous écris depuis codeurdivoire.com." */
  intro: string;
  name: string;
  subject: string;
};

/**
 * WhatsApp truncates very long prefilled text, and some browsers still balk at
 * enormous URLs. The form caps a message at 2 000 characters, so this only
 * bites if every field is at its maximum.
 */
const TEXT_MAX = 1800;

export function composeWhatsAppText(draft: WhatsAppDraft, labels: WhatsAppLabels): string {
  const header = [
    draft.name?.trim() ? `${labels.name} : ${draft.name.trim()}` : null,
    draft.subject?.trim() ? `${labels.subject} : ${draft.subject.trim()}` : null,
  ].filter(Boolean);

  const parts = [labels.intro, header.join("\n"), draft.message?.trim()].filter(
    (part): part is string => Boolean(part && part.length > 0),
  );

  const text = parts.join("\n\n");
  return text.length > TEXT_MAX ? `${text.slice(0, TEXT_MAX - 1)}…` : text;
}

/**
 * `wa.me` wants a bare international number — digits only, no `+` and no
 * separators — and percent-encoded text. `URLSearchParams` is deliberately not
 * used here: it encodes spaces as `+`, which WhatsApp renders literally.
 */
export function whatsappUrl(phone: string, text?: string): string {
  const digits = phone.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return text?.trim() ? `${base}?text=${encodeURIComponent(text)}` : base;
}
