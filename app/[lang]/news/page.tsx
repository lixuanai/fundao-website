import { notFound } from 'next/navigation'
import { isValidLang, type Lang } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getSEOMetadata } from '@/lib/i18n/seo'
import { getArticles } from '@/lib/data/articles'
import { ArticleListClient } from '@/components/ArticleListClient'

export async function generateMetadata({ params }: { params: { lang: string } }) {
  if (!isValidLang(params.lang)) return {}
  const dict = getDictionary(params.lang as Lang)
  return getSEOMetadata({
    lang: params.lang as Lang,
    path: '/news',
    title: dict.t('news.title'),
  })
}

export default async function NewsPage({ params }: { params: { lang: string } }) {
  if (!isValidLang(params.lang)) notFound()
  const dict = getDictionary(params.lang as Lang)
  const articles = await getArticles(params.lang as Lang, 'news')

  return (
    <>
      {/* Hero */}
      <section className="section-padding relative overflow-hidden pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-[128px]" />

        <div className="relative z-10 container-main text-center">
          <span className="badge mb-6 inline-block">{dict.t('news.title')}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
            {dict.t('news.subtitle')}
          </h1>
        </div>
      </section>

      {/* Articles with search, filter, pagination */}
      <section className="section-padding">
        <div className="container-main">
          <ArticleListClient
            articles={articles}
            lang={params.lang}
            category="news"
          />
        </div>
      </section>
    </>
  )
}
