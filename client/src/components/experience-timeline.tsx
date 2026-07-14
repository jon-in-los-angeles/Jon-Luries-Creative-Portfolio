import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import type { Experience } from "@shared/schema";

export default function ExperienceTimeline({ embedded = false }: { embedded?: boolean }) {
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
    <section id="experience" className={embedded ? "py-10 bg-white relative overflow-hidden" : "py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"}>
      {!embedded && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className={embedded ? "text-center mb-8 sm:mb-10" : "text-center mb-20"}>
          <h2 className={embedded ? "text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3 sm:mb-4 tracking-tight" : "text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight"}>Career Journey</h2>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {experiences.map((experience, index) => {
            const yearRange = experience.endYear ? `${experience.startYear}-${experience.endYear}` : `${experience.startYear}-Present`;

            return (
              <motion.div
                key={experience.id}
                className="bg-white p-5 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-0 border border-gray-100"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-3 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-primary">{experience.title}</h3>
                  <span className="text-sm sm:text-base text-gray-500 font-medium sm:whitespace-nowrap">{yearRange}</span>
                </div>
                <p className={`text-${experience.color} font-medium mb-2`}>
                  {experience.company} - {experience.location}
                </p>
                <p className="text-gray-600">{experience.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
