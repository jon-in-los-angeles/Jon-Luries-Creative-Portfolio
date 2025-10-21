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
            <h2 className="text-2xl lg:text-3xl text-gray-600 font-light mb-6">
              Senior Producer & Content Strategist
            </h2>
            <p className="text-xl text-gray-700 font-medium mb-8">
              Crafting Stories. Driving Results.
            </p>
            
            {/* Impact Stats */}
            <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-600">
              <div className="flex items-center justify-center">
                <span className="font-semibold text-blue-600">2.5M+</span>
                <span className="ml-2">Learners reached on LinkedIn Learning (100+ courses produced)</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="font-semibold text-teal-600">30M+</span>
                <span className="ml-2">YouTube Views generated (200+ videos for 40 brands)</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="font-semibold text-gray-700">10+</span>
                <span className="ml-2">Years leading content & experiential production for top brands</span>
              </div>
            </div>
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
                src="/attached_assets/Jon Headshot_1749860858044.JPG" 
                alt="Jonathan Lurie - Professional headshot" 
                className="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover object-top shadow-xl"
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
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
              >
                Watch
              </button>
              <button 
                onClick={() => scrollToSection('experience')}
                className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300"
              >
                Experience
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-300"
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
