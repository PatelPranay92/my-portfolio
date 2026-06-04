"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SocialLinkFormValues, socialLinkSchema } from "@/validations/schema";
import { createSocialLink, updateSocialLink } from "@/actions/social.actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Link as LinkIcon, ExternalLink } from "lucide-react";

interface SocialLinkFormProps {
  initialData?: Partial<SocialLinkFormValues> & { _id?: string };
}

export function SocialLinkForm({ initialData }: SocialLinkFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<SocialLinkFormValues>({
    platform: initialData?.platform || "",
    icon: initialData?.icon || "",
    url: initialData?.url || "",
    isActive: initialData?.isActive ?? true, // default to true if undefined
    displayOrder: initialData?.displayOrder || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validated = socialLinkSchema.parse(formData);
      
      let res;
      if (initialData?._id) {
        res = await updateSocialLink(initialData._id, validated);
      } else {
        res = await createSocialLink(validated);
      }

      if (res.success) {
        toast.success(initialData ? "Link updated" : "Link created");
        router.push("/pranaypatel18/social-links");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to save link");
      }
    } catch (error: unknown) {
      if (error && typeof error === "object" && "issues" in error) {
        toast.error((error as any).issues[0].message);
      } else if (error && typeof error === "object" && "errors" in error) {
        toast.error((error as any).errors[0].message);
      } else {
        toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-[#0F172A]/40 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-slate-800/60 shadow-xl shadow-black/20">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="platform" className="text-slate-300">Platform Name</Label>
          <Input
            id="platform"
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="bg-[#020617]/50 border-slate-700/50 text-white focus-visible:ring-1 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 transition-all rounded-lg shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
            placeholder="E.g., GitHub, LinkedIn"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="icon" className="text-slate-300">Icon Name</Label>
          <Input
            id="icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="bg-[#020617]/50 border-slate-700/50 text-white focus-visible:ring-1 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 transition-all rounded-lg shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
            placeholder="E.g., GithubIcon, LinkedinIcon"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url" className="text-slate-300">Profile URL</Label>
        <div className="relative group">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
          <Input
            id="url"
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="pl-9 pr-10 bg-[#020617]/50 border-slate-700/50 text-white focus-visible:ring-1 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 transition-all rounded-lg shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
            placeholder="https://..."
          />
          {formData.url && (
            <a href={formData.url} target="_blank" rel="noopener noreferrer" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-400 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="flex items-center gap-8 p-5 rounded-xl bg-[#020617]/40 border border-slate-700/50 backdrop-blur-sm shadow-inner">
        <div className="flex items-center gap-3">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
          />
          <Label htmlFor="isActive" className="text-slate-300 cursor-pointer">Active</Label>
        </div>
        <div className="flex items-center gap-3 flex-1 max-w-xs">
          <Label htmlFor="displayOrder" className="text-slate-300 whitespace-nowrap">Display Order</Label>
          <Input
            id="displayOrder"
            type="number"
            value={formData.displayOrder}
            onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
            className="bg-[#0F172A]/50 border-slate-700/50 text-white focus-visible:ring-1 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 transition-all rounded-lg shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t border-slate-800 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="border-slate-700/50 bg-[#0F172A]/50 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-all"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white shadow-lg shadow-purple-500/25 border border-purple-500/20 rounded-lg transition-all"
        >
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {initialData ? "Update Link" : "Add Link"}
        </Button>
      </div>
    </form>
  );
}
