"use client";

import { useState } from "react";
import { useTranslation } from "./LocaleProvider";

export default function CustomTourForm() {
  const { dict } = useTranslation();
  const t = dict.customTourPage;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    people: "",
    accommodation: "",
    destinations: "",
    notes: "",
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
          {t.newRequest}
        </button>
      </div>
    );
  }

  return (
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
          <input type="tel" name="phone" required value={form.phone} onChange={handleChange} className={inputClasses} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">{t.email} *</label>
        <input type="email" name="email" required value={form.email} onChange={handleChange} className={inputClasses} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">{t.startDate} *</label>
          <input type="date" name="startDate" required value={form.startDate} onChange={handleChange} className={inputClasses} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">{t.endDate} *</label>
          <input type="date" name="endDate" required value={form.endDate} onChange={handleChange} className={inputClasses} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">{t.participants} *</label>
          <input type="number" name="people" min="1" required value={form.people} onChange={handleChange} className={inputClasses} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">{t.accommodation} *</label>
        <select name="accommodation" required value={form.accommodation} onChange={handleChange} className={inputClasses}>
          <option value="">{t.select}</option>
          <option value="3-star">{t["3star"]}</option>
          <option value="4-star">{t["4star"]}</option>
          <option value="5-star">{t["5star"]}</option>
          <option value="boutique">{t.boutique}</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">{t.placesToVisit} *</label>
        <input type="text" name="destinations" required value={form.destinations} onChange={handleChange} className={inputClasses} placeholder={t.placesPlaceholder} />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">{t.notes}</label>
        <textarea name="notes" rows={4} value={form.notes} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder={t.notesPlaceholder} />
      </div>

      <button type="submit" className="w-full bg-primary hover:bg-gold text-white font-heading font-semibold py-3 rounded-lg transition-colors text-sm">
        {t.submit}
      </button>
    </form>
  );
}
