import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import TwelveGrandSection from "@/components/twelve-grand-section";
import WatchSection from "@/components/watch-section";
import ExperienceTimeline from "@/components/experience-timeline";
import ContactSection from "@/components/contact-section";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Portfolio() {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      <TwelveGrandSection />
      <WatchSection />
      <ExperienceTimeline />
      <ContactSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold font-mono text-sm">JL</span>
              </div>
              <span className="font-medium">Jonathan Lurie</span>
            </div>
            <p>&copy; 2026 Jonathan Lurie. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}