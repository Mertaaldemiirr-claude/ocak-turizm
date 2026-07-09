"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

const faqs = [
  {
    question: "Turlarda helal yemek garantisi var mi?",
    answer: "Evet, tum turlarimizda helal yemek garantisi sunuyoruz. Oteller ve restoranlar helal mutfak sertifikasina gore secilir. Domuz eti iceren urunler kesinlikle bulunmaz.",
  },
  {
    question: "Namaz vakitleri tur programina dahil mi?",
    answer: "Kesinlikle. Tur programlarimiz namaz vakitlerine gore planlanir. Her mola noktasinda yakindaki camiler belirlenir ve namaz icin yeterli sure ayrilir.",
  },
  {
    question: "Otellerde alkol servisi var mi?",
    answer: "Mumkun oldugunca alkolsuz oteller tercih ediyoruz. Bazi destinasyonlarda tamamen alkolsuz otel bulunamayabilir; bu durumda odada minibar bos olarak ayarlanir ve alkol servisi yapilmayan katlar tercih edilir.",
  },
  {
    question: "Kadinlar icin ayri havuz veya plaj imkani var mi?",
    answer: "Destinasyona gore kadinlara ozel havuz veya plaj saatleri olan oteller tercih ediyoruz. Detayli bilgi icin ilgilendiginiz turu sorun, size en uygun secenegi sunalim.",
  },
  {
    question: "Rezervasyon nasil yapilir?",
    answer: "Web sitemizdeki formu doldurarak veya WhatsApp uzerinden bize ulasarak kolayca rezervasyon yapabilirsiniz. Talebiniz alinir alinmaz sizinle iletisime geceriz.",
  },
  {
    question: "Tur fiyatlarina neler dahildir?",
    answer: "Ucak bileti, helal konaklama, transferler, Turkce rehberlik hizmeti ve tur programindaki tum geziler dahildir. Detayli bilgi her turun kendi sayfasinda belirtilmektedir.",
  },
  {
    question: "Odeme yontemleri nelerdir?",
    answer: "Banka havalesi/EFT, kredi karti ve taksitli odeme seceneklerimiz mevcuttur. Odeme plani hakkinda detayli bilgi icin bizimle iletisime gecebilirsiniz.",
  },
  {
    question: "Iptal ve iade kosullari nelerdir?",
    answer: "Tur baslangicina 30 gun kala yapilan iptallerde tam iade, 15-30 gun arasi %50 iade, 15 gunden az kala iade yapilmamaktadir. Mucbir sebepler haric tum iptallerde bu kosullar gecerlidir.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="sss" className="py-16 lg:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-2">
            Sikca Sorulan Sorular
          </h2>
          <p className="text-gray-500 text-sm">
            Merak ettiginiz sorularin cevaplari
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-100 transition-colors"
              >
                <span className="font-heading font-semibold text-primary text-sm pr-4">
                  {faq.question}
                </span>
                <HiChevronDown
                  className={`text-gray-400 text-lg shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
