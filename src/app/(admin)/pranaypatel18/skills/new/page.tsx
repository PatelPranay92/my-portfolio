import { SkillForm } from "@/components/admin/skill-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewSkillPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/pranaypatel18/skills"
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Add Skill</h1>
          <p className="text-sm text-slate-400">Add a new technical skill</p>
        </div>
      </div>

      <SkillForm />
    </div>
  );
}
