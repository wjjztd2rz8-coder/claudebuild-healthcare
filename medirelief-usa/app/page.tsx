import Hero from "@/components/landing/Hero";
import StatsSection from "@/components/landing/StatsSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FAQ from "@/components/landing/FAQ";
import FinalCta from "@/components/landing/FinalCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsSection />
      <HowItWorks />
      <FAQ />
      <FinalCta />
    </main>
  );
}
