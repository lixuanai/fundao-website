import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['zh', 'en']
  const pages = ['', '/about', '/products', '/news', '/whitepaper', '/contact', '/agent']
  const legalPages = ['/legal/privacy', '/legal/terms', '/legal/disclaimer']
  const baseUrl = 'https://www.fundao.fun'

  const allPages = [...pages, ...legalPages]

  return locales.flatMap(locale =>
    allPages.map(page => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'daily' as const : 'weekly' as const,
      priority: page === '' ? 1.0 : page.startsWith('/legal') ? 0.3 : 0.7,
    }))
  )
}
