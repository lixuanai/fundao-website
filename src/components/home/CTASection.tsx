'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CTASection() {
  const t = useTranslations('home.cta');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'zh';

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-blue-950/20 to-gray-950"></div>

      {/* Animated orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse-ring"></div>
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-float-orb-1"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl animate-float-orb-2"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-gradient-animated bg-clip-text text-transparent">
          {t('title')}
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${currentLocale}/contact`}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25 overflow-hidden"
          >
            <span className="relative z-10">{t('button')}</span>
            <div className="absolute inset-0 shimmer"></div>
          </Link>
          <Link
            href={`/${currentLocale}/products`}
            className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 text-white font-semibold rounded-lg transition-all border border-gray-700 hover:border-blue-500/50 card-glow"
          >
            {currentLocale === 'zh' ? '了解更多' : 'Learn More'}
          </Link>
        </div>
      </div>
    </section>
  );
}
