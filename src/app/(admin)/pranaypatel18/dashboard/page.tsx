import { FolderGit2, Code2, Share2, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import { Project } from "@/models/project";
import { Skill } from "@/models/skill";
import { SocialLink } from "@/models/social-link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/pranaypatel18/login?callbackUrl=/pranaypatel18/dashboard");
  }

  await connectDB();

  // Fetch counts
  const [projectCount, skillCount, socialLinkCount] = await Promise.all([
    Project.countDocuments(),
    Skill.countDocuments(),
    SocialLink.countDocuments(),
  ]);

  const stats = [
    {
      title: "Total Projects",
      value: projectCount,
      icon: FolderGit2,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      href: "/pranaypatel18/projects",
    },
    {
      title: "Total Skills",
      value: skillCount,
      icon: Code2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      href: "/pranaypatel18/skills",
    },
    {
      title: "Social Links",
      value: socialLinkCount,
      icon: Share2,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      href: "/pranaypatel18/social-links",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-slate-400">
          Here&apos;s an overview of your portfolio content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`rounded-2xl p-6 border ${stat.border} bg-slate-900/50 backdrop-blur-sm relative overflow-hidden group`}
          >
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <Link
                href={stat.href}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative z-10">
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-400">
                {stat.title}
              </div>
            </div>
            
            {/* Background decoration */}
            <div className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full blur-[40px] opacity-20 group-hover:opacity-30 transition-opacity ${stat.bg.replace('/10', '')}`} />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/pranaypatel18/projects/new"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800 hover:border-slate-700 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
              <Plus className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Add Project</div>
              <div className="text-xs text-slate-400">Create new portfolio item</div>
            </div>
          </Link>

          <Link
            href="/pranaypatel18/skills/new"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800 hover:border-slate-700 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
              <Plus className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Add Skill</div>
              <div className="text-xs text-slate-400">Add a new technical skill</div>
            </div>
          </Link>

          <Link
            href="/pranaypatel18/social-links/new"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800 hover:border-slate-700 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <Plus className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Add Social Link</div>
              <div className="text-xs text-slate-400">Connect a new platform</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
