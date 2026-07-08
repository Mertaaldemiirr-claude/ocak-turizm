"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { name: "Anasayfa", href: "#anasayfa" },
  { name: "Destinasyonlar", href: "#destinasyonlar" },
  { name: "Deneyimler", href: "#deneyimler" },
  { name: "Hakkimizda", href: "#hakkimizda" },
  { name: "Yorumlar", href: "#yorumlar" },
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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-xl shadow-2xl shadow-navy/20 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#anasayfa" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-navy font-heading font-bold text-xl">O</span>
            </div>
          </div>
          <div className="text-white font-heading">
            <span className="font-bold text-xl tracking-wide">Ocak</span>
            <span className="text-xs font-light ml-1.5 text-white/60 tracking-widest uppercase">Turizm</span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white/75 hover:text-white font-medium text-[13px] tracking-wide transition-all px-4 py-2 rounded-lg hover:bg-white/5 relative group"
            >
              {link.name}
              <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gold group-hover:w-1/2 transition-all duration-300 rounded-full" />
            </a>
          ))}
          <a
            href="#rezervasyon"
            className="ml-4 bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy font-semibold px-6 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            Rezervasyon Yap
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white text-2xl p-2 hover:bg-white/10 rounded-xl transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu - Full Screen */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-0 bg-navy/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 text-white text-3xl p-2"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <HiX />
            </button>
            <div className="flex flex-col items-center gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-white/90 hover:text-gold text-2xl font-heading font-medium py-3 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#rezervasyon"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                className="mt-6 bg-gradient-to-r from-gold to-gold-light text-navy font-semibold px-10 py-4 rounded-xl text-lg"
              >
                Rezervasyon Yap
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
