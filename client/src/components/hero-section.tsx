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
            className="mb-16 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <img 
                src="/attached_assets/image_1749859628252.png" 
                alt="Jonathan Lurie - Professional headshot" 
                className="w-72 h-72 lg:w-96 lg:h-96 object-contain"
              />
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button 
                onClick={() => scrollToSection('watch')}
                className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300"
              >
                Watch
              </button>
              <button 
                onClick={() => scrollToSection('experience')}
                className="bg-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300"
              >
                Experience
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300"
              >
                Contact
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
