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
    <section id="about" className="pt-20 min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-primary">
                  Producer
                </h1>
                <div className="w-1 h-16 bg-accent"></div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-600">
                  Innovator
                </h1>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Senior Producer specializing in event production, digital content strategy, and AI-enhanced learning experiences. Over a decade of delivering impactful experiences for major brands.
              </p>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-accent text-white rounded-full text-sm font-medium">Event Production</span>
              <span className="px-4 py-2 bg-teal text-white rounded-full text-sm font-medium">Audio Engineering</span>
              <span className="px-4 py-2 bg-yellow text-primary rounded-full text-sm font-medium">Content Strategy</span>
              <span className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">AI Innovation</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex space-x-4 pt-4">
              <button 
                onClick={() => scrollToSection('work')}
                className="bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                View My Work
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>

          {/* Right Side - Portrait with Artistic Treatment */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Professional headshot portrait */}
              <img 
                src="/attached_assets/Jon for SeatGeek_1749669105141.JPG" 
                alt="Jonathan Lurie - Professional headshot" 
                className="w-full h-auto rounded-2xl shadow-2xl relative z-10"
              />
              
              
              
              {/* Code Elements Overlay */}
              <div className="absolute top-4 right-4 z-30 opacity-70">
                <div className="bg-primary bg-opacity-90 text-white p-3 rounded-lg font-mono text-xs">
                  <div>const producer = {"{"}
                  </div>
                  <div className="ml-4">expertise: ['events', 'audio'],</div>
                  <div className="ml-4">innovation: true</div>
                  <div>{"}"}</div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div 
                className="absolute -left-8 top-20"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-16 h-16 bg-teal bg-opacity-20 rounded-full flex items-center justify-center">
                  <Music className="text-teal text-xl" />
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -right-8 bottom-20"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -2 }}
              >
                <div className="w-20 h-20 bg-yellow bg-opacity-20 rounded-full flex items-center justify-center">
                  <Mic className="text-primary text-2xl" />
                </div>
              </motion.div>
            </div>

            {/* Background Geometric Shapes */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent bg-opacity-10 rounded-full -z-10"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal bg-opacity-10 rounded-full -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
