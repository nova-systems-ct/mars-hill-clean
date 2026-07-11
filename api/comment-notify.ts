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

  let body: { page_title?: string; page_slug?: string; commenter_name?: string; comment_text?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400, headers: cors });
  }

  const { page_title = "", page_slug = "", commenter_name = "Anonymous", comment_text = "" } = body;

  if (!comment_text) {
    return new Response(JSON.stringify({ error: "comment_text is required" }), { status: 400, headers: cors });
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL ?? "Mars Hill Apologetics <noreply@nova-systems.app>";
  const submittedAt = new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short", timeZone: "America/New_York" });

  const notifHtml = `
    <div style="font-family:Georgia,serif;max-width:600px;color:#0D1B2A;padding:32px;">
      <h2 style="color:#E6C052;margin-bottom:16px;">New Comment on Mars Hill Apologetics</h2>
      <p><strong>Page:</strong> ${page_title || page_slug}</p>
      <p><strong>Commenter:</strong> ${commenter_name}</p>
      <p><strong>Submitted:</strong> ${submittedAt}</p>
      <hr style="border:none;border-top:1px solid #E6C052;margin:24px 0;" />
      <p style="white-space:pre-wrap;line-height:1.6;">${comment_text}</p>
      <hr style="border:none;border-top:1px solid #E6C052;margin:24px 0;" />
      <p>Log in to approve at <a href="https://marshillapologetics.com/admin" style="color:#0D1B2A;">marshillapologetics.com/admin</a>.</p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromAddress,
        to: [ADMIN_EMAIL],
        subject: "New Comment on Mars Hill Apologetics",
        html: notifHtml,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "unknown");
      console.error("Comment notification email failed:", errText);
      return new Response(JSON.stringify({ error: "Failed to send notification email" }), { status: 500, headers: cors });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: cors });
  } catch (err) {
    console.error("Comment notify API error:", err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), { status: 500, headers: cors });
  }
}
