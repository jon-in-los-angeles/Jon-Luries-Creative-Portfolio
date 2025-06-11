import { projects, experiences, contactMessages, type Project, type Experience, type ContactMessage, type InsertProject, type InsertExperience, type InsertContactMessage } from "@shared/schema";

export interface IStorage {
  // Projects
  getAllProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  
  // Experiences
  getAllExperiences(): Promise<Experience[]>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private experiences: Map<number, Experience>;
  private contactMessages: Map<number, ContactMessage>;
  private currentProjectId: number;
  private currentExperienceId: number;
  private currentMessageId: number;

  constructor() {
    this.projects = new Map();
    this.experiences = new Map();
    this.contactMessages = new Map();
    this.currentProjectId = 1;
    this.currentExperienceId = 1;
    this.currentMessageId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed projects
    const projectsData: Omit<Project, 'id'>[] = [
      {
        title: "Tienda Tecate @ Rolling Loud",
        category: "events",
        client: "Heineken USA",
        role: "Producer, Manager",
        description: "Custom built onsite activation and photo op for Heineken USA at one of the largest hip-hop festivals.",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        challenges: [
          "Coordinating with festival logistics and security",
          "Managing high-volume crowd flow and engagement",
          "Ensuring brand safety in high-energy environment",
          "Weather-proofing technical equipment and displays"
        ],
        results: [
          "50,000+ festival attendees engaged",
          "15,000+ photo experiences created",
          "300% increase in brand social mentions",
          "Zero safety incidents across 3-day event"
        ],
        featured: true,
        year: 2023,
        tags: ["Event Production", "Brand Activation", "Festival"]
      },
      {
        title: "Spooky Mansion",
        category: "events",
        client: "Otter Creek Brewery",
        role: "Executive Producer",
        description: "Immersive Halloween concert series featuring emerging artists in atmospheric venues across NYC.",
        imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        challenges: [
          "Sourcing unique, atmospheric venues",
          "Balancing intimate atmosphere with production needs",
          "Managing complex lighting and sound designs",
          "Coordinating multiple artists and technical crews"
        ],
        results: [
          "8 sold-out performances across NYC",
          "95% positive audience feedback scores",
          "Featured in Time Out NY and Brooklyn Paper",
          "2M+ social media impressions"
        ],
        featured: true,
        year: 2022,
        tags: ["Event Production", "Music", "Venue Management"]
      },
      {
        title: "Premier NYC Studio Sessions",
        category: "audio",
        client: "Various Artists",
        role: "Recording Engineer",
        description: "Recording engineer for notable artists including Drake, Cyndi Lauper, and David Guetta at Area 51 NYC.",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        challenges: [
          "Managing complex multi-track recordings",
          "Adapting to diverse artist preferences and styles",
          "Maintaining consistent audio quality under pressure",
          "Collaborating with high-profile production teams"
        ],
        results: [
          "Contributed to 12+ commercially released tracks",
          "Several tracks reached Billboard Hot 100",
          "Developed long-term relationships with A-list artists",
          "Advanced to senior engineer role within 2 years"
        ],
        featured: true,
        year: 2013,
        tags: ["Audio Engineering", "Recording", "Music Production"]
      },
      {
        title: "Tiny Desk & KEXP Sessions",
        category: "audio",
        client: "Various Digital Platforms",
        role: "Producer, Audio Engineer",
        description: "Produced and edited high-profile live concert performances for digital platforms and streaming.",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        challenges: [
          "Achieving studio quality in live environments",
          "Managing multiple camera feeds and audio sources",
          "Real-time mixing with no opportunity for retakes",
          "Balancing artistic vision with technical constraints"
        ],
        results: [
          "25+ live sessions produced and released",
          "Combined 5M+ views across platforms",
          "Featured artists gained significant streaming increases",
          "Won 2 Webby nominations for audio production"
        ],
        featured: false,
        year: 2014,
        tags: ["Live Audio", "Digital Content", "Streaming"]
      },
      {
        title: "Articulating Your Value",
        category: "content",
        client: "LinkedIn Learning",
        role: "Course Producer",
        description: "Highly-rated professional development course reaching over 200,000 learners on LinkedIn Learning.",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        challenges: [
          "Creating engaging content for diverse professional levels",
          "Balancing theoretical concepts with practical application",
          "Designing interactive elements for online learning",
          "Ensuring accessibility across different learning styles"
        ],
        results: [
          "200,000+ learners enrolled",
          "4.7/5 average course rating",
          "Featured in LinkedIn Learning's 'Top Courses'",
          "Translated into 6 languages for global reach"
        ],
        featured: true,
        year: 2023,
        tags: ["eLearning", "Content Production", "Professional Development"]
      },
      {
        title: "AI-Powered Content Automation",
        category: "digital",
        client: "Madecraft",
        role: "Innovation Producer",
        description: "Developed automated systems using ChatGPT and OpenAI API for generating educational content at scale.",
        imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        challenges: [
          "Integrating AI tools with existing production pipeline",
          "Maintaining content quality and brand consistency",
          "Training team on new AI-enhanced workflows",
          "Balancing automation with human creativity"
        ],
        results: [
          "75% reduction in content production time",
          "300% increase in content output capacity",
          "$50,000+ annual cost savings achieved",
          "System adopted company-wide across all departments"
        ],
        featured: true,
        year: 2024,
        tags: ["AI", "Automation", "Innovation", "Content Production"]
      }
    ];

    projectsData.forEach(project => {
      const id = this.currentProjectId++;
      this.projects.set(id, { ...project, id });
    });

    // Seed experiences
    const experiencesData: Omit<Experience, 'id'>[] = [
      {
        title: "Senior Learning Content & Innovations Producer",
        company: "Madecraft",
        location: "Santa Barbara, CA",
        startYear: 2024,
        endYear: 2025,
        description: "Led technical initiatives and AI-powered automation systems, streamlining content production workflows and developing innovative eLearning solutions.",
        icon: "lightbulb",
        color: "accent"
      },
      {
        title: "Senior Learning Content Producer",
        company: "Madecraft",
        location: "Santa Barbara, CA",
        startYear: 2021,
        endYear: 2024,
        description: "Produced 60+ high-quality online learning courses, scaled global reach through localization, and mentored junior producers.",
        icon: "video",
        color: "teal"
      },
      {
        title: "Founder & Digital Media Producer",
        company: "Melogold, Inc.",
        location: "Los Angeles, CA",
        startYear: 2016,
        endYear: 2021,
        description: "Led creative development for national brands, produced viral content including Zocdoc TV commercial with 1.1M views.",
        icon: "film",
        color: "yellow"
      },
      {
        title: "Recording Engineer & Audio Technician",
        company: "Area 51 NYC / Aura Sonic Ltd",
        location: "New York, NY",
        startYear: 2010,
        endYear: 2014,
        description: "Engineered sessions with notable artists including Drake, Cyndi Lauper, and David Guetta at premier NYC studios.",
        icon: "music",
        color: "primary"
      }
    ];

    experiencesData.forEach(experience => {
      const id = this.currentExperienceId++;
      this.experiences.set(id, { ...experience, id });
    });
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => b.year - a.year);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.category === category)
      .sort((a, b) => b.year - a.year);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => b.year - a.year);
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getAllExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values()).sort((a, b) => b.startYear - a.startYear);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date().toISOString(),
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
