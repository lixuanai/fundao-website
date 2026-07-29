'use client';

import { useTranslations } from 'next-intl';

export default function RewardsSection() {
  const t = useTranslations('home.rewards');

  const items = [
    { title: t('directReward'), description: t('directRewardDesc'), highlight: '15%', gradient: 'from-blue-400 to-cyan-400' },
    { title: t('dynamicReward'), description: t('dynamicRewardDesc'), highlight: '35%', gradient: 'from-purple-400 to-pink-400' },
    { title: t('weeklyDividend'), description: t('weeklyDividendDesc'), highlight: '15%', gradient: 'from-green-400 to-emerald-400' },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-purple-950/10 to-gray-950"></div>

      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="gradient-border card-glow p-6 text-center group">
              <div className={`text-5xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform`}>
                {item.highlight}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
