import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ExternalLink, Play, Volume2, GraduationCap, Lightbulb } from "lucide-react";
import type { Project } from "@shared/schema";
import AIAutomationIcon from "./ai-automation-icon";

interface ProjectModalStore {
  isOpen: boolean;
  project: Project | null;
  openModal: (project: Project) => void;
  closeModal: () => void;
}

// Global modal store for project modal
export const projectModalStore: ProjectModalStore = {
  isOpen: false,
  project: null,
  openModal: (project: Project) => {
    projectModalStore.isOpen = true;
    projectModalStore.project = project;
    document.body.style.overflow = 'hidden';
    // Trigger re-render
    window.dispatchEvent(new CustomEvent('projectModalUpdate'));
  },
  closeModal: () => {
    projectModalStore.isOpen = false;
    projectModalStore.project = null;
    document.body.style.overflow = 'auto';
    // Trigger re-render
    window.dispatchEvent(new CustomEvent('projectModalUpdate'));
  }
};

const categoryIcons = {
  events: Play,
  audio: Volume2,
  content: GraduationCap,
  digital: Lightbulb,
};

const categoryColors = {
  events: "accent",
  audio: "teal", 
  content: "yellow",
  digital: "primary",
};

const categoryLabels = {
  events: "EVENT PRODUCTION",
  audio: "AUDIO ENGINEERING",
  content: "LEARNING CONTENT",
  digital: "DIGITAL INNOVATION",
};

export default function ProjectShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ["/api/projects", selectedCategory],
    queryFn: async () => {
      const response = await fetch(`/api/projects?category=${selectedCategory}`);
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json() as Promise<Project[]>;
    },
  });

  console.log("ProjectShowcase rendering:", { projects, isLoading, error, selectedCategory });

  const filterButtons = [
    { id: "all", label: "All Projects" },
    { id: "events", label: "Event Production" },
    { id: "audio", label: "Audio Engineering" },
    { id: "content", label: "Learning Content" },
    { id: "digital", label: "Digital Innovation" },
  ];

  const handleProjectClick = (project: Project) => {
    projectModalStore.openModal(project);
  };

  if (isLoading) {
    return (
      <section id="work" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Featured Work</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A showcase of multimedia content and digital storytelling projects for major brands including Squarespace, Microsoft, LinkedIn, SeatGeek, and Zocdoc.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="py-20 bg-white" style={{ display: 'block', visibility: 'visible' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Featured Work</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A showcase of diverse projects spanning event production, audio engineering, content creation, and digital innovation.
          </p>
          <div className="text-xs text-gray-400 mt-2">
            Debug: {projects.length} projects loaded, Loading: {isLoading ? 'true' : 'false'}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => setSelectedCategory(button.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === button.id
                  ? "bg-accent text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {projects.map((project, index) => {
            const IconComponent = categoryIcons[project.category as keyof typeof categoryIcons];
            const categoryColor = categoryColors[project.category as keyof typeof categoryColors];
            const categoryLabel = categoryLabels[project.category as keyof typeof categoryLabels];
            
            return (
              <motion.div
                key={project.id}
                className="group cursor-pointer"
                onClick={() => handleProjectClick(project)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  {project.imageUrl === "ai-automation-icon" ? (
                    <div className="h-48">
                      <AIAutomationIcon />
                    </div>
                  ) : (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className={`w-full h-48 object-cover ${
                        project.title === "Branded Content Production" ? "object-top" : ""
                      }`}
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-${categoryColor} font-semibold text-sm`}>
                        {categoryLabel}
                      </span>
                      <ExternalLink className="text-gray-400 group-hover:text-accent transition-colors duration-300" size={16} />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{project.role}</span>
                      <div className={`w-8 h-8 bg-${categoryColor} bg-opacity-10 rounded-full flex items-center justify-center`}>
                        <IconComponent className={`text-${categoryColor} text-sm`} size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found for this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
