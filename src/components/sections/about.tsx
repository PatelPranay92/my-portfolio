"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Code2, Server, Brain, Zap, Target } from "lucide-react";

const timelineSteps = [
  { icon: Code2, label: "Learning", color: "#3B82F6" },
  { icon: Code2, label: "Frontend", color: "#8B5CF6" },
  { icon: Server, label: "Backend", color: "#06B6D4" },
  { icon: Brain, label: "AI", color: "#10B981" },
  { icon: Zap, label: "Advanced", color: "#F59E0B" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 2xl:py-40">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="About Me" subtitle="Who I Am" />

        <div className="grid lg:grid-cols-2 gap-16 2xl:gap-24 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="glass-card rounded-2xl p-8 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold">My Journey</h3>
              </div>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                I&apos;m a passionate Full Stack Developer specializing in modern web
                technologies, AI solutions, automation systems, dashboard
                development, and enterprise-grade applications.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                My expertise spans building responsive user interfaces, robust
                backend systems, scalable APIs, efficient database architectures,
                and AI-powered workflows. I thrive on turning complex problems
                into elegant, user-friendly solutions.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                With a deep focus on innovation, scalability, clean architecture,
                performance optimization, and user-centric design, I build
                software that doesn&apos;t just work — it excels.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  { label: "Focus", value: "Full Stack + AI" },
                  { label: "Location", value: "India" },
                  { label: "Experience", value: "Multiple Projects" },
                  { label: "Status", value: "Open to Work" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-3 rounded-xl bg-foreground/[0.03] border border-foreground/5"
                  >
                    <div className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm font-medium">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-8">Development Journey</h3>
            <div className="relative space-y-8">
              {/* Vertical Line */}
              <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-[#3B82F6] via-[#8B5CF6] to-[#F59E0B] opacity-30" />

              {timelineSteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative flex items-start gap-6 pl-0"
                >
                  <div
                    className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                    style={{
                      backgroundColor: `${step.color}15`,
                      border: `1px solid ${step.color}30`,
                    }}
                  >
                    <step.icon
                      className="w-4 h-4"
                      style={{ color: step.color }}
                    />
                  </div>
                  <div className="pb-2">
                    <div
                      className="text-sm font-semibold mb-1"
                      style={{ color: step.color }}
                    >
                      {step.label}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {i === 0 &&
                        "Started with HTML, CSS, JavaScript — building the foundation for everything that followed."}
                      {i === 1 &&
                        "Mastered React, Next.js, TypeScript, and modern CSS frameworks for building stunning interfaces."}
                      {i === 2 &&
                        "Expanded into Node.js, Express, Python, FastAPI, and database systems for full-stack capability."}
                      {i === 3 &&
                        "Explored AI/ML, integrating LLMs, speech recognition, and NLP into production applications."}
                      {i === 4 &&
                        "Focusing on system design, scalable architectures, and building enterprise-grade solutions."}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
