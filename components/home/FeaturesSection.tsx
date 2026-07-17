import { Shield, Zap, Globe, Lock, BarChart3, Users } from 'lucide-react'

interface FeatureItem {
  title: string
  description: string
}

interface FeaturesSectionProps {
  features: FeatureItem[]
  title: string
  subtitle: string
}

// 图标按位置固定分配（不进 CMS，写死代码）
const ICONS = [Shield, Zap, Globe, Lock, BarChart3, Users]

export function FeaturesSection({ features, title, subtitle }: FeaturesSectionProps) {
  if (!features.length) return null

  return (
    <section className="section-padding" id="features">
      <div className="container-main">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <div
                key={feature.title}
                className="glass-card-hover p-6 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 flex items-center justify-center mb-4 group-hover:from-brand-cyan/30 group-hover:to-brand-purple/30 transition-all">
                  <Icon className="w-6 h-6 text-brand-cyan" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
