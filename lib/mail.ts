import { profile } from "@/lib/content/site";

export type MailPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type SendResult =
  | { ok: true }
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

export type EmailAddress = { email: string; name: string };

export type EmailBinding = {
  send: (message: {
    to: string;
    from: EmailAddress;
    replyTo: EmailAddress;
    subject: string;
    text: string;
    html: string;
  }) => Promise<{ messageId: string }>;
};

/**
 * Sends through Cloudflare Email Sending (the Worker's `send_email` binding):
 * from an address of the verified sending domain, to the owner's inbox, with the
 * visitor as Reply-To so answering a message answers them.
 */
export async function send({
  payload,
  binding,
  from,
  to,
}: {
  payload: MailPayload;
  binding: EmailBinding | undefined;
  from: string;
  to?: string;
}): Promise<SendResult> {
  if (!binding) {
    return { ok: false, unconfigured: true, reason: "The EMAIL binding is not configured" };
  }

  const { text, html } = bodies(payload);

  try {
    await binding.send({
      to: to ?? profile.email,
      from: { email: from, name: "Portfolio" },
      replyTo: { email: payload.email, name: headerSafe(payload.name) },
      subject: `[Portfolio] ${headerSafe(payload.subject)}`,
      text,
      html,
    });
    return { ok: true };
  } catch (error) {
    const code = (error as { code?: string }).code ?? "unknown";
    return { ok: false, reason: `Email Sending failed (${code}): ${(error as Error).message}` };
  }
}
