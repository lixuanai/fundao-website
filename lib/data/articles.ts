import { sanityClient } from '@/lib/sanity/client'
import type { Lang } from '@/lib/i18n/config'

/**
 * 文章数据获取 — CMS 优先，fallback 到默认数据
 * 新闻 & 行业资讯共用同一 schema，通过 category 区分
 * 中英双版本：CMS 存储 titleZh/titleEn, excerptZh/excerptEn, contentZh/contentEn
 */

export interface Article {
  _id: string
  title: string
  slug: { current: string } | string
  excerpt: string
  content?: any[]
  coverImage?: any
  author?: string
  publishedAt: string
  tags?: string[]
  category: 'news' | 'industry'
}

// ===== 默认数据（fallback）=====
const defaultArticles: Record<Lang, Article[]> = {
  zh: [
    {
      _id: 'news-1',
      title: 'FunDAO 协议 V2 正式上线，新增 AI 资产配置功能',
      slug: 'fundao-v2-launch',
      excerpt: 'FunDAO 协议 V2 版本正式发布，引入 AI 驱动的智能资产配置引擎，帮助用户自动优化投资组合，降低风险敞口。',
      author: 'FunDAO Team',
      publishedAt: '2026-07-15T00:00:00Z',
      tags: ['产品更新', 'V2'],
      category: 'news',
    },
    {
      _id: 'news-2',
      title: 'FunDAO 智能合约通过 CertiK 安全审计',
      slug: 'certik-audit-pass',
      excerpt: 'FunDAO 核心智能合约已通过 CertiK 全面安全审计，评分 95/100，代码质量和安全性获得权威认可。',
      author: 'FunDAO Team',
      publishedAt: '2026-07-01T00:00:00Z',
      tags: ['安全', '审计'],
      category: 'news',
    },
    {
      _id: 'news-3',
      title: 'FunDAO 全球用户突破 50,000，覆盖 30+ 国家',
      slug: '50k-users-milestone',
      excerpt: 'FunDAO 平台全球注册用户突破 5 万大关，业务覆盖超过 30 个国家和地区，社区生态持续壮大。',
      author: 'FunDAO Team',
      publishedAt: '2026-06-20T00:00:00Z',
      tags: ['里程碑', '社区'],
      category: 'news',
    },
    {
      _id: 'industry-1',
      title: '2026 年 DeFi 行业趋势：AI 与区块链的深度融合',
      slug: 'defi-ai-trends-2026',
      excerpt: '随着 AI 技术的快速发展，DeFi 行业正迎来新一轮创新浪潮。AI 驱动的风险管理、资产配置和智能投顾成为行业焦点。',
      author: 'FunDAO Research',
      publishedAt: '2026-07-10T00:00:00Z',
      tags: ['DeFi', 'AI', '趋势'],
      category: 'industry',
    },
    {
      _id: 'industry-2',
      title: 'BSC 生态报告：链上活跃度创新高，DeFi 协议 TVL 突破 $50B',
      slug: 'bsc-ecosystem-report-2026',
      excerpt: 'BSC 链上日活跃地址数突破 200 万，DeFi 协议总锁仓量超过 500 亿美元，生态发展势头强劲。',
      author: 'FunDAO Research',
      publishedAt: '2026-06-25T00:00:00Z',
      tags: ['BSC', '行业报告'],
      category: 'industry',
    },
    {
      _id: 'industry-3',
      title: '去中心化身份（DID）：Web3 的下一个基础设施',
      slug: 'did-web3-infrastructure',
      excerpt: '去中心化身份协议正在成为 Web3 的关键基础设施，为用户提供跨链、跨平台的统一身份认证和信用体系。',
      author: 'FunDAO Research',
      publishedAt: '2026-06-10T00:00:00Z',
      tags: ['DID', 'Web3'],
      category: 'industry',
    },
  ],
  en: [
    {
      _id: 'news-1',
      title: 'FunDAO Protocol V2 Officially Launches with AI Asset Allocation',
      slug: 'fundao-v2-launch',
      excerpt: 'FunDAO Protocol V2 is officially released, introducing an AI-driven smart asset allocation engine to help users automatically optimize portfolios and reduce risk exposure.',
      author: 'FunDAO Team',
      publishedAt: '2026-07-15T00:00:00Z',
      tags: ['Product Update', 'V2'],
      category: 'news',
    },
    {
      _id: 'news-2',
      title: 'FunDAO Smart Contracts Pass CertiK Security Audit',
      slug: 'certik-audit-pass',
      excerpt: 'FunDAO core smart contracts have passed CertiK comprehensive security audit with a score of 95/100, receiving authoritative recognition for code quality and security.',
      author: 'FunDAO Team',
      publishedAt: '2026-07-01T00:00:00Z',
      tags: ['Security', 'Audit'],
      category: 'news',
    },
    {
      _id: 'news-3',
      title: 'FunDAO Global Users Exceed 50,000 Across 30+ Countries',
      slug: '50k-users-milestone',
      excerpt: 'FunDAO platform global registered users have exceeded 50,000, covering over 30 countries and regions, with a growing community ecosystem.',
      author: 'FunDAO Team',
      publishedAt: '2026-06-20T00:00:00Z',
      tags: ['Milestone', 'Community'],
      category: 'news',
    },
    {
      _id: 'industry-1',
      title: '2026 DeFi Trends: Deep Integration of AI and Blockchain',
      slug: 'defi-ai-trends-2026',
      excerpt: 'With rapid AI development, the DeFi industry is experiencing a new wave of innovation. AI-driven risk management, asset allocation, and robo-advisory are becoming industry focus.',
      author: 'FunDAO Research',
      publishedAt: '2026-07-10T00:00:00Z',
      tags: ['DeFi', 'AI', 'Trends'],
      category: 'industry',
    },
    {
      _id: 'industry-2',
      title: 'BSC Ecosystem Report: On-chain Activity Hits New Highs, DeFi TVL Breaks $50B',
      slug: 'bsc-ecosystem-report-2026',
      excerpt: 'BSC daily active addresses exceeded 2 million, DeFi protocol total value locked surpassed $50 billion, showing strong ecosystem growth momentum.',
      author: 'FunDAO Research',
      publishedAt: '2026-06-25T00:00:00Z',
      tags: ['BSC', 'Industry Report'],
      category: 'industry',
    },
    {
      _id: 'industry-3',
      title: 'Decentralized Identity (DID): The Next Infrastructure for Web3',
      slug: 'did-web3-infrastructure',
      excerpt: 'Decentralized identity protocols are becoming critical Web3 infrastructure, providing users with cross-chain, cross-platform unified authentication and credit systems.',
      author: 'FunDAO Research',
      publishedAt: '2026-06-10T00:00:00Z',
      tags: ['DID', 'Web3'],
      category: 'industry',
    },
  ],
}

