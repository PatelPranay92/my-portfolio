"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, Bell, LogOut, Check, Loader2, Inbox, ExternalLink } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "./sidebar";
import Link from "next/link";
import { getRecentUnreadMessages, getUnreadMessagesCount, markMessageAsRead, markAllMessagesAsRead } from "@/actions/contact.actions";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

export function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Simple breadcrumb generation
  const segments = pathname.split("/").filter(Boolean);
  const currentSegment = segments[segments.length - 1] || "dashboard";
  const title = currentSegment.charAt(0).toUpperCase() + currentSegment.slice(1);

  const fetchNotifications = async () => {
    try {
      const [countRes, messagesRes] = await Promise.all([
        getUnreadMessagesCount(),
        getRecentUnreadMessages()
      ]);

      if (countRes.success) {
        setUnreadCount(countRes.count ?? 0);
      }
      if (messagesRes.success && messagesRes.data) {
        setRecentMessages(messagesRes.data);
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  useEffect(() => {
    if (session) {
      fetchNotifications();
      // Poll every 10 seconds
      const interval = setInterval(fetchNotifications, 10000);
      return () => clearInterval(interval);
    }
  }, [session]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllAsRead = async () => {
    setIsLoading(true);
    try {
      const res = await markAllMessagesAsRead();
      if (res.success) {
        setUnreadCount(0);
        setRecentMessages([]);
        toast.success("All messages marked as read");
      } else {
        toast.error(res.error || "Failed to mark all as read");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationClick = async (id: string) => {
    setIsNotificationsOpen(false);
    try {
      await markMessageAsRead(id);
      setUnreadCount(prev => Math.max(0, prev - 1));
      setRecentMessages(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
    }
    router.push("/pranaypatel18/messages");
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <header className="h-[72px] flex items-center justify-between px-4 md:px-8 border-b border-slate-800/60 bg-[#020617]/40 backdrop-blur-2xl sticky top-0 z-30 flex-shrink-0 shadow-sm">
      <style>{`
        @keyframes swing-bell {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-10deg); }
          60% { transform: rotate(5deg); }
          80% { transform: rotate(-5deg); }
        }
        .animate-swing-bell {
          animation: swing-bell 1.5s ease-in-out infinite;
          transform-origin: top center;
        }
      `}</style>

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

        {/* Notifications Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`relative p-2 rounded-full transition-all duration-300 cursor-pointer ${
              isNotificationsOpen 
                ? "text-blue-400 bg-blue-500/10" 
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Bell className={`w-5 h-5 transition-transform duration-300 ${unreadCount > 0 ? "animate-swing-bell" : ""}`} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 ring-1 ring-[#020617]"></span>
              </span>
            )}
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#0f172a]/95 backdrop-blur-xl border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl z-50 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-800/60 bg-slate-900/40">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/10">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      disabled={isLoading}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {isLoading ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                      Mark all read
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="max-h-[320px] overflow-y-auto divide-y divide-slate-800/40">
                  {recentMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-slate-800/40 flex items-center justify-center mb-3">
                        <Inbox className="w-5 h-5 text-slate-500" />
                      </div>
                      <p className="text-sm font-semibold text-slate-300">All caught up!</p>
                      <p className="text-xs text-slate-500 mt-1 max-w-[200px]">No unread messages in your inbox.</p>
                    </div>
                  ) : (
                    recentMessages.map((msg) => (
                      <div
                        key={msg.id}
                        onClick={() => handleNotificationClick(msg.id)}
                        className="p-4 hover:bg-slate-800/30 transition-all duration-200 cursor-pointer flex gap-3 group relative overflow-hidden"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                              {msg.name}
                            </span>
                            <span className="text-[10px] text-slate-500 shrink-0">
                              {formatRelativeTime(msg.createdAt)}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-300 truncate">
                            {msg.subject}
                          </p>
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                <Link
                  href="/pranaypatel18/messages"
                  onClick={() => setIsNotificationsOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-3 border-t border-slate-800/60 bg-slate-900/20 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-900/40 transition-all"
                >
                  View all messages
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
