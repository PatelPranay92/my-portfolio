import { SkillForm } from "@/components/admin/skill-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import { Skill } from "@/models/skill";
import { notFound } from "next/navigation";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();
  const skill = await Skill.findById(id);

  if (!skill) {
    notFound();
  }

  const skillData = JSON.parse(JSON.stringify(skill));

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
          <h1 className="text-2xl font-bold text-white tracking-tight">Edit Skill</h1>
          <p className="text-sm text-slate-400">Update skill details</p>
        </div>
      </div>

      <SkillForm initialData={skillData} />
    </div>
  );
}
