import { motion } from "framer-motion";
import { Music, Mic } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="pt-20 pb-20 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          {/* Main Title */}
          <motion.div 
            className="space-y-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl lg:text-7xl font-bold text-primary mb-4">
              Jonathan Lurie
            </h1>
            <h2 className="text-2xl lg:text-3xl text-gray-600 font-light">
              Senior Producer & Creative Director
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Driving multimedia content and digital storytelling for 10+ years, delivering impactful entertainment, commercial, and educational campaigns for major brands including Squarespace, LinkedIn, Zocdoc, and SeatGeek.
            </p>
          </motion.div>

          {/* Portrait */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative inline-block">
              <img 
                src="/attached_assets/Jon Headshot_1749763552830.JPG" 
                alt="Jonathan Lurie - Professional headshot" 
                className="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover object-top shadow-2xl mx-auto"
              />
            </div>
          </motion.div>

          {/* Skills and CTA */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Skills Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="px-4 py-2 bg-accent text-white rounded-full text-sm font-medium">Video Production</span>
              <span className="px-4 py-2 bg-teal text-white rounded-full text-sm font-medium">Digital Storytelling</span>
              <span className="px-4 py-2 bg-yellow text-primary rounded-full text-sm font-medium">Workflow Optimization</span>
              <span className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">Team Leadership</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => scrollToSection('watch')}
                className="bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                Watch My Work
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
