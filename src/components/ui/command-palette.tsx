"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  User,
  Code2,
  FolderGit2,
  Brain,
  Briefcase,
  Mail,
  Sun,
  Moon,
  FileDown,
  X,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { useTheme } from "next-themes";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const navigateTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { label: "Home", icon: Home, id: "home" },
    { label: "About", icon: User, id: "about" },
    { label: "Skills", icon: Code2, id: "skills" },
    { label: "Projects", icon: FolderGit2, id: "projects" },
    { label: "Experience", icon: Briefcase, id: "experience" },
    { label: "Contact", icon: Mail, id: "contact" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-start justify-center pt-[20vh]"
          onClick={() => setOpen(false)}
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg mx-4"
          >
            <Command className="rounded-2xl border border-white/10 bg-[#1E293B] shadow-2xl overflow-hidden">
              <div className="flex items-center border-b border-white/10 px-4">
                <Search className="w-4 h-4 text-white/40 mr-3 shrink-0" />
                <Command.Input
                  placeholder="Type a command or search..."
                  className="flex-1 h-14 bg-transparent text-white placeholder:text-white/30 outline-none text-sm"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-md hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4 text-white/40" />
                </button>
              </div>
              <Command.List className="max-h-80 overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-sm text-white/40">
                  No results found.
                </Command.Empty>

                <Command.Group
                  heading="Navigation"
                  className="text-xs font-semibold text-white/30 uppercase tracking-wider px-2 py-1.5"
                >
                  {navItems.map((item) => (
                    <Command.Item
                      key={item.id}
                      onSelect={() => navigateTo(item.id)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 text-sm hover:bg-white/10 hover:text-white cursor-pointer data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Separator className="my-2 h-px bg-white/10" />

                <Command.Group
                  heading="Actions"
                  className="text-xs font-semibold text-white/30 uppercase tracking-wider px-2 py-1.5"
                >
                  <Command.Item
                    onSelect={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 text-sm hover:bg-white/10 hover:text-white cursor-pointer data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                  >
                    {theme === "dark" ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                    Toggle Theme
                  </Command.Item>
                  <Command.Item
                    onSelect={() => {
                      window.open(
                        "https://github.com/PatelPranay92",
                        "_blank"
                      );
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 text-sm hover:bg-white/10 hover:text-white cursor-pointer data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                  >
                    <GithubIcon className="w-4 h-4" />
                    Open GitHub
                  </Command.Item>
                  <Command.Item
                    onSelect={() => {
                      window.open(
                        "https://linkedin.com/in/pranaypatel",
                        "_blank"
                      );
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 text-sm hover:bg-white/10 hover:text-white cursor-pointer data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    Open LinkedIn
                  </Command.Item>
                  <Command.Item
                    onSelect={() => {
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 text-sm hover:bg-white/10 hover:text-white cursor-pointer data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                  >
                    <FileDown className="w-4 h-4" />
                    Download Resume
                  </Command.Item>
                </Command.Group>
              </Command.List>
              <div className="border-t border-white/10 px-4 py-2 flex items-center justify-between text-[11px] text-white/30">
                <span>Navigate with ↑↓ • Select with ↵</span>
                <span>ESC to close</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
