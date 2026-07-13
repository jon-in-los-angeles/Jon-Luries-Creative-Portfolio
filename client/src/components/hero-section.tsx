import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certifications = [
  "Microsoft 365 Project Management",
  "Agile",
  "Anthropic AI Fluency",
];

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-white px-6 pt-24 pb-16">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Bridging the gap between creative vision and technical execution.
        </motion.h1>

        <motion.h2
          className="text-lg md:text-xl lg:text-2xl text-gray-500 font-normal leading-relaxed mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          I help organizations build better content workflows, launch strategic brand partnerships, and solve complex operational bottlenecks.
        </motion.h2>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          {certifications.map((cert) => (
            <span
              key={cert}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium"
            >
              <Award className="w-4 h-4 text-gray-500" />
              {cert}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <button
            onClick={() => scrollToSection('watch')}
            className="px-8 py-3 rounded-full bg-gray-900 text-white font-medium text-base hover:bg-gray-700 transition-colors duration-200 min-w-[160px]"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3 rounded-full border border-gray-900 text-gray-900 font-medium text-base hover:bg-gray-50 transition-colors duration-200 min-w-[160px]"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>
    </section>
  );
}
