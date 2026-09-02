import { z } from "zod";
import type { Dictionary } from "@/lib/i18n";

export const NAME_MAX = 120;
export const SUBJECT_MAX = 160;
export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 2000;

/**
 * One schema, used by both the browser and the route handler.
 *
 * Messages are supplied by the caller so the client can show them in the
 * visitor's language while the server still validates the same shape.
 */
export function contactSchema(t: Dictionary["contact"]["errors"]) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, t.required)
      .min(2, t.tooShort)
      .max(NAME_MAX, t.tooLong),
    email: z.string().trim().min(1, t.required).email(t.invalidEmail).max(254, t.tooLong),
    subject: z
      .string()
      .trim()
      .min(1, t.required)
      .min(2, t.tooShort)
      .max(SUBJECT_MAX, t.tooLong),
    message: z
      .string()
      .trim()
      .min(1, t.required)
      .min(MESSAGE_MIN, t.messageTooShort)
      .max(MESSAGE_MAX, t.messageTooLong),
    /**
     * Honeypot. Real visitors never see this field, so anything in it is a bot.
     * Named `company` because that is what naive form-fillers look for.
     */
    company: z.string().max(0).optional(),
  });
}

export type ContactInput = z.infer<ReturnType<typeof contactSchema>>;

export type ContactFieldName = "name" | "email" | "subject" | "message";

export const contactFields: ContactFieldName[] = ["name", "email", "subject", "message"];
