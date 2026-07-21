"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { HiMenu, HiX, HiSearch } from "react-icons/hi";
import type { SiteSettings } from "@/sanity/lib/types";
import { useTranslation, useLocalePath } from "./LocaleProvider";
import LanguageSwitcher from "./LanguageSwitcher";

interface Props {
  settings: SiteSettings | null;
}

export default function Navbar({ settings }: Props) {
  const { dict } = useTranslation();
  const lp = useLocalePath();
  const t = dict.nav;

  const navLinks = [
    { name: t.home, href: lp("/") },
    { name: t.tours, href: lp("/turlar") },
    { name: t.about, href: lp("/hakkimizda") },
    { name: t.gallery, href: lp("/galeri") },
    { name: t.blog, href: lp("/blog") },
    { name: t.contact, href: lp("/iletisim") },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const phone = settings?.phone || "+90 555 123 4567";
  const whatsapp = settings?.whatsapp || "905551234567";
  const instagram = settings?.instagram || "#";
  const facebook = settings?.facebook || "#";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}>
      <div className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-10 text-sm">
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-gold transition-colors">
            <FaPhoneAlt className="text-xs" />
            <span>{phone}</span>
          </a>
          <div className="flex items-center gap-4">
            <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold transition-colors">
              <FaInstagram />
            </a>
            <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gold transition-colors">
              <FaFacebookF className="text-xs" />
            </a>
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-gold transition-colors">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <a href={lp("/")} className="font-heading font-bold text-xl text-primary">
            Ocak<span className="text-gold ml-0.5">.</span>
            <span className="text-xs font-normal text-gray-400 ml-1 tracking-widest uppercase">Turizm</span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <span key={link.name} className="flex items-center">
                <a href={link.href} className="text-gray-600 hover:text-primary font-medium text-sm px-3 py-2 transition-colors">
                  {link.name}
                </a>
                {i < navLinks.length - 1 && <span className="text-gray-300 text-xs">|</span>}
              </span>
            ))}
            <div className="relative flex items-center ml-2">
              {searchOpen && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchTerm.trim()) {
                      router.push(`${lp("/turlar")}?q=${encodeURIComponent(searchTerm.trim())}`);
                      setSearchOpen(false);
                      setSearchTerm("");
                    }
                  }}
                  className="absolute right-8 top-1/2 -translate-y-1/2"
                >
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    autoFocus
                    onBlur={() => {
                      if (!searchTerm.trim()) setSearchOpen(false);
                    }}
                    className="w-44 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-primary transition-colors"
                  />
                </form>
              )}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-gray-500 hover:text-primary p-2 transition-colors"
                aria-label="Search"
              >
                <HiSearch className="text-lg" />
              </button>
            </div>
            <LanguageSwitcher />
            <a href="#rezervasyon" className="ml-1 bg-primary hover:bg-gold text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
              {t.tourRequest}
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button className="text-primary text-2xl p-1" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-primary font-medium text-sm py-2.5 border-b border-gray-50 transition-colors">
                  {link.name}
                </a>
              ))}
              <a href="#rezervasyon" onClick={() => setMobileOpen(false)} className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center mt-2 hover:bg-gold transition-colors">
                {t.tourRequest}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
