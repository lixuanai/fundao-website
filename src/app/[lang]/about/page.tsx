'use client';

import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  const milestones = t.raw('history.milestones') as Array<{ date: string; title: string; description: string }>;
  const principles = t.raw('principles.items') as Array<{ title: string; description: string }>;
  const investors = t.raw('investors.list') as string[];
  const partners = t.raw('partners.list') as Array<{ name: string; desc: string }>;

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* Vision */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">{t('vision.title')}</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{t('vision.content')}</p>
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">{t('mission.title')}</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{t('mission.content')}</p>
        </div>

        {/* Four Principles */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">{t('principles.title')}</h2>
          <p className="text-gray-400 text-center mb-10">{t('principles.subtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p, i) => (
              <div key={i} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-3">{p.title}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">{t('history.title')}</h2>
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/4 text-center md:text-right">
                  <span className="text-blue-400 font-bold text-lg">{m.date}</span>
                </div>
                <div className="hidden md:flex w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                <div className="w-full md:w-3/4">
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
                    <h3 className="text-xl font-bold text-white mb-2">{m.title}</h3>
                    <p className="text-gray-400">{m.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investors */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">{t('investors.title')}</h2>
          <p className="text-gray-400 text-center mb-8">{t('investors.subtitle')}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {investors.map((name, i) => (
              <div key={i} className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-center hover:bg-gray-800 transition-all">
                <span className="text-gray-300 font-medium text-sm text-center">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">{t('partners.title')}</h2>
          <p className="text-gray-400 text-center mb-8">{t('partners.subtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.map((p, i) => (
              <div key={i} className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800 transition-all">
                <h3 className="text-lg font-bold text-white mb-2">{p.name}</h3>
                <p className="text-gray-400 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
