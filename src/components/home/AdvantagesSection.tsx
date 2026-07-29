'use client';

import { useTranslations } from 'next-intl';

export default function AdvantagesSection() {
  const t = useTranslations('home.advantages');
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-amber-500 to-orange-500',
  ];

  const icons = ['⚡', '️', '🔥', ''];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-blue-950/10 to-gray-950"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="gradient-border card-glow p-6 group">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradients[i]} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {icons[i]}
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
