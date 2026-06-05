"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { radarData, skillCategories } from "@/lib/data";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

export function TechVisualization() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((s) => ({ ...s, category: cat.title }))
  );

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#06B6D4]/5 rounded-full blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Tech Stack"
          subtitle="Visualization"
        />

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-4 sm:p-6"
          >
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              Skill Radar
            </h3>
            <div className="h-[280px] sm:h-[320px] lg:h-[360px] w-full" style={{ minWidth: 10, minHeight: 10 }}>
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="65%">
                    <PolarGrid
                      stroke="rgba(148,163,184,0.1)"
                      strokeDasharray="3 3"
                    />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{
                        fill: "rgba(148,163,184,0.6)",
                        fontSize: 10,
                      }}
                    />
                    <Radar
                      dataKey="value"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.15}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>

          {/* Skill Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-4 sm:p-6"
          >
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              Technology Ecosystem
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {allSkills.map((skill, i) => {
                const opacity = skill.level / 100;
                return (
                  <motion.div
                    key={`${skill.category}-${skill.name}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.01 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium border cursor-default transition-colors text-[#3B82F6] dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200"
                    style={{
                      backgroundColor: `rgba(59,130,246,${opacity * 0.15})`,
                      borderColor: `rgba(59,130,246,${opacity * 0.3})`,
                      opacity: 0.6 + (opacity * 0.4),
                    }}
                    title={`${skill.name}: ${skill.level}%`}
                  >
                    {skill.name}
                  </motion.div>
                );
              })}
            </div>

            {/* Category Legend */}
            <div className="mt-6 pt-4 border-t border-foreground/5">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-2">
                {skillCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div
                      key={cat.title}
                      className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400"
                    >
                      <Icon className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">
                        {cat.title} ({cat.skills.length})
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
