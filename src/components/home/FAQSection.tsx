'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function FAQSection() {
  const t = useTranslations('home.faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = t.raw('items') as Array<{ question: string; answer: string }>;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-purple-950/5 to-gray-950"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-gray-400 text-lg">{t('subtitle')}</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="gradient-border card-glow overflow-hidden group"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === index ? 'bg-gradient-to-r from-blue-500 to-purple-500 rotate-180' : 'bg-gray-800'}`}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <div className="section-divider mb-4"></div>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
