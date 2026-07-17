import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { Lang, LANG_LOCALES, LANGS, DEFAULT_LANG } from '@/lib/i18n/config'

interface SEOMetaProps {
  lang: Lang
  path: string
  titleKey?: string
  descriptionKey?: string
  // Allow overrides for pages that need custom values
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
}

export function getSEOMetadata({
  lang,
  path,
  titleKey,
  descriptionKey,
  title: titleOverride,
  description: descOverride,
  image = '/og-image.png',
  noIndex = false,
}: SEOMetaProps): Metadata {
  const { t } = getDictionary(lang)
  const locale = LANG_LOCALES[lang]
  const baseUrl = SITE_CONFIG.url
  const pageUrl = `${baseUrl}${lang === DEFAULT_LANG ? '' : `/${lang}`}${path}`

  const title = titleOverride || (titleKey ? t(titleKey) : SITE_CONFIG.name)
  const description = descOverride || (descriptionKey ? t(descriptionKey) : SITE_CONFIG.description)

  // Build hreflang alternates
  const languages: Record<string, string> = {}
  for (const l of LANGS) {
    const lLocale = LANG_LOCALES[l]
    const lUrl = `${baseUrl}${l === DEFAULT_LANG ? '' : `/${l}`}${path}`
    languages[lLocale] = lUrl
  }

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'website',
      locale,
      alternateLocale: lang === 'zh' ? 'en_US' : 'zh_CN',
      siteName: SITE_CONFIG.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }

  if (noIndex) {
    metadata.robots = { index: false, follow: true }
  }

  return metadata
}
