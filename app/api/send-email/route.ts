import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { to, subject, html } = await req.json();

    if (!to || !subject || !html) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    if (!smtpHost) {
      // Email not configured — silently succeed
      return NextResponse.json({ ok: true, mock: true });
    }

    const { createTransport } = await import("nodemailer");
    const transporter = createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || "Lefu Restaurace <info@lefu-restaurace.cz>",
      to,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Email send failed" }, { status: 500 });
  }
}
