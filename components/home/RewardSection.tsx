interface RewardTier {
  percentage: number
  label: string
  description: string
  color: string
}

interface RewardSectionProps {
  title: string
  subtitle: string
  tiers: RewardTier[]
}

const COLOR_MAP: Record<string, string> = {
  cyan: 'from-brand-cyan to-brand-cyan/60',
  purple: 'from-brand-purple to-brand-purple/60',
  pink: 'from-brand-pink to-brand-pink/60',
  blue: 'from-brand-blue to-brand-blue/60',
}

export function RewardSection({ title, subtitle, tiers }: RewardSectionProps) {
  if (!tiers.length) return null

  return (
    <section className="section-padding relative overflow-hidden" id="rewards">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple/5 to-transparent" />

      <div className="relative z-10 container-main">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tiers.map((tier) => {
            const gradient = COLOR_MAP[tier.color] || COLOR_MAP.cyan
            return (
              <div
                key={tier.label}
                className="glass-card-hover p-8 text-center relative group"
              >
                {/* Percentage */}
                <div className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-4`}>
                  {tier.percentage}%
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-white mb-3">
                  {tier.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed">
                  {tier.description}
                </p>

                {/* Decorative line */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r ${gradient} opacity-50 group-hover:w-24 transition-all duration-300`} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
