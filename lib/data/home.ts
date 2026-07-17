import { sanityClient } from '@/lib/sanity/client'
import type { Lang } from '@/lib/i18n/config'

/**
 * 首页数据获取 — CMS 优先，fallback 到默认数据
 * 单一数据源：所有可变数据从 CMS 获取
 * 当 CMS 无数据时（首次部署），使用默认值保证页面正常显示
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
  features: Array<{ icon: string; title: string; description: string }>
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

// ===== 默认数据（fallback）=====
const defaultData: Record<Lang, HomePageData> = {
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
      { icon: 'shield', title: '安全可靠', description: '多重审计的智能合约，资金由链上协议托管，杜绝中心化风险' },
      { icon: 'zap', title: '高效收益', description: '直推奖励 15%、直推动态收益 35%、周分红 15%，三重收益机制' },
      { icon: 'globe', title: '全球覆盖', description: '支持多语言、多币种，覆盖 30+ 国家的去中心化金融网络' },
      { icon: 'lock', title: '透明可查', description: '所有交易记录链上可查，收益分配算法公开透明，代码即规则' },
      { icon: 'bar-chart', title: '智能管理', description: 'AI 驱动的资产配置策略，自动优化投资组合，降低风险敞口' },
      { icon: 'users', title: '社区治理', description: 'DAO 治理模式，持币即投票，社区共同决定协议发展方向' },
    ],
    rewards: {
      title: '三重收益机制',
      subtitle: '透明、可持续的链上收益分配',
      tiers: [
        { percentage: 15, label: '直推奖励', description: '直接推荐好友加入，立即获得其投入金额的 15% 作为推荐奖励', color: 'cyan' },
        { percentage: 35, label: '直推动态收益', description: '推荐活跃用户产生的动态收益，最高可获得 35% 的动态奖励', color: 'purple' },
        { percentage: 15, label: '周分红', description: '每周平台收益的 15% 按持币比例分配给所有参与者', color: 'pink' },
      ],
    },
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
      { icon: 'shield', title: 'Secure & Safe', description: 'Multi-audited smart contracts with on-chain custody, eliminating centralized risks' },
      { icon: 'zap', title: 'Efficient Returns', description: '15% direct referral, 35% dynamic rewards, 15% weekly dividends — triple yield' },
      { icon: 'globe', title: 'Global Coverage', description: 'Multi-language, multi-currency decentralized finance network across 30+ countries' },
      { icon: 'lock', title: 'Fully Transparent', description: 'All transactions verifiable on-chain, publicly auditable reward algorithms' },
      { icon: 'bar-chart', title: 'Smart Management', description: 'AI-driven asset allocation strategies that automatically optimize portfolios' },
      { icon: 'users', title: 'Community Governance', description: 'DAO governance model — hold tokens, vote on protocol direction together' },
    ],
    rewards: {
      title: 'Triple Yield Mechanism',
      subtitle: 'Transparent, sustainable on-chain reward distribution',
      tiers: [
        { percentage: 15, label: 'Direct Referral', description: 'Refer a friend and instantly earn 15% of their investment as a referral bonus', color: 'cyan' },
        { percentage: 35, label: 'Dynamic Rewards', description: 'Earn up to 35% dynamic rewards from your active referrals\' generated returns', color: 'purple' },
        { percentage: 15, label: 'Weekly Dividends', description: '15% of weekly platform revenue distributed proportionally to all participants', color: 'pink' },
      ],
    },
    cta: {
      title: 'Ready to Get Started?',
      subtitle: 'Join FunDAO and begin your decentralized asset growth journey',
      buttonText: 'Join Now',
      buttonLink: '/contact',
    },
    investors: [],
  },
}

const HOME_QUERY = `*[_type == "homePage"][0]{
  hero,
  stats,
  features,
  rewards,
  cta,
}`

const INVESTORS_QUERY = `*[_type == "investor"] | order(order asc) {
  _id, name, logo, website
}`

export async function getHomePageData(lang: Lang): Promise<HomePageData> {
  try {
    // Try CMS first
    const [cmsData, investors] = await Promise.all([
      sanityClient.fetch(HOME_QUERY),
      sanityClient.fetch(INVESTORS_QUERY),
    ])

    if (cmsData?.hero?.title1) {
      return {
        hero: cmsData.hero,
        stats: cmsData.stats || defaultData[lang].stats,
        features: cmsData.features || defaultData[lang].features,
        rewards: cmsData.rewards || defaultData[lang].rewards,
        cta: cmsData.cta || defaultData[lang].cta,
        investors: investors || [],
      }
    }
  } catch {
    // CMS unavailable, use defaults
  }

  return { ...defaultData[lang], investors: [] }
}
