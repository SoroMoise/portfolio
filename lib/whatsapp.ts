
export type WhatsAppDraft = {
  name?: string;
  subject?: string;
  message?: string;
};

export type WhatsAppLabels = {
  intro: string;
  name: string;
  subject: string;
};

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

export function whatsappUrl(phone: string, text?: string): string {
  const digits = phone.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return text?.trim() ? `${base}?text=${encodeURIComponent(text)}` : base;
}
