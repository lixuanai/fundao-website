'use client';

import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  const milestones = t.raw('history.milestones') as Array<{ date: string; title: string; description: string }>;
  const principles = t.raw('principles.items') as Array<{ title: string; description: string }>;
  const investors = t.raw('investors.list') as string[];
  const partners = t.raw('partners.list') as Array<{ name: string; desc: string }>;

  return (
    <div className="min-h-screen pt-16 sm:pt-20 sm:pb-12 md:pb-20">
      <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 pt-4 sm:pt-0">
          <span className="tag-purple mb-3 sm:mb-4 inline-block text-xs sm:text-sm">{t('aboutBadge')}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 px-2">
            <span className="gradient-text">{t('title')}</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-3xl mx-auto px-2">{t('subtitle')}</p>
        </div>

        {/* Vision */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">{t('vision.title')}</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">{t('vision.content')}</p>
        </div>

        {/* Mission */}
        <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 mb-6 sm:mb-8 md:mb-12 overflow-hidden">
          <div className="absolute inset-0 animated-gradient-bg opacity-90"></div>
          <div className="relative">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">{t('mission.title')}</h2>
            <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">{t('mission.content')}</p>
          </div>
        </div>

        {/* Four Principles */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <span className="tag-cyan mb-3 sm:mb-4 inline-block text-xs sm:text-sm">{t('principlesBadge')}</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
              <span className="gradient-text">{t('principles.title')}</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {principles.map((p, i) => {
              const colors = [
                { bg: 'from-purple-50 to-purple-100/50', border: 'border-purple-200/50', text: 'text-purple-600' },
                { bg: 'from-pink-50 to-pink-100/50', border: 'border-pink-200/50', text: 'text-pink-500' },
                { bg: 'from-cyan-50 to-cyan-100/50', border: 'border-cyan-200/50', text: 'text-cyan-500' },
                { bg: 'from-green-50 to-green-100/50', border: 'border-green-200/50', text: 'text-green-500' },
              ];
              const c = colors[i % 4];
              return (
                <div key={i} className={`bg-gradient-to-br ${c.bg} rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 card-hover border ${c.border} text-center`}>
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-black ${c.text} mb-2 sm:mb-3`}>{p.title}</div>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestones */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <span className="tag-pink mb-3 sm:mb-4 inline-block text-xs sm:text-sm">{t('historyBadge')}</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
              <span className="gradient-text">{t('history.title')}</span>
            </h2>
          </div>
          <div className="space-y-4 sm:space-y-6">
            {milestones.map((m, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                <div className="w-full sm:w-1/4 text-center sm:text-right">
                  <span className="tag-purple font-bold text-xs sm:text-sm">{m.date}</span>
                </div>
                <div className="hidden sm:flex w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"></div>
                <div className="w-full sm:w-3/4">
                  <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 card-hover">
                    <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">{m.title}</h3>
                    <p className="text-gray-500 text-xs sm:text-base">{m.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investors */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 mb-6 sm:mb-8 md:mb-12">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <span className="tag-purple mb-3 sm:mb-4 inline-block text-xs sm:text-sm">{t('investorsBadge')}</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              <span className="gradient-text">{t('investors.title')}</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
            {investors.map((name, i) => (
              <div key={i} className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center justify-center card-hover border border-gray-100">
                <span className="text-gray-700 font-medium text-xs sm:text-sm text-center">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <span className="tag-cyan mb-3 sm:mb-4 inline-block text-xs sm:text-sm">{t('partnersBadge')}</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              <span className="gradient-text">{t('partners.title')}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {partners.map((p, i) => (
              <div key={i} className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 card-hover border border-gray-100">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2">{p.name}</h3>
                <p className="text-gray-500 text-xs sm:text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
