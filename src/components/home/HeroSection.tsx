'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HeroSection() {
  const t = useTranslations('home.hero');
  const tBadge = useTranslations('home.heroBadge');
  const tAbout = useTranslations('common');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'zh';

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      <div className="absolute inset-0 mesh-gradient"></div>
      
      <div className="orb orb-purple w-48 sm:w-96 h-48 sm:h-96 top-10 sm:top-20 -left-24 sm:-left-48 animate-float-slow"></div>
      <div className="orb orb-pink w-40 sm:w-80 h-40 sm:h-80 top-32 sm:top-40 -right-20 sm:right-0 animate-float-delay"></div>
      <div className="orb orb-cyan w-32 sm:w-64 h-32 sm:h-64 bottom-10 sm:bottom-20 left-1/4 animate-float"></div>
      
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-50 border border-purple-100 mb-4 sm:mb-8 reveal">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs sm:text-sm font-medium text-purple-600">
              {tBadge('text')}
            </span>
          </div>

          {/* Main title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 reveal reveal-delay-1">
            <span className="gradient-text-hero">FunDAO</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 px-2 reveal reveal-delay-2">
            {t('title')}
          </p>

          {/* Description */}
          <p className="text-sm sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2 reveal reveal-delay-3">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 reveal reveal-delay-4">
            <Link
              href={`/${currentLocale}/whitepaper`}
              className="btn-gradient shimmer-btn w-full sm:w-auto text-center text-base sm:text-lg !px-6 sm:!px-8 !py-3 sm:!py-4 !rounded-full"
            >
              {t('cta')}
            </Link>
            <Link
              href={`/${currentLocale}/about`}
              className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-purple-200 text-purple-600 font-semibold text-base sm:text-lg hover:bg-purple-50 hover:border-purple-300 transition-all"
            >
              {tAbout('about')}
            </Link>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4 max-w-5xl mx-auto">
            {[
              { value: t('stats.holdersValue'), label: t('stats.holders'), color: 'purple' },
              { value: t('stats.growthValue'), label: t('stats.growth'), color: 'pink' },
              { value: t('stats.lpValue'), label: t('stats.lp'), color: 'cyan' },
              { value: t('stats.totalSupplyValue'), label: t('stats.totalSupply'), color: 'purple' },
              { value: t('stats.chainValue'), label: t('stats.chain'), color: 'pink' },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-6 card-hover reveal"
                style={{ animationDelay: `${0.5 + i * 0.1}s` }}
              >
                <div className={`text-xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2 ${
                  stat.color === 'purple' ? 'text-purple-600' :
                  stat.color === 'pink' ? 'text-pink-500' :
                  'text-cyan-500'
                }`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
