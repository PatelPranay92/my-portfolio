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
        <div className="grid md:grid-cols-3 gap-12 2xl:gap-20">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold gradient-text mb-3">
              Pranay Patel
            </h3>
            <p className="text-sm text-foreground/40 leading-relaxed mb-6 max-w-xs">
              Full Stack Developer & AI Engineer building scalable web
              applications and intelligent solutions.
            </p>
            <div className="flex gap-3">
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

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-sm text-foreground/40 hover:text-[#3B82F6] transition-colors text-left cursor-pointer py-1"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Resources</h4>
            <div className="space-y-2">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target={social.url.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="block text-sm text-foreground/40 hover:text-[#3B82F6] transition-colors py-1 capitalize"
                >
                  {social.platform}
                </a>
              ))}
              <button
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="block text-sm text-foreground/40 hover:text-[#3B82F6] transition-colors py-1 cursor-pointer text-left w-full"
              >
                Download Resume
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-foreground/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/30 flex items-center gap-1">
            &copy; {new Date().getFullYear()} Pranay Patel. Built with{" "}
            <Heart className="w-3 h-3 text-red-400 inline" /> using Next.js
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-xs text-foreground/30 hover:text-foreground/50 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3 h-3" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
