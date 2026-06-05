"use client";

import { useState, useEffect } from "react";
import { deleteContactMessage, getAllContactMessages, markAllMessagesAsRead } from "@/actions/contact.actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Trash2, Mail, Calendar, Inbox, Loader2 } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export function MessagesList({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const pollMessages = async () => {
      try {
        const res = await getAllContactMessages();
        if (res.success && res.data && active) {
          setMessages(res.data);

          // Mark any unread messages as read in database since we're actively viewing the inbox
          const hasUnread = res.data.some((m) => !m.read);
          if (hasUnread) {
            await markAllMessagesAsRead();
          }
        }
      } catch (err) {
        console.error("Failed to poll messages:", err);
      }
    };

    // Poll every 10 seconds
    const interval = setInterval(pollMessages, 10000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    setDeletingId(id);
    try {
      const res = await deleteContactMessage(id);
      if (res.success) {
        toast.success("Message deleted successfully");
        setMessages(messages.filter((m) => m.id !== id));
      } else {
        toast.error(res.error || "Failed to delete message");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/20 rounded-2xl border border-slate-800/60 p-8">
        <div className="w-16 h-16 rounded-full bg-slate-800/40 flex items-center justify-center mb-4">
          <Inbox className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">Inbox is empty</h3>
        <p className="text-sm text-slate-400 max-w-sm">No one has sent you a message through the contact form yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`bg-slate-900/30 border backdrop-blur-md rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-6 hover:border-slate-700/60 transition-colors relative overflow-hidden ${
            !msg.read
              ? "border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.05)] border-l-4 border-l-blue-500"
              : "border-slate-800/60"
          }`}
        >
          {/* Initials Circle */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-blue-500/10 shrink-0">
            {getInitials(msg.name)}
          </div>

          <div className="flex-1 min-w-0 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white truncate">{msg.name}</h2>
                  {!msg.read && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/25 uppercase tracking-wider animate-pulse">
                      New
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-xs text-slate-400 hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {msg.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(msg.createdAt)}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Subject</div>
              <h3 className="text-sm font-bold text-slate-200">{msg.subject}</h3>
            </div>

            <div className="bg-slate-950/40 border border-slate-800/40 rounded-xl p-4">
              <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Message</div>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-800/60 pt-4">
              <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}>
                <Button variant="outline" className="border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white rounded-lg transition-all h-9 text-xs cursor-pointer">
                  <Mail className="w-3.5 h-3.5 mr-1.5" />
                  Reply
                </Button>
              </a>
              <Button
                variant="destructive"
                onClick={() => handleDelete(msg.id)}
                disabled={deletingId === msg.id}
                className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 hover:border-red-500/20 rounded-lg transition-all h-9 text-xs cursor-pointer"
              >
                {deletingId === msg.id ? (
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                )}
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
