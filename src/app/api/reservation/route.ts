import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

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

    const supabase = createServiceClient();
    if (supabase) {
      await supabase.from("reservations").insert({
        tour_name: tourName,
        tour_slug: tourSlug,
        tour_date: tourDate,
        contact_name: `${mainPerson.firstName} ${mainPerson.lastName}`,
        contact_phone: mainPerson.phone,
        contact_email: mainPerson.email || null,
        adult_count: adults.length,
        child_count: children?.length || 0,
        infant_count: infants?.length || 0,
        participants: { adults, children, infants },
        total_price: totalPrice,
        currency,
        status: "pending",
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
