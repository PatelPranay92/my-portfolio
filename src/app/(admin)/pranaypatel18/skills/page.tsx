import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DataTable } from "@/components/admin/data-table";
import { skillColumns } from "./columns";
import connectDB from "@/lib/mongodb";
import { Skill } from "@/models/skill";

export const dynamic = 'force-dynamic';

export default async function SkillsPage() {
  const session = await auth();
  if (!session) {
    redirect("/pranaypatel18/login?callbackUrl=/pranaypatel18/skills");
  }

  await connectDB();
  
  const skills = await Skill.find().sort({ category: 1, displayOrder: 1 });
  
  const formattedSkills = skills.map((s) => ({
    id: s._id.toString(),
    name: s.name,
    category: s.category,
    level: s.level,
    displayOrder: s.displayOrder,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Skills</h1>
          <p className="text-sm text-slate-400">Manage your technical skills</p>
        </div>
        <Link
          href="/pranaypatel18/skills/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </Link>
      </div>

      <DataTable
        columns={skillColumns}
        data={formattedSkills}
        searchKey="name"
      />
    </div>
  );
}
