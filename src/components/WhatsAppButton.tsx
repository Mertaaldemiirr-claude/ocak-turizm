"use client";

import { FaWhatsapp } from "react-icons/fa";
import type { SiteSettings } from "@/sanity/lib/types";

interface Props {
  settings: SiteSettings | null;
}

export default function WhatsAppButton({ settings }: Props) {
  const whatsapp = settings?.whatsapp || "905551234567";

  return (
    <a
      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Merhaba, Ocak Turizm'den bilgi almak istiyorum.")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
      aria-label="WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
      <FaWhatsapp className="text-2xl relative z-10" />
    </a>
  );
}
