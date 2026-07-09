"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { name: "Ana Sayfa", href: "#anasayfa" },
  { name: "Turlar", href: "#turlar" },
  { name: "Destinasyonlar", href: "#destinasyonlar" },
  { name: "Hakkimizda", href: "#hakkimizda" },
  { name: "Yorumlar", href: "#yorumlar" },
  { name: "SSS", href: "#sss" },
  { name: "Iletisim", href: "#iletisim" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}>
      {/* Top bar */}
      <div className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-10 text-sm">
          <a href="tel:+905551234567" className="flex items-center gap-2 hover:text-gold transition-colors">
            <FaPhoneAlt className="text-xs" />
            <span>+90 555 123 4567</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold transition-colors">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gold transition-colors">
              <FaFacebookF className="text-xs" />
            </a>
            <a href="https://wa.me/905551234567" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-gold transition-colors">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#anasayfa" className="font-heading font-bold text-xl text-primary">
            Ocak<span className="text-gold ml-0.5">.</span>
            <span className="text-xs font-normal text-gray-400 ml-1 tracking-widest uppercase">Turizm</span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <span key={link.name} className="flex items-center">
                <a
                  href={link.href}
                  className="text-gray-600 hover:text-primary font-medium text-sm px-3 py-2 transition-colors"
                >
                  {link.name}
                </a>
                {i < navLinks.length - 1 && (
                  <span className="text-gray-300 text-xs">|</span>
                )}
              </span>
            ))}
            <a
              href="#rezervasyon"
              className="ml-3 bg-primary hover:bg-gold text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Tur Talebi
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-primary text-2xl p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-600 hover:text-primary font-medium text-sm py-2.5 border-b border-gray-50 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#rezervasyon"
                onClick={() => setMobileOpen(false)}
                className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center mt-2 hover:bg-gold transition-colors"
              >
                Tur Talebi Olustur
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
