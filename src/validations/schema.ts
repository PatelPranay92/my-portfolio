import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().regex(/^[a-z0-9-]*$/, "Slug can only contain lowercase letters, numbers, and hyphens").optional().or(z.literal("")),
  shortDescription: z.string().optional().or(z.literal("")),
  fullDescription: z.string().optional().or(z.literal("")),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  liveDemoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  technologies: z.array(z.string()).optional().default([]),
  category: z.string().optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
  displayOrder: z.coerce.number().default(0),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(["Frontend", "Backend", "Database", "DevOps", "Tools", "AI/ML"]),
  level: z.coerce.number().min(1).max(100),
  icon: z.string().optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
  displayOrder: z.coerce.number().default(0),
});

export type SkillFormValues = z.infer<typeof skillSchema>;

export const socialLinkSchema = z.object({
  platform: z.string().min(1, "Platform name is required"),
  icon: z.string().optional().or(z.literal("")),
  url: z.string().url("Must be a valid URL"),
  isActive: z.boolean().default(true),
  displayOrder: z.coerce.number().default(0),
});

export type SocialLinkFormValues = z.infer<typeof socialLinkSchema>;
