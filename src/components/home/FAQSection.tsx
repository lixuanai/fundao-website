'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function FAQSection() {
  const t = useTranslations('home.faq');
  const tBadge = useTranslations('home.faqBadge');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = t.raw('items') as Array<{ question: string; answer: string }>;

  return (
    <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-30"></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="tag-cyan mb-3 sm:mb-4 inline-block text-xs sm:text-sm">{tBadge('text')}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 px-4">
            {t('subtitle')}
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-3 sm:space-y-4">
          {faqItems.map((faq, i) => (
            <div
              key={i}
              className="glass-card rounded-xl sm:rounded-2xl overflow-hidden card-hover"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left"
              >
                <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 pr-3 sm:pr-4">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === i
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white rotate-180'
                    : 'bg-purple-50 text-purple-500'
                }`}>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openIndex === i && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="pt-2 border-t border-purple-100/50">
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-3 sm:mt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
