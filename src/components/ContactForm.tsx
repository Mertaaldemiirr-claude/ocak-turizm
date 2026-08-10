"use client";

import { useState } from "react";
import { useTranslation } from "./LocaleProvider";

export default function ContactForm() {
  const { dict } = useTranslation();
  const t = dict.contactPage;
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
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
        <h3 className="font-heading font-bold text-xl text-primary mb-2">{t.successTitle}</h3>
        <p className="text-gray-500 text-sm mb-6">{t.successMessage}</p>
        <button onClick={() => setSubmitted(false)} className="text-gold hover:underline text-sm font-semibold">
          {t.newMessage}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm border border-gray-100">
      <h3 className="font-heading font-bold text-lg text-primary mb-1">{t.formTitle}</h3>
      <p className="text-gray-400 text-xs mb-3">{t.formSubtitle}</p>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">{t.name} *</label>
        <input type="text" name="name" required value={form.name} onChange={handleChange} className={inputClasses} placeholder={t.namePlaceholder} />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">{t.emailLabel} *</label>
        <input type="email" name="email" required value={form.email} onChange={handleChange} className={inputClasses} />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">{t.phoneLabel}</label>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputClasses} />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">{t.messageLabel} *</label>
        <textarea name="message" rows={5} required value={form.message} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder={t.messagePlaceholder} />
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-3">{t.errorMessage}</p>
      )}

      <button type="submit" disabled={submitting} className="w-full bg-primary hover:bg-gold text-white font-heading font-semibold py-3 rounded-lg transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed">
        {submitting ? t.sending : t.submit}
      </button>
    </form>
  );
}
