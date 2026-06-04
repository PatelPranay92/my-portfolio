"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { experienceTimeline } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-[128px]" />

      <div className="relative max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Experience & Growth"
          subtitle="My Path"
        />

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] opacity-20" />

          <div className="space-y-12">
            {experienceTimeline.map((entry, i) => (
              <motion.div
                key={entry.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`relative flex items-start gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 mt-2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
                    viewport={{ once: true }}
                    className="w-4 h-4 rounded-full bg-[#3B82F6] border-4 border-background shadow-lg shadow-blue-500/20"
                  />
                </div>

                {/* Content */}
                <div
                  className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <div className="glass-card rounded-2xl p-6 hover:border-[#3B82F6]/20 transition-colors">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-semibold mb-3">
                      {entry.period}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{entry.title}</h3>
                    <p className="text-sm text-foreground/50 leading-relaxed mb-4">
                      {entry.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {entry.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-[10px] bg-foreground/5 text-foreground/50 hover:text-foreground/70"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
