import "server-only";

const ENDPOINT = "https://api.resend.com/emails";

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function fromAddress(): string {
  return process.env.EMAIL_FROM || "PyQuest <onboarding@resend.dev>";
}

/**
 * Sends a password-reset email via Resend (https://resend.com — free tier,
 * no domain setup needed with the onboarding@resend.dev sender).
 * Throws on failure; callers should catch and fall back gracefully.
 */
export async function sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#0b0f1a;color:#e7eaf3;border-radius:12px;">
      <p style="font-size:15px;color:#9aa5c4;margin:0 0 4px;">PyQuest</p>
      <h1 style="font-size:20px;margin:0 0 16px;">Reset your password</h1>
      <p style="font-size:14px;line-height:1.6;color:#c9cede;">
        Someone (hopefully you) asked to reset the password for this account.
        This link works once and expires in 1 hour.
      </p>
      <p style="margin:24px 0;">
        <a href="${resetUrl}"
           style="background:#7c83f7;color:#0b0f1a;text-decoration:none;font-weight:600;
                  padding:10px 20px;border-radius:8px;display:inline-block;font-size:14px;">
          Reset password
        </a>
      </p>
      <p style="font-size:12px;color:#6b7286;line-height:1.6;">
        If you didn't request this, you can safely ignore this email — your password won't change.
        <br>Link not working? Paste this into your browser:<br>${resetUrl}
      </p>
    </div>`;

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress(),
      to,
      subject: "Reset your PyQuest password",
      html,
      text: `Reset your PyQuest password: ${resetUrl}\n\nThis link expires in 1 hour. If you didn't request this, ignore this email.`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${detail.slice(0, 300)}`);
  }
}
