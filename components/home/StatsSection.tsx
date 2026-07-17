'use client'

import { useCountUp } from '@/hooks/useCountUp'

interface StatItem {
  value: string
  label: string
  suffix?: string
}

interface StatsSectionProps {
  stats: StatItem[]
}

function StatCounter({ stat }: { stat: StatItem }) {
  const { value, ref } = useCountUp(stat.value)

  return (
    <div ref={ref} className="text-center group">
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2 transition-transform group-hover:scale-105">
        {value}
        {stat.suffix && <span className="text-2xl md:text-3xl">{stat.suffix}</span>}
      </div>
      <div className="text-sm text-white/50">{stat.label}</div>
    </div>
  )
}

export function StatsSection({ stats }: StatsSectionProps) {
  if (!stats.length) return null

  return (
    <section className="section-padding border-t border-white/[0.06]">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
