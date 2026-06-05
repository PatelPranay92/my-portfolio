"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { GitFork, Star, BookOpen, Activity } from "lucide-react";
import { GithubIcon } from "@/components/ui/social-icons";

interface GitHubData {
  publicRepos: number;
  followers: number;
  following: number;
}

function isPixelActive(col: number, row: number): boolean {
  const offset = 3;
  const c = col - offset;
  
  if (c < 0) return false;

  // P (0, 1, 2)
  if (c >= 0 && c <= 2) {
    if (c === 0) return true;
    if (c === 1) return row === 0 || row === 2;
    if (c === 2) return row === 0 || row === 1 || row === 2;
  }
  // R (4, 5, 6)
  if (c >= 4 && c <= 6) {
    if (c === 4) return true;
    if (c === 5) return row === 0 || row === 2 || row === 3;
    if (c === 6) return row === 0 || row === 1 || row === 2 || row === 4 || row === 5 || row === 6;
  }
  // A (8, 9, 10)
  if (c >= 8 && c <= 10) {
    if (c === 8) return true;
    if (c === 9) return row === 0 || row === 3;
    if (c === 10) return true;
  }
  // N (12, 13, 14, 15)
  if (c >= 12 && c <= 15) {
    if (c === 12) return true;
    if (c === 13) return row === 1;
    if (c === 14) return row === 2;
    if (c === 15) return true;
  }
  // A (17, 18, 19)
  if (c >= 17 && c <= 19) {
    if (c === 17) return true;
    if (c === 18) return row === 0 || row === 3;
    if (c === 19) return true;
  }
  // Y (21, 22, 23)
  if (c >= 21 && c <= 23) {
    if (c === 21) return row === 0 || row === 1 || row === 2;
    if (c === 22) return row === 3 || row === 4 || row === 5 || row === 6;
    if (c === 23) return row === 0 || row === 1 || row === 2;
  }
  // P (27, 28, 29)
  if (c >= 27 && c <= 29) {
    if (c === 27) return true;
    if (c === 28) return row === 0 || row === 2;
    if (c === 29) return row === 0 || row === 1 || row === 2;
  }
  // A (31, 32, 33)
  if (c >= 31 && c <= 33) {
    if (c === 31) return true;
    if (c === 32) return row === 0 || row === 3;
    if (c === 33) return true;
  }
  // T (35, 36, 37)
  if (c >= 35 && c <= 37) {
    if (c === 35) return row === 0;
    if (c === 36) return true;
    if (c === 37) return row === 0;
  }
  // E (39, 40, 41)
  if (c >= 39 && c <= 41) {
    if (c === 39) return true;
    if (c === 40) return row === 0 || row === 3 || row === 6;
    if (c === 41) return row === 0 || row === 3 || row === 6;
  }
  // L (43, 44, 45)
  if (c >= 43 && c <= 45) {
    if (c === 43) return true;
    if (c === 44) return row === 6;
    if (c === 45) return row === 6;
  }

  return false;
}

export function GitHubSection() {
  const [data, setData] = useState<GitHubData | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/PatelPranay92")
      .then((res) => res.json())
      .then((json) => {
        setData({
          publicRepos: json.public_repos || 15,
          followers: json.followers || 10,
          following: json.following || 20,
        });
      })
      .catch(() => {
        setData({ publicRepos: 15, followers: 10, following: 20 });
      });
  }, []);

  const stats = [
    {
      icon: BookOpen,
      label: "Repositories",
      value: data?.publicRepos || 15,
      color: "#3B82F6",
    },
    {
      icon: Star,
      label: "Followers",
      value: data?.followers || 10,
      color: "#F59E0B",
    },
    {
      icon: GitFork,
      label: "Following",
      value: data?.following || 20,
      color: "#8B5CF6",
    },
    {
      icon: Activity,
      label: "Contributions",
      value: 150,
      color: "#10B981",
    },
  ];

  const languages = [
    { name: "JavaScript", pct: 35, color: "#F7DF1E" },
    { name: "TypeScript", pct: 25, color: "#3178C6" },
    { name: "Python", pct: 20, color: "#3776AB" },
    { name: "HTML/CSS", pct: 12, color: "#E34F26" },
    { name: "Other", pct: 8, color: "#6B7280" },
  ];

  return (
    <section id="github" className="relative py-24 md:py-32">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#3B82F6]/5 rounded-full blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="GitHub Activity" subtitle="Open Source" />

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 2xl:gap-6 mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div
                  className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{
                    backgroundColor: `${stat.color}15`,
                    border: `1px solid ${stat.color}25`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className="text-2xl font-bold mb-1">
                  <AnimatedCounter value={stat.value} suffix="+" />
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Languages + Contribution Graph */}
        <div className="grid md:grid-cols-2 gap-6 2xl:gap-8">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-sm font-semibold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              Top Languages
            </h3>
            <div className="space-y-4">
              {languages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      {lang.name}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">{lang.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-foreground/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.pct}%` }}
                      transition={{ delay: i * 0.1, duration: 0.8 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contribution Graph Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-sm font-semibold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10B981]" />
              Contribution Activity
            </h3>
             <div className="w-full overflow-x-auto pb-2 scrollbar-none">
              <div className="min-w-[640px] p-4 bg-slate-950/20 border border-slate-800/40 rounded-xl">
                <div className="grid grid-cols-[repeat(53,1fr)] gap-[3.5px]">
                  {Array.from({ length: 371 }, (_, i) => {
                    const row = Math.floor(i / 53);
                    const col = i % 53;
                    const isActive = isPixelActive(col, row);
                    
                    let bg = "bg-foreground/[0.03]";
                    if (isActive) {
                      const rand = Math.random();
                      if (rand > 0.8) bg = "bg-[#10B981]/30";
                      else bg = "bg-[#10B981]/15";
                    } else {
                      if (Math.random() > 0.95) {
                        bg = "bg-[#10B981]/15";
                      }
                    }

                    return (
                      <div
                        key={i}
                        className={`aspect-square rounded-[2px] ${bg} transition-all duration-300 hover:scale-110`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 text-[10px] text-slate-500 dark:text-slate-500">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-[2px] bg-foreground/[0.03]" />
                <div className="w-3 h-3 rounded-[2px] bg-[#10B981]/15" />
                <div className="w-3 h-3 rounded-[2px] bg-[#10B981]/30" />
                <div className="w-3 h-3 rounded-[2px] bg-[#10B981]/60" />
                <div className="w-3 h-3 rounded-[2px] bg-[#10B981]" />
              </div>
              <span>More</span>
            </div>

            <a
              href="https://github.com/PatelPranay92"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-colors text-sm font-medium"
            >
              <GithubIcon className="w-4 h-4" />
              View Full Profile
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
