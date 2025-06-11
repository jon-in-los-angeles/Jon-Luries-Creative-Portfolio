import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Check } from "lucide-react";
import { projectModalStore } from "./project-showcase";
import type { Project } from "@shared/schema";

export default function ProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setIsOpen(projectModalStore.isOpen);
      setProject(projectModalStore.project);
    };

    window.addEventListener('projectModalUpdate', handleUpdate);
    return () => window.removeEventListener('projectModalUpdate', handleUpdate);
  }, []);

  const closeModal = () => {
    projectModalStore.closeModal();
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-primary mb-2">{project.title}</h3>
                  <p className="text-accent font-medium">{project.category.toUpperCase()}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
                >
                  <X className="text-gray-600" size={20} />
                </button>
              </div>

              <div className="space-y-8">
                {/* Project Image */}
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                </div>

                {/* Project Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Client</h4>
                    <p className="text-gray-600">{project.client}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Role</h4>
                    <p className="text-gray-600">{project.role}</p>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Project Overview</h4>
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenges and Results */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Key Challenges</h4>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="text-accent text-sm mt-1 mr-3 flex-shrink-0" size={16} />
                          <span className="text-gray-600">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Results Achieved</h4>
                    <ul className="space-y-2">
                      {project.results.map((result, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="text-green-500 text-sm mt-1 mr-3 flex-shrink-0" size={16} />
                          <span className="text-gray-600">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
