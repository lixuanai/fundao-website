import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LANGS, LANG_LOCALES, isValidLang } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getSEOMetadata } from '@/lib/i18n/seo'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { JsonLd, getOrganizationJsonLd, getWebSiteJsonLd } from '@/components/JsonLd'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  if (!isValidLang(params.lang)) return {}

  const dict = await getDictionary(params.lang)

  return getSEOMetadata({
    lang: params.lang,
    path: '/',
    title: dict.t('nav.home'),
  })
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  if (!isValidLang(params.lang)) {
    notFound()
  }

  const dict = await getDictionary(params.lang)

  return (
    <html lang={LANG_LOCALES[params.lang]} className={inter.variable} suppressHydrationWarning>
      <head>
        <JsonLd data={getOrganizationJsonLd()} />
        <JsonLd data={getWebSiteJsonLd()} />
      </head>
      <body className="bg-surface text-white antialiased min-h-screen">
        <Header lang={params.lang} dict={dict.raw} />
        <main className="pt-16">{children}</main>
        <Footer lang={params.lang} dict={dict.raw} />
      </body>
    </html>
  )
}
