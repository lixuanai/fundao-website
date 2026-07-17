/**
 * JSON-LD 结构化数据组件
 * 帮助搜索引擎和 AI 爬虫理解网站内容
 */

interface JsonLdProps {
  data: Record<string, any>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * Organization schema — 放在根布局
 */
export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FunDAO',
    url: 'https://fundao.fun',
    logo: 'https://fundao.fun/logo.png',
    description: 'FunDAO — 去中心化数字资产平台，基于 BSC 的智能合约金融协议',
    sameAs: [
      // TODO: 替换为实际社交链接
      // 'https://twitter.com/fundao',
      // 'https://t.me/fundao',
      // 'https://discord.gg/fundao',
    ],
  }
}

/**
 * WebSite schema — 放在根布局
 */
export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FunDAO',
    url: 'https://fundao.fun',
    description: 'FunDAO — 去中心化数字资产平台，基于 BSC 的智能合约金融协议',
    inLanguage: ['zh-CN', 'en'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://fundao.fun/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * BreadcrumbList schema — 放在每个页面
 */
export function getBreadcrumbJsonLd(lang: string, items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://fundao.fun/${lang}${item.url}`,
    })),
  }
}

/**
 * FAQPage schema — 可用于 FAQ 页面
 */
export function getFAQJsonLd(questions: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.a,
      },
    })),
  }
}
