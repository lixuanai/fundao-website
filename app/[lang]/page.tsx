import { notFound } from 'next/navigation'
import { isValidLang } from '@/lib/i18n/config'
import { getHomePageData } from '@/lib/data/home'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsSection } from '@/components/home/StatsSection'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { RewardSection } from '@/components/home/RewardSection'
import { InvestorsSection } from '@/components/home/InvestorsSection'
import { CTASection } from '@/components/home/CTASection'

export default async function HomePage({
  params,
}: {
  params: { lang: string }
}) {
  if (!isValidLang(params.lang)) {
    notFound()
  }

  const data = await getHomePageData(params.lang)

  return (
    <>
      <HeroSection {...data.hero} lang={params.lang} />
      <StatsSection stats={data.stats} />
      <FeaturesSection
        features={data.features}
        title={params.lang === 'zh' ? '为什么选择 FunDAO' : 'Why FunDAO'}
        subtitle={params.lang === 'zh' ? '安全、透明、高效的去中心化金融协议' : 'Secure, transparent, and efficient DeFi protocol'}
      />
      <RewardSection {...data.rewards} />
      {data.investors.length > 0 && (
        <InvestorsSection
          title={params.lang === 'zh' ? '生态合作伙伴' : 'Ecosystem Partners'}
          investors={data.investors}
        />
      )}
      <CTASection {...data.cta} lang={params.lang} />
    </>
  )
}
