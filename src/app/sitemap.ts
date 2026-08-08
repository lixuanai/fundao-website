import { MetadataRoute } from 'next'
import articlesData from '@/data/seed-articles.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['zh', 'en']
  const pages = ['', '/about', '/products', '/news', '/whitepaper', '/contact', '/agent']
  const legalPages = ['/legal/privacy', '/legal/terms', '/legal/disclaimer']
  const baseUrl = 'https://www.fundao.fun'

  const allPages = [...pages, ...legalPages]

  // Get published articles
  const publishedArticles = articlesData.filter((a: any) => a.published === 1)

  const staticPages = locales.flatMap(locale =>
    allPages.map(page => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: (page === '' ? 'daily' : page.startsWith('/legal') ? 'weekly' : 'weekly') as 'daily' | 'weekly',
      priority: page === '' ? 1.0 : page.startsWith('/legal') ? 0.3 : 0.7,
    }))
  )

  const articlePages = publishedArticles.flatMap((article: any) => {
    const slug = article.slug || article.id
    return locales.map(locale => ({
      url: `${baseUrl}/${locale}/news/${slug}`,
      lastModified: new Date(article.updated_at || article.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  })

  return [...staticPages, ...articlePages]
}
