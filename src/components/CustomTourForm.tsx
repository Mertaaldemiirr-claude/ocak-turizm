"use client";

import { useState } from "react";

export default function CustomTourForm() {
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
        <h3 className="font-heading font-bold text-xl text-primary mb-2">Talebiniz Alindi!</h3>
        <p className="text-gray-500 text-sm mb-6">Ekibimiz en kisa surede size ozel tur programinizi hazirlayacak.</p>
        <button onClick={() => setSubmitted(false)} className="text-gold hover:underline text-sm font-semibold">
          Yeni Talep Olustur
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm border border-gray-100">
      <h3 className="font-heading font-bold text-lg text-primary mb-1">Tur Talebi Formu</h3>
      <p className="text-gray-400 text-xs mb-3">Isteklerinizi detayli yazin, size en uygun programi hazirlayalim</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Ad Soyad *</label>
          <input type="text" name="name" required value={form.name} onChange={handleChange} className={inputClasses} placeholder="Adiniz Soyadiniz" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Telefon *</label>
          <input type="tel" name="phone" required value={form.phone} onChange={handleChange} className={inputClasses} placeholder="0555 123 4567" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">E-posta *</label>
        <input type="email" name="email" required value={form.email} onChange={handleChange} className={inputClasses} placeholder="ornek@email.com" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Baslangic Tarihi *</label>
          <input type="date" name="startDate" required value={form.startDate} onChange={handleChange} className={inputClasses} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Bitis Tarihi *</label>
          <input type="date" name="endDate" required value={form.endDate} onChange={handleChange} className={inputClasses} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Katilimci Sayisi *</label>
          <input type="number" name="people" min="1" required value={form.people} onChange={handleChange} className={inputClasses} placeholder="Kac kisi?" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Konaklama Tercihi *</label>
        <select name="accommodation" required value={form.accommodation} onChange={handleChange} className={inputClasses}>
          <option value="">Secin</option>
          <option value="3-star">3 Yildizli Otel</option>
          <option value="4-star">4 Yildizli Otel</option>
          <option value="5-star">5 Yildizli Otel</option>
          <option value="boutique">Butik Otel</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Gezilmek Istenen Yerler *</label>
        <input type="text" name="destinations" required value={form.destinations} onChange={handleChange} className={inputClasses} placeholder="Ornek: Istanbul, Saraybosna, Mostar..." />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Ozel Istekler veya Notlar</label>
        <textarea name="notes" rows={4} value={form.notes} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder="Ozel isteklerinizi yazin..." />
      </div>

      <button type="submit" className="w-full bg-primary hover:bg-gold text-white font-heading font-semibold py-3 rounded-lg transition-colors text-sm">
        Talebi Gonder
      </button>
    </form>
  );
}
