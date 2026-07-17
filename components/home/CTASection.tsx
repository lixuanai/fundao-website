interface CTASectionProps {
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
  lang: string
}

export function CTASection({ title, subtitle, buttonText, buttonLink, lang }: CTASectionProps) {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/5 via-brand-purple/5 to-brand-pink/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-purple/5 rounded-full blur-[128px]" />

      <div className="relative z-10 container-main text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
          {title}
        </h2>
        <p className="text-lg text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
          {subtitle}
        </p>
        <a
          href={buttonLink.startsWith('/') ? `/${lang}${buttonLink}` : buttonLink}
          className="btn-primary text-base px-10 py-4"
        >
          {buttonText}
        </a>
      </div>
    </section>
  )
}
