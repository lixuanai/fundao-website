import HeroSection from '@/components/home/HeroSection';
import AdvantagesSection from '@/components/home/AdvantagesSection';
import RewardsSection from '@/components/home/RewardsSection';
import LatestNewsSection from '@/components/home/LatestNewsSection';
import PartnersSection from '@/components/home/PartnersSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AdvantagesSection />
      <RewardsSection />
      <LatestNewsSection />
      <PartnersSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
