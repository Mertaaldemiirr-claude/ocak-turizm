"use client";

import { useState } from "react";
import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import type { SiteSettings } from "@/sanity/lib/types";
import { useTranslation } from "./LocaleProvider";

const destinations = ["Mısır", "Fas", "Özbekistan", "Bosna Hersek"];

interface Props {
  settings: SiteSettings | null;
}

export default function ReservationForm({ settings }: Props) {
  const { dict } = useTranslation();
  const t = dict.reservation;
  const phone = settings?.phone || "+90 555 123 4567";
  const email = settings?.email || "info@ocakturizm.com";
  const address = settings?.address || "İstanbul, Türkiye";
  const whatsapp = settings?.whatsapp || "905551234567";

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
    `${t.whatsappMessage}\n\n${t.name}: ${form.name}\n${t.destination}: ${form.destination}\n${t.date}: ${form.date}\n${t.people}: ${form.people}\n${t.message}: ${form.message}`
  );
  const whatsappLink = `https://wa.me/${whatsapp}?text=${whatsappMessage}`;

  const inputClasses = "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm bg-white";

  return (
    <section id="rezervasyon" className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-3">
              {t.title}
            </h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              {t.subtitle}
            </p>

            <div className="space-y-4">
              {[
                { icon: HiPhone, label: t.phone, value: phone },
                { icon: HiMail, label: t.email, value: email },
                { icon: HiLocationMarker, label: t.address, value: address },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">{item.label}</p>
                    <p className="font-heading font-semibold text-primary text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm w-fit"
            >
              <FaWhatsapp className="text-xl" />
              {t.whatsappCta}
            </a>
          </div>

          <div>
            {submitted ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-primary mb-2">{t.successTitle}</h3>
                <p className="text-gray-500 text-sm mb-6">{t.successMessage}</p>
                <button onClick={() => setSubmitted(false)} className="text-gold hover:underline text-sm font-semibold">
                  {t.newRequest}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm border border-gray-100">
                <h3 className="font-heading font-bold text-lg text-primary mb-1">{t.formTitle}</h3>
                <p className="text-gray-400 text-xs mb-3">{t.formSubtitle}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">{t.name} *</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange} className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">{t.phone} *</label>
                    <input type="tel" name="phone" required value={form.phone} onChange={handleChange} className={inputClasses} placeholder={t.phonePlaceholder} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">{t.email}</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClasses} placeholder={t.emailPlaceholder} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">{t.destination} *</label>
                    <select name="destination" required value={form.destination} onChange={handleChange} className={inputClasses}>
                      <option value="">{t.select}</option>
                      {destinations.map((d) => (<option key={d} value={d}>{d}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">{t.date}</label>
                    <input type="date" name="date" value={form.date} onChange={handleChange} className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">{t.people}</label>
                    <input type="number" name="people" min="1" value={form.people} onChange={handleChange} className={inputClasses} placeholder={t.peoplePlaceholder} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">{t.message}</label>
                  <textarea name="message" rows={3} value={form.message} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder={t.messagePlaceholder} />
                </div>

                <button type="submit" className="w-full bg-primary hover:bg-gold text-white font-heading font-semibold py-3 rounded-lg transition-colors text-sm">
                  {t.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
