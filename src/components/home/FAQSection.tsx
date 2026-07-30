'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function FAQSection() {
  const t = useTranslations('home.faq');
  const tBadge = useTranslations('home.faqBadge');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'zh';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = t.raw('items') as Array<{ question: string; answer: string }>;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-30"></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="tag-cyan mb-4 inline-block">{tBadge('text')}</span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-lg text-gray-500">
            {t('subtitle')}
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqItems.map((faq, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl overflow-hidden card-hover"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === i
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white rotate-180'
                    : 'bg-purple-50 text-purple-500'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <div className="pt-2 border-t border-purple-100/50">
                    <p className="text-gray-600 leading-relaxed mt-4">
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
