'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NewsPage() {
  const t = useTranslations('articles');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'zh';
  const [activeCategory, setActiveCategory] = useState('all');

  const articles = [
    {
      id: '1',
      title: currentLocale === 'zh' ? 'FunDAO 生态再创新高' : 'FunDAO Ecosystem Reaches New Heights',
      excerpt: currentLocale === 'zh' 
        ? '持币人数突破 7,700，30天涨幅超18倍，社区持续壮大' 
        : 'Token holders exceed 7,700, 30-day growth over 18x, community continues to grow',
      date: '2024-07-28',
      category: 'news',
      categoryLabel: currentLocale === 'zh' ? '新闻' : 'News',
    },
    {
      id: '2',
      title: currentLocale === 'zh' ? 'FunDAO 资金分配机制详解' : 'Understanding FunDAO Fund Allocation',
      excerpt: currentLocale === 'zh'
        ? '60% LP + 25% 分享收益 + 15% 周分红，科学合理的资金分配确保生态健康发展'
        : '60% LP + 25% shared revenue + 15% weekly dividend, scientific fund allocation ensures healthy ecosystem',
      date: '2024-07-25',
      category: 'mechanism',
      categoryLabel: currentLocale === 'zh' ? '机制解读' : 'Mechanism',
    },
    {
      id: '3',
      title: currentLocale === 'zh' ? '通缩保护机制如何运作' : 'How Deflation Protection Works',
      excerpt: currentLocale === 'zh'
        ? '每日 2.5% 通缩 + 三级熔断机制，持续保护代币价值'
        : 'Daily 2.5% deflation + three-tier circuit breaker, continuously protecting token value',
      date: '2024-07-20',
      category: 'mechanism',
      categoryLabel: currentLocale === 'zh' ? '机制解读' : 'Mechanism',
    },
    {
      id: '4',
      title: currentLocale === 'zh' ? 'FunDAO 全球社区突破 10,000 人' : 'FunDAO Global Community Exceeds 10,000 Members',
      excerpt: currentLocale === 'zh'
        ? '社区驱动，共建共享——FunDAO 生态持续扩展'
        : 'Community-driven, co-built and shared - FunDAO ecosystem continues to expand',
      date: '2024-07-15',
      category: 'news',
      categoryLabel: currentLocale === 'zh' ? '新闻' : 'News',
    },
    {
      id: '5',
      title: currentLocale === 'zh' ? '去中心化金融的未来趋势' : 'Future Trends in Decentralized Finance',
      excerpt: currentLocale === 'zh'
        ? '从 DeFi 到 DAO，探索 Web3 的下一个十年'
        : 'From DeFi to DAO, exploring the next decade of Web3',
      date: '2024-07-10',
      category: 'industry',
      categoryLabel: currentLocale === 'zh' ? '行业资讯' : 'Industry',
    },
  ];

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  const categories = [
    { key: 'all', label: t('all') },
    { key: 'news', label: t('news') },
    { key: 'mechanism', label: currentLocale === 'zh' ? '机制解读' : 'Mechanism' },
    { key: 'industry', label: t('industry') },
  ];

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-gray-400 text-lg">{t('subtitle')}</p>
        </div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-6 py-2 rounded-lg transition-all ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/${currentLocale}/news/${article.id}`}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all group"
            >
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                  {article.categoryLabel}
                </span>
                <span className="text-xs text-gray-500">{article.date}</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {article.title}
              </h2>
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
      </div>
    </div>
  );
}
