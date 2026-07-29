'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Article {
  id: string;
  title_zh: string;
  title_en: string;
  slug: string;
  category: string;
  excerpt_zh: string;
  excerpt_en: string;
  created_at: string;
}

export default function LatestNewsSection() {
  const t = useTranslations('home.latestNews');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'zh';
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch(`/api/articles?lang=${currentLocale}&published=true`)
      .then(res => res.json())
      .then(data => setArticles(data.slice(0, 3)))
      .catch(() => {});
  }, [currentLocale]);

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
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/${currentLocale}/news/${article.slug}`}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all group"
            >
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                  {article.category}
                </span>
                <span className="text-xs text-gray-500">{article.created_at?.split('T')[0] || ''}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {currentLocale === 'zh' ? article.title_zh : article.title_en}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {currentLocale === 'zh' ? article.excerpt_zh : article.excerpt_en}
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

        {articles.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            {t('noArticles') || '暂无文章'}
          </div>
        )}

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
