import { NextResponse, type NextRequest } from "next/server";
import { getDictionary } from "@/lib/i18n";
import { isLocale, defaultLocale } from "@/lib/i18n/config";
import { contactSchema } from "@/lib/contact-schema";
import { profile } from "@/lib/content/site";

/**
 * Contact endpoint.
 *
 * The previous version logged the submission and returned success, so every
 * message ever sent through the site was silently discarded while the visitor
 * was told it had arrived. This one only reports success once the mail
 * provider has accepted the message, and returns a 5xx otherwise — including
 * when no provider is configured, so a misconfigured deployment fails loudly
 * instead of swallowing enquiries.
 */

export const runtime = "nodejs";

/** Sliding window, per IP. In-memory: good enough for a single-instance site. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic sweep so the map cannot grow without bound.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Payload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

/**
 * Send through Resend's REST API.
 *
 * Called over `fetch` rather than through the SDK to keep the dependency list
 * — and the serverless bundle — as small as the feature deserves.
 */
async function sendEmail(payload: Payload): Promise<{ ok: true } | { ok: false; reason: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL ?? profile.email;
  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    return { ok: false, reason: "RESEND_API_KEY is not configured" };
  }

  const body = {
    from,
    to: [to],
    reply_to: payload.email,
    subject: `[Portfolio] ${payload.subject}`,
    text: [
      `Name:    ${payload.name}`,
      `Email:   ${payload.email}`,
      `Subject: ${payload.subject}`,
      "",
      payload.message,
    ].join("\n"),
    html: `
      <h2>New message from the portfolio</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
      <hr />
      <p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>
    `,
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return { ok: false, reason: `Resend responded ${response.status}` };
  }

  return { ok: true };
}

export async function POST(request: NextRequest) {
  const headerLocale = request.headers.get("x-locale");
  const locale = isLocale(headerLocale) ? headerLocale : defaultLocale;
  const messages = getDictionary(locale).contact.errors;

  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ error: messages.rateLimited }, { status: 429 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: messages.server }, { status: 400 });
  }

  const parsed = contactSchema(messages).safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: messages.server,
        fields: parsed.error.issues.reduce<Record<string, string>>((acc, issue) => {
          const field = String(issue.path[0] ?? "");
          if (field && !acc[field]) acc[field] = issue.message;
          return acc;
        }, {}),
      },
      { status: 400 },
    );
  }

  // Honeypot filled in: accept silently so the bot does not learn it was caught.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const result = await sendEmail(parsed.data);
  if (!result.ok) {
    // The reason is for the server log only — never echoed to the client.
    console.error("[contact] delivery failed:", result.reason);
    return NextResponse.json({ error: messages.server }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
