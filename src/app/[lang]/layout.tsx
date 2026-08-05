import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { locales } from '../../../i18n.config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DynamicBackground from '@/components/layout/DynamicBackground';

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    alternates: {
      canonical: `https://www.fundao.fun/${lang}`,
      languages: {
        'zh': 'https://www.fundao.fun/zh',
        'en': 'https://www.fundao.fun/en',
      },
    },
    openGraph: {
      locale: isZh ? 'zh_CN' : 'en_US',
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  unstable_setRequestLocale(lang);
  const messages = await getMessages();

  return (
    <div lang={lang} className="bg-[#F0EDF6] text-gray-900 antialiased relative overflow-hidden">
      <NextIntlClientProvider messages={messages}>
        <DynamicBackground />
        <Header />
        <main className="min-h-screen relative z-10">{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
