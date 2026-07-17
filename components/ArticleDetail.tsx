import { notFound } from 'next/navigation'
import { isValidLang, type Lang } from '@/lib/i18n/config'
import { getArticleBySlug } from '@/lib/data/articles'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'

interface ArticleDetailProps {
  lang: string
  slug: string
  backPath: string
  backLabel: string
}

export async function ArticleDetail({ lang, slug, backPath, backLabel }: ArticleDetailProps) {
  if (!isValidLang(lang)) notFound()

  const article = await getArticleBySlug(lang as Lang, slug)
  if (!article) notFound()

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-[128px]" />

        <div className="relative z-10 container-main">
          {/* Back link */}
          <a
            href={backPath}
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-brand-cyan transition-colors mb-8"
          >
            ← {backLabel}
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
                  lang === 'zh' ? 'zh-CN' : 'en-US',
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
              <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-white/70 prose-a:text-brand-cyan prose-strong:text-white">
                <PortableText value={article.content} />
              </div>
            )}
          </article>
        </div>
      </section>
    </>
  )
}
