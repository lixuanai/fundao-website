'use client';
import { useTranslations } from 'next-intl';

export default function RiskDisclaimerPage() {
  const t = useTranslations('legal.disclaimer');

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mesh-gradient opacity-30"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">
            {t('title')}
          </h1>
          
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200/50 rounded-2xl p-6 mb-8">
            <p className="text-red-700 font-semibold text-lg">{t('warning')}</p>
          </div>
          
          <div className="prose max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('section1.title')}</h2>
              <p>{t('section1.content')}</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('section2.title')}</h2>
              <p>{t('section2.content')}</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('section3.title')}</h2>
              <p>{t('section3.content')}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
