/**
 * SMTP email transport for the contact form.
 *
 * If SMTP env vars are missing, isEmailConfigured() returns false and the
 * contact form server action skips sending and returns a soft fallback
 * status — the UI then offers a mailto: link instead.
 */

import nodemailer, { type Transporter } from "nodemailer";

export function isEmailConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_FROM &&
      process.env.CONTACT_TO_EMAIL,
  );
}

let transporter: Transporter | null = null;
function getTransporter(): Transporter {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

export async function sendContactEmail(input: {
  name: string;
  email: string;
  message: string;
}) {
  if (!isEmailConfigured()) {
    return { sent: false as const, reason: "smtp_not_configured" as const };
  }

  const t = getTransporter();
  const safeName = input.name.replace(/[<>]/g, "");
  const subject = `Portfolio contact — ${safeName}`;
  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5">
      <h2 style="margin:0 0 12px">New portfolio message</h2>
      <p><strong>From:</strong> ${escapeHtml(input.name)} &lt;${escapeHtml(input.email)}&gt;</p>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
      <p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>
    </div>
  `;

  await t.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: input.email,
    subject,
    html,
    text: `${input.name} <${input.email}>\n\n${input.message}`,
  });

  return { sent: true as const };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
