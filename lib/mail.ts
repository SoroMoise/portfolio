import { profile } from "@/lib/content/site";

export type MailPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type SendResult =
  | { ok: true; via: "smtp" | "resend" }
  | { ok: false; reason: string; unconfigured?: true };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").slice(0, 160);
}

function recipient(): string {
  return process.env.CONTACT_EMAIL ?? profile.email;
}

function bodies(payload: MailPayload) {
  return {
    text: [
      `Name:    ${payload.name}`,
      `Email:   ${payload.email}`,
      `Subject: ${payload.subject}`,
      "",
      payload.message,
    ].join("\n"),
    html: [
      "<h2>New message from the portfolio</h2>",
      `<p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>`,
      `<p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>`,
      `<p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>`,
      "<hr />",
      `<p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>`,
    ].join(""),
  };
}

async function sendViaSmtp(payload: MailPayload): Promise<SendResult> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return { ok: false, reason: "SMTP is partially configured" };
  }

  const port = Number(process.env.SMTP_PORT ?? 465);

  const nodemailer = await import("nodemailer");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const { text, html } = bodies(payload);

  try {
    await transporter.sendMail({
      from: `"${headerSafe(payload.name)} (portfolio)" <${user}>`,
      to: recipient(),
      replyTo: `"${headerSafe(payload.name)}" <${payload.email}>`,
      subject: `[Portfolio] ${headerSafe(payload.subject)}`,
      text,
      html,
    });
    return { ok: true, via: "smtp" };
  } catch (error) {
    return { ok: false, reason: `SMTP send failed: ${(error as Error).message}` };
  } finally {
    transporter.close();
  }
}

async function sendViaResend(payload: MailPayload): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: "RESEND_API_KEY is not set" };

  const { text, html } = bodies(payload);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: [recipient()],
      reply_to: payload.email,
      subject: `[Portfolio] ${headerSafe(payload.subject)}`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    return { ok: false, reason: `Resend responded ${response.status}` };
  }

  return { ok: true, via: "resend" };
}

export async function send(payload: MailPayload): Promise<SendResult> {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return sendViaSmtp(payload);
  }

  if (process.env.RESEND_API_KEY) {
    return sendViaResend(payload);
  }

  return {
    ok: false,
    unconfigured: true,
    reason:
      "No mail transport configured. Set SMTP_HOST/SMTP_USER/SMTP_PASS, or RESEND_API_KEY.",
  };
}
