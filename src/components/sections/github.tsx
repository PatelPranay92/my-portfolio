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
      value: 500,
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
            <div className="grid grid-cols-[repeat(52,1fr)] gap-[3px]">
              {Array.from({ length: 364 }, (_, i) => {
                const intensity = Math.random();
                let bg = "bg-foreground/[0.03]";
                if (intensity > 0.8) bg = "bg-[#10B981]";
                else if (intensity > 0.6) bg = "bg-[#10B981]/60";
                else if (intensity > 0.4) bg = "bg-[#10B981]/30";
                else if (intensity > 0.25) bg = "bg-[#10B981]/15";
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-[2px] ${bg}`}
                  />
                );
              })}
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
