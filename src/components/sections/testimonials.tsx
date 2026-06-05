"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/data";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Testimonials" subtitle="What Others Say" />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full glass-card rounded-2xl p-6 relative overflow-hidden">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-[#3B82F6]/10 absolute top-4 right-4" />

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }, (_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white text-sm font-bold">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
