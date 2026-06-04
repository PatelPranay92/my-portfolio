import connectDB from "./mongodb";
import { Project } from "@/models/project";
import { Skill } from "@/models/skill";
import { SocialLink } from "@/models/social-link";
import { unstable_cache } from "next/cache";

export const getProjects = unstable_cache(
  async () => {
    await connectDB();
    const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  },
  ["portfolio-projects"],
  { revalidate: 3600, tags: ["projects"] }
);

export const getFeaturedProjects = unstable_cache(
  async () => {
    await connectDB();
    const projects = await Project.find({ isFeatured: true }).sort({ displayOrder: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  },
  ["portfolio-featured-projects"],
  { revalidate: 3600, tags: ["projects"] }
);

export const getSkills = unstable_cache(
  async () => {
    await connectDB();
    const skills = await Skill.find().sort({ displayOrder: 1 }).lean();
    return JSON.parse(JSON.stringify(skills));
  },
  ["portfolio-skills"],
  { revalidate: 3600, tags: ["skills"] }
);

export const getSocialLinks = unstable_cache(
  async () => {
    await connectDB();
    const links = await SocialLink.find({ isActive: true }).sort({ displayOrder: 1 }).lean();
    return JSON.parse(JSON.stringify(links));
  },
  ["portfolio-social-links"],
  { revalidate: 3600, tags: ["social-links"] }
);
