import {
  projects,
  experiences,
  contactMessages,
  videos,
  type Project,
  type Experience,
  type ContactMessage,
  type Video,
  type InsertProject,
  type InsertExperience,
  type InsertContactMessage,
  type InsertVideo,
} from "@shared/schema";

export interface IStorage {
  // Projects (disabled to match deployed site)
  getAllProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;

  // Experiences
  getAllExperiences(): Promise<Experience[]>;

  // Videos
  getAllVideos(): Promise<Video[]>;
  getFeaturedVideos(): Promise<Video[]>;
  getVideo(id: number): Promise<Video | undefined>;

  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private experiences: Map<number, Experience>;
  private videos: Map<number, Video>;
  private contactMessages: Map<number, ContactMessage>;
  private currentProjectId: number;
  private currentExperienceId: number;
  private currentVideoId: number;
  private currentMessageId: number;

  constructor() {
    this.projects = new Map();
    this.experiences = new Map();
    this.videos = new Map();
    this.contactMessages = new Map();
    this.currentProjectId = 1;
    this.currentExperienceId = 1;
    this.currentVideoId = 1;
    this.currentMessageId = 1;

    this.seedData();
  }

  private seedData() {
    // Seed projects
    const projectsData: Omit<Project, "id">[] = [
      {
        title: "Large-Scale Brand Activations",
        category: "events",
        client: "Heineken USA, Squarespace, Rolling Loud, Viacom",
        role: "Producer, Manager",
        description:
          "Large-scale brand activation and experiential marketing campaigns, managing complex A/V productions for major sporting and entertainment events across diverse venues and audiences.",
        imageUrl: "/attached_assets/Tecate Rolling Loud_02_1749763910224.jpg",
        challenges: [
          "Coordinating with venue logistics and security teams",
          "Managing high-volume crowd flow and engagement",
          "Leading creative teams through complex productions",
          "Ensuring seamless technical execution under pressure",
        ],
        results: [
          "1,000+ event attendees engaged across campaigns",
          "Successful delivery of multi-day activation experiences",
          "Enhanced brand visibility and social media presence",
          "Zero technical failures during critical live events",
        ],
        featured: true,
        year: 2023,
        tags: ["Event Production", "Brand Activation", "Team Leadership"],
      },
      {
        title: "Spooky Mansion",
        category: "events",
        client: "The Wild Honey Pie",
        role: "Executive Producer",
        description:
          "Immersive Halloween concert series featuring emerging artists in atmospheric venues across NYC.",
        imageUrl: "/attached_assets/SpookyMansion_1749763869627.jpg",
        challenges: [
          "Sourcing unique, atmospheric venues",
          "Balancing intimate atmosphere with production needs",
          "Managing complex lighting and sound designs",
          "Coordinating multiple artists and technical crews",
        ],
        results: [
          "Filmed 8 live music videos during event",
          "95% positive audience feedback scores",
          "Featured in Time Out NY and Brooklyn Paper",
          "2M+ social media impressions",
        ],
        featured: true,
        year: 2022,
        tags: ["Event Production", "Music", "Venue Management"],
      },
      {
        title: "Premier NYC Studio Sessions",
        category: "audio",
        client: "Various Artists",
        role: "Recording Engineer",
        description:
          "Recording engineer for notable artists including Drake, Cyndi Lauper, and David Guetta at Area 51 NYC.",
        imageUrl: "/attached_assets/Jim James Studio_02_1749669234911.jpg",
        challenges: [
          "Managing complex multi-track recordings",
          "Adapting to diverse artist preferences and styles",
          "Maintaining consistent audio quality under pressure",
          "Collaborating with high-profile production teams",
        ],
        results: [
          "Contributed to 12+ commercially released tracks",
          "Several tracks reached Billboard Hot 100",
          "Developed long-term relationships with A-list artists",
          "Advanced to senior engineer role within 2 years",
        ],
        featured: true,
        year: 2013,
        tags: ["Audio Engineering", "Recording", "Music Production"],
      },
      {
        title: "Tiny Desk & KEXP Sessions",
        category: "audio",
        client: "Various Digital Platforms",
        role: "Producer, Audio Engineer",
        description:
          "Produced and edited high-profile live concert performances for digital platforms and streaming.",
        imageUrl:
          "/attached_assets/Brian Wilson Little Kids Rock_1749669382052.jpg",
        challenges: [
          "Achieving studio quality in live environments",
          "Managing multiple camera feeds and audio sources",
          "Real-time mixing with no opportunity for retakes",
          "Balancing artistic vision with technical constraints",
        ],
        results: [
          "25+ live sessions produced and released",
          "Combined 5M+ views across platforms",
          "Featured artists gained significant streaming increases",
          "Won 2 Webby nominations for audio production",
        ],
        featured: false,
        year: 2014,
        tags: ["Live Audio", "Digital Content", "Streaming"],
      },
      {
        title: "LinkedIn Learning Course Production",
        category: "content",
        client:
          "Coursera, LinkedIn Learning, Microsoft, OpenSesame, Pluralsight",
        role: "Senior Learning Content Producer",
        description:
          "As a Senior Learning Content Producer at Madecraft, I created professional business content for major digital platforms, helping deliver educational material to millions of learners globally.",
        imageUrl:
          "/attached_assets/*Madecraft Courses live on Platform_1749669292583.png",
        challenges: [
          "Creating engaging content for diverse professional levels",
          "Balancing theoretical concepts with practical application",
          "Designing interactive elements for online learning",
          "Ensuring accessibility across different learning styles",
        ],
        results: [
          "Developed and produced 100+ full length video courses",
          "Reached over 2M learners across educational platforms",
          "Featured in LinkedIn Learning's top-performing courses",
          "Content adapted for global markets and multiple languages",
        ],
        featured: true,
        year: 2023,
        tags: ["eLearning", "Content Production", "Professional Development"],
      },
      {
        title: "Workflow Automation & Production Tools",
        category: "digital",
        client: "Madecraft",
        role: "Innovation Producer",
        description:
          "Developed automated production workflows and internal tools using Google Apps Script and OpenAI API, implementing bi-weekly sprints to enhance team efficiency.",
        imageUrl: "ai-automation-icon",
        challenges: [
          "Integrating AI tools with existing production pipeline",
          "Removing hurdles for future project workflows",
          "Training team on new automated systems",
          "Maintaining content quality while scaling production",
        ],
        results: [
          "75% reduction in content production time",
          "300% increase in content output capacity",
          "Streamlined workflows adopted company-wide",
          "Enhanced internal production tools through iterative development",
        ],
        featured: true,
        year: 2024,
        tags: [
          "Workflow Optimization",
          "Automation",
          "Team Leadership",
          "Production Tools",
        ],
      },
      {
        title: "Zocdoc iPhone App Commercial",
        category: "digital",
        client: "Zocdoc",
        role: "Producer, Director",
        description:
          "Produced viral TV commercial for Zocdoc iPhone app featuring animated storytelling with 1.1M+ views.",
        imageUrl: "/attached_assets/Zocdoc_01_1749669530369.png",
        challenges: [
          "Creating engaging animated narrative within budget constraints",
          "Coordinating complex post-production pipeline",
          "Meeting tight broadcast deadlines",
          "Ensuring brand message clarity in 30-second format",
        ],
        results: [
          "1.1 million+ YouTube views achieved",
          "Featured in national TV broadcast rotation",
          "Significant increase in app downloads during campaign",
          "Won internal company recognition for creative excellence",
        ],
        featured: true,
        year: 2019,
        tags: [
          "Commercial Production",
          "Animation",
          "Digital Marketing",
          "Viral Content",
        ],
      },
      {
        title: "Branded Content Production",
        category: "digital",
        client: "Google, Newcastle Brown Ale, SeatGeek, Squarespace, Zocdoc",
        role: "Producer, Director",
        description:
          "Directed and produced high-profile branded content featuring celebrities and influencers for digital marketing campaigns across major technology, entertainment, and healthcare brands.",
        imageUrl: "/attached_assets/Branded Content_02_1749857023207.JPG",
        challenges: [
          "Coordinating with high-profile talent schedules",
          "Managing complex multi-camera setups in various locations",
          "Ensuring professional audio quality in challenging environments",
          "Creating engaging content that balances brand messaging with authenticity",
        ],
        results: [
          "Successfully captured premium branded content across multiple campaigns",
          "Content featured prominently across social media platforms",
          "Generated significant engagement and brand awareness",
          "Strengthened client relationships through quality deliverables",
        ],
        featured: false,
        year: 2023,
        tags: [
          "Branded Content",
          "Celebrity Talent",
          "Multi-Camera",
          "Digital Marketing",
        ],
      },
      {
        title: "Recording Studio Productions",
        category: "audio",
        client: "Various Artists & Labels",
        role: "Producer, Audio Engineer",
        description:
          "Produced and engineered high-profile video performances and recording sessions featuring notable artists in professional studio environments.",
        imageUrl:
          "/attached_assets/Brian Wilson Little Kids Rock_1749669382052.jpg",
        challenges: [
          "Coordinating complex multi-camera and audio setups",
          "Balancing live performance energy with broadcast quality",
          "Managing artist direction and technical requirements simultaneously",
          "Delivering studio-quality recordings in live performance formats",
        ],
        results: [
          "Successfully produced multiple award-winning performance videos",
          "Achieved broadcast quality in challenging live environments",
          "Built lasting relationships with high-profile artists and management",
          "Established reputation for premium production value",
        ],
        featured: false,
        year: 2014,
        tags: [
          "Music Production",
          "Video Performance",
          "Studio Recording",
          "Artist Collaboration",
        ],
      },
    ];

    projectsData.forEach((project) => {
      const id = this.currentProjectId++;
      this.projects.set(id, { ...project, id });
    });

    // Seed experiences
    const experiencesData: Omit<Experience, "id">[] = [
      {
        title: "Innovations Producer",
        company: "Independent Consultant",
        location: "Los Angeles, CA",
        startYear: 2025,
        endYear: null,
        description:
          "Lead development of AI communication platform and music education tools, managing technical partnerships and user research. Partner with SMEs to build AI Product Management curriculum. Drive sponsorship strategy and business development.",
        icon: "sparkles",
        color: "accent",
      },
      {
        title: "Senior Learning Content & Innovations Producer",
        company: "Madecraft",
        location: "Santa Barbara, CA",
        startYear: 2021,
        endYear: 2025,
        description:
          "Produced video courses for LinkedIn Learning, Coursera, Microsoft, and Pluralsight reaching 2.5M+ learners. Managed end-to-end content development including curriculum design, production, and post-production. Led workflow automation using Google Apps Script and OpenAI API. Ran bi-weekly sprints to enhance production tools for complex multimedia projects.",
        icon: "video",
        color: "teal",
      },
      {
        title: "Founder & Digital Media Producer",
        company: "Melogold, Inc.",
        location: "Los Angeles, CA",
        startYear: 2016,
        endYear: 2021,
        description:
          "Founded digital media production company specializing in branded content and entertainment media. Created impactful commercial and entertainment content for brands including SeatGeek, Zocdoc, and ATO Records with focus on creative storytelling and multi-platform distribution.",
        icon: "film",
        color: "yellow",
      },
      {
        title: "Executive Producer",
        company: "The Wild Honey Pie",
        location: "Brooklyn, NY",
        startYear: 2014,
        endYear: 2016,
        description:
          "Executive produced immersive music experiences and content series including Spooky Mansion and Welcome Campers. Drove platform growth from 8M to 22M viewership through strategic content creation and multi-venue productions across NYC's music scene.",
        icon: "video",
        color: "accent",
      },
      {
        title: "Recording Engineer & Audio Technician",
        company: "Area 51 NYC / Aura Sonic Ltd",
        location: "New York, NY",
        startYear: 2010,
        endYear: 2014,
        description:
          "Engineered sessions with notable artists including Drake, Cyndi Lauper, and David Guetta at premier NYC studios. Developed expertise in complex A/V productions and technical problem-solving.",
        icon: "music",
        color: "primary",
      },
    ];

    experiencesData.forEach((experience) => {
      const id = this.currentExperienceId++;
      this.experiences.set(id, { ...experience, id });
    });

    // Seed videos
    const videosData: Omit<Video, "id">[] = [
      {
        title: "Welcome Campers Season 3",
        description:
          "Produced documentary-style live music video series filmed in Austin, Texas, showcasing emerging artists and creative talent in intimate performance settings.",
        vimeoUrl: "https://vimeo.com/159641323",
        thumbnailUrl:
          "/attached_assets/Welcome Campers 3 _01_1749858039158.JPG",
        duration: "01:54",
        year: 2016,
        category: "Documentary Series",
        featured: true,
      },
      {
        title: "Brian Wilson - Little Kids Rock Benefit",
        description:
          "Executive Produced intimate performance by Beach Boys legend Brian Wilson for Little Kids Rock charity benefit, featuring a live version of Love & Mercy.",
        vimeoUrl: "https://www.youtube.com/watch?v=8JkhcP-fDfE",
        thumbnailUrl:
          "/attached_assets/Brian Wilson Little Kids Rock_1749669382052.jpg",
        duration: "2:41",
        year: 2015,
        category: "Music Performance",
        featured: true,
      },
      {
        title: "Jim James - Studio Session",
        description:
          "Intimate studio session with My Morning Jacket frontman Jim James, capturing the essence of his stripped-down arrangements and raw musical talent for his solo LP.",
        vimeoUrl: "https://www.youtube.com/watch?v=wNf6qdr1loA",
        thumbnailUrl: "/attached_assets/Jim James Studio_02_1749669234911.jpg",
        duration: "1:00",
        year: 2019,
        category: "Studio Session",
        featured: true,
      },
      {
        title: "Zocdoc - Introducing Doctors",
        description:
          "Commercial content introducing Zocdoc's platform to healthcare professionals, demonstrating the value proposition for medical practices and patient connection.",
        vimeoUrl: "https://www.youtube.com/watch?v=FrKMKdRmqwc",
        thumbnailUrl: "/attached_assets/Zocdoc_01_1749669530369.png",
        duration: "0:30",
        year: 2019,
        category: "Commercial",
        featured: true,
      },
      {
        title: "SeatGeek - Wild Child",
        description:
          "Commercial content for SeatGeek focused on a narrative of fans connecting over live music performance and event experiences.",
        vimeoUrl: "https://www.youtube.com/watch?v=RWOVYCYhWk0",
        thumbnailUrl: "/attached_assets/image_1749858345629.png",
        duration: "0:30",
        year: 2019,
        category: "Brand Content",
        featured: true,
      },
      {
        title: "Chicano Batman - KEXP Session",
        description:
          "Produced and edited this live performance session of Chicano Batman for KEXP, showcasing intimate artist collaboration and multi-camera production in non-traditional environments.",
        vimeoUrl: "https://www.youtube.com/watch?v=adWjEdqzhbc&t",
        thumbnailUrl: "/attached_assets/image_1749860026910.png",
        duration: "1:03:00",
        year: 2020,
        category: "Music Performance",
        featured: true,
      },
      {
        title: "Madecraft Educational Content",
        description:
          "100+ professional development courses produced for LinkedIn Learning, Coursera, Microsoft, and Pluralsight reaching 2.5M+ learners worldwide.",
        vimeoUrl: "https://vimeo.com/928586383",
        thumbnailUrl:
          "/attached_assets/*Madecraft Courses live on Platform_1749669292583.png",
        duration: "1:32",
        year: 2024,
        category: "Educational",
        featured: true,
      },
    ];

    videosData.forEach((video) => {
      const id = this.currentVideoId++;
      this.videos.set(id, { ...video, id });
    });
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => b.year - a.year);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter((project) => project.category === category)
      .sort((a, b) => b.year - a.year);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter((project) => project.featured)
      .sort((a, b) => b.year - a.year);
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getAllExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values()).sort(
      (a, b) => b.startYear - a.startYear,
    );
  }

  async getAllVideos(): Promise<Video[]> {
    return Array.from(this.videos.values()).sort((a, b) => b.year - a.year);
  }

  async getFeaturedVideos(): Promise<Video[]> {
    return Array.from(this.videos.values())
      .filter((video) => video.featured)
      .sort((a, b) => b.year - a.year);
  }

  async getVideo(id: number): Promise<Video | undefined> {
    return this.videos.get(id);
  }

  async createContactMessage(
    insertMessage: InsertContactMessage,
  ): Promise<ContactMessage> {
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
