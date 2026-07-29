'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LatestNewsSection() {
  const t = useTranslations('home.latestNews');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'zh';

  const mockArticles = [
    {
      id: '1',
      title: currentLocale === 'zh' ? 'FunDAO 生态再创新高' : 'FunDAO Ecosystem Reaches New Heights',
      excerpt: currentLocale === 'zh' 
        ? '持币人数突破 7,700，30天涨幅超18倍，社区持续壮大' 
        : 'Token holders exceed 7,700, 30-day growth over 18x, community continues to grow',
      date: '2024-07-28',
      category: currentLocale === 'zh' ? '新闻' : 'News',
    },
    {
      id: '2',
      title: currentLocale === 'zh' ? 'FunDAO 资金分配机制详解' : 'Understanding FunDAO Fund Allocation',
      excerpt: currentLocale === 'zh'
        ? '60% LP + 25% 分享收益 + 15% 周分红，科学合理的资金分配确保生态健康发展'
        : '60% LP + 25% shared revenue + 15% weekly dividend, scientific fund allocation ensures healthy ecosystem',
      date: '2024-07-25',
      category: currentLocale === 'zh' ? '机制解读' : 'Mechanism',
    },
    {
      id: '3',
      title: currentLocale === 'zh' ? '通缩保护机制如何运作' : 'How Deflation Protection Works',
      excerpt: currentLocale === 'zh'
        ? '每日 2.5% 通缩 + 三级熔断机制，持续保护代币价值'
        : 'Daily 2.5% deflation + three-tier circuit breaker, continuously protecting token value',
      date: '2024-07-20',
      category: currentLocale === 'zh' ? '机制解读' : 'Mechanism',
    },
  ];

  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('title')}
            </h2>
            <p className="text-gray-400 text-lg">{t('subtitle')}</p>
          </div>
          <Link
            href={`/${currentLocale}/news`}
            className="hidden md:flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>{tCommon('viewAll')}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockArticles.map((article) => (
            <Link
              key={article.id}
              href={`/${currentLocale}/news/${article.id}`}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all group"
            >
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                  {article.category}
                </span>
                <span className="text-xs text-gray-500">{article.date}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center text-blue-400 text-sm">
                <span>{tCommon('readMore')}</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="md:hidden mt-8 text-center">
          <Link
            href={`/${currentLocale}/news`}
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>{tCommon('viewAll')}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
