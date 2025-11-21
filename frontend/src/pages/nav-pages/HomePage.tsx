import CompatibilityGuideSection from "@/components/modules/landing-page/CompatibilityGuideSection";
// import DonorsCountSection from "@/components/modules/landing-page/DonorsCountSection";
import HeroSection from "@/components/modules/landing-page/HeroSection";
import HowItWorksSection from "@/components/modules/landing-page/HowItWorksSection";
import ImageSliderSection from "@/components/modules/landing-page/ImageSliderSection";
import JoinCommunitySection from "@/components/modules/landing-page/JoinCommunitySection";
import StoriesSection from "@/components/modules/landing-page/StoriesSection";
import UniversalDonorsSection from "@/components/modules/landing-page/UniversalDonorsSection";

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <ImageSliderSection />
            <HowItWorksSection />
            <CompatibilityGuideSection />
            <UniversalDonorsSection />
            {/* <DonorsCountSection /> */}
            <StoriesSection />
            <JoinCommunitySection />
        </>
    );
}
