"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTranslation } from "./LocaleProvider";

interface TourInfo {
  name: string;
  slug: string;
  date: string;
  days: number;
  price: number;
  singlePrice?: number;
  childPrice?: number;
  infantPrice?: number;
  currency: string;
  sym: string;
}

interface Participant {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  roomPreference: "double" | "single";
}

function emptyParticipant(): Participant {
  return { firstName: "", lastName: "", phone: "", email: "", roomPreference: "double" };
}

export default function ReservationClient({
  tour,
  lang,
}: {
  tour: TourInfo;
  lang: string;
}) {
  const { dict } = useTranslation();
  const t = dict.reservationPage;

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [adultForms, setAdultForms] = useState<Participant[]>([emptyParticipant(), emptyParticipant()]);
  const [childForms, setChildForms] = useState<Participant[]>([]);
  const [infantForms, setInfantForms] = useState<Participant[]>([]);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const localeForNumber = lang === "tr" ? "tr-TR" : lang === "de" ? "de-DE" : lang === "fr" ? "fr-FR" : lang === "es" ? "es-ES" : "en-US";

  const updateCount = (
    type: "adult" | "child" | "infant",
    delta: number
  ) => {
    if (type === "adult") {
      const next = Math.max(1, Math.min(10, adults + delta));
      setAdults(next);
      setAdultForms((prev) => {
        if (next > prev.length) return [...prev, ...Array(next - prev.length).fill(null).map(() => emptyParticipant())];
        return prev.slice(0, next);
      });
    } else if (type === "child") {
      const next = Math.max(0, Math.min(10, children + delta));
      setChildren(next);
      setChildForms((prev) => {
        if (next > prev.length) return [...prev, ...Array(next - prev.length).fill(null).map(() => emptyParticipant())];
        return prev.slice(0, next);
      });
    } else {
      const next = Math.max(0, Math.min(10, infants + delta));
      setInfants(next);
      setInfantForms((prev) => {
        if (next > prev.length) return [...prev, ...Array(next - prev.length).fill(null).map(() => emptyParticipant())];
        return prev.slice(0, next);
      });
    }
  };

  const updateForm = (
    type: "adult" | "child" | "infant",
    index: number,
    field: keyof Participant,
    value: string
  ) => {
    const setter = type === "adult" ? setAdultForms : type === "child" ? setChildForms : setInfantForms;
    setter((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  };

  const totalPrice = useMemo(() => {
    let total = 0;
    for (const af of adultForms) {
      total += tour.price;
      if (af.roomPreference === "single" && tour.singlePrice) {
        total += tour.singlePrice;
      }
    }
    total += children * (tour.childPrice ?? tour.price);
    total += infants * (tour.infantPrice ?? 0);
    return total;
  }, [adultForms, children, infants, tour]);

  const totalPeople = adults + children + infants;

  const handleSubmit = async () => {
    setError("");

    // Validate
    for (let i = 0; i < adultForms.length; i++) {
      const f = adultForms[i];
      if (!f.firstName.trim() || !f.lastName.trim()) {
        setError(t.fillAllFields);
        return;
      }
      if (i === 0 && !f.phone.trim()) {
        setError(t.fillAllFields);
        return;
      }
    }
    for (const f of childForms) {
      if (!f.firstName.trim() || !f.lastName.trim()) {
        setError(t.fillAllFields);
        return;
      }
    }
    for (const f of infantForms) {
      if (!f.firstName.trim() || !f.lastName.trim()) {
        setError(t.fillAllFields);
        return;
      }
    }
    if (!privacyChecked || !termsChecked) {
      setError(t.fillAllFields);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourName: tour.name,
          tourSlug: tour.slug,
          tourDate: tour.date,
          adults: adultForms,
          children: childForms,
          infants: infantForms,
          totalPrice,
          currency: tour.currency,
        }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(t.fillAllFields);
      }
    } catch {
      setError(t.fillAllFields);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 pb-16 text-center">
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-heading font-bold text-primary text-2xl mb-3">{t.successTitle}</h2>
          <p className="text-gray-500 text-sm mb-6">{t.successMessage}</p>
          <div className="flex gap-3 justify-center">
            <Link
              href={`/${lang}/turlar/${tour.slug}`}
              className="px-6 py-3 bg-primary hover:bg-gold text-white font-semibold rounded-lg text-sm transition-colors"
            >
              {t.backToTour}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Form (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Participant Count */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-heading font-bold text-primary text-lg mb-5">{t.participants}</h2>
            <div className="space-y-4">
              <CounterRow label={t.adult} value={adults} min={1} onChange={(d) => updateCount("adult", d)} />
              {tour.childPrice != null && (
                <CounterRow label={t.child} value={children} min={0} onChange={(d) => updateCount("child", d)} />
              )}
              {tour.infantPrice != null && (
                <CounterRow label={t.infant} value={infants} min={0} onChange={(d) => updateCount("infant", d)} />
              )}
            </div>
          </div>

          {/* Participant Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-heading font-bold text-primary text-lg mb-5">{t.participantDetails}</h2>
            <div className="space-y-6">
              {/* Adults */}
              {adultForms.map((form, i) => (
                <ParticipantForm
                  key={`adult-${i}`}
                  label={t.adultN.replace("{n}", String(i + 1))}
                  isMain={i === 0}
                  showPhone={i === 0}
                  showEmail={i === 0}
                  showRoom={tour.singlePrice != null}
                  form={form}
                  onChange={(field, value) => updateForm("adult", i, field, value)}
                  t={t}
                  color="bg-primary"
                />
              ))}
              {/* Children */}
              {childForms.map((form, i) => (
                <ParticipantForm
                  key={`child-${i}`}
                  label={t.childN.replace("{n}", String(i + 1))}
                  isMain={false}
                  showPhone={false}
                  showEmail={false}
                  showRoom={false}
                  form={form}
                  onChange={(field, value) => updateForm("child", i, field, value)}
                  t={t}
                  color="bg-cyan-600"
                />
              ))}
              {/* Infants */}
              {infantForms.map((form, i) => (
                <ParticipantForm
                  key={`infant-${i}`}
                  label={t.infantN.replace("{n}", String(i + 1))}
                  isMain={false}
                  showPhone={false}
                  showEmail={false}
                  showRoom={false}
                  form={form}
                  onChange={(field, value) => updateForm("infant", i, field, value)}
                  t={t}
                  color="bg-amber-500"
                />
              ))}
            </div>
          </div>

          {/* Agreements & Submit */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="space-y-3 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacyChecked}
                  onChange={(e) => setPrivacyChecked(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-600">
                  <Link href={`/${lang}/gizlilik-politikasi`} className="text-primary underline" target="_blank">
                    {t.privacyConsent}
                  </Link>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsChecked}
                  onChange={(e) => setTermsChecked(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-600">
                  <Link href={`/${lang}/iade-politikasi`} className="text-primary underline" target="_blank">
                    {t.termsConsent}
                  </Link>
                </span>
              </label>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-primary hover:bg-gold text-white font-semibold py-4 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? t.submitting : t.submit}
            </button>
          </div>
        </div>

        {/* Right: Summary (1/3) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-[120px]">
            <h3 className="font-heading font-bold text-primary text-lg mb-4">{t.summary}</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">{t.tourDate}</span>
                <span className="font-medium text-gray-700">{tour.date}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">{t.duration}</span>
                <span className="font-medium text-gray-700">{tour.days} {t.days}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">{t.participantCount}</span>
                <span className="font-medium text-gray-700">{totalPeople} {t.people}</span>
              </div>
              <div className="py-2 border-b border-gray-100">
                <span className="text-gray-500 text-xs">{t.distribution}</span>
                <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                  <div>{t.adult}: {adults}</div>
                  {children > 0 && <div>{t.child}: {children}</div>}
                  {infants > 0 && <div>{t.infant}: {infants}</div>}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t-2 border-primary/20">
              <div className="flex justify-between items-center">
                <span className="font-heading font-bold text-primary text-base">{t.totalPrice}</span>
                <span className="font-heading font-bold text-gold text-xl">
                  {tour.sym}{totalPrice.toLocaleString(localeForNumber)}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{tour.currency}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Sub-components ---- */

function CounterRow({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  onChange: (delta: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(-1)}
          disabled={value <= min}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <span className="w-8 text-center font-heading font-bold text-primary text-lg">{value}</span>
        <button
          onClick={() => onChange(1)}
          disabled={value >= 10}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function ParticipantForm({
  label,
  isMain,
  showPhone,
  showEmail,
  showRoom,
  form,
  onChange,
  t,
  color,
}: {
  label: string;
  isMain: boolean;
  showPhone: boolean;
  showEmail: boolean;
  showRoom: boolean;
  form: Participant;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (field: keyof Participant, value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
  color: string;
}) {
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <div className={`${color} text-white px-4 py-2.5 flex items-center gap-2`}>
        <span className="text-sm font-semibold">{label}</span>
        {isMain && (
          <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
            {t.mainPerson}
          </span>
        )}
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">{t.firstName} *</label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">{t.lastName} *</label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        {showPhone && (
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.phone} *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        )}
        {showEmail && (
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.email}</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        )}
        {showRoom && (
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.roomPreference}</label>
            <select
              value={form.roomPreference}
              onChange={(e) => onChange("roomPreference", e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
            >
              <option value="double">{t.doubleRoom}</option>
              <option value="single">{t.singleRoom}</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
