import { contactSchema } from "@/lib/contact-schema";
import { getDictionary } from "@/lib/i18n";
import { LOCALE_COOKIE, defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { send, type EmailBinding } from "@/lib/mail";

type Fetcher = { fetch: (request: Request) => Promise<Response> };

type Env = {
  ASSETS: Fetcher;
  EMAIL?: EmailBinding;
  CONTACT_FROM?: string;
  CONTACT_EMAIL?: string;
};

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...SECURITY_HEADERS },
  });
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

async function contact(request: Request, env: Env): Promise<Response> {
  const headerLocale = request.headers.get("x-locale");
  const locale = isLocale(headerLocale) ? headerLocale : defaultLocale;
  const messages = getDictionary(locale).contact.errors;

  if (request.method !== "POST") return json({ error: messages.server }, 405);
  if (rateLimited(request.headers.get("cf-connecting-ip") ?? "unknown")) {
    return json({ error: messages.rateLimited }, 429);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ error: messages.server }, 400);
  }

  const parsed = contactSchema(messages).safeParse(raw);
  if (!parsed.success) {
    return json(
      {
        error: messages.server,
        fields: parsed.error.issues.reduce<Record<string, string>>((acc, issue) => {
          const field = String(issue.path[0] ?? "");
          if (field && !acc[field]) acc[field] = issue.message;
          return acc;
        }, {}),
      },
      400,
    );
  }

  // Honeypot filled in: accept silently so the bot does not learn it was caught.
  if (parsed.data.company) return json({ ok: true }, 200);

  const result = await send({
    payload: parsed.data,
    binding: env.EMAIL,
    from: env.CONTACT_FROM ?? "portfolio@mail.codeurdivoire.com",
    to: env.CONTACT_EMAIL,
  });
  if (!result.ok) {
    console.error("[contact] delivery failed:", result.reason);
    return json({ error: messages.server }, 502);
  }
  return json({ ok: true }, 200);
}

function cookieLocale(request: Request): Locale | undefined {
  const match = /(?:^|;\s*)NEXT_LOCALE=([^;]+)/.exec(request.headers.get("cookie") ?? "");
  return isLocale(match?.[1]) ? match[1] : undefined;
}

function negotiate(header: string | null): Locale | undefined {
  if (!header) return undefined;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      const quality = q === undefined ? 1 : Number.parseFloat(q);
      return {
        base: (tag ?? "").trim().toLowerCase().split("-")[0],
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .filter((entry) => entry.quality > 0)
    .sort((a, b) => b.quality - a.quality);
  return ranked.find((entry) => isLocale(entry.base))?.base as Locale | undefined;
}

async function notFound(request: Request, env: Env, locale: Locale): Promise<Response> {
  const page = await env.ASSETS.fetch(new Request(new URL(`/${locale}/page-not-found`, request.url)));
  return new Response(page.body, {
    status: 404,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      ...SECURITY_HEADERS,
    },
  });
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") return contact(request, env);

    const first = url.pathname.split("/")[1] ?? "";
    if (isLocale(first)) return notFound(request, env, first);
    if (url.pathname.startsWith("/_next/") || /\.[^/]+$/.test(url.pathname)) {
      return notFound(request, env, defaultLocale);
    }

    const locale = cookieLocale(request) ?? negotiate(request.headers.get("accept-language")) ?? defaultLocale;
    const rest = url.pathname.replace(/^\/[a-z]{2}(?:-[a-z]{2})?(?=\/|$)/i, "");
    const tail = rest !== url.pathname ? rest : url.pathname === "/" ? "" : url.pathname;
    const target = new URL(`/${locale}${tail}${url.search}`, url);

    return new Response(null, {
      status: 307,
      headers: {
        Location: target.toString(),
        Vary: "Accept-Language, Cookie",
        "Set-Cookie": `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`,
        ...SECURITY_HEADERS,
      },
    });
  },
};

export default worker;

