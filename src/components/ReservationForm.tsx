"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

const destinations = ["Misir", "Fas", "Ozbekistan", "Bosna Hersek"];

export default function ReservationForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    date: "",
    people: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Merhaba, Ocak Turizm'den bilgi almak istiyorum.\n\nAd: ${form.name}\nDestinasyon: ${form.destination}\nTarih: ${form.date}\nKisi Sayisi: ${form.people}\nMesaj: ${form.message}`
  );

  const whatsappLink = `https://wa.me/905551234567?text=${whatsappMessage}`;

  const inputClasses = "w-full px-5 py-3.5 rounded-xl border border-gray-light/80 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all text-sm bg-white placeholder:text-navy-light/40";

  return (
    <section id="rezervasyon" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/[0.04] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left - Info (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="section-divider" />
              <span className="text-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase">
                Iletisim
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-navy leading-tight mb-6">
              Hayalinizdeki <span className="text-gradient">Tatili</span> Planlayalim
            </h2>
            <p className="text-navy-light text-base mb-10 leading-relaxed">
              Formu doldurun veya WhatsApp uzerinden hemen bize ulasin.
              En kisa surede size donecegiz.
            </p>

            <div className="space-y-5">
              {[
                { icon: HiPhone, label: "Telefon", value: "+90 555 123 4567" },
                { icon: HiMail, label: "E-posta", value: "info@ocakturizm.com" },
                { icon: HiLocationMarker, label: "Adres", value: "Istanbul, Turkiye" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gold transition-colors duration-300">
                    <item.icon className="text-gold group-hover:text-navy text-xl transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-xs text-navy-light/60 uppercase tracking-wider">{item.label}</p>
                    <p className="font-heading font-semibold text-navy text-sm">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-0.5 w-fit group"
            >
              <FaWhatsapp className="text-2xl group-hover:scale-110 transition-transform" />
              WhatsApp ile Ulasin
            </a>
          </motion.div>

          {/* Right - Form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="bg-gray-warm rounded-3xl p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="font-heading font-bold text-2xl text-navy mb-3">
                  Talebiniz Alindi!
                </h3>
                <p className="text-navy-light mb-8">
                  En kisa surede sizinle iletisime gececegiz.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-gold font-semibold hover:underline underline-offset-4"
                >
                  Yeni Talep Olustur
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-gray-warm rounded-3xl p-8 sm:p-10 space-y-5"
              >
                <div className="mb-2">
                  <h3 className="font-heading font-bold text-xl text-navy">
                    Ucretsiz Tur Danismanligi
                  </h3>
                  <p className="text-navy-light/60 text-sm mt-1">Bilgilerinizi birakin, sizi arayalim</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-navy-light mb-1.5 uppercase tracking-wider">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Adiniz Soyadiniz"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy-light mb-1.5 uppercase tracking-wider">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="0555 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-navy-light mb-1.5 uppercase tracking-wider">
                    E-posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="ornek@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-navy-light mb-1.5 uppercase tracking-wider">
                      Destinasyon *
                    </label>
                    <select
                      name="destination"
                      required
                      value={form.destination}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">Secin</option>
                      {destinations.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy-light mb-1.5 uppercase tracking-wider">
                      Tarih
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy-light mb-1.5 uppercase tracking-wider">
                      Kisi Sayisi
                    </label>
                    <input
                      type="number"
                      name="people"
                      min="1"
                      value={form.people}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Kac kisi?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-navy-light mb-1.5 uppercase tracking-wider">
                    Mesajiniz
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClasses} resize-none`}
                    placeholder="Ozel istekleriniz veya sorulariniz..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-navy to-navy-light hover:from-navy-light hover:to-navy text-white font-heading font-semibold py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-navy/20 text-base active:translate-y-0.5"
                >
                  Ucretsiz Danismanlik Talep Et
                </button>

                <p className="text-center text-navy-light/40 text-xs">
                  Bilgileriniz gizli tutulur ve ucuncu kisilerle paylasilmaz.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
