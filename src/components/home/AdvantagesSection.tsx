'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function AdvantagesSection() {
  const t = useTranslations('home.advantages');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'zh';

  const advantages = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      titleKey: 'items.0.title',
      descKey: 'items.0.description',
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100/50',
      borderColor: 'border-purple-200/50',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      titleKey: 'items.1.title',
      descKey: 'items.1.description',
      gradient: 'from-cyan-500 to-cyan-600',
      bgGradient: 'from-cyan-50 to-cyan-100/50',
      borderColor: 'border-cyan-200/50',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      titleKey: 'items.2.title',
      descKey: 'items.2.description',
      gradient: 'from-pink-500 to-pink-600',
      bgGradient: 'from-pink-50 to-pink-100/50',
      borderColor: 'border-pink-200/50',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      titleKey: 'items.3.title',
      descKey: 'items.3.description',
      gradient: 'from-cyan-500 to-purple-500',
      bgGradient: 'from-cyan-50 to-purple-50',
      borderColor: 'border-cyan-200/50',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="tag-purple mb-4 inline-block">核心优势</span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, i) => (
            <div
              key={i}
              className={`relative bg-gradient-to-br ${item.bgGradient} rounded-2xl p-8 card-hover border ${item.borderColor} group overflow-hidden`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {t(item.titleKey)}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t(item.descKey)}
              </p>

              {/* Hover glow */}
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${item.gradient} rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
