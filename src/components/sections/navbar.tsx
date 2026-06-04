"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command, LinkIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navItems } from "@/lib/data";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/social-icons";

export function Navbar({ socialLinks = [] }: { socialLinks?: any[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sections = navItems.map((item) =>
        document.getElementById(item.href.replace("#", ""))
      );
      const scrollY = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollY) {
          setActiveSection(navItems[i].href.replace("#", ""));
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-300 ${
          scrolled
            ? "glass shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="flex items-center justify-between h-16 md:h-20 2xl:h-24">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#home");
              }}
              className="relative text-xl font-bold gradient-text cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              PP
              <span className="text-[#3B82F6]">.</span>
            </motion.a>

            {/* Social Links Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {socialLinks.map((link) => {
                let Icon: any = LinkIcon;
                if (link.icon === "GithubIcon") Icon = GithubIcon;
                if (link.icon === "LinkedinIcon") Icon = LinkedinIcon;
                if (link.icon === "TwitterIcon") Icon = TwitterIcon;

                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-foreground/10 transition-colors"
                    aria-label={link.platform}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeSection === item.href.replace("#", "")
                      ? "text-[#3B82F6]"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {activeSection === item.href.replace("#", "") && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-lg bg-[#3B82F6]/10"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Cmd+K hint */}
              <button
                onClick={() => {
                  document.dispatchEvent(
                    new KeyboardEvent("keydown", {
                      key: "k",
                      ctrlKey: true,
                    })
                  );
                }}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs text-foreground/40 rounded-lg border border-foreground/10 hover:border-foreground/20 transition-colors cursor-pointer"
              >
                <Command className="w-3 h-3" />
                <span>K</span>
              </button>

              <ThemeToggle />

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-[85] w-72 glass p-6 pt-24 md:hidden"
          >
            <div className="flex flex-col gap-2 flex-grow">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.href)}
                  className={`px-4 py-3 text-left text-sm font-medium rounded-xl transition-colors cursor-pointer min-h-[44px] ${
                    activeSection === item.href.replace("#", "")
                      ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                      : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile Social Links */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
              {socialLinks.map((link) => {
                let Icon: any = LinkIcon;
                if (link.icon === "GithubIcon") Icon = GithubIcon;
                if (link.icon === "LinkedinIcon") Icon = LinkedinIcon;
                if (link.icon === "TwitterIcon") Icon = TwitterIcon;

                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl text-foreground/60 hover:text-foreground hover:bg-foreground/10 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label={link.platform}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
