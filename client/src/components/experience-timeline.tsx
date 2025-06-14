import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Lightbulb, Video, Film, Music } from "lucide-react";
import type { Experience } from "@shared/schema";

const logoMap = {
  "Madecraft": "/attached_assets/MELOGOLD_LOGO_V1_LG_ALPHA_1749859316035.png",
  "Melogold, Inc.": "/attached_assets/MELOGOLD_LOGO_V1_LG_ALPHA_1749859316035.png",
  "The Wild Honey Pie": "/attached_assets/Honey Pie Logo_1749859316032.jpeg",
  "Area 51 NYC / Aura Sonic Ltd": null, // Use icon fallback
};

const iconMap = {
  lightbulb: Lightbulb,
  video: Video,
  film: Film,
  music: Music,
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
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Career Journey</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Over a decade of progressive growth across multiple industries and creative disciplines.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-accent"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
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
                  <div className={`w-16 h-16 ${companyLogo ? 'bg-white border-2 border-gray-200' : colorClass} rounded-full flex items-center justify-center flex-shrink-0 relative z-10 p-2`}>
                    {companyLogo ? (
                      <img 
                        src={companyLogo} 
                        alt={`${experience.company} logo`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <IconComponent className="text-white text-xl" />
                    )}
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg flex-1">
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
