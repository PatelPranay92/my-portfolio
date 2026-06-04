"use client";

import { usePathname } from "next/navigation";
import { Menu, Search, Bell, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "./sidebar";
import Link from "next/link";

export function TopBar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Simple breadcrumb generation
  const segments = pathname.split("/").filter(Boolean);
  const currentSegment = segments[segments.length - 1] || "dashboard";
  const title = currentSegment.charAt(0).toUpperCase() + currentSegment.slice(1);

  return (
    <header className="h-[72px] flex items-center justify-between px-4 md:px-8 border-b border-slate-800/60 bg-[#020617]/40 backdrop-blur-2xl sticky top-0 z-30 flex-shrink-0 shadow-sm">
      <div className="flex items-center gap-5">
        <Sheet>
          <SheetTrigger className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white cursor-pointer">
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-[#020617]/80 backdrop-blur-2xl border-r border-slate-800/60 p-0 flex flex-col shadow-[4px_0_24px_-4px_rgba(0,0,0,0.4)]">
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
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/10 transition-all duration-300 relative group overflow-hidden border border-transparent w-full"
              >
                <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                Sign Out
              </button>
            </div>
          </SheetContent>
        </Sheet>
        <h2 className="text-lg font-semibold text-white tracking-tight">
          {title.replace("-", " ")}
        </h2>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden md:flex relative group">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-blue-400 transition-colors duration-300" />
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-64 lg:w-80 bg-[#0F172A]/50 backdrop-blur-md border border-slate-700/50 rounded-full pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)]"
          />
        </div>

        <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-full transition-all duration-300">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#020617]" />
        </button>

        <div className="h-8 w-px bg-slate-800/60 hidden md:block" />

        <div className="flex items-center gap-3 cursor-pointer p-1.5 pr-4 rounded-full hover:bg-slate-800/30 transition-all duration-300 border border-transparent hover:border-slate-800/50">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/20">
            {session?.user?.name?.charAt(0) || "A"}
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-sm font-semibold text-white leading-tight">
              {session?.user?.name || "Admin"}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              {session?.user?.email}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
