'use client';

import { useTranslations } from 'next-intl';

export default function PartnersSection() {
  const t = useTranslations('home.partners');

  const partners = [
    { name: 'Dragonfly', abbr: 'D', color: 'from-blue-500 to-blue-600' },
    { name: 'Animoca Brands', abbr: 'AB', color: 'from-red-500 to-red-600' },
    { name: 'OKX Ventures', abbr: 'OKX', color: 'from-gray-700 to-gray-900' },
    { name: 'Spartan Group', abbr: 'SG', color: 'from-indigo-500 to-indigo-600' },
    { name: 'Bitscale Capital', abbr: 'BC', color: 'from-green-500 to-green-600' },
    { name: '6th Man Ventures', abbr: '6M', color: 'from-orange-500 to-orange-600' },
    { name: 'IVC', abbr: 'IVC', color: 'from-purple-500 to-purple-600' },
    { name: 'Mechanism Capital', abbr: 'MC', color: 'from-cyan-500 to-cyan-600' },
    { name: 'Morningstar Ventures', abbr: 'MV', color: 'from-yellow-500 to-yellow-600' },
    { name: 'W3GG', abbr: 'W3', color: 'from-pink-500 to-pink-600' },
    { name: '心元资本', abbr: 'XY', color: 'from-teal-500 to-teal-600' },
    { name: 'Red Building Capital', abbr: 'RB', color: 'from-rose-500 to-rose-600' },
    { name: 'Yolo Investments', abbr: 'YI', color: 'from-amber-500 to-amber-600' },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <span className="tag-purple mb-3 sm:mb-4 inline-block text-xs sm:text-sm">{t('badge') || '生态合作伙伴'}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
            <span className="gradient-text">{t('title') || '13 家顶级机构参投'}</span>
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="group flex flex-col items-center p-2 sm:p-4 rounded-lg sm:rounded-xl hover:bg-purple-50/50 transition-all cursor-default"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center text-white font-bold text-xs sm:text-sm mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform shadow-lg`}>
                {partner.abbr}
              </div>
              <span className="text-[10px] sm:text-xs text-gray-500 text-center font-medium group-hover:text-purple-600 transition-colors leading-tight">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
