"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-80px" }}
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <motion.span
        className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-[#3B82F6] mb-3"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        viewport={{ once: true }}
      >
        {subtitle}
      </motion.span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold">
        <span className="gradient-text">{title}</span>
      </h2>
      <motion.div
        className={`mt-4 h-1 w-20 rounded-full ${align === "center" ? "mx-auto" : ""}`}
        style={{
          background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #06B6D4)",
        }}
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
}
