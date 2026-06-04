import { ProjectForm } from "@/components/admin/project-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import { Project } from "@/models/project";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();
  const project = await Project.findById(id);

  if (!project) {
    notFound();
  }

  const projectData = JSON.parse(JSON.stringify(project));

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/pranaypatel18/projects"
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Edit Project</h1>
          <p className="text-sm text-slate-400">Update project details</p>
        </div>
      </div>

      <ProjectForm initialData={projectData} />
    </div>
  );
}
