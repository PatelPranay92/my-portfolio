"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/data";

export function Services() {
  const colors = [
    "#3B82F6",
    "#8B5CF6",
    "#06B6D4",
    "#10B981",
    "#F59E0B",
    "#EC4899",
    "#EF4444",
    "#14B8A6",
  ];

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#3B82F6]/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Services" subtitle="What I Offer" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            const color = colors[i % colors.length];

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="h-full glass-card rounded-2xl p-6 hover:border-[#3B82F6]/20 transition-all duration-300 relative overflow-hidden">
                  <div
                    className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                    style={{ backgroundColor: color }}
                  />

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
                    style={{
                      backgroundColor: `${color}15`,
                      border: `1px solid ${color}25`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>

                  <h3 className="text-sm font-bold mb-2 relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
