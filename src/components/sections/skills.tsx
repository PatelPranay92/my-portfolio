"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Code2,
  Database,
  Layout,
  Server,
  Settings,
  BrainCircuit,
  Grid,
} from "lucide-react";

export function Skills({ initialSkills = [] }: { initialSkills?: any[] }) {
  const [activeTab, setActiveTab] = useState(0);

  // Group skills by category
  const categories = [
    { title: "All Skills", icon: Grid, skills: initialSkills },
    { title: "Frontend", icon: Layout, skills: initialSkills.filter(s => s.category === "Frontend") },
    { title: "Backend", icon: Server, skills: initialSkills.filter(s => s.category === "Backend") },
    { title: "Database", icon: Database, skills: initialSkills.filter(s => s.category === "Database") },
    { title: "AI/ML", icon: BrainCircuit, skills: initialSkills.filter(s => s.category === "AI/ML") },
    { title: "DevOps", icon: Settings, skills: initialSkills.filter(s => s.category === "DevOps") },
    { title: "Tools", icon: Code2, skills: initialSkills.filter(s => s.category === "Tools") },
  ].filter(c => c.skills.length > 0);

  if (categories.length === 0) {
    return null; // Don't render section if no skills exist
  }

  return (
    <section id="skills" className="relative py-24 md:py-32 2xl:py-40">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Skills & Expertise" subtitle="What I Know" />

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.title}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeTab === i
                    ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/25"
                    : "glass-card text-slate-700 dark:text-slate-300 hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.title}
              </motion.button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto w-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {categories[activeTab]?.skills.map((skill: any, i: number) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-xl p-5 group hover:border-[#3B82F6]/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs font-semibold text-[#3B82F6]">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-foreground/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, #3B82F6, #8B5CF6)",
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{
                        delay: i * 0.05 + 0.2,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
