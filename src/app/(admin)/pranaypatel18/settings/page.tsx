"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Key, Sun, Moon, Laptop, Palette } from "lucide-react";
import { updateAdminCredentials } from "@/actions/admin.actions";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => setMounted(true), []);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const res = await updateAdminCredentials(formData.currentPassword, formData.newPassword);
      if (res.success) {
        toast.success("Password updated successfully");
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error(res.error || "Failed to update password");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-sm text-slate-400">Manage your admin account and preferences</p>
      </div>

      {/* Appearance Settings */}
      <div className="bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white">Appearance</h2>
            <p className="text-sm text-slate-400">Customize your theme preference</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setTheme("light")}
            className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
              mounted && theme === "light"
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-white"
            }`}
          >
            <Sun className="w-6 h-6" />
            <span className="text-sm font-medium">Light</span>
          </button>

          <button
            onClick={() => setTheme("dark")}
            className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
              mounted && theme === "dark"
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-white"
            }`}
          >
            <Moon className="w-6 h-6" />
            <span className="text-sm font-medium">Dark</span>
          </button>

          <button
            onClick={() => setTheme("system")}
            className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
              mounted && theme === "system"
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-white"
            }`}
          >
            <Laptop className="w-6 h-6" />
            <span className="text-sm font-medium">System</span>
          </button>
        </div>
      </div>

      {/* Password Settings */}
      <div className="bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white">Change Password</h2>
            <p className="text-sm text-slate-400">Update your admin login password</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              className="bg-slate-900 border-slate-700"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              className="bg-slate-900 border-slate-700"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="bg-slate-900 border-slate-700"
              required
            />
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
