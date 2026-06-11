import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { FeatureGrid } from '../components/FeatureGrid';
import { CallToAction } from '../components/CallToAction';

export const LandingPage = () => {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <AboutSection />
      <FeatureGrid />
      <CallToAction />
    </div>
  );
};
