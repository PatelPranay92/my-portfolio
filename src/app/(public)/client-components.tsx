"use client";

import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";

export const ParticleBackground = dynamic(
  () => import("@/components/ui/particle-background").then((mod) => mod.ParticleBackground),
  { ssr: false }
);

export const CommandPalette = dynamic(
  () => import("@/components/ui/command-palette").then((mod) => mod.CommandPalette),
  { ssr: false }
);

export const GitHubSection = dynamic(
  () => import("@/components/sections/github").then((mod) => mod.GitHubSection),
  { ssr: false }
);

export const TechVisualization = dynamic(
  () => import("@/components/sections/tech-visualization").then((mod) => mod.TechVisualization),
  { ssr: false }
);

export { LoadingScreen, ScrollProgress, BackToTop };
