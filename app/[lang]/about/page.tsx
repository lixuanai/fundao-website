import { notFound } from 'next/navigation'
import { isValidLang, type Lang } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getSEOMetadata } from '@/lib/i18n/seo'

export async function generateMetadata({ params }: { params: { lang: string } }) {
  if (!isValidLang(params.lang)) return {}
  const dict = await getDictionary(params.lang)
  return getSEOMetadata({
    lang: params.lang,
    path: '/about',
    title: dict.t('about.title'),
  })
}

const content: Record<Lang, {
  hero: { badge: string; title: string; highlight: string; subtitle: string }
  mission: { title: string; items: Array<{ title: string; desc: string }> }
  timeline: { title: string; items: Array<{ year: string; title: string; desc: string }> }
  values: { title: string; items: Array<{ title: string; desc: string }> }
}> = {
  zh: {
    hero: {
      badge: '关于 FunDAO',
      title: '构建去中心化金融的',
      highlight: '未来基础设施',
      subtitle: 'FunDAO 是一个基于 BSC 的去中心化数字资产平台，通过智能合约实现透明、安全、高效的金融服务',
    },
    mission: {
      title: '我们的使命',
      items: [
        { title: '普惠金融', desc: '让全球用户都能平等地参与去中心化金融，降低门槛，打破地域限制' },
        { title: '资产自主权', desc: '用户完全掌控自己的数字资产，私钥即所有权，杜绝中心化风险' },
        { title: '透明治理', desc: '所有规则写入智能合约，代码即法律，社区共同决策协议发展' },
        { title: '可持续收益', desc: '通过创新的三重收益机制，实现长期、稳定、可追溯的链上收益' },
      ],
    },
    timeline: {
      title: '发展历程',
      items: [
        { year: '2026 Q2', title: '项目启动', desc: 'FunDAO 概念验证完成，核心智能合约开发启动' },
        { year: '2026 Q3', title: '合约审计', desc: '智能合约通过多家安全机构审计，代码开源' },
        { year: '2026 Q4', title: '生态上线', desc: 'FunDAO生态协议在 BSC 主网部署，首批用户入驻' },
        { year: '2026 Q6', title: '生态扩展', desc: '合作伙伴突破 30+，覆盖全球 30 个国家和地区' },
        { year: '2027 Q1', title: 'V2 升级', desc: '协议 V2 版本上线，新增 AI 资产配置策略' },
      ],
    },
    values: {
      title: '核心价值观',
      items: [
        { title: '安全第一', desc: '多重审计、链上托管、紧急暂停机制，资金安全是底线' },
        { title: '开放透明', desc: '代码开源、数据链上可查、收益算法公开，信任源于透明' },
        { title: '用户至上', desc: '产品设计以用户体验为核心，持续迭代，快速响应社区需求' },
        { title: '创新驱动', desc: '探索 DeFi 前沿技术，AI + 区块链融合，引领行业发展' },
      ],
    },
  },
  en: {
    hero: {
      badge: 'About FunDAO',
      title: 'Building the Future Infrastructure of',
      highlight: 'Decentralized Finance',
      subtitle: 'FunDAO is a BSC-based decentralized digital asset platform delivering transparent, secure, and efficient financial services through smart contracts',
    },
    mission: {
      title: 'Our Mission',
      items: [
        { title: 'Financial Inclusion', desc: 'Enable global users to participate in DeFi equally, lowering barriers and breaking geographic limits' },
        { title: 'Asset Sovereignty', desc: 'Users fully control their digital assets — private keys equal ownership, eliminating centralized risks' },
        { title: 'Transparent Governance', desc: 'All rules encoded in smart contracts, code is law, community decides protocol direction together' },
        { title: 'Sustainable Returns', desc: 'Innovative triple-yield mechanism for long-term, stable, and traceable on-chain returns' },
      ],
    },
    timeline: {
      title: 'Milestones',
      items: [
        { year: '2026 Q2', title: 'Project Launch', desc: 'FunDAO proof-of-concept completed, core smart contract development initiated' },
        { year: '2026 Q3', title: 'Contract Audit', desc: 'Smart contracts audited by multiple security firms, code open-sourced' },
        { year: '2026 Q4', title: 'Ecosystem Launch', desc: 'FunDAO ecosystem protocol deployed on BSC mainnet, first users onboarded' },
        { year: '2026 Q6', title: 'Ecosystem Expansion', desc: 'Partners exceeded 30+, covering 30 countries and regions globally' },
        { year: '2027 Q1', title: 'V2 Upgrade', desc: 'Protocol V2 launched with AI-driven asset allocation strategies' },
      ],
    },
    values: {
      title: 'Core Values',
      items: [
        { title: 'Security First', desc: 'Multi-audits, on-chain custody, emergency pause mechanisms — fund safety is the bottom line' },
        { title: 'Open & Transparent', desc: 'Open-source code, on-chain verifiable data, public reward algorithms — trust through transparency' },
        { title: 'User-Centric', desc: 'Product design centered on user experience, continuous iteration, rapid community response' },
        { title: 'Innovation-Driven', desc: 'Exploring DeFi frontiers, AI + blockchain integration, leading industry development' },
      ],
    },
  },
}

export default async function AboutPage({ params }: { params: { lang: string } }) {
  if (!isValidLang(params.lang)) notFound()
  const dict = content[params.lang as Lang]

  return (
    <>
      {/* Hero */}
      <section className="section-padding relative overflow-hidden pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-[128px]" />

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

      {/* Mission */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="section-title text-center mb-12">{dict.mission.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {dict.mission.items.map((item) => (
              <div key={item.title} className="glass-card p-6">
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding border-t border-white/[0.06]">
        <div className="container-main">
          <h2 className="section-title text-center mb-12">{dict.timeline.title}</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {dict.timeline.items.map((item, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-brand-cyan font-semibold">{item.year}</span>
                </div>
                <div className="flex-shrink-0 w-px h-full bg-gradient-to-b from-brand-cyan/50 to-brand-purple/50 relative min-h-[60px]">
                  <div className="absolute top-2 -left-1.5 w-3 h-3 rounded-full bg-brand-cyan" />
                </div>
                <div className="flex-1 pb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding border-t border-white/[0.06]">
        <div className="container-main">
          <h2 className="section-title text-center mb-12">{dict.values.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {dict.values.items.map((item) => (
              <div key={item.title} className="glass-card-hover p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
