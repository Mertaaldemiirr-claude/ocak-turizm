"use client";

import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";
import type { SiteSettings } from "@/sanity/lib/types";
import { useTranslation, useLocalePath } from "./LocaleProvider";

interface Props {
  settings: SiteSettings | null;
}

export default function Footer({ settings }: Props) {
  const { dict } = useTranslation();
  const lp = useLocalePath();
  const t = dict.footer;

  const quickLinks = [
    { name: dict.nav.home, href: lp("/") },
    { name: dict.nav.tours, href: lp("/turlar") },
    { name: t.tourRequest, href: lp("/ozel-tur-talebi") },
    { name: dict.nav.about, href: lp("/hakkimizda") },
    { name: dict.nav.contact, href: lp("/iletisim") },
  ];

  const destinationLinks = [
    { name: "Mısır", href: lp("/turlar?destinasyon=misir") },
    { name: "Fas", href: lp("/turlar?destinasyon=fas") },
    { name: "Özbekistan", href: lp("/turlar?destinasyon=ozbekistan") },
    { name: "Bosna Hersek", href: lp("/turlar?destinasyon=bosna-hersek") },
  ];

  const phone = settings?.phone || "+90 555 123 4567";
  const email = settings?.email || "info@ocakturizm.com";
  const address = settings?.address || "İstanbul, Türkiye";
  const whatsapp = settings?.whatsapp || "905551234567";
  const instagram = settings?.instagram || "#";
  const facebook = settings?.facebook || "#";
  const tursabNo = settings?.tursabNo || "XXXXX";

  return (
    <footer id="iletisim" className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="font-heading font-bold text-xl mb-3">
              Ocak<span className="text-gold ml-0.5">.</span>
              <span className="text-xs font-normal text-white/50 ml-1 tracking-widest uppercase">Turizm</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              {t.description}
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaInstagram, href: instagram, label: "Instagram" },
                { icon: FaFacebookF, href: facebook, label: "Facebook" },
                { icon: FaWhatsapp, href: `https://wa.me/${whatsapp}`, label: "WhatsApp" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-9 h-9 bg-white/10 hover:bg-gold rounded-lg flex items-center justify-center transition-colors text-sm">
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/50 hover:text-gold text-sm transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">{t.countries}</h4>
            <ul className="space-y-2.5">
              {destinationLinks.map((dest) => (
                <li key={dest.name}>
                  <a href={dest.href} className="text-white/50 hover:text-gold text-sm transition-colors">{dest.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">{t.contact}</h4>
            <div className="space-y-2.5 text-white/50 text-sm">
              <p>{phone}</p>
              <p>{email}</p>
              <p>{address}</p>
              <p className="pt-2 text-xs text-white/30">TURSAB Belge No: {tursabNo}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Ocak Turizm. {t.rights}
          </p>
          <div className="flex gap-4">
            <a href={lp("/gizlilik-politikasi")} className="text-white/30 hover:text-gold text-xs transition-colors">
              {t.privacy}
            </a>
            <a href={lp("/iade-politikasi")} className="text-white/30 hover:text-gold text-xs transition-colors">
              {t.refund}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