/**
 * 获取文章列表 — CMS 优先，fallback 到默认数据
 */
export async function getArticles(lang: Lang, category: 'news' | 'industry'): Promise<Article[]> {
  try {
    const titleField = lang === 'zh' ? 'titleZh' : 'titleEn'
    const excerptField = lang === 'zh' ? 'excerptZh' : 'excerptEn'

    const articles = await sanityClient.fetch(
      `*[_type == "article" && status == "published" && category == $category] | order(publishedAt desc) {
        _id,
        "title": ${titleField},
        "excerpt": ${excerptField},
        slug,
        category,
        coverImage,
        author,
        publishedAt,
        tags
      }`,
      { category }
    )

    if (articles?.length > 0) return articles
  } catch {
    // CMS unavailable, use defaults
  }

  return defaultArticles[lang].filter((a) => a.category === category)
}

/**
 * 获取文章详情 — CMS 优先，fallback 返回 null
 */
export async function getArticleBySlug(lang: Lang, slug: string): Promise<Article | null> {
  try {
    const titleField = lang === 'zh' ? 'titleZh' : 'titleEn'
    const excerptField = lang === 'zh' ? 'excerptZh' : 'excerptEn'
    const contentField = lang === 'zh' ? 'contentZh' : 'contentEn'

    const article = await sanityClient.fetch(
      `*[_type == "article" && slug.current == $slug && status == "published"][0] {
        _id,
        "title": ${titleField},
        "excerpt": ${excerptField},
        "content": ${contentField},
        slug,
        category,
        coverImage,
        author,
        publishedAt,
        tags
      }`,
      { slug }
    )

    if (article) return article
  } catch {
    // CMS unavailable
  }

  // Fallback: search in defaults
  const found = defaultArticles[lang].find((a) => {
    const s = typeof a.slug === 'string' ? a.slug : a.slug.current
    return s === slug
  })
  return found || null
}

/**
 * 分页获取文章
 */
export async function getArticlesPaginated(
  lang: Lang,
  category: 'news' | 'industry' | null,
  page: number = 1,
  limit: number = 10
): Promise<{ articles: Article[]; total: number; page: number; totalPages: number }> {
  try {
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
          publishedAt,
          tags
        }`,
        category ? { category } : {}
      ),
      sanityClient.fetch(
        `count(*[_type == "article" && status == "published" ${categoryFilter}])`,
        category ? { category } : {}
      ),
    ])

    if (articles?.length > 0 || total > 0) {
      return { articles: articles || [], total, page, totalPages: Math.ceil(total / limit) }
    }
  } catch {
    // CMS unavailable
  }

  // Fallback
  const filtered = category
    ? defaultArticles[lang].filter((a) => a.category === category)
    : defaultArticles[lang]
  const start = (page - 1) * limit
  return {
    articles: filtered.slice(start, start + limit),
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit),
  }
}
