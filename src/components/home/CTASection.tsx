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
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 animated-gradient-bg opacity-90"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
      }}></div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          {t('title')}
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${currentLocale}/whitepaper`}
            className="px-8 py-4 rounded-full bg-white text-purple-600 font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
          >
            {t('button')}
          </Link>
          <Link
            href={`/${currentLocale}/contact`}
            className="px-8 py-4 rounded-full border-2 border-white/50 text-white font-bold text-lg hover:bg-white/10 transition-all"
          >
            {tContact('contactUs')}
          </Link>
        </div>
      </div>
    </section>
  );
}
