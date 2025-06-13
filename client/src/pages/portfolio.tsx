import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ProjectShowcase from "@/components/project-showcase";
import WatchSection from "@/components/watch-section";
import ExperienceTimeline from "@/components/experience-timeline";
import AudioPlayer from "@/components/audio-player";
import ContactSection from "@/components/contact-section";
import ProjectModal from "@/components/project-modal";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      <ProjectShowcase />
      <WatchSection />
      <ExperienceTimeline />
      <AudioPlayer />
      <ContactSection />
      <ProjectModal />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
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
