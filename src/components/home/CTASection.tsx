'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CTASection() {
  const t = useTranslations('home.cta');
  const tContact = useTranslations('common');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'zh';

  return (
    <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 animated-gradient-bg opacity-90"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
      }}></div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 px-2">
          {t('title')}
        </h2>
        <p className="text-base sm:text-xl text-white/80 mb-6 sm:mb-10 max-w-2xl mx-auto px-2">
          {t('subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href={`/${currentLocale}/contact`}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-purple-600 font-bold text-base sm:text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl text-center"
          >
            {t('button')}
          </Link>
        </div>
      </div>
    </section>
  );
}
