import { notFound } from 'next/navigation'
import { isValidLang, type Lang } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getSEOMetadata } from '@/lib/i18n/seo'

export async function generateMetadata({ params }: { params: { lang: string } }) {
  if (!isValidLang(params.lang)) return {}
  const dict = await getDictionary(params.lang)
  return getSEOMetadata({
    lang: params.lang,
    path: '/products',
    title: dict.t('products.title'),
  })
}

const content: Record<Lang, {
  hero: { badge: string; title: string; highlight: string; subtitle: string }
  products: Array<{ name: string; desc: string; features: string[]; status: string }>
  howItWorks: { title: string; steps: Array<{ num: string; title: string; desc: string }> }
}> = {
  zh: {
    hero: {
      badge: '产品矩阵',
      title: '一站式去中心化',
      highlight: '金融服务',
      subtitle: '从资产托管到收益优化，FunDAO 提供完整的 DeFi 产品生态，满足不同风险偏好的投资者需求',
    },
    products: [
      {
        name: '智能质押',
        desc: '将数字资产质押到经过审计的智能合约中，自动参与收益分配，无需手动操作',
        features: ['多重审计合约', '灵活锁仓周期', '实时收益追踪', '随时查看链上状态'],
        status: '已上线',
      },
      {
        name: '推荐奖励系统',
        desc: '通过推荐好友加入网络，获得直推奖励 15%、直推动态收益 35%，构建被动收入管道',
        features: ['15% 直推奖励', '35% 动态收益', '链上透明记录', '多层级追踪系统'],
        status: '已上线',
      },
      {
        name: '周分红计划',
        desc: '每周平台收益的 15% 按持币比例自动分配给所有参与者，长期稳定回报',
        features: ['自动分配', '每周结算', '持币即分红', '链上可验证'],
        status: '已上线',
      },
      {
        name: 'AI 资产配置',
        desc: 'AI 驱动的投资组合优化引擎，根据市场动态自动调整资产配置，降低风险敞口',
        features: ['AI 策略引擎', '动态再平衡', '风险控制模型', '多链资产支持'],
        status: '即将推出',
      },
    ],
    howItWorks: {
      title: '如何开始',
      steps: [
        { num: '01', title: '连接钱包', desc: '支持 MetaMask、Trust Wallet 等主流钱包，一键连接 BSC 网络' },
        { num: '02', title: '选择产品', desc: '根据风险偏好和投资目标，选择适合的产品组合' },
        { num: '03', title: '质押资产', desc: '确认交易并签署智能合约，资产进入链上托管' },
        { num: '04', title: '获取收益', desc: '收益自动分配到钱包，可随时查看链上记录和收益明细' },
      ],
    },
  },
  en: {
    hero: {
      badge: 'Product Suite',
      title: 'All-in-One Decentralized',
      highlight: 'Financial Services',
      subtitle: 'From asset custody to yield optimization, FunDAO provides a complete DeFi product ecosystem for investors with different risk profiles',
    },
    products: [
      {
        name: 'Smart Staking',
        desc: 'Stake digital assets in audited smart contracts to automatically participate in reward distribution — no manual operation needed',
        features: ['Multi-audited contracts', 'Flexible lockup periods', 'Real-time yield tracking', 'On-chain status verification'],
        status: 'Live',
      },
      {
        name: 'Referral Rewards',
        desc: 'Earn 15% direct referral bonus and up to 35% dynamic rewards by building your network — create passive income streams',
        features: ['15% direct referral', '35% dynamic rewards', 'On-chain transparent records', 'Multi-level tracking'],
        status: 'Live',
      },
      {
        name: 'Weekly Dividends',
        desc: '15% of weekly platform revenue automatically distributed to all participants proportionally — long-term stable returns',
        features: ['Automatic distribution', 'Weekly settlement', 'Hold tokens = dividends', 'On-chain verifiable'],
        status: 'Live',
      },
      {
        name: 'AI Asset Allocation',
        desc: 'AI-driven portfolio optimization engine that dynamically adjusts asset allocation based on market conditions to reduce risk exposure',
        features: ['AI strategy engine', 'Dynamic rebalancing', 'Risk control models', 'Multi-chain support'],
        status: 'Coming Soon',
      },
    ],
    howItWorks: {
      title: 'How to Start',
      steps: [
        { num: '01', title: 'Connect Wallet', desc: 'Support MetaMask, Trust Wallet and other major wallets — one-click BSC network connection' },
        { num: '02', title: 'Choose Products', desc: 'Select suitable product combinations based on risk preference and investment goals' },
        { num: '03', title: 'Stake Assets', desc: 'Confirm transactions and sign smart contracts — assets enter on-chain custody' },
        { num: '04', title: 'Earn Rewards', desc: 'Rewards automatically distributed to wallet — view on-chain records and earnings anytime' },
      ],
    },
  },
}

export default async function ProductsPage({ params }: { params: { lang: string } }) {
  if (!isValidLang(params.lang)) notFound()
  const dict = content[params.lang as Lang]

  return (
    <>
      {/* Hero */}
      <section className="section-padding relative overflow-hidden pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[128px]" />

        <div className="relative z-10 container-main text-center">
          <span className="badge mb-6 inline-block">{dict.hero.badge}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
            {dict.hero.title}{' '}
            <span className="gradient-text">{dict.hero.highlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            {dict.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {dict.products.map((product) => (
              <div key={product.name} className="glass-card-hover p-8 relative group">
                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span className={`badge ${product.status === '即将推出' || product.status === 'Coming Soon' ? '!border-brand-purple/40 !text-brand-purple' : '!border-brand-cyan/40 !text-brand-cyan'}`}>
                    {product.status}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 pr-20">{product.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">{product.desc}</p>

                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/50">
                      <span className="w-1 h-1 rounded-full bg-brand-cyan flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding border-t border-white/[0.06]">
        <div className="container-main">
          <h2 className="section-title text-center mb-12">{dict.howItWorks.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {dict.howItWorks.steps.map((step, idx) => (
              <div key={step.num} className="relative text-center">
                <div className="text-4xl font-bold gradient-text mb-4">{step.num}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                {idx < dict.howItWorks.steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-3 w-6 h-px bg-gradient-to-r from-brand-cyan/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
