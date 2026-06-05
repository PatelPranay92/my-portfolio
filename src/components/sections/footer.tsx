"use client";

import { motion } from "framer-motion";
import { Mail, Heart, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/social-icons";
import { navItems } from "@/lib/data";

export function Footer({ socialLinks = [] }: { socialLinks?: any[] }) {
  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-foreground/5">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto">
          {/* Brand */}
          <h3 className="text-xl font-bold gradient-text mb-3">
            Pranay Patel
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Full Stack Developer building scalable web
            applications and intelligent solutions.
          </p>
          <div className="flex justify-center gap-3">
            {socialLinks.map((social) => {
              let Icon: any = GithubIcon;
              if (social.icon === "LinkedinIcon") Icon = LinkedinIcon;
              if (social.icon === "TwitterIcon") Icon = TwitterIcon;
              
              return (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target={
                    social.url.startsWith("mailto") ? undefined : "_blank"
                  }
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-foreground/5 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] flex items-center justify-center transition-colors"
                  aria-label={social.platform}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-foreground/5 flex flex-col items-center justify-center gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-1">
            &copy; {new Date().getFullYear()} Pranay Patel.
          </p>
        </div>
      </div>
    </footer>
  );
}
