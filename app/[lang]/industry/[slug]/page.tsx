import { isValidLang, type Lang } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getSEOMetadata } from '@/lib/i18n/seo'
import { ArticleDetail } from '@/components/ArticleDetail'

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string }
}) {
  if (!isValidLang(params.lang)) return {}
  const dict = getDictionary(params.lang as Lang)
  return getSEOMetadata({
    lang: params.lang as Lang,
    path: `/industry/${params.slug}`,
    title: dict.t('industry.title'),
  })
}

export default async function IndustryArticlePage({
  params,
}: {
  params: { lang: string; slug: string }
}) {
  const dict = getDictionary(params.lang as Lang)

  return (
    <ArticleDetail
      lang={params.lang}
      slug={params.slug}
      backPath={`/${params.lang}/industry`}
      backLabel={dict.t('industry.title')}
    />
  )
}
