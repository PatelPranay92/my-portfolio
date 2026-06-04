"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderGit2,
  Code2,
  Share2,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { signOut } from "next-auth/react";

export const navItems = [
  { href: "/pranaypatel18/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pranaypatel18/projects", label: "Projects", icon: FolderGit2 },
  { href: "/pranaypatel18/skills", label: "Skills", icon: Code2 },
  { href: "/pranaypatel18/social-links", label: "Social Links", icon: Share2 },
  { href: "/pranaypatel18/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col bg-[#0F172A]/40 backdrop-blur-2xl border-r border-slate-800/60 z-20 flex-shrink-0 shadow-[4px_0_24px_-4px_rgba(0,0,0,0.3)]">
      <div className="h-16 flex items-center px-6 border-b border-slate-800/60">
        <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/10">
            <span className="text-white text-xs font-black">PP</span>
          </div>
          Admin<span className="text-slate-500 font-normal">Panel</span>
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = 
            pathname === item.href || 
            (item.href !== "/pranaypatel18/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative group overflow-hidden ${
                isActive
                  ? "text-blue-400 bg-blue-500/10 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)] border border-blue-500/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent"
              }`}
            >
              {isActive && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r-full shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                />
              )}
              {!isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-slate-600 rounded-r-full transition-all duration-300 group-hover:h-1/2 opacity-0 group-hover:opacity-100" />
              )}
              <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "text-blue-400 scale-110" : "group-hover:scale-110"}`} />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => signOut({ callbackUrl: "/pranaypatel18/login" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/10 transition-all duration-300 relative group overflow-hidden border border-transparent"
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-red-500 rounded-r-full transition-all duration-300 group-hover:h-1/2 opacity-0 group-hover:opacity-100" />
          <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
