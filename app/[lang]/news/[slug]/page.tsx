import { notFound } from 'next/navigation'
import { isValidLang, type Lang } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getSEOMetadata } from '@/lib/i18n/seo'
import { getArticleBySlug } from '@/lib/data/articles'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string }
}) {
  if (!isValidLang(params.lang)) return {}
  const dict = await getDictionary(params.lang)
  return getSEOMetadata({
    lang: params.lang,
    path: `/news/${params.slug}`,
    title: dict.t('news.title'),
  })
}

export default async function ArticleDetailPage({
  params,
}: {
  params: { lang: string; slug: string }
}) {
  if (!isValidLang(params.lang)) notFound()

  const article = await getArticleBySlug(params.lang as Lang, params.slug)
  if (!article) notFound()

  const dict = await getDictionary(params.lang)

  return (
    <>
      {/* Hero with cover image */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-[128px]" />

        <div className="relative z-10 container-main">
          {/* Back link */}
          <a
            href={`/${params.lang}/news`}
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-brand-cyan transition-colors mb-8"
          >
            ← {dict.t('news.title')}
          </a>

          {/* Article header */}
          <article className="max-w-4xl mx-auto">
            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag) => (
                  <span key={tag} className="badge !text-xs !py-0.5 !px-2">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-white/50 mb-8">
              {article.author && <span>{article.author}</span>}
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString(
                  params.lang === 'zh' ? 'zh-CN' : 'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
              </time>
            </div>

            {/* Cover image */}
            {article.coverImage && (
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 glass-card">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-xl text-white/70 leading-relaxed mb-12 font-light">
                {article.excerpt}
              </p>
            )}

            {/* Content */}
            {article.content && (
              <div className="prose prose-inverse prose-lg max-w-none">
                <PortableText value={article.content} />
              </div>
            )}
          </article>
        </div>
      </section>
    </>
  )
}
