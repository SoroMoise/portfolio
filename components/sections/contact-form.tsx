"use client";

import { useId, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";

/** Only the contact strings are serialised into the page payload. */
export type ContactStrings = Dictionary["contact"];
import {
  MESSAGE_MAX,
  contactFields,
  contactSchema,
  type ContactFieldName,
} from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const initial: Record<ContactFieldName, string> = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm({ locale, strings }: { locale: Locale; strings: ContactStrings }) {
  const formId = useId();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<ContactFieldName, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [banner, setBanner] = useState("");

  const schema = contactSchema(strings.errors);

  function update(field: ContactFieldName, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const honeypot = (new FormData(form).get("company") as string | null) ?? "";

    const parsed = schema.safeParse({ ...values, company: honeypot });
    if (!parsed.success) {
      const fieldErrors: Partial<Record<ContactFieldName, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as ContactFieldName | undefined;
        if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("idle");
      // Move focus to the first field that needs attention.
      const first = contactFields.find((f) => fieldErrors[f]);
      if (first) document.getElementById(`${formId}-${first}`)?.focus();
      return;
    }

    setStatus("submitting");
    setBanner("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-locale": locale },
        body: JSON.stringify(parsed.data),
      });

      if (response.ok) {
        setStatus("success");
        setBanner(strings.success);
        setValues(initial);
        return;
      }

      const body = (await response.json().catch(() => null)) as
        | { error?: string; fields?: Record<string, string> }
        | null;

      if (body?.fields) setErrors(body.fields as Partial<Record<ContactFieldName, string>>);
      setStatus("error");
      setBanner(
        response.status === 429
          ? strings.errors.rateLimited
          : (body?.error ?? strings.error),
      );
    } catch {
      setStatus("error");
      setBanner(strings.error);
    }
  }

  const busy = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-lg border border-line bg-surface/50 p-6 sm:p-8"
    >
      <h2 className="font-display text-subheading text-fg">{strings.formTitle}</h2>

      {contactFields.map((field) => {
        const id = `${formId}-${field}`;
        const errorId = `${id}-error`;
        const invalid = Boolean(errors[field]);
        const isMessage = field === "message";

        const label = strings.fields[field];
        const placeholder =
          strings.fields[`${field}Placeholder` as keyof typeof strings.fields];

        return (
          <div key={field} className="flex flex-col gap-2">
            <label htmlFor={id} className="font-mono text-micro uppercase text-fg-subtle">
              {label}
            </label>

            {isMessage ? (
              <textarea
                id={id}
                name={field}
                rows={6}
                required
                maxLength={MESSAGE_MAX}
                value={values[field]}
                onChange={(e) => update(field, e.target.value)}
                aria-invalid={invalid}
                aria-describedby={invalid ? errorId : undefined}
                placeholder={placeholder}
                className={cn(fieldClass, "resize-y")}
              />
            ) : (
              <input
                id={id}
                name={field}
                type={field === "email" ? "email" : "text"}
                autoComplete={
                  field === "email" ? "email" : field === "name" ? "name" : "off"
                }
                required
                value={values[field]}
                onChange={(e) => update(field, e.target.value)}
                aria-invalid={invalid}
                aria-describedby={invalid ? errorId : undefined}
                placeholder={placeholder}
                className={fieldClass}
              />
            )}

            {invalid && (
              <p id={errorId} className="flex items-center gap-1.5 text-xs text-critical">
                <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                {errors[field]}
              </p>
            )}
          </div>
        );
      })}

      {/* Honeypot: hidden from people, irresistible to naive bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input id={`${formId}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" disabled={busy} size="lg" className="mt-1 w-full">
        {busy ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            {strings.submitting}
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            {strings.submit}
          </>
        )}
      </Button>

      {/*
       * Always rendered so assistive tech has a live region to announce into;
       * an element inserted at the same time as its text is often missed.
       */}
      <div role="status" aria-live="polite" className="min-h-0">
        {banner && (
          <p
            className={cn(
              "flex items-start gap-2 rounded-md border px-4 py-3 text-sm",
              status === "success"
                ? "border-positive/40 bg-positive-soft text-positive"
                : "border-critical/40 bg-critical-soft text-critical",
            )}
          >
            {status === "success" ? (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            ) : (
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            )}
            {banner}
          </p>
        )}
      </div>

      <p className="text-xs text-fg-subtle">{strings.responseNote}</p>
    </form>
  );
}

const fieldClass =
  "w-full rounded-md border border-line bg-bg px-3.5 py-2.5 text-sm text-fg " +
  "transition-colors placeholder:text-fg-subtle " +
  "hover:border-line-strong focus:border-accent focus:outline-none " +
  "aria-[invalid=true]:border-critical";
