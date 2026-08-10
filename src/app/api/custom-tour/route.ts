import { NextResponse } from "next/server";
import { createWriteClient } from "@/lib/sanityWrite";
import { sendNotifyEmail, emailLayout, esc } from "@/lib/notifyEmail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, startDate, endDate, people, accommodation, destinations, notes } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = createWriteClient();
    if (!client) {
      console.error("SANITY_TOKEN missing — tour request cannot be stored");
      return NextResponse.json({ error: "Storage not configured" }, { status: 500 });
    }

    await client.create({
      _type: "tourRequest",
      name,
      email: email || "",
      phone,
      startDate: startDate || "",
      endDate: endDate || "",
      people: people || "",
      accommodation: accommodation || "",
      destinations: destinations || "",
      notes: notes || "",
      status: "pending",
      receivedAt: new Date().toISOString(),
    });

    await sendNotifyEmail(
      `Yeni Özel Tur Talebi — ${name}`,
      emailLayout("🗺️ Yeni Özel Tur Talebi", [
        ["Ad Soyad", esc(name)],
        ["Telefon", esc(phone)],
        ["E-posta", esc(email || "-")],
        ["Tarih", esc(`${startDate || "?"} → ${endDate || "?"}`)],
        ["Kişi Sayısı", esc(people || "-")],
        ["Konaklama", esc(accommodation || "-")],
        ["Gitmek İstediği Yerler", esc(destinations || "-")],
        ["Notlar", esc(notes || "-")],
      ])
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Custom tour request error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
