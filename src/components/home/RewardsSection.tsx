'use client';

import { useTranslations } from 'next-intl';

export default function RewardsSection() {
  const t = useTranslations('home.rewards');
  const tBadge = useTranslations('home.rewardsBadge');

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
    <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="tag-pink mb-3 sm:mb-4 inline-block text-xs sm:text-sm">{tBadge('text')}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto px-4">
            {t('subtitle')}
          </p>
        </div>

        {/* Reward cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-16">
          {rewards.map((item, i) => (
            <div
              key={i}
              className="relative glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center card-hover group"
            >
              <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black ${item.color} mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {item.value}
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                {t(item.titleKey)}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                {t(item.descKey)}
              </p>
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r ${item.bg} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            </div>
          ))}
        </div>

        {/* Fund allocation bar */}
        <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 max-w-3xl mx-auto">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6 text-center">
            {t('fundAllocation')}
          </h3>
          <div className="flex rounded-full overflow-hidden h-3 sm:h-4 mb-4 sm:mb-6">
            {allocationData.map((item, i) => (
              <div
                key={i}
                className={`${item.color} transition-all duration-500 hover:opacity-80`}
                style={{ width: `${item.value}%` }}
              ></div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
            {allocationData.map((item, i) => (
              <div key={i} className="flex items-center space-x-1.5 sm:space-x-2">
                <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${item.color}`}></div>
                <span className="text-xs sm:text-sm text-gray-600">
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
