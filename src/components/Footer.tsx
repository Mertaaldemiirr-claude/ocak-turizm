"use client";

import { FaWhatsapp, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

const quickLinks = [
  { name: "Anasayfa", href: "#anasayfa" },
  { name: "Destinasyonlar", href: "#destinasyonlar" },
  { name: "Deneyimler", href: "#deneyimler" },
  { name: "Hakkimizda", href: "#hakkimizda" },
  { name: "Iletisim", href: "#iletisim" },
];

const destinations = [
  { name: "Misir Turlari", href: "#destinasyonlar" },
  { name: "Fas Turlari", href: "#destinasyonlar" },
  { name: "Ozbekistan Turlari", href: "#destinasyonlar" },
  { name: "Bosna Hersek Turlari", href: "#destinasyonlar" },
];

const socialLinks = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
  { icon: FaWhatsapp, href: "https://wa.me/905551234567", label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer id="iletisim" className="bg-navy-dark text-white relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* CTA Banner */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-2">
                Hayalinizdeki tatile hazir misiniz?
              </h3>
              <p className="text-white/50 text-lg">
                Hemen iletisime gecin, size ozel bir plan hazirlayalim.
              </p>
            </div>
            <a
              href="#rezervasyon"
              className="bg-gradient-to-r from-gold to-gold-light text-navy font-semibold px-10 py-4 rounded-xl text-base transition-all hover:shadow-2xl hover:shadow-gold/20 hover:-translate-y-1 shrink-0"
            >
              Ucretsiz Danismanlik
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                <span className="text-navy font-heading font-bold text-xl">O</span>
              </div>
              <div className="font-heading">
                <span className="font-bold text-xl tracking-wide">Ocak</span>
                <span className="text-xs font-light ml-1.5 text-white/60 tracking-widest uppercase">Turizm</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Kesfet. Deneyimle. Hatirla.
              <br />
              Unutulmaz seyahat deneyimleri icin yaninizdayiz.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/5 hover:bg-gold rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/20"
                >
                  <social.icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-white/80 mb-5">
              Hizli Erisim
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-gold text-sm transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-white/80 mb-5">
              Destinasyonlar
            </h4>
            <ul className="space-y-3">
              {destinations.map((dest) => (
                <li key={dest.name}>
                  <a
                    href={dest.href}
                    className="text-white/40 hover:text-gold text-sm transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {dest.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-white/80 mb-5">
              Iletisim
            </h4>
            <div className="space-y-4 text-white/40 text-sm">
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-gold/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Istanbul, Turkiye</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-gold/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>+90 555 123 4567</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-gold/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>info@ocakturizm.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-sm">
            &copy; 2026 Ocak Turizm. Tum haklari saklidir.
          </p>
          <p className="text-white/25 text-xs">
            TURSAB Belge No: XXXXX
          </p>
        </div>
      </div>
    </footer>
  );
}
