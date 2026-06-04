"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/social-icons";

export function Projects({ initialProjects = [] }: { initialProjects?: any[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="projects" className="relative py-24 md:py-32 2xl:py-40">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Featured Projects" subtitle="My Work" />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {initialProjects.map((project: any, i: number) => {
            const isExpanded = expandedId === project._id;
            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group"
              >
                <div className="h-full glass-card rounded-2xl overflow-hidden hover:border-[#3B82F6]/20 transition-all duration-300 glow-border flex flex-col">
                  {/* Project Header */}
                  <div className="relative p-6 pb-0">
                    <div className="flex items-center justify-between mb-4">
                      <Badge
                        variant="secondary"
                        className="bg-[#3B82F6]/10 text-[#3B82F6] hover:bg-[#3B82F6]/20 text-[10px] uppercase tracking-wider font-semibold"
                      >
                        {project.category}
                      </Badge>
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors"
                            aria-label={`View ${project.title} on GitHub`}
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <a 
                      href={project.liveDemoUrl || project.githubUrl || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="aspect-video rounded-xl bg-gradient-to-br from-[#3B82F6]/10 via-[#8B5CF6]/10 to-[#06B6D4]/10 border border-foreground/5 flex items-center justify-center mb-4 overflow-hidden group-hover:border-[#3B82F6]/20 transition-colors relative cursor-pointer block"
                    >
                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt={project.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                      ) : (
                        <div className="text-center p-6">
                          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 flex items-center justify-center">
                            <ExternalLink className="w-6 h-6 text-[#3B82F6]" />
                          </div>
                          <p className="text-sm font-medium text-foreground/50">
                            {project.title}
                          </p>
                        </div>
                      )}
                    </a>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 pt-2 flex-1 flex flex-col">
                    <a 
                      href={project.liveDemoUrl || project.githubUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <h3 className="text-lg font-bold mb-2 group-hover:text-[#3B82F6] transition-colors cursor-pointer">
                        {project.title}
                      </h3>
                    </a>
                    <p className="text-sm text-foreground/50 leading-relaxed mb-4 line-clamp-3">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.map((tech: string) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-[10px] border-foreground/10 text-foreground/50"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-auto relative z-10">
                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : project._id)
                        }
                        className="flex items-center gap-2 text-xs font-medium text-[#3B82F6] hover:text-[#2563EB] transition-colors cursor-pointer mb-4"
                      >
                        {isExpanded ? (
                          <>
                            Hide Details <ChevronUp className="w-3 h-3" />
                          </>
                        ) : (
                          <>
                            Read More <ChevronDown className="w-3 h-3" />
                          </>
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 mb-4 border-t border-foreground/5 text-sm text-foreground/70 leading-relaxed whitespace-pre-wrap">
                              {project.fullDescription}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3 mt-auto relative z-10">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-lg shadow-blue-500/20 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        Source Code
                      </a>
                    )}
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium bg-foreground hover:bg-foreground/90 text-background transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
