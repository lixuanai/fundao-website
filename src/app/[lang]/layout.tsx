import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { locales } from '../../../i18n.config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DynamicBackground from '@/components/layout/DynamicBackground';

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
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
    <div lang={lang} className="bg-[#FAFBFF] text-gray-900 antialiased relative overflow-hidden">
      <NextIntlClientProvider messages={messages}>
        <DynamicBackground />
        <Header />
        <main className="min-h-screen relative z-10">{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
