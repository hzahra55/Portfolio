"use server";

import { contactFormSchema, type ContactFormInput } from "@/lib/validators";
import { isEmailConfigured, sendContactEmail } from "@/lib/email";
import { saveContactMessage } from "@/lib/data";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success"; via: "email" | "stored" | "logged" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<keyof ContactFormInput, string>>;
    }
  | { status: "fallback"; mailtoHref: string };

export async function submitContact(input: ContactFormInput): Promise<ContactFormState> {
  const parsed = contactFormSchema.safeParse(input);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: {
        name: flat.fieldErrors.name?.[0],
        email: flat.fieldErrors.email?.[0],
        message: flat.fieldErrors.message?.[0],
      },
    };
  }

  const data = parsed.data;

  // Try to persist if DB is wired up (best-effort, never fatal).
  const stored = await saveContactMessage(data);

  // Send via SMTP if configured.
  if (isEmailConfigured()) {
    try {
      await sendContactEmail(data);
      return { status: "success", via: "email" };
    } catch (err) {
      console.error("[contact] SMTP send failed:", err);
      // Fall through to fallback path below.
    }
  }

  // Fallback: SMTP not configured (or send failed). Provide mailto: as escape hatch.
  if (stored) {
    return { status: "success", via: "stored" };
  }

  // Nothing worked — surface a graceful mailto fallback so the user isn't stuck.
  console.warn("[contact] Stored=false, SMTP=unavailable. Returning mailto fallback.");
  const to = process.env.CONTACT_TO_EMAIL ?? "hudazahrabangash@gmail.com";
  const subject = encodeURIComponent(`Portfolio contact — ${data.name}`);
  const body = encodeURIComponent(`${data.message}\n\n— ${data.name} <${data.email}>`);
  return {
    status: "fallback",
    mailtoHref: `mailto:${to}?subject=${subject}&body=${body}`,
  };
}
