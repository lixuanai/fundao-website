import { notFound } from 'next/navigation'
import { isValidLang, type Lang } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getSEOMetadata } from '@/lib/i18n/seo'
import { getArticles } from '@/lib/data/articles'
import { ArticleList } from '@/components/ArticleList'

export async function generateMetadata({ params }: { params: { lang: string } }) {
  if (!isValidLang(params.lang)) return {}
  const dict = await getDictionary(params.lang)
  return getSEOMetadata({
    lang: params.lang,
    path: '/industry',
    title: dict.t('industry.title'),
  })
}

export default async function IndustryPage({ params }: { params: { lang: string } }) {
  if (!isValidLang(params.lang)) notFound()
  const dict = await getDictionary(params.lang)
  const articles = await getArticles(params.lang as Lang, 'industry')

  return (
    <>
      {/* Hero */}
      <section className="section-padding relative overflow-hidden pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[128px]" />

        <div className="relative z-10 container-main text-center">
          <span className="badge mb-6 inline-block">{dict.t('industry.title')}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
            {dict.t('industry.subtitle')}
          </h1>
        </div>
      </section>

      {/* Articles */}
      <section className="section-padding">
        <div className="container-main">
          <ArticleList articles={articles} lang={params.lang} />
        </div>
      </section>
    </>
  )
}
