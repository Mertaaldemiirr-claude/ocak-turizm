import { NextResponse } from "next/server";
import { createWriteClient } from "@/lib/sanityWrite";
import { sendNotifyEmail, emailLayout, esc } from "@/lib/notifyEmail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = createWriteClient();
    if (!client) {
      console.error("SANITY_TOKEN missing — contact message cannot be stored");
      return NextResponse.json({ error: "Storage not configured" }, { status: 500 });
    }

    await client.create({
      _type: "contactMessage",
      name,
      email,
      phone: phone || "",
      message,
      receivedAt: new Date().toISOString(),
    });

    await sendNotifyEmail(
      `Yeni İletişim Mesajı — ${name}`,
      emailLayout("✉️ Yeni İletişim Mesajı", [
        ["Ad Soyad", esc(name)],
        ["E-posta", esc(email)],
        ["Telefon", esc(phone || "-")],
        ["Mesaj", esc(message)],
      ])
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact message error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
