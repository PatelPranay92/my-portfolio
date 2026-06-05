"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Key, Sun, Moon, Laptop, Palette, FileText, UploadCloud, CheckCircle2 } from "lucide-react";
import { updateAdminCredentials } from "@/actions/admin.actions";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [resumeName, setResumeName] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    fetch("/api/resume")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.fileName) {
          setResumeName(json.data.fileName);
        }
      })
      .catch(console.error);
  }, []);
  
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    setIsUploadingResume(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result;
      if (!base64Data) {
        toast.error("Failed to read file");
        setIsUploadingResume(false);
        return;
      }

      try {
        const res = await fetch("/api/resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            fileData: base64Data,
          }),
        });
        const data = await res.json();
        if (data.success) {
          toast.success("Resume uploaded successfully!");
          setResumeName(file.name);
        } else {
          toast.error(data.error || "Failed to upload resume");
        }
      } catch (error) {
        toast.error("An unexpected error occurred while uploading");
      } finally {
        setIsUploadingResume(false);
      }
    };
    reader.readAsDataURL(file);
  };

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

      {/* Resume Settings */}
      <div className="bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white">Resume Upload</h2>
            <p className="text-sm text-slate-400">Manage the resume file available for download</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 flex items-center gap-3">
            <FileText className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-300 truncate">
              {resumeName ? resumeName : "No resume uploaded yet"}
            </span>
            {resumeName && <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto flex-shrink-0" />}
          </div>
          <div className="relative w-full sm:w-auto">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleResumeUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploadingResume}
            />
            <Button
              disabled={isUploadingResume}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
            >
              {isUploadingResume ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <UploadCloud className="w-4 h-4 mr-2" />
              )}
              {isUploadingResume ? "Uploading..." : "Upload New Resume"}
            </Button>
          </div>
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
