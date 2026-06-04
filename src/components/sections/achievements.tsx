"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { achievements } from "@/lib/data";
import {
  FolderGit2,
  Cpu,
  GitGraph,
  Clock,
  Brain,
} from "lucide-react";

const icons = [FolderGit2, Cpu, GitGraph, Clock, Brain];

export function Achievements() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3B82F6]/[0.02] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Achievements"
          subtitle="By the Numbers"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {achievements.map((ach, i) => {
            const Icon = icons[i % icons.length];
            const colors = [
              "#3B82F6",
              "#8B5CF6",
              "#06B6D4",
              "#10B981",
              "#F59E0B",
            ];
            const color = colors[i];

            return (
              <motion.div
                key={ach.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card rounded-2xl p-6 text-center group"
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `${color}15`,
                    border: `1px solid ${color}25`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div className="text-3xl font-bold mb-1">
                  <AnimatedCounter
                    value={ach.value}
                    suffix={ach.suffix}
                    duration={ach.value > 100 ? 2.5 : 1.5}
                  />
                </div>
                <div className="text-xs text-foreground/40 font-medium">
                  {ach.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
