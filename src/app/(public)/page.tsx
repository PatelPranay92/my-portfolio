// Server Component
import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Achievements } from "@/components/sections/achievements";
import { Services } from "@/components/sections/services";

import { Footer } from "@/components/sections/footer";
import { getProjects, getFeaturedProjects, getSkills, getSocialLinks } from "@/lib/data-fetch";
import { Contact } from "@/components/sections/contact";
import {
  ParticleBackground,
  CommandPalette,
  GitHubSection,
  TechVisualization,
  LoadingScreen,
  ScrollProgress,
  BackToTop,
} from "./client-components";

export default async function Home() {
  const [allProjects, featuredProjects, skills, socialLinks] = await Promise.all([
    getProjects(),
    getFeaturedProjects(),
    getSkills(),
    getSocialLinks(),
  ]);

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <ParticleBackground />
      <CommandPalette />
      <Navbar socialLinks={socialLinks} />

      <main className="relative z-10">
        <Hero socialLinks={socialLinks} />
        <About />
        <Skills initialSkills={skills} />
        <Projects initialProjects={allProjects} />
        <GitHubSection />
        <Experience />
        <Achievements />
        <TechVisualization />
        <Services />

        <Contact socialLinks={socialLinks} />
      </main>

      <Footer socialLinks={socialLinks} />
      <BackToTop />
    </>
  );
}
