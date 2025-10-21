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
    <section id="about" className="pt-24 pb-32 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-teal/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          {/* Main Title */}
          <motion.div 
            className="space-y-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl lg:text-8xl font-bold text-primary mb-6 tracking-tight">
              Jonathan Lurie
            </h1>
            <h2 className="text-3xl lg:text-4xl text-gray-600 font-light mb-8 tracking-wide">
              Senior Producer & Content Strategist
            </h2>
            <p className="text-2xl lg:text-3xl font-semibold mb-12 gradient-text">
              Crafting Stories. Driving Results.
            </p>
            
            {/* Impact Stats */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-glow transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-5xl font-bold text-blue-600 mb-3">2.5M+</div>
                <div className="text-gray-700 leading-relaxed">Learners reached on LinkedIn Learning (100+ courses produced)</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-glow-teal transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-5xl font-bold text-teal mb-3">30M+</div>
                <div className="text-gray-700 leading-relaxed">YouTube Views generated (200+ videos for 40 brands)</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-5xl font-bold text-gray-900 mb-3">10+</div>
                <div className="text-gray-700 leading-relaxed">Years leading content & experiential production for top brands</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Portrait */}
          <motion.div 
            className="mb-20 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-teal rounded-full blur-2xl opacity-20 scale-110"></div>
              <img 
                src="/attached_assets/Jon Headshot_1749860858044.JPG" 
                alt="Jonathan Lurie - Professional headshot" 
                className="w-72 h-72 lg:w-96 lg:h-96 rounded-full object-cover object-top shadow-2xl ring-4 ring-white relative z-10"
              />
            </div>
          </motion.div>

          {/* Navigation Button */}
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex justify-center">
              <button 
                onClick={() => scrollToSection('experience')}
                className="group bg-gradient-to-r from-teal to-teal/90 text-white px-10 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Experience
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
