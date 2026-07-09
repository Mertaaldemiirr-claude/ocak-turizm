"use client";

import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

const quickLinks = [
  { name: "Ana Sayfa", href: "#anasayfa" },
  { name: "Turlar", href: "#turlar" },
  { name: "Tur Talebi", href: "#rezervasyon" },
  { name: "Hakkimizda", href: "#hakkimizda" },
  { name: "Iletisim", href: "#iletisim" },
];

const destinations = [
  { name: "Misir Turlari", href: "#turlar" },
  { name: "Fas Turlari", href: "#turlar" },
  { name: "Ozbekistan Turlari", href: "#turlar" },
  { name: "Bosna Hersek Turlari", href: "#turlar" },
];

export default function Footer() {
  return (
    <footer id="iletisim" className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="font-heading font-bold text-xl mb-3">
              Ocak<span className="text-gold ml-0.5">.</span>
              <span className="text-xs font-normal text-white/50 ml-1 tracking-widest uppercase">Turizm</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Islami degerlere uygun, helal konaklama ve namaz duzenli
              tur organizasyonlari ile gonul rahatligiyla seyahat edin.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaInstagram, href: "#", label: "Instagram" },
                { icon: FaFacebookF, href: "#", label: "Facebook" },
                { icon: FaWhatsapp, href: "https://wa.me/905551234567", label: "WhatsApp" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 bg-white/10 hover:bg-gold rounded-lg flex items-center justify-center transition-colors text-sm"
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Hizli Linkler</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/50 hover:text-gold text-sm transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Ulkeler</h4>
            <ul className="space-y-2.5">
              {destinations.map((dest) => (
                <li key={dest.name}>
                  <a href={dest.href} className="text-white/50 hover:text-gold text-sm transition-colors">
                    {dest.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Iletisim</h4>
            <div className="space-y-2.5 text-white/50 text-sm">
              <p>+90 555 123 4567</p>
              <p>info@ocakturizm.com</p>
              <p>Istanbul, Turkiye</p>
              <p className="pt-2 text-xs text-white/30">TURSAB Belge No: XXXXX</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-white/30 text-xs">
            &copy; 2026 Ocak Turizm. Tum haklari saklidir.
          </p>
        </div>
      </div>
    </footer>
  );
}
