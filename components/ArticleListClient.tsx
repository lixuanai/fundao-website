'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import type { Article } from '@/lib/data/articles'

interface ArticleListClientProps {
  articles: Article[]
  lang: string
  category: 'news' | 'industry'
}

const PAGE_SIZE = 9

export function ArticleListClient({ articles, lang, category }: ArticleListClientProps) {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  // Collect all tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    articles.forEach((a) => a.tags?.forEach((tag) => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  }, [articles])

  // Filter + search
  const filtered = useMemo(() => {
    let result = articles

    // Tag filter
    if (activeTag) {
      result = result.filter((a) => a.tags?.includes(activeTag))
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
      )
    }

    return result
  }, [articles, activeTag, search])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  // Reset page when filters change
  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag)
    setPage(1)
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const clearFilters = () => {
    setSearch('')
    setActiveTag(null)
    setPage(1)
  }

  const hasFilters = search || activeTag

  return (
    <div>
      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={lang === 'zh' ? '搜索文章...' : 'Search articles...'}
            className="w-full pl-11 pr-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/20 transition-all"
          />
          {search && (
            <button
              onClick={() => handleSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tags */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTag === tag
                  ? 'bg-brand-cyan text-black'
                  : 'bg-white/[0.06] text-white/60 hover:bg-white/[0.1] hover:text-white/80'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Active filters summary */}
      {hasFilters && (
        <div className="flex items-center gap-2 mb-6 text-sm text-white/40">
          <span>
            {lang === 'zh' ? `找到 ${filtered.length} 篇文章` : `${filtered.length} articles found`}
          </span>
          <button
            onClick={clearFilters}
            className="text-brand-cyan hover:text-brand-cyan/80 transition-colors"
          >
            {lang === 'zh' ? '清除筛选' : 'Clear filters'}
          </button>
        </div>
      )}

      {/* Article grid */}
      {paged.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paged.map((article) => {
            const slug = typeof article.slug === 'string' ? article.slug : article.slug.current
            const categoryPath = article.category === 'industry' ? 'industry' : 'news'

            return (
              <Link
                key={article._id}
                href={`/${lang}/${categoryPath}/${slug}`}
                className="glass-card-hover group overflow-hidden flex flex-col"
              >
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
                      {new Date(article.publishedAt).toLocaleDateString(
                        lang === 'zh' ? 'zh-CN' : 'en-US',
                        { year: 'numeric', month: 'short', day: 'numeric' }
                      )}
                    </time>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="glass-card p-12 text-center text-white/40">
          {hasFilters
            ? (lang === 'zh' ? '没有找到匹配的文章' : 'No matching articles found')
            : (lang === 'zh' ? '暂无文章' : 'No articles yet')}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setPage(Math.max(1, safePage - 1))}
            disabled={safePage <= 1}
            className="px-4 py-2 rounded-lg bg-white/[0.06] text-white/60 text-sm font-medium hover:bg-white/[0.1] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            {lang === 'zh' ? '上一页' : 'Prev'}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                p === safePage
                  ? 'bg-brand-cyan text-black'
                  : 'bg-white/[0.06] text-white/60 hover:bg-white/[0.1]'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage(Math.min(totalPages, safePage + 1))}
            disabled={safePage >= totalPages}
            className="px-4 py-2 rounded-lg bg-white/[0.06] text-white/60 text-sm font-medium hover:bg-white/[0.1] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            {lang === 'zh' ? '下一页' : 'Next'}
          </button>
        </div>
      )}
    </div>
  )
}
