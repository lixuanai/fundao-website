import type { Article } from '@/lib/data/articles'

interface ArticleListProps {
  articles: Article[]
  lang: string
}

export function ArticleList({ articles, lang }: ArticleListProps) {
  if (!articles.length) {
    return (
      <div className="glass-card p-12 text-center text-white/40">
        {lang === 'zh' ? '暂无文章' : 'No articles yet'}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <article key={article._id} className="glass-card-hover group overflow-hidden flex flex-col">
          {/* Cover image placeholder */}
          <div className="aspect-video bg-gradient-to-br from-brand-cyan/10 via-brand-purple/10 to-brand-pink/10 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl opacity-20">📰</span>
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col">
            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {article.tags.map((tag) => (
                  <span key={tag} className="badge !text-xs !py-0.5 !px-2">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-brand-cyan transition-colors">
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-3 flex-1">
              {article.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between text-xs text-white/30 pt-4 border-t border-white/[0.06]">
              <span>{article.author}</span>
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
