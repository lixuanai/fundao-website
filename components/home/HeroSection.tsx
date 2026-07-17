interface HeroSectionProps {
  badge: string
  title1: string
  titleHighlight: string
  title2: string
  subtitle: string
  ctaText: string
  ctaLink: string
  ctaSecondaryText: string
  ctaSecondaryLink: string
  lang: string
}

export function HeroSection({
  badge, title1, titleHighlight, title2, subtitle,
  ctaText, ctaLink, ctaSecondaryText, ctaSecondaryLink, lang,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-cyan/8 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-purple/8 rounded-full blur-[128px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-pink/5 rounded-full blur-[200px]" />

      <div className="relative z-10 container-main text-center py-20">
        {/* Badge */}
        <div className="badge mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
          {badge}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance leading-tight">
          {title1}{' '}
          <span className="gradient-text">{titleHighlight}</span>
          <br />
          {title2}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={ctaLink.startsWith('/') ? `/${lang}${ctaLink}` : ctaLink} className="btn-primary text-base px-8 py-4">
            {ctaText}
          </a>
          <a href={ctaSecondaryLink.startsWith('/') ? `/${lang}${ctaSecondaryLink}` : ctaSecondaryLink} className="btn-secondary text-base px-8 py-4">
            {ctaSecondaryText}
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
