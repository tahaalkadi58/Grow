import { setRequestLocale } from 'next-intl/server';

import { EcosystemProvider } from '@/features/home/components/EcosystemProvider';
import { AboutSection } from '@/features/home/sections/AboutSection';
import { ClosingCtaSection } from '@/features/home/sections/ClosingCtaSection';
import { EcosystemSection } from '@/features/home/sections/EcosystemSection';
import { HeroSection } from '@/features/home/sections/HeroSection';
import { ImpactSection } from '@/features/home/sections/ImpactSection';
import { PartnersSection } from '@/features/home/sections/PartnersSection';
import { VisionMissionSection } from '@/features/home/sections/VisionMissionSection';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main-content" className="w-full bg-brand-bg">
      <div className="flex w-full flex-col">
        <EcosystemProvider>
          <HeroSection />
          <AboutSection />
          <VisionMissionSection />
          <ImpactSection />
          <EcosystemSection />
          <PartnersSection />
          <ClosingCtaSection />
        </EcosystemProvider>
      </div>
    </main>
  );
}
