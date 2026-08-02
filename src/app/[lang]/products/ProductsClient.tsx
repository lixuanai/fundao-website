'use client';

import { useTranslations } from 'next-intl';

export default function ProductsPage() {
  const t = useTranslations('products');

  const features = t.raw('features') as Array<{ title: string; description: string }>;
  const steps = t.raw('process.steps') as Array<{ title: string; description: string }>;

  const gradients = [
    { bg: 'from-purple-50 to-purple-100/50', border: 'border-purple-200/50', icon: 'from-purple-500 to-purple-600', text: 'text-purple-600' },
    { bg: 'from-cyan-50 to-cyan-100/50', border: 'border-cyan-200/50', icon: 'from-cyan-500 to-cyan-600', text: 'text-cyan-500' },
    { bg: 'from-pink-50 to-pink-100/50', border: 'border-pink-200/50', icon: 'from-pink-500 to-pink-600', text: 'text-pink-500' },
    { bg: 'from-green-50 to-green-100/50', border: 'border-green-200/50', icon: 'from-green-500 to-green-600', text: 'text-green-500' },
  ];

  const icons = ['🔥', '🛡️', '💰', '⚖️'];
  const stepIcons = ['📝', '👥', '🗳️', '🚀'];

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-20">
      <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <span className="tag-purple mb-4 inline-block">{t('featuresBadge')}</span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg">{t('subtitle')}</p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-12 sm:mb-20">
          {features.map((feature, index) => {
            const g = gradients[index % 4];
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${g.bg} rounded-2xl sm:rounded-3xl p-5 sm:p-8 card-hover border ${g.border} group`}
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${g.icon} flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {icons[index]}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Process steps */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12">
          <div className="text-center mb-8 sm:mb-12">
            <span className="tag-cyan mb-4 inline-block">{t('processBadge')}</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
              <span className="gradient-text">{t('process.title')}</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br ${gradients[index % 4].icon} flex items-center justify-center text-2xl shadow-lg`}>
                  {stepIcons[index]}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-300 to-transparent -translate-x-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
