"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { HiX } from "react-icons/hi";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl shadow-navy/10 p-4 max-w-[220px] relative"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-navy-light/40 hover:text-navy transition-colors"
              aria-label="Close"
            >
              <HiX className="text-sm" />
            </button>
            <p className="text-navy text-sm font-medium pr-4">
              Merhaba! Size nasil yardimci olabiliriz?
            </p>
            <p className="text-navy-light/60 text-xs mt-1">
              Hemen yazin, cevaplayalim
            </p>
            {/* Arrow */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 shadow-lg" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <a
        href="https://wa.me/905551234567?text=Merhaba%2C%20Ocak%20Turizm%27den%20bilgi%20almak%20istiyorum."
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-[#25D366] hover:bg-[#20bd5a] text-white w-14 h-14 rounded-2xl shadow-lg shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 transition-all hover:scale-110 active:scale-100 flex items-center justify-center group"
        aria-label="WhatsApp ile iletisim"
      >
        <span className="absolute inset-0 rounded-2xl bg-[#25D366] animate-pulse-ring" />
        <FaWhatsapp className="text-2xl relative z-10 group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  );
}
