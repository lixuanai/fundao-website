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
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-30"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="gradient-text">{t('title')}</span>
            </h2>
            <p className="text-lg text-gray-500">{t('subtitle')}</p>
          </div>
          <Link
            href={`/${currentLocale}/news`}
            className="hidden md:flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors font-medium"
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
              className="glass-card rounded-2xl p-6 card-hover group"
            >
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full font-medium">
                  {article.category}
                </span>
                <span className="text-xs text-gray-400">{article.created_at?.split('T')[0] || ''}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                {currentLocale === 'zh' ? article.title_zh : article.title_en}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {currentLocale === 'zh' ? article.excerpt_zh : article.excerpt_en}
              </p>
              <div className="flex items-center text-purple-600 text-sm font-medium">
                <span>{tCommon('readMore')}</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center text-gray-400 py-12 glass-card rounded-2xl">
            {t('noArticles')}
          </div>
        )}

        <div className="md:hidden mt-8 text-center">
          <Link
            href={`/${currentLocale}/news`}
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors font-medium"
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
