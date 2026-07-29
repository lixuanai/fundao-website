'use client';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicyPage() {
  const t = useTranslations('legal.privacy');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        {t('title')}
      </h1>
      <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">{t('section1.title')}</h2>
          <p>{t('section1.content')}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">{t('section2.title')}</h2>
          <p>{t('section2.content')}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">{t('section3.title')}</h2>
          <p>{t('section3.content')}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">{t('section4.title')}</h2>
          <p>{t('section4.content')}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">{t('section5.title')}</h2>
          <p>{t('section5.content')}</p>
        </section>
      </div>
    </div>
  );
}
