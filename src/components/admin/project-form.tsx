"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectFormValues, projectSchema } from "@/validations/schema";
import { createProject, updateProject } from "@/actions/project.actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, GitBranch, ExternalLink, Globe } from "lucide-react";
import { ImageUpload } from "./image-upload";

interface ProjectFormProps {
  initialData?: Partial<ProjectFormValues> & { _id?: string };
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<ProjectFormValues>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    shortDescription: initialData?.shortDescription || "",
    fullDescription: initialData?.fullDescription || "",
    imageUrl: initialData?.imageUrl || "",
    githubUrl: initialData?.githubUrl || "",
    liveDemoUrl: initialData?.liveDemoUrl || "",
    technologies: initialData?.technologies || [],
    category: initialData?.category || "",
    isFeatured: initialData?.isFeatured || false,
    displayOrder: initialData?.displayOrder || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate locally first
      const validated = projectSchema.parse(formData);
      
      let res;
      if (initialData?._id) {
        res = await updateProject(initialData._id, validated);
      } else {
        res = await createProject(validated);
      }

      if (res.success) {
        toast.success(initialData ? "Project updated" : "Project created");
        router.push("/pranaypatel18/projects");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to save project");
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
          <Label htmlFor="title" className="text-slate-300">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-[#020617]/50 border-slate-700/50 text-white focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all rounded-lg shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
            placeholder="E.g., Modern E-Commerce Platform"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug" className="text-slate-300">Slug <span className="text-slate-500 text-xs font-normal">(Auto-generated if empty)</span></Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="bg-[#020617]/50 border-slate-700/50 text-white focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all rounded-lg shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
            placeholder="E.g., modern-ecommerce-platform"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="shortDescription" className="text-slate-300">Short Description</Label>
        <Textarea
          id="shortDescription"
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          className="bg-[#020617]/50 border-slate-700/50 text-white resize-none focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all rounded-lg shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
          rows={2}
          placeholder="Brief summary of the project..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullDescription" className="text-slate-300">Full Description</Label>
        <Textarea
          id="fullDescription"
          value={formData.fullDescription}
          onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
          className="bg-[#020617]/50 border-slate-700/50 text-white min-h-[150px] focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all rounded-lg shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
          placeholder="Detailed description, problem solved, challenges faced..."
        />
      </div>

      <div className="space-y-2">
        <ImageUpload
          label="Project Cover Image"
          value={formData.imageUrl || ""}
          onChange={(val) => setFormData({ ...formData, imageUrl: val })}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="githubUrl" className="text-slate-300">GitHub URL</Label>
          <div className="relative group">
            <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
            <Input
              id="githubUrl"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              className="pl-9 pr-10 bg-[#020617]/50 border-slate-700/50 text-white focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all rounded-lg shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
              placeholder="https://github.com/..."
            />
            {formData.githubUrl && (
              <a href={formData.githubUrl} target="_blank" rel="noopener noreferrer" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="liveDemoUrl" className="text-slate-300">Live Demo URL</Label>
          <div className="relative group">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
            <Input
              id="liveDemoUrl"
              value={formData.liveDemoUrl}
              onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
              className="pl-9 pr-10 bg-[#020617]/50 border-slate-700/50 text-white focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all rounded-lg shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
              placeholder="https://..."
            />
            {formData.liveDemoUrl && (
              <a href={formData.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="technologies" className="text-slate-300">Technologies (comma separated)</Label>
          <Input
            id="technologies"
            value={formData.technologies.join(", ")}
            onChange={(e) => {
              const techs = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
              setFormData({ ...formData, technologies: techs });
            }}
            className="bg-[#020617]/50 border-slate-700/50 text-white focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all rounded-lg shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
            placeholder="React, Next.js, TailwindCSS"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category" className="text-slate-300">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="bg-[#020617]/50 border-slate-700/50 text-white focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all rounded-lg shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
            placeholder="E.g., Full Stack, AI, Frontend"
          />
        </div>
      </div>

      <div className="flex items-center gap-8 p-5 rounded-xl bg-[#020617]/40 border border-slate-700/50 backdrop-blur-sm shadow-inner">
        <div className="flex items-center gap-3">
          <Switch
            id="isFeatured"
            checked={formData.isFeatured}
            onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
          />
          <Label htmlFor="isFeatured" className="text-slate-300 cursor-pointer">Featured Project</Label>
        </div>
        <div className="flex items-center gap-3 flex-1 max-w-xs">
          <Label htmlFor="displayOrder" className="text-slate-300 whitespace-nowrap">Display Order</Label>
          <Input
            id="displayOrder"
            type="number"
            value={formData.displayOrder}
            onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
            className="bg-[#0F172A]/50 border-slate-700/50 text-white focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all rounded-lg shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
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
          className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white shadow-lg shadow-blue-500/25 border border-blue-500/20 rounded-lg transition-all"
        >
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {initialData ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
