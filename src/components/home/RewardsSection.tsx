'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function RewardsSection() {
  const t = useTranslations('home.rewards');
  const tBadge = useTranslations('home.rewardsBadge');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'zh';

  const rewards = [
    {
      value: '15%',
      titleKey: 'directReward',
      descKey: 'directRewardDesc',
      color: 'text-purple-600',
      bg: 'from-purple-500 to-purple-600',
    },
    {
      value: '35%',
      titleKey: 'dynamicReward',
      descKey: 'dynamicRewardDesc',
      color: 'text-pink-500',
      bg: 'from-pink-500 to-pink-600',
    },
    {
      value: '15%',
      titleKey: 'weeklyDividend',
      descKey: 'weeklyDividendDesc',
      color: 'text-cyan-500',
      bg: 'from-cyan-500 to-cyan-600',
    },
  ];

  const allocationData = [
    { labelKey: 'lpLabel', value: 60, color: 'bg-purple-500' },
    { labelKey: 'revenueLabel', value: 25, color: 'bg-pink-500' },
    { labelKey: 'dividendLabel', value: 15, color: 'bg-cyan-500' },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="tag-pink mb-4 inline-block">{tBadge('text')}</span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Reward cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {rewards.map((item, i) => (
            <div
              key={i}
              className="relative glass-card rounded-3xl p-10 text-center card-hover group"
            >
              <div className={`text-6xl md:text-7xl font-black ${item.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {item.value}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {t(item.titleKey)}
              </h3>
              <p className="text-gray-500 text-sm">
                {t(item.descKey)}
              </p>
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r ${item.bg} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            </div>
          ))}
        </div>

        {/* Fund allocation bar */}
        <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 className="text-lg font-bold text-gray-800 mb-6 text-center">
            {t('fundAllocation')}
          </h3>
          <div className="flex rounded-full overflow-hidden h-4 mb-6">
            {allocationData.map((item, i) => (
              <div
                key={i}
                className={`${item.color} transition-all duration-500 hover:opacity-80`}
                style={{ width: `${item.value}%` }}
              ></div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {allocationData.map((item, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm text-gray-600">
                  {t(item.labelKey)} <span className="font-bold text-gray-800">{item.value}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
