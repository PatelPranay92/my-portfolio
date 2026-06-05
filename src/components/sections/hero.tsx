"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FileDown, FolderGit2, Mail, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/social-icons";
import { heroRoles, technologies } from "@/lib/data";

interface SocialLinkItem {
  platform: string;
  url: string;
  icon?: string;
}

export function Hero({ socialLinks = [] }: { socialLinks?: SocialLinkItem[] }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[128px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#06B6D4]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 2xl:gap-28 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/5 text-[#3B82F6] text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
              Available for opportunities
            </motion.div>

            <motion.h1
              className="font-bold leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text">Pranay Patel</span>
            </motion.h1>

            <motion.div
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300 mb-6 h-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <TypeAnimation
                sequence={heroRoles.flatMap((role) => [role, 2000])}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-[#8B5CF6]"
              />
            </motion.div>

            <motion.p
              className="text-slate-600 dark:text-slate-400 max-w-xl 2xl:max-w-2xl mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Building scalable applications, intelligent AI systems, and modern
              digital products that make a real impact.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                size="lg"
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer"
                onClick={() => window.open("/api/resume/download", "_blank")}
              >
                <FileDown className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-foreground/20 hover:bg-foreground/5 cursor-pointer"
                onClick={() => scrollTo("projects")}
              >
                <FolderGit2 className="w-4 h-4 mr-2" />
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-foreground/20 hover:bg-foreground/5 cursor-pointer"
                onClick={() => scrollTo("contact")}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
            </motion.div>

            {/* Tech Tags */}
            <motion.div
              className="flex flex-wrap gap-2 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.05 }}
                  className="px-3 py-1 text-xs font-medium rounded-full border border-foreground/10 bg-foreground/5 text-slate-600 dark:text-slate-400 hover:border-[#3B82F6]/30 hover:text-[#3B82F6] transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Glassmorphism Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              {/* Floating orbs */}
              <motion.div
                animate={{ y: [-12, 12, -12], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 blur-sm"
              />
              <motion.div
                animate={{ y: [12, -12, 12], rotate: [0, -5, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#06B6D4]/20 to-[#3B82F6]/20 blur-sm"
              />

              {/* Main Card */}
              <div className="relative glass-card rounded-3xl p-6 sm:p-8 2xl:p-10 w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md 2xl:max-w-lg mx-auto">
                <div className="animate-pulse-glow rounded-3xl absolute inset-0 opacity-30" />
                <div className="relative">
                  {/* Avatar */}
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-500/20">
                    PP
                  </div>

                  <h3 className="text-xl font-bold text-center mb-1">
                    Pranay Patel
                  </h3>
                  <p className="text-sm text-center text-slate-600 dark:text-slate-400 mb-6">
                    Full Stack Developer
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: "Projects", value: "10+" },
                      { label: "Technologies", value: "15+" },
                      { label: "AI Projects", value: "2" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-lg font-bold gradient-text">
                          {stat.value}
                        </div>
                        <div className="text-[10px] text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center gap-4 mb-6">
                    {socialLinks.map((link) => {
                      let Icon: React.ComponentType<{ className?: string }> = LinkIcon;
                      if (link.icon === "GithubIcon") Icon = GithubIcon;
                      if (link.icon === "LinkedinIcon") Icon = LinkedinIcon;
                      if (link.icon === "TwitterIcon") Icon = TwitterIcon;

                      return (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl glass hover:bg-foreground/10 text-slate-700 dark:text-slate-300 hover:text-foreground transition-all hover:scale-110"
                          aria-label={link.platform}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Open to work
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}
