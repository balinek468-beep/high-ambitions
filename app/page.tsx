import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageMotionShell } from "@/components/layout/page-motion-shell";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WorkersSection } from "@/components/sections/workers-section";
import { WhyUsSection } from "@/components/sections/why-us-section";

export default function Home() {
  return (
    <PageMotionShell>
      <main className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ServicesSection />
        <WhyUsSection />
        <ProcessSection />
        <ContactSection />
        <WorkersSection />
        <Footer />
      </main>
    </PageMotionShell>
  );
}
