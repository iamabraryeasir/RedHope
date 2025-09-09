import CompatibilityGuideSection from "@/components/modules/landing-page/CompatibilityGuideSection";
import DonorsCountSection from "@/components/modules/landing-page/DonorsCountSection";
import HeroSection from "@/components/modules/landing-page/HeroSection";
import HowItWorksSection from "@/components/modules/landing-page/HowItWorksSection";
import ImageSliderSection from "@/components/modules/landing-page/ImageSliderSection";
import StoriesSection from "@/components/modules/landing-page/StoriesSection";
import TestimonialSection from "@/components/modules/landing-page/TestimonialSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ImageSliderSection />
      <HowItWorksSection />
      <CompatibilityGuideSection />
      <DonorsCountSection />
      <TestimonialSection />
      <StoriesSection/>
    </>
  );
}
