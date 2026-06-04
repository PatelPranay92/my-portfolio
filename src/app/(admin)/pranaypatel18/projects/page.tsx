import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DataTable } from "@/components/admin/data-table";
import { projectColumns } from "./columns";
import connectDB from "@/lib/mongodb";
import { Project } from "@/models/project";

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const session = await auth();
  if (!session) {
    redirect("/pranaypatel18/login?callbackUrl=/pranaypatel18/projects");
  }

  await connectDB();
  
  const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 });
  
  const formattedProjects = projects.map((p) => ({
    id: p._id.toString(),
    title: p.title,
    category: p.category,
    isFeatured: p.isFeatured,
    displayOrder: p.displayOrder,
    updatedAt: p.updatedAt,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Projects</h1>
          <p className="text-sm text-slate-400">Manage your portfolio projects</p>
        </div>
        <Link
          href="/pranaypatel18/projects/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.2)]"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Link>
      </div>

      <DataTable
        columns={projectColumns}
        data={formattedProjects}
        searchKey="title"
      />
    </div>
  );
}
