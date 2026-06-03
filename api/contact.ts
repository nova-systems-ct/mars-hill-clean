export const config = { runtime: "edge" };

const ADMIN_EMAIL = "defender315@msn.com";

export default async function handler(req: Request): Promise<Response> {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: cors });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Email service not configured" }), { status: 500, headers: cors });
  }

  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400, headers: cors });
  }

  const { name = "Visitor", email = "", subject = "New message from website", message = "" } = body;

  if (!email || !message) {
    return new Response(JSON.stringify({ error: "Email and message are required" }), { status: 400, headers: cors });
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL ?? "Mars Hill Apologetics <onboarding@resend.dev>";

  const notifHtml = `
    <div style="font-family:Georgia,serif;max-width:600px;color:#0D1B2A;padding:32px;">
      <h2 style="color:#E6C052;margin-bottom:16px;">New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#0D1B2A;">${email}</a></p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr style="border:none;border-top:1px solid #E6C052;margin:24px 0;" />
      <p style="white-space:pre-wrap;line-height:1.6;">${message}</p>
      <hr style="border:none;border-top:1px solid #E6C052;margin:24px 0;" />
      <p style="font-size:12px;color:#888;">Sent via Mars Hill Apologetics contact form</p>
    </div>
  `;

  const confirmHtml = `
    <div style="font-family:Georgia,serif;max-width:600px;color:#0D1B2A;padding:32px;">
      <h2 style="color:#E6C052;margin-bottom:16px;">Your message was received.</h2>
      <p>Dear ${name},</p>
      <p style="line-height:1.6;">Thank you for reaching out to Mars Hill Apologetics. John Leonetti will read your message and respond personally.</p>
      <blockquote style="border-left:3px solid #E6C052;padding-left:16px;font-style:italic;margin:24px 0;">
        "Always be prepared to give an answer." — 1 Peter 3:15
      </blockquote>
      <p>Soli Deo Gloria,<br/><strong>Mars Hill Apologetics</strong></p>
    </div>
  `;

  const sendEmail = (to: string, toReplyTo: string | undefined, subj: string, html: string) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromAddress,
        to: [to],
        ...(toReplyTo ? { reply_to: toReplyTo } : {}),
        subject: subj,
        html,
      }),
    });

  try {
    const [notif, confirm] = await Promise.allSettled([
      sendEmail(ADMIN_EMAIL, email, `[Contact] ${subject}`, notifHtml),
      sendEmail(email, undefined, "We received your message — Mars Hill Apologetics", confirmHtml),
    ]);

    const notifOk = notif.status === "fulfilled" && notif.value.ok;
    if (!notifOk) {
      const errText =
        notif.status === "fulfilled"
          ? await notif.value.text().catch(() => "unknown")
          : String((notif as PromiseRejectedResult).reason);
      console.error("Notification email failed:", errText);
      return new Response(JSON.stringify({ error: "Failed to send notification email" }), { status: 500, headers: cors });
    }

    if (confirm.status === "rejected" || (confirm.status === "fulfilled" && !confirm.value.ok)) {
      console.warn("Confirmation email to visitor failed — notification to admin succeeded.");
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: cors });
  } catch (err) {
    console.error("Contact API error:", err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), { status: 500, headers: cors });
  }
}
