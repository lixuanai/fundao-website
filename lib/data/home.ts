import { sanityClient } from '@/lib/sanity/client'
import type { Lang } from '@/lib/i18n/config'

/**
 * 首页数据获取 — CMS 优先，fallback 到默认数据
 * 中英双版本：CMS 存储 Zh/En 后缀字段，按 lang 取对应版本
 * 奖励模型不进 CMS，写死在代码里
 */

interface HomePageData {
  hero: {
    badge: string
    title1: string
    titleHighlight: string
    title2: string
    subtitle: string
    ctaText: string
    ctaLink: string
    ctaSecondaryText: string
    ctaSecondaryLink: string
  }
  stats: Array<{ value: string; label: string; suffix?: string }>
  features: Array<{ title: string; description: string }>
  rewards: {
    title: string
    subtitle: string
    tiers: Array<{ percentage: number; label: string; description: string; color: string }>
  }
  cta: {
    title: string
    subtitle: string
    buttonText: string
    buttonLink: string
  }
  investors: Array<{ _id: string; name: string; logo: any; website?: string }>
}

// ===== 奖励模型（写死代码，不进 CMS）=====
const rewardsData: Record<Lang, HomePageData['rewards']> = {
  zh: {
    title: '三重收益机制',
    subtitle: '透明、可持续的链上收益分配',
    tiers: [
      { percentage: 15, label: '直推奖励', description: '直接推荐好友加入，立即获得其投入金额的 15% 作为推荐奖励', color: 'cyan' },
      { percentage: 35, label: '直推动态收益', description: '推荐活跃用户产生的动态收益，最高可获得 35% 的动态奖励', color: 'purple' },
      { percentage: 15, label: '周分红', description: '每周平台收益的 15% 按持币比例分配给所有参与者', color: 'pink' },
    ],
  },
  en: {
    title: 'Triple Yield Mechanism',
    subtitle: 'Transparent, sustainable on-chain reward distribution',
    tiers: [
      { percentage: 15, label: 'Direct Referral', description: 'Refer a friend and instantly earn 15% of their investment as a referral bonus', color: 'cyan' },
      { percentage: 35, label: 'Dynamic Rewards', description: 'Earn up to 35% dynamic rewards from your active referrals\' generated returns', color: 'purple' },
      { percentage: 15, label: 'Weekly Dividends', description: '15% of weekly platform revenue distributed proportionally to all participants', color: 'pink' },
    ],
  },
}

// ===== 默认数据（fallback）=====
const defaultData: Record<Lang, Omit<HomePageData, 'rewards'>> = {
  zh: {
    hero: {
      badge: 'Web3 去中心化金融协议',
      title1: '重新定义',
      titleHighlight: '去中心化',
      title2: '数字资产管理',
      subtitle: '基于 BSC 的智能合约金融协议，让资产增值更安全、更透明、更可持续',
      ctaText: '开始使用',
      ctaLink: '/products',
      ctaSecondaryText: '了解更多',
      ctaSecondaryLink: '/about',
    },
    stats: [
      { value: '50,000', label: '注册用户' },
      { value: '15', label: '直推奖励', suffix: '%' },
      { value: '$100M+', label: '交易总量' },
      { value: '30+', label: '覆盖国家' },
    ],
    features: [
      { title: '安全可靠', description: '多重审计的智能合约，资金由链上协议托管，杜绝中心化风险' },
      { title: '高效收益', description: '直推奖励 15%、直推动态收益 35%、周分红 15%，三重收益机制' },
      { title: '全球覆盖', description: '支持多语言、多币种，覆盖 30+ 国家的去中心化金融网络' },
      { title: '透明可查', description: '所有交易记录链上可查，收益分配算法公开透明，代码即规则' },
      { title: '智能管理', description: 'AI 驱动的资产配置策略，自动优化投资组合，降低风险敞口' },
      { title: '社区治理', description: 'DAO 治理模式，持币即投票，社区共同决定协议发展方向' },
    ],
    cta: {
      title: '准备好开始了吗？',
      subtitle: '加入 FunDAO，开启去中心化资产增值之旅',
      buttonText: '立即加入',
      buttonLink: '/contact',
    },
    investors: [],
  },
  en: {
    hero: {
      badge: 'Web3 Decentralized Finance Protocol',
      title1: 'Redefine',
      titleHighlight: 'Decentralized',
      title2: 'Digital Asset Management',
      subtitle: 'BSC-based smart contract financial protocol for safer, more transparent, and sustainable asset growth',
      ctaText: 'Get Started',
      ctaLink: '/products',
      ctaSecondaryText: 'Learn More',
      ctaSecondaryLink: '/about',
    },
    stats: [
      { value: '50,000', label: 'Registered Users' },
      { value: '15', label: 'Direct Referral', suffix: '%' },
      { value: '$100M+', label: 'Trading Volume' },
      { value: '30+', label: 'Countries' },
    ],
    features: [
      { title: 'Secure & Safe', description: 'Multi-audited smart contracts with on-chain custody, eliminating centralized risks' },
      { title: 'Efficient Returns', description: '15% direct referral, 35% dynamic rewards, 15% weekly dividends — triple yield' },
      { title: 'Global Coverage', description: 'Multi-language, multi-currency decentralized finance network across 30+ countries' },
      { title: 'Fully Transparent', description: 'All transactions verifiable on-chain, publicly auditable reward algorithms' },
      { title: 'Smart Management', description: 'AI-driven asset allocation strategies that automatically optimize portfolios' },
      { title: 'Community Governance', description: 'DAO governance model — hold tokens, vote on protocol direction together' },
    ],
    cta: {
      title: 'Ready to Get Started?',
      subtitle: 'Join FunDAO and begin your decentralized asset growth journey',
      buttonText: 'Join Now',
      buttonLink: '/contact',
    },
    investors: [],
  },
}

