import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Lightbulb, Video, Film, Music, Sparkles } from "lucide-react";
import type { Experience } from "@shared/schema";

const logoMap = {
  "Madecraft": "/attached_assets/Madecraft Logo_1749860624278.png",
  "Melogold, Inc.": "/attached_assets/MELOGOLD_LOGO_V1_LG_ALPHA_1749859316035.png",
  "The Wild Honey Pie": "/attached_assets/Honey Pie Logo_1749859316032.jpeg",
  "Area 51 NYC / Aura Sonic Ltd": null, // Use icon fallback
};

const iconFallbackCompanies = ["12 Grand LLC", "Area 51 NYC / Aura Sonic Ltd", "SonicScoop"];

const iconMap = {
  lightbulb: Lightbulb,
  video: Video,
  film: Film,
  music: Music,
  sparkles: Sparkles,
};

const colorMap = {
  accent: "bg-accent",
  teal: "bg-teal",
  yellow: "bg-yellow",
  primary: "bg-primary",
};

export default function ExperienceTimeline() {
  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ["/api/experiences"],
    queryFn: async () => {
      const response = await fetch("/api/experiences");
      if (!response.ok) throw new Error("Failed to fetch experiences");
      return response.json() as Promise<Experience[]>;
    },
  });

  if (isLoading) {
    return (
      <section id="experience" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Career Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Over a decade of progressive growth across multiple industries and creative disciplines.
            </p>
          </div>
          <div className="space-y-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start space-x-8">
                <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="bg-white p-6 rounded-xl shadow-lg flex-1">
                  <div className="animate-pulse space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">Career Journey</h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-teal to-accent rounded-full"></div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {experiences.map((experience, index) => {
              const IconComponent = iconMap[experience.icon as keyof typeof iconMap] || Lightbulb;
              const colorClass = colorMap[experience.color as keyof typeof colorMap] || "bg-accent";
              const yearRange = experience.endYear ? `${experience.startYear}-${experience.endYear}` : `${experience.startYear}-Present`;
              const companyLogo = logoMap[experience.company as keyof typeof logoMap];

              return (
                <motion.div
                  key={experience.id}
                  className="flex items-start space-x-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-20 h-20 ${companyLogo || iconFallbackCompanies.includes(experience.company) ? 'bg-white border-4 border-white shadow-xl' : colorClass} rounded-full flex items-center justify-center flex-shrink-0 relative z-10 p-3 ring-4 ring-gray-100`}>
                    {companyLogo ? (
                      <img 
                        src={companyLogo} 
                        alt={`${experience.company} logo`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <IconComponent className={iconFallbackCompanies.includes(experience.company) ? 'text-gray-800 text-2xl' : 'text-white text-2xl'} />
                    )}
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex-1 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-primary">{experience.title}</h3>
                      <span className="text-gray-500 font-medium">{yearRange}</span>
                    </div>
                    <p className={`text-${experience.color} font-medium mb-2`}>
                      {experience.company} - {experience.location}
                    </p>
                    <p className="text-gray-600">{experience.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
