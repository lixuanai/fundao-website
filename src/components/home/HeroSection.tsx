'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HeroSection() {
  const t = useTranslations('home.hero');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'zh';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-grid">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950/30 to-purple-950/30"></div>

      {/* Floating orbs with colorful gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-full blur-3xl animate-float-orb-1"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-full blur-3xl animate-float-orb-2"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-cyan-500/15 to-green-500/10 rounded-full blur-3xl animate-float-orb-3"></div>
      </div>

      {/* Rotating gradient ring behind title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-blue-500/5 animate-rotate-gradient"></div>
        <div className="absolute inset-8 rounded-full border border-purple-500/5 animate-rotate-gradient" style={{ animationDirection: 'reverse', animationDuration: '12s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-gradient-animated bg-clip-text text-transparent leading-tight text-glow">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up-delay-1">
            {t('subtitle')}
          </p>

          <div className="flex justify-center mb-16 animate-slide-up-delay-2">
            <Link
              href={`/${currentLocale}/about`}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25 overflow-hidden"
            >
              <span className="relative z-10">{t('cta')}</span>
              <div className="absolute inset-0 shimmer"></div>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              { value: t('stats.holdersValue'), label: t('stats.holders'), gradient: 'from-blue-400 to-cyan-400', border: 'hover:border-blue-400/50', shadow: 'shadow-blue-500/10' },
              { value: t('stats.growthValue'), label: t('stats.growth'), gradient: 'from-purple-400 to-pink-400', border: 'hover:border-purple-400/50', shadow: 'shadow-purple-500/10' },
              { value: t('stats.lpValue'), label: t('stats.lp'), gradient: 'from-green-400 to-emerald-400', border: 'hover:border-green-400/50', shadow: 'shadow-green-500/10' },
              { value: t('stats.totalSupplyValue'), label: t('stats.totalSupply'), gradient: 'from-yellow-400 to-amber-400', border: 'hover:border-yellow-400/50', shadow: 'shadow-yellow-500/10' },
              { value: t('stats.chainValue'), label: t('stats.chain'), gradient: 'from-cyan-400 to-blue-400', border: 'hover:border-cyan-400/50', shadow: 'shadow-cyan-500/10' },
            ].map((stat, i) => (
              <div
                key={i}
                className={`gradient-border card-glow p-5 animate-slide-up-delay-${Math.min(i + 1, 4)}`}
              >
                <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent"></div>
    </section>
  );
}
