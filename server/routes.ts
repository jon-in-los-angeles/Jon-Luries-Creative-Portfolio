import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import express from "express";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve attached assets before other routes
  app.use('/attached_assets', express.static(path.resolve(process.cwd(), 'attached_assets')));
  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const category = req.query.category as string;
      const featured = req.query.featured === 'true';
      
      let projects;
      if (featured) {
        projects = await storage.getFeaturedProjects();
      } else if (category && category !== 'all') {
        projects = await storage.getProjectsByCategory(category);
      } else {
        projects = await storage.getAllProjects();
      }
      
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get single project
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Get all experiences
  app.get("/api/experiences", async (req, res) => {
    try {
      const experiences = await storage.getAllExperiences();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });

  // Get all videos
  app.get("/api/videos", async (req, res) => {
    try {
      const featured = req.query.featured === 'true';
      
      let videos;
      if (featured) {
        videos = await storage.getFeaturedVideos();
      } else {
        videos = await storage.getAllVideos();
      }
      
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  // Get single video
  app.get("/api/videos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const video = await storage.getVideo(id);
      
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      res.json(video);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch video" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ message: "Message sent successfully", id: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
