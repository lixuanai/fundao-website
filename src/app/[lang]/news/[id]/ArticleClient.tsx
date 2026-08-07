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
  content_zh: string;
  content_en: string;
  cover_image: string;
  cover_image_en?: string;
  created_at: string;
  published: number;
}

export default function ArticleDetailPage({ params }: { params: { id: string; lang: string } }) {
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'zh';
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/articles/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-400 text-lg">Article not found</p>
          <Link href={`/${currentLocale}/news`} className="text-purple-600 hover:text-purple-800 mt-4 inline-block">
            ← {tCommon('back')}
          </Link>
        </div>
      </div>
    );
  }

  const content = currentLocale === 'zh' ? article.content_zh : article.content_en;
  const title = currentLocale === 'zh' ? article.title_zh : article.title_en;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mesh-gradient opacity-30"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${currentLocale}/news`}
          className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {tCommon('back')}
        </Link>

        <article className="glass-card rounded-3xl p-6 sm:p-8">
          <div className="flex items-center space-x-2 mb-6">
            <span className="tag-purple">
              {currentLocale === 'zh' ? article.category : (article.category_en || article.category)}
            </span>
            <span className="text-sm text-gray-500">By Mr.Xuan · {article.created_at?.split('T')[0] || ''}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-6 sm:mb-8 leading-tight">
            {title}
          </h1>

          {((currentLocale === 'zh' ? article.cover_image : article.cover_image_en) || article.cover_image) && (
            <img
              src={currentLocale === 'zh' ? article.cover_image : (article.cover_image_en || article.cover_image)}
              alt={title}
              className="w-full rounded-2xl mb-8 shadow-lg"
            />
          )}

          <div 
            className="prose max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </div>
    </div>
  );
}
