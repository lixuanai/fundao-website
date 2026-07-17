import type { MetadataRoute } from 'next'
import { LANGS } from '@/lib/i18n/config'
import { SITE_CONFIG } from '@/lib/constants'

const BASE_URL = SITE_CONFIG.url

// All routes that should be in the sitemap
const routes = ['', '/about', '/products', '/news', '/industry', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const lang of LANGS) {
    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            LANGS.map((l) => [l, `${BASE_URL}/${l}${route}`])
          ),
        },
      })
    }
  }

  return entries
}
