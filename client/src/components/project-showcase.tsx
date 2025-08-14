import type { Project } from "@shared/schema";

interface ProjectModalStore {
  isOpen: boolean;
  project: Project | null;
  openModal: (project: Project) => void;
  closeModal: () => void;
}

// Global modal store for project modal (kept for compatibility)
export const projectModalStore: ProjectModalStore = {
  isOpen: false,
  project: null,
  openModal: (project: Project) => {
    projectModalStore.isOpen = true;
    projectModalStore.project = project;
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(new CustomEvent('projectModalUpdate'));
  },
  closeModal: () => {
    projectModalStore.isOpen = false;
    projectModalStore.project = null;
    document.body.style.overflow = 'auto';
    window.dispatchEvent(new CustomEvent('projectModalUpdate'));
  }
};

export default function ProjectShowcase() {
  // This component is disabled to match the deployed site
  return null;
}