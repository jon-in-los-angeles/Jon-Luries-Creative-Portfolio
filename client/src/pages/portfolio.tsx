import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import WatchSection from "@/components/watch-section";
import ProjectShowcase from "@/components/project-showcase";
import ProjectShowcaseSimple from "@/components/project-showcase-simple";
import SimpleProjectTest from "@/components/simple-project-test";
import ProjectModal from "@/components/project-modal";
import ExperienceTimeline from "@/components/experience-timeline";
import ContactSection from "@/components/contact-section";
import PWAInstallPrompt from "@/components/pwa-install-prompt";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Portfolio() {
  useSmoothScroll();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      <WatchSection />
      
      {/* DEBUG: Project Showcase should appear here */}
      <div style={{ padding: '20px', background: 'red', color: 'white', textAlign: 'center' }}>
        DEBUG: This is where ProjectShowcase should be
      </div>
      <SimpleProjectTest />
      <ProjectShowcaseSimple />
      
      <ExperienceTimeline />
      <ContactSection />
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
      
      {/* Project Modal */}
      <ProjectModal />
      
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
            <p>&copy; 2025 Jonathan Lurie. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
