'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Article {
  id: string;
  title_zh: string;
  title_en: string;
  slug: string;
  category: string;
  category_en: string;
  excerpt_zh: string;
  excerpt_en: string;
  created_at: string;
  published: number;
}

export default function NewsPage() {
  const t = useTranslations('articles');
  const tNews = useTranslations('news');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'zh';
  const [activeCategory, setActiveCategory] = useState('all');
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/api/articles?published=true')
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(() => {});
  }, []);

  const categoryKeys = ['行业新闻', '生态合作', '项目动态', '机制解读', '新手指南'];
  const categoryEnMap: Record<string, string> = {
    '行业新闻': 'Industry News',
    '生态合作': 'Partnerships',
    '项目动态': 'Updates',
    '机制解读': 'Mechanisms',
    '新手指南': 'Beginner Guide',
  };
  const tagColors: Record<string, string> = {
    '行业新闻': 'tag-purple',
    '生态合作': 'tag-cyan',
    '项目动态': 'tag-pink',
    '机制解读': 'tag-purple',
    '新手指南': 'tag-cyan',
  };

  const categories = [
    { key: 'all', label: tNews('categories.all') },
    ...categoryKeys.map(k => ({
      key: k,
      label: currentLocale === 'zh' ? k : (categoryEnMap[k] || k),
    })),
  ];

  const filteredArticles = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="tag-purple mb-4 inline-block">{tNews('newsBadge')}</span>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h1>
          <p className="text-gray-500 text-lg">{t('subtitle')}</p>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center sm:overflow-visible sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/${currentLocale}/news/${article.slug}`}
              className="glass-card rounded-2xl p-6 card-hover group"
            >
              <div className="flex items-center space-x-2 mb-4">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${tagColors[article.category] || 'tag-purple'}`}>
                  {currentLocale === 'zh' ? article.category : (article.category_en || article.category)}
                </span>
                <span className="text-xs text-gray-400">{article.created_at?.split('T')[0] || ''}</span>
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                {currentLocale === 'zh' ? article.title_zh : article.title_en}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                {currentLocale === 'zh' ? article.excerpt_zh : article.excerpt_en}
              </p>
              <div className="flex items-center text-purple-500 text-sm font-medium">
                <span>{tCommon('readMore')}</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📰</div>
            <p className="text-gray-400 text-lg">{tNews('noArticles')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
