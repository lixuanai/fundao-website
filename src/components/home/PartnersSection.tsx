'use client';

import { useTranslations } from 'next-intl';

const partners = [
  { name: 'Dragonfly', short: 'D', color: 'from-blue-600 to-blue-800', textColor: 'text-blue-400' },
  { name: 'Animoca Brands', short: 'AB', color: 'from-red-600 to-red-800', textColor: 'text-red-400' },
  { name: 'OKX Ventures', short: 'OKX', color: 'from-gray-700 to-gray-900', textColor: 'text-white' },
  { name: 'Spartan Group', short: 'SG', color: 'from-amber-600 to-amber-800', textColor: 'text-amber-400' },
  { name: 'Bitscale Capital', short: 'BC', color: 'from-green-600 to-green-800', textColor: 'text-green-400' },
  { name: '6th Man Ventures', short: '6M', color: 'from-orange-600 to-orange-800', textColor: 'text-orange-400' },
  { name: 'IVC', short: 'IVC', color: 'from-indigo-600 to-indigo-800', textColor: 'text-indigo-400' },
  { name: 'Mechanism Capital', short: 'MC', color: 'from-cyan-600 to-cyan-800', textColor: 'text-cyan-400' },
  { name: 'Morningstar Ventures', short: 'MV', color: 'from-yellow-600 to-yellow-800', textColor: 'text-yellow-400' },
  { name: 'W3GG', short: 'W3', color: 'from-purple-600 to-purple-800', textColor: 'text-purple-400' },
  { name: 'Xinyuan Capital', short: 'XY', color: 'from-rose-600 to-rose-800', textColor: 'text-rose-400' },
  { name: 'Red Building Capital', short: 'RB', color: 'from-red-700 to-red-900', textColor: 'text-red-300' },
  { name: 'Yolo Investments', short: 'YO', color: 'from-emerald-600 to-emerald-800', textColor: 'text-emerald-400' },
];

export default function PartnersSection() {
  const t = useTranslations('home.partners');

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-blue-950/5 to-gray-950"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-gray-400 text-lg">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="gradient-border card-glow p-4 flex flex-col items-center justify-center group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${partner.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <span className="text-white font-bold text-sm tracking-wider">{partner.short}</span>
              </div>
              <div className={`text-xs font-medium ${partner.textColor} text-center group-hover:text-white transition-colors`}>
                {partner.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
