import { NextResponse } from "next/server";
import { createWriteClient } from "@/lib/sanityWrite";
import { sendNotifyEmail, emailLayout, esc, sendCustomerEmail, customerLayout } from "@/lib/notifyEmail";

type Participant = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  room?: string;
};

function formatParticipants(label: string, list: Participant[] | undefined): string {
  if (!list?.length) return "";
  return (
    `${label}:\n` +
    list
      .map(
        (p, i) =>
          `  ${i + 1}. ${p.firstName || ""} ${p.lastName || ""}` +
          (p.phone ? ` | Tel: ${p.phone}` : "") +
          (p.email ? ` | E-posta: ${p.email}` : "") +
          (p.room ? ` | Oda: ${p.room}` : "")
      )
      .join("\n") +
    "\n"
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tourName, tourSlug, tourDate, adults, children, infants, totalPrice, currency } = body;

    if (!tourName || !tourSlug || !adults?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const mainPerson = adults[0];
    if (!mainPerson.firstName || !mainPerson.lastName || !mainPerson.phone) {
      return NextResponse.json({ error: "Main person info required" }, { status: 400 });
    }

    const client = createWriteClient();
    if (!client) {
      console.error("SANITY_TOKEN missing — reservation cannot be stored");
      return NextResponse.json({ error: "Storage not configured" }, { status: 500 });
    }

    const participantsText =
      formatParticipants("Yetişkinler", adults) +
      formatParticipants("Çocuklar", children) +
      formatParticipants("Bebekler", infants);

    await client.create({
      _type: "reservation",
      tourName,
      tourSlug,
      tourDate: tourDate || "",
      contactName: `${mainPerson.firstName} ${mainPerson.lastName}`,
      contactPhone: mainPerson.phone,
      contactEmail: mainPerson.email || "",
      adultCount: adults.length,
      childCount: children?.length || 0,
      infantCount: infants?.length || 0,
      totalPrice: totalPrice || 0,
      currency: currency || "",
      participants: participantsText,
      status: "pending",
      receivedAt: new Date().toISOString(),
    });

    await sendNotifyEmail(
      `Yeni Rezervasyon: ${tourName} — ${mainPerson.firstName} ${mainPerson.lastName}`,
      emailLayout("🧾 Yeni Rezervasyon", [
        ["Tur", esc(tourName)],
        ["Tarih", esc(tourDate)],
        ["Ad Soyad", esc(`${mainPerson.firstName} ${mainPerson.lastName}`)],
        ["Telefon", esc(mainPerson.phone)],
        ["E-posta", esc(mainPerson.email || "-")],
        ["Kişiler", `${adults.length} yetişkin, ${children?.length || 0} çocuk, ${infants?.length || 0} bebek`],
        ["Toplam", `${esc(totalPrice)} ${esc(currency)}`],
        ["Katılımcılar", esc(participantsText)],
      ])
    );

    await sendCustomerEmail(
      mainPerson.email,
      `Rezervasyon talebiniz alındı — ${tourName}`,
      customerLayout(
        `${mainPerson.firstName} ${mainPerson.lastName}`,
        "Rezervasyon talebiniz bize ulaştı. Ekibimiz en kısa sürede kontenjan ve ödeme bilgileri için sizinle iletişime geçecek. Kesin kayıt, ön ödeme sonrası yapılmaktadır.",
        [
          ["Tur", esc(tourName)],
          ["Tarih", esc(tourDate)],
          ["Kişiler", `${adults.length} yetişkin, ${children?.length || 0} çocuk, ${infants?.length || 0} bebek`],
          ["Tahmini Toplam", `${esc(totalPrice)} ${esc(currency)}`],
        ]
      )
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reservation error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
