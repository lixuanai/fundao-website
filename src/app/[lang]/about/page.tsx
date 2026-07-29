'use client';

import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  const milestones = t.raw('history.milestones') as Array<{ date: string; title: string; description: string }>;
  const principles = t.raw('principles.items') as Array<{ title: string; description: string }>;
  const investors = t.raw('investors.list') as string[];
  const partners = t.raw('partners.list') as Array<{ name: string; desc: string }>;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="tag-purple mb-4 inline-block">关于我们</span>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* Vision */}
        <div className="glass-card rounded-3xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('vision.title')}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{t('vision.content')}</p>
        </div>

        {/* Mission */}
        <div className="relative rounded-3xl p-8 md:p-12 mb-12 overflow-hidden">
          <div className="absolute inset-0 animated-gradient-bg opacity-90"></div>
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-6">{t('mission.title')}</h2>
            <p className="text-white/90 text-lg leading-relaxed">{t('mission.content')}</p>
          </div>
        </div>

        {/* Four Principles */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <span className="tag-cyan mb-4 inline-block">四大初心</span>
            <h2 className="text-3xl md:text-4xl font-black">
              <span className="gradient-text">{t('principles.title')}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p, i) => {
              const colors = [
                { bg: 'from-purple-50 to-purple-100/50', border: 'border-purple-200/50', text: 'text-purple-600', gradient: 'from-purple-500 to-purple-600' },
                { bg: 'from-pink-50 to-pink-100/50', border: 'border-pink-200/50', text: 'text-pink-500', gradient: 'from-pink-500 to-pink-600' },
                { bg: 'from-cyan-50 to-cyan-100/50', border: 'border-cyan-200/50', text: 'text-cyan-500', gradient: 'from-cyan-500 to-cyan-600' },
                { bg: 'from-green-50 to-green-100/50', border: 'border-green-200/50', text: 'text-green-500', gradient: 'from-green-500 to-green-600' },
              ];
              const c = colors[i % 4];
              return (
                <div key={i} className={`bg-gradient-to-br ${c.bg} rounded-2xl p-8 card-hover border ${c.border} text-center`}>
                  <div className={`text-4xl font-black ${c.text} mb-3`}>{p.title}</div>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestones */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <span className="tag-pink mb-4 inline-block">发展历程</span>
            <h2 className="text-3xl md:text-4xl font-black">
              <span className="gradient-text">{t('history.title')}</span>
            </h2>
          </div>
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/4 text-center md:text-right">
                  <span className="tag-purple font-bold">{m.date}</span>
                </div>
                <div className="hidden md:flex w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"></div>
                <div className="w-full md:w-3/4">
                  <div className="glass-card rounded-2xl p-6 card-hover">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{m.title}</h3>
                    <p className="text-gray-500">{m.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investors */}
        <div className="glass-card rounded-3xl p-8 md:p-12 mb-12">
          <div className="text-center mb-10">
            <span className="tag-purple mb-4 inline-block">投资机构</span>
            <h2 className="text-3xl font-bold">
              <span className="gradient-text">{t('investors.title')}</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {investors.map((name, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 flex items-center justify-center card-hover border border-gray-100">
                <span className="text-gray-700 font-medium text-sm text-center">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="glass-card rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <span className="tag-cyan mb-4 inline-block">生态合作</span>
            <h2 className="text-3xl font-bold">
              <span className="gradient-text">{t('partners.title')}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.map((p, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 card-hover border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{p.name}</h3>
                <p className="text-gray-500 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