const INVESTORS_QUERY = `*[_type == "investor"] | order(order asc) {
  _id, name, logo, website
}`

export async function getHomePageData(lang: Lang): Promise<HomePageData> {
  try {
    const [cmsData, investors] = await Promise.all([
      sanityClient.fetch(`*[_type == "homePage"][0]`),
      sanityClient.fetch(INVESTORS_QUERY),
    ])

    if (cmsData?.hero) {
      const suffix = lang === 'zh' ? 'Zh' : 'En'

      return {
        hero: {
          badge: cmsData.hero[`badge${suffix}`] || defaultData[lang].hero.badge,
          title1: cmsData.hero[`title1${suffix}`] || defaultData[lang].hero.title1,
          titleHighlight: cmsData.hero[`titleHighlight${suffix}`] || defaultData[lang].hero.titleHighlight,
          title2: cmsData.hero[`title2${suffix}`] || defaultData[lang].hero.title2,
          subtitle: cmsData.hero[`subtitle${suffix}`] || defaultData[lang].hero.subtitle,
          ctaText: cmsData.hero[`ctaText${suffix}`] || defaultData[lang].hero.ctaText,
          ctaLink: cmsData.hero.ctaLink || defaultData[lang].hero.ctaLink,
          ctaSecondaryText: cmsData.hero[`ctaSecondaryText${suffix}`] || defaultData[lang].hero.ctaSecondaryText,
          ctaSecondaryLink: cmsData.hero.ctaSecondaryLink || defaultData[lang].hero.ctaSecondaryLink,
        },
        stats: (cmsData.stats || []).length > 0
          ? cmsData.stats.map((s: any) => ({
              value: s.value,
              label: s[`label${suffix}`] || '',
              suffix: s.suffix,
            }))
          : defaultData[lang].stats,
        features: (cmsData.features || []).length > 0
          ? cmsData.features.map((f: any) => ({
              title: f[`title${suffix}`] || '',
              description: f[`desc${suffix}`] || '',
            }))
          : defaultData[lang].features,
        rewards: rewardsData[lang],
        cta: {
          title: cmsData.cta?.[`title${suffix}`] || defaultData[lang].cta.title,
          subtitle: cmsData.cta?.[`subtitle${suffix}`] || defaultData[lang].cta.subtitle,
          buttonText: cmsData.cta?.[`buttonText${suffix}`] || defaultData[lang].cta.buttonText,
          buttonLink: cmsData.cta?.buttonLink || defaultData[lang].cta.buttonLink,
        },
        investors: investors || [],
      }
    }
  } catch {
    // CMS unavailable, use defaults
  }

  return { ...defaultData[lang], rewards: rewardsData[lang], investors: [] }
}
