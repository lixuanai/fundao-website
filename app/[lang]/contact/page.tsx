import { notFound } from 'next/navigation'
import { isValidLang, type Lang } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getSEOMetadata } from '@/lib/i18n/seo'
import { ContactForm } from '@/components/ContactForm'

export async function generateMetadata({ params }: { params: { lang: string } }) {
  if (!isValidLang(params.lang)) return {}
  const dict = await getDictionary(params.lang)
  return getSEOMetadata({
    lang: params.lang,
    path: '/contact',
    title: dict.t('contact.title'),
  })
}

const content: Record<Lang, {
  hero: { badge: string; title: string; highlight: string; subtitle: string }
  channels: Array<{ title: string; value: string; desc: string }>
  form: { title: string; subtitle: string; name: string; email: string; subject: string; message: string; submit: string; success: string }
}> = {
  zh: {
    hero: {
      badge: '联系我们',
      title: '与我们取得',
      highlight: '联系',
      subtitle: '无论是合作咨询、技术支持还是社区加入，我们随时准备为您服务',
    },
    channels: [
      { title: '商务合作', value: 'business@fundao.fun', desc: '合作伙伴、投资机构、媒体采访' },
      { title: '技术支持', value: 'support@fundao.fun', desc: '产品使用、智能合约、钱包连接' },
      { title: '社区运营', value: 'community@fundao.fun', desc: '社区活动、大使计划、内容创作' },
    ],
    form: {
      title: '发送消息',
      subtitle: '填写下方表单，我们将在 24 小时内回复',
      name: '您的姓名',
      email: '邮箱地址',
      subject: '主题',
      message: '留言内容',
      submit: '发送消息',
      success: '消息已发送，我们会尽快回复您！',
    },
  },
  en: {
    hero: {
      badge: 'Contact Us',
      title: 'Get in',
      highlight: 'Touch',
      subtitle: 'Whether for partnerships, technical support, or community joining — we are here to help',
    },
    channels: [
      { title: 'Business', value: 'business@fundao.fun', desc: 'Partnerships, investors, media inquiries' },
      { title: 'Tech Support', value: 'support@fundao.fun', desc: 'Product usage, smart contracts, wallet issues' },
      { title: 'Community', value: 'community@fundao.fun', desc: 'Events, ambassador program, content creation' },
    ],
    form: {
      title: 'Send a Message',
      subtitle: 'Fill out the form below and we will respond within 24 hours',
      name: 'Your Name',
      email: 'Email Address',
      subject: 'Subject',
      message: 'Message',
      submit: 'Send Message',
      success: 'Message sent! We will get back to you soon.',
    },
  },
}

export default async function ContactPage({ params }: { params: { lang: string } }) {
  if (!isValidLang(params.lang)) notFound()
  const dict = content[params.lang as Lang]

  return (
    <>
      {/* Hero */}
      <section className="section-padding relative overflow-hidden pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-pink/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[128px]" />

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

      {/* Channels */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {dict.channels.map((ch) => (
              <div key={ch.title} className="glass-card p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">{ch.title}</h3>
                <a href={`mailto:${ch.value}`} className="text-brand-cyan hover:text-brand-cyan/80 text-sm font-medium transition-colors">
                  {ch.value}
                </a>
                <p className="text-white/40 text-xs mt-2">{ch.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding border-t border-white/[0.06]">
        <div className="container-main max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="section-title">{dict.form.title}</h2>
            <p className="section-subtitle">{dict.form.subtitle}</p>
          </div>
          <ContactForm lang={params.lang} labels={dict.form} />
        </div>
      </section>
    </>
  )
}
