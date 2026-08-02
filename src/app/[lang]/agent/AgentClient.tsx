'use client';

import { useTranslations } from 'next-intl';

export default function AgentPortalPage() {
  const t = useTranslations('agent');

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mesh-gradient opacity-30"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">
            {t('title')}
          </h1>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 rounded-2xl p-6 mb-8">
            <p className="text-blue-700 font-semibold text-lg mb-2">
              {t('enabled')}
            </p>
            <p className="text-gray-600 text-sm">
              {t('enabledDesc')}
            </p>
          </div>

          <div className="prose max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('endpoints')}</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">{t('articleMgmt')}</h3>
              <ul className="space-y-2 text-sm">
                <li><code className="text-purple-600 bg-purple-50 px-2 py-1 rounded">POST /api/agent/articles</code> — {t('createArticle')}</li>
                <li><code className="text-purple-600 bg-purple-50 px-2 py-1 rounded">PUT /api/agent/articles/[slug]</code> — {t('updateArticle')}</li>
                <li><code className="text-purple-600 bg-purple-50 px-2 py-1 rounded">DELETE /api/agent/articles/[slug]</code> — {t('deleteArticle')}</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">{t('pageContent')}</h3>
              <ul className="space-y-2 text-sm">
                <li><code className="text-purple-600 bg-purple-50 px-2 py-1 rounded">POST /api/agent/page/[pageKey]</code> — {t('updatePage')}</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">{t('settings')}</h3>
              <ul className="space-y-2 text-sm">
                <li><code className="text-purple-600 bg-purple-50 px-2 py-1 rounded">PUT /api/agent/settings/[key]</code> — {t('updateSettings')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('auth')}</h2>
              <p>{t('authDesc')}</p>
              <pre className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-2xl overflow-x-auto text-sm mt-3 border border-gray-200">
                <code>{`x-api-key: your_agent_api_key`}</code>
              </pre>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('examples')}</h2>
              <pre className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-2xl overflow-x-auto text-sm mt-3 border border-gray-200">
                <code>{`// Create article
POST /api/agent/articles
Headers: x-api-key: fundao_agent_xxx
Body: {
  "titleZh": "Article Title ZH",
  "titleEn": "Article Title EN",
  "slug": "article-slug",
  "category": "news",
  "contentZh": "Chinese content",
  "contentEn": "English content",
  "published": true
}

// Update page content
POST /api/agent/page/home
Headers: x-api-key: fundao_agent_xxx
Body: {
  "lang": "zh",
  "content": {
    "hero": {
      "title": "New Title",
      "subtitle": "New Subtitle"
    }
  }
}`}</code>
              </pre>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('dataModel')}</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">{t('articleModel')}</h3>
              <ul className="space-y-1 text-sm">
                <li><code className="text-purple-600">titleZh</code> / <code className="text-purple-600">titleEn</code> — {t('titleZhEn')}</li>
                <li><code className="text-purple-600">slug</code> — {t('slug')}</li>
                <li><code className="text-purple-600">category</code> — {t('category')}</li>
                <li><code className="text-purple-600">contentZh</code> / <code className="text-purple-600">contentEn</code> — {t('contentZhEn')}</li>
                <li><code className="text-purple-600">excerptZh</code> / <code className="text-purple-600">excerptEn</code> — {t('excerptZhEn')}</li>
                <li><code className="text-purple-600">coverImage</code> — {t('coverImage')}</li>
                <li><code className="text-purple-600">tags</code> — {t('tags')}</li>
                <li><code className="text-purple-600">published</code> — {t('published')}</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
