"use client";

import { useState } from "react";
import { useTranslation } from "./LocaleProvider";

interface Props {
  program: { day: number; title: string; details: string }[];
  included?: string[];
  excluded?: string[];
  importantNotes?: string[];
  tourFaq?: { question: string; answer: string }[];
  tourFileUrl?: string;
}

type Tab = "program" | "included" | "notes" | "file" | "faq";

export default function TourDetailClient({
  program,
  included,
  excluded,
  importantNotes,
  tourFaq,
  tourFileUrl,
}: Props) {
  const { dict } = useTranslation();
  const t = dict.tourDetail;
  const [activeTab, setActiveTab] = useState<Tab>("program");
  const [openDay, setOpenDay] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number>(-1);

  const tabs: { key: Tab; label: string }[] = [
    { key: "program", label: t.program },
    { key: "included", label: t.includedExcluded },
    { key: "notes", label: t.importantNotes },
    { key: "file", label: t.tourFile },
    { key: "faq", label: t.faq },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* STM-style pill tabs */}
      <div className="flex flex-wrap gap-2 p-4 border-b border-gray-100 bg-gray-50">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab.key
                ? "bg-primary text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 sm:p-8">
        {/* Program Tab */}
        {activeTab === "program" && (
          <div className="space-y-3">
            {program.length > 0 ? (
              program.map((item, i) => (
                <div
                  key={i}
                  className="border border-gray-100 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenDay(openDay === i ? -1 : i)}
                    className={`w-full flex items-center gap-4 p-4 text-left transition-colors ${
                      openDay === i ? "bg-primary/5" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-heading font-bold text-sm shrink-0">
                      {item.day}
                    </div>
                    <div className="flex-1">
                      <span className="font-heading font-semibold text-primary text-sm">
                        {item.day}. {t.dayLabel}
                      </span>
                      <span className="text-gray-600 text-sm ml-1">{item.title}</span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0 ${
                        openDay === i ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDay === i && (
                    <div className="px-4 pb-4 ml-14">
                      <p className="text-gray-600 text-sm leading-[1.7] whitespace-pre-line">
                        {item.details}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">{t.notAdded}</p>
            )}
          </div>
        )}

        {/* Dahil / Hariç Tab */}
        {activeTab === "included" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {included && included.length > 0 && (
              <div>
                <h3 className="font-heading font-bold text-primary text-lg mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t.included}
                </h3>
                <ul className="space-y-2.5">
                  {included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {excluded && excluded.length > 0 && (
              <div>
                <h3 className="font-heading font-bold text-primary text-lg mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {t.excluded}
                </h3>
                <ul className="space-y-2.5">
                  {excluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                      <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!included?.length && !excluded?.length && (
              <p className="text-gray-400 text-sm">{t.notAdded}</p>
            )}
          </div>
        )}

        {/* Önemli Notlar Tab */}
        {activeTab === "notes" && (
          <div>
            {importantNotes && importantNotes.length > 0 ? (
              <ol className="space-y-3">
                {importantNotes.map((note, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-600">
                    <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed pt-0.5">{note}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-400 text-sm">{t.notAdded}</p>
            )}
          </div>
        )}

        {/* Tur Dosyası Tab */}
        {activeTab === "file" && (
          <div>
            {tourFileUrl ? (
              <a
                href={tourFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {t.downloadPdf}
              </a>
            ) : (
              <p className="text-gray-400 text-sm">{t.notAdded}</p>
            )}
          </div>
        )}

        {/* SSS Tab */}
        {activeTab === "faq" && (
          <div className="space-y-3">
            {tourFaq && tourFaq.length > 0 ? (
              tourFaq.map((item, i) => (
                <div
                  key={i}
                  className="border border-gray-100 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className={`w-full flex items-center gap-4 p-4 text-left transition-colors ${
                      openFaq === i ? "bg-primary/5" : "hover:bg-gray-50"
                    }`}
                  >
                    <svg className="w-5 h-5 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-heading font-semibold text-primary text-sm flex-1">
                      {item.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 pl-14">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">{t.notAdded}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
