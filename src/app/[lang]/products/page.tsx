'use client';

import { useTranslations } from 'next-intl';

export default function ProductsPage() {
  const t = useTranslations('products');

  const features = t.raw('features') as Array<{ title: string; description: string }>;
  const steps = t.raw('process.steps') as Array<{ title: string; description: string }>;

  const icons = ['💼', '💧', '👥', '⚖️'];
  const stepIcons = ['📝', '🔍', '🗳️', '🚀'];

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-gray-400 text-lg">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-all"
            >
              <div className="text-5xl mb-4">{icons[index]}</div>
              <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">{t('process.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl">
                    {stepIcons[index]}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent -translate-x-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
