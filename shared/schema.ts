import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  client: text("client").notNull(),
  role: text("role").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  challenges: jsonb("challenges").$type<string[]>().notNull(),
  results: jsonb("results").$type<string[]>().notNull(),
  featured: boolean("featured").default(false),
  year: integer("year").notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  startYear: integer("start_year").notNull(),
  endYear: integer("end_year"),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  projectType: text("project_type").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export const insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Experience = typeof experiences.$inferSelect;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
