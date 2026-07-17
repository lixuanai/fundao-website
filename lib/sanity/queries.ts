import { sanityClient } from './client'

// ============================================
// 文章查询（中英双版本）
// ============================================

export async function getAllArticles(lang: string = 'zh') {
  const titleField = lang === 'zh' ? 'titleZh' : 'titleEn'
  const excerptField = lang === 'zh' ? 'excerptZh' : 'excerptEn'

  return sanityClient.fetch(
    `*[_type == "article" && status == "published"] | order(publishedAt desc) {
      _id,
      "title": ${titleField},
      "excerpt": ${excerptField},
      slug,
      category,
      coverImage,
      author,
      tags,
      publishedAt
    }`
  )
}

export async function getArticlesByCategory(category: string, lang: string = 'zh') {
  const titleField = lang === 'zh' ? 'titleZh' : 'titleEn'
  const excerptField = lang === 'zh' ? 'excerptZh' : 'excerptEn'

  return sanityClient.fetch(
    `*[_type == "article" && status == "published" && category == $category] | order(publishedAt desc) {
      _id,
      "title": ${titleField},
      "excerpt": ${excerptField},
      slug,
      category,
      coverImage,
      author,
      tags,
      publishedAt
    }`,
    { category }
  )
}

export async function getArticleBySlug(slug: string, lang: string = 'zh') {
  const titleField = lang === 'zh' ? 'titleZh' : 'titleEn'
  const excerptField = lang === 'zh' ? 'excerptZh' : 'excerptEn'
  const contentField = lang === 'zh' ? 'contentZh' : 'contentEn'

  return sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug && status == "published"][0] {
      _id,
      "title": ${titleField},
      "excerpt": ${excerptField},
      "content": ${contentField},
      slug,
      category,
      coverImage,
      author,
      tags,
      publishedAt
    }`,
    { slug }
  )
}

// 分页查询
export async function getArticlesPaginated(
  category: string | null,
  page: number = 1,
  limit: number = 10,
  lang: string = 'zh'
) {
  const titleField = lang === 'zh' ? 'titleZh' : 'titleEn'
  const excerptField = lang === 'zh' ? 'excerptZh' : 'excerptEn'
  const start = (page - 1) * limit
  const end = start + limit

  const categoryFilter = category ? `&& category == $category` : ''

  const [articles, total] = await Promise.all([
    sanityClient.fetch(
      `*[_type == "article" && status == "published" ${categoryFilter}] | order(publishedAt desc) [${start}...${end}] {
        _id,
        "title": ${titleField},
        "excerpt": ${excerptField},
        slug,
        category,
        coverImage,
        author,
        tags,
        publishedAt
      }`,
      category ? { category } : {}
    ),
    sanityClient.fetch(
      `count(*[_type == "article" && status == "published" ${categoryFilter}])`,
      category ? { category } : {}
    ),
  ])

  return {
    articles,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }
}

// 搜索文章
export async function searchArticles(query: string, lang: string = 'zh') {
  const titleField = lang === 'zh' ? 'titleZh' : 'titleEn'
  const excerptField = lang === 'zh' ? 'excerptZh' : 'excerptEn'

  return sanityClient.fetch(
    `*[_type == "article" && status == "published" && (
      ${titleField} match $query || ${excerptField} match $query
    )] | order(publishedAt desc) {
      _id,
      "title": ${titleField},
      "excerpt": ${excerptField},
      slug,
      category,
      coverImage,
      author,
      tags,
      publishedAt
    }`,
    { query: `*${query}*` } as any
  )
}

// 获取所有标签
export async function getAllTags() {
  return sanityClient.fetch(
    `*[_type == "article" && status == "published"] { tags } | order(tags)`
  )
}

// ============================================
// 首页配置查询（中英双版本）
// ============================================

export async function getHomePageData(lang: string = 'zh') {
  const data = await sanityClient.fetch(`*[_type == "homePage"][0]`)
  if (!data) return null

  const suffix = lang === 'zh' ? 'Zh' : 'En'

  return {
    hero: {
      badge: data.hero?.[`badge${suffix}`] || '',
      title1: data.hero?.[`title1${suffix}`] || '',
      titleHighlight: data.hero?.[`titleHighlight${suffix}`] || '',
      title2: data.hero?.[`title2${suffix}`] || '',
      subtitle: data.hero?.[`subtitle${suffix}`] || '',
      ctaText: data.hero?.[`ctaText${suffix}`] || '',
      ctaLink: data.hero?.ctaLink || '',
      ctaSecondaryText: data.hero?.[`ctaSecondaryText${suffix}`] || '',
      ctaSecondaryLink: data.hero?.ctaSecondaryLink || '',
    },
    stats: (data.stats || []).map((s: any) => ({
      value: s.value,
      label: s[`label${suffix}`] || '',
      suffix: s.suffix,
    })),
    features: (data.features || []).map((f: any) => ({
      title: f[`title${suffix}`] || '',
      description: f[`desc${suffix}`] || '',
    })),
    cta: {
      title: data.cta?.[`title${suffix}`] || '',
      subtitle: data.cta?.[`subtitle${suffix}`] || '',
      buttonText: data.cta?.[`buttonText${suffix}`] || '',
      buttonLink: data.cta?.buttonLink || '',
    },
  }
}

// ============================================
// 合作伙伴查询
// ============================================

export async function getAllInvestors() {
  return sanityClient.fetch(
    `*[_type == "investor"] | order(order asc) {
      _id, name, logo, website
    }`
  )
}
