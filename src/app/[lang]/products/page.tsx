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

  const icons = ['🛡️', '💧', '', '⚖️'];
  const stepIcons = ['📝', '', '🗳️', '🚀'];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="tag-purple mb-4 inline-block">核心机制</span>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">{t('title') || '产品与服务'}</span>
          </h1>
          <p className="text-gray-500 text-lg">{t('subtitle') || 'FunDAO 四重保障机制详解'}</p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => {
            const g = gradients[index % 4];
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${g.bg} rounded-3xl p-8 card-hover border ${g.border} group`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${g.icon} flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {icons[index]}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Process steps */}
        <div className="glass-card rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <span className="tag-cyan mb-4 inline-block">参与流程</span>
            <h2 className="text-3xl md:text-4xl font-black">
              <span className="gradient-text">{t('process.title') || '如何参与'}</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${gradients[index % 4].icon} flex items-center justify-center text-2xl shadow-lg`}>
                  {stepIcons[index]}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
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
