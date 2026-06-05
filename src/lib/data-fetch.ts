import connectDB from "./mongodb";
import { Project } from "@/models/project";
import { Skill } from "@/models/skill";
import { SocialLink } from "@/models/social-link";

export async function getProjects() {
  await connectDB();
  const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(projects));
}

export async function getFeaturedProjects() {
  await connectDB();
  const projects = await Project.find({ isFeatured: true }).sort({ displayOrder: 1, createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(projects));
}

export async function getSkills() {
  await connectDB();
  const skills = await Skill.find().sort({ displayOrder: 1 }).lean();
  return JSON.parse(JSON.stringify(skills));
}

export async function getSocialLinks() {
  await connectDB();
  const links = await SocialLink.find({ isActive: true }).sort({ displayOrder: 1 }).lean();
  return JSON.parse(JSON.stringify(links));
}
