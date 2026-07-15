"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm bg-white";

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-xl text-primary mb-2">Mesajiniz Alindi!</h3>
        <p className="text-gray-500 text-sm mb-6">En kisa surede sizinle iletisime gececegiz.</p>
        <button onClick={() => setSubmitted(false)} className="text-gold hover:underline text-sm font-semibold">
          Yeni Mesaj Gonder
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm border border-gray-100">
      <h3 className="font-heading font-bold text-lg text-primary mb-1">Mesaj Gonderin</h3>
      <p className="text-gray-400 text-xs mb-3">Tum alanlar zorunludur</p>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Ad Soyad *</label>
        <input type="text" name="name" required value={form.name} onChange={handleChange} className={inputClasses} placeholder="Adiniz Soyadiniz" />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">E-posta *</label>
        <input type="email" name="email" required value={form.email} onChange={handleChange} className={inputClasses} placeholder="ornek@email.com" />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Telefon</label>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputClasses} placeholder="0555 123 4567" />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Mesajiniz *</label>
        <textarea name="message" rows={5} required value={form.message} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder="Mesajinizi yazin..." />
      </div>

      <button type="submit" className="w-full bg-primary hover:bg-gold text-white font-heading font-semibold py-3 rounded-lg transition-colors text-sm">
        Mesaj Gonder
      </button>
    </form>
  );
}
