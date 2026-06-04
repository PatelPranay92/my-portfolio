"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SkillFormValues, skillSchema } from "@/validations/schema";
import { createSkill, updateSkill } from "@/actions/skill.actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

interface SkillFormProps {
  initialData?: Partial<SkillFormValues> & { _id?: string };
}

export function SkillForm({ initialData }: SkillFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<SkillFormValues>({
    name: initialData?.name || "",
    category: initialData?.category || "Frontend",
    level: initialData?.level || 50,
    icon: initialData?.icon || "",
    isFeatured: initialData?.isFeatured || false,
    displayOrder: initialData?.displayOrder || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validated = skillSchema.parse(formData);
      
      let res;
      if (initialData?._id) {
        res = await updateSkill(initialData._id, validated);
      } else {
        res = await createSkill(validated);
      }

      if (res.success) {
        toast.success(initialData ? "Skill updated" : "Skill created");
        router.push("/pranaypatel18/skills");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to save skill");
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
          <Label htmlFor="name" className="text-slate-300">Name</Label>
          <select
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="flex h-10 w-full items-center justify-between rounded-lg border border-slate-700/50 bg-[#020617]/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
          >
            <option value="" disabled>Select a skill</option>
            <optgroup label="Frontend">
              <option value="React.js">React.js</option>
              <option value="Next.js">Next.js</option>
              <option value="Vue.js">Vue.js</option>
              <option value="Angular">Angular</option>
              <option value="TypeScript">TypeScript</option>
              <option value="JavaScript">JavaScript</option>
              <option value="HTML5">HTML5</option>
              <option value="CSS3">CSS3</option>
              <option value="Tailwind CSS">Tailwind CSS</option>
            </optgroup>
            <optgroup label="Backend & Database">
              <option value="Node.js">Node.js</option>
              <option value="Express.js">Express.js</option>
              <option value="Python">Python</option>
              <option value="Django">Django</option>
              <option value="PostgreSQL">PostgreSQL</option>
              <option value="MongoDB">MongoDB</option>
              <option value="MySQL">MySQL</option>
              <option value="Redis">Redis</option>
            </optgroup>
            <optgroup label="DevOps & Tools">
              <option value="Git">Git</option>
              <option value="Docker">Docker</option>
              <option value="AWS">AWS</option>
              <option value="Linux">Linux</option>
              <option value="Figma">Figma</option>
            </optgroup>
            <optgroup label="Other">
              <option value="GraphQL">GraphQL</option>
              <option value="REST APIs">REST APIs</option>
              <option value="Machine Learning">Machine Learning</option>
            </optgroup>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category" className="text-slate-300">Category</Label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as SkillFormValues["category"] })}
            className="flex h-10 w-full items-center justify-between rounded-lg border border-slate-700/50 bg-[#020617]/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="AI/ML">AI/ML</option>
            <option value="DevOps">DevOps</option>
            <option value="Tools">Tools</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="level" className="text-slate-300">Skill Level (1-100)</Label>
          <div className="flex items-center gap-4">
            <Input
              id="level"
              type="range"
              min="1"
              max="100"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
              className="flex-1 accent-emerald-500"
            />
            <span className="text-sm font-medium w-12">{formData.level}%</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="icon" className="text-slate-300">Icon Class/Name</Label>
          <Input
            id="icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="bg-[#020617]/50 border-slate-700/50 text-white focus-visible:ring-1 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 transition-all rounded-lg shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
            placeholder="E.g., SiReact"
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
          <Label htmlFor="isFeatured" className="text-slate-300 cursor-pointer">Featured Skill</Label>
        </div>
        <div className="flex items-center gap-3 flex-1 max-w-xs">
          <Label htmlFor="displayOrder" className="text-slate-300 whitespace-nowrap">Display Order</Label>
          <Input
            id="displayOrder"
            type="number"
            value={formData.displayOrder}
            onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
            className="bg-[#0F172A]/50 border-slate-700/50 text-white focus-visible:ring-1 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 transition-all rounded-lg shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]"
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
          className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/25 border border-emerald-500/20 rounded-lg transition-all"
        >
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {initialData ? "Update Skill" : "Create Skill"}
        </Button>
      </div>
    </form>
  );
}
