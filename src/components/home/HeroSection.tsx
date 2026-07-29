'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HeroSection() {
  const t = useTranslations('home.hero');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'zh';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background decorations */}
      <div className="absolute inset-0 mesh-gradient"></div>
      
      {/* Floating orbs */}
      <div className="orb orb-purple w-96 h-96 top-20 -left-48 animate-float-slow"></div>
      <div className="orb orb-pink w-80 h-80 top-40 right-0 animate-float-delay"></div>
      <div className="orb orb-cyan w-64 h-64 bottom-20 left-1/4 animate-float"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 mb-8 reveal">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-sm font-medium text-purple-600">
              {t('badge') || '全球首个去中心化增值平台'}
            </span>
          </div>

          {/* Main title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 reveal reveal-delay-1">
            <span className="gradient-text-hero">FunDAO</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 reveal reveal-delay-2">
            {t('title')}
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed reveal reveal-delay-3">
            {t('description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 reveal reveal-delay-4">
            <Link
              href={`/${currentLocale}/whitepaper`}
              className="btn-gradient shimmer-btn text-lg !px-8 !py-4 !rounded-full"
            >
              {t('ctaPrimary') || '了解更多'}
            </Link>
            <Link
              href={`/${currentLocale}/about`}
              className="px-8 py-4 rounded-full border-2 border-purple-200 text-purple-600 font-semibold text-lg hover:bg-purple-50 hover:border-purple-300 transition-all"
            >
              {t('ctaSecondary') || '关于我们'}
            </Link>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {[
              { value: '7,739', label: t('stat1Label') || '持币地址', color: 'purple' },
              { value: '18x', label: t('stat2Label') || '30天涨幅', color: 'pink' },
              { value: '60%', label: t('stat3Label') || 'LP资金池', color: 'cyan' },
              { value: '21亿', label: t('stat4Label') || '代币总量', color: 'purple' },
              { value: 'BSC', label: t('stat5Label') || '底层链', color: 'pink' },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-6 card-hover reveal"
                style={{ animationDelay: `${0.5 + i * 0.1}s` }}
              >
                <div className={`text-3xl md:text-4xl font-black mb-2 ${
                  stat.color === 'purple' ? 'text-purple-600' :
                  stat.color === 'pink' ? 'text-pink-500' :
                  'text-cyan-500'
                }`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
