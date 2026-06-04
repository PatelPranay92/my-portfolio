import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DataTable } from "@/components/admin/data-table";
import { socialLinkColumns } from "./columns";
import connectDB from "@/lib/mongodb";
import { SocialLink } from "@/models/social-link";

export const dynamic = 'force-dynamic';

export default async function SocialLinksPage() {
  const session = await auth();
  if (!session) {
    redirect("/pranaypatel18/login?callbackUrl=/pranaypatel18/social-links");
  }

  await connectDB();
  
  const links = await SocialLink.find().sort({ displayOrder: 1 });
  
  const formattedLinks = links.map((l) => ({
    id: l._id.toString(),
    platform: l.platform,
    url: l.url,
    isActive: l.isActive,
    displayOrder: l.displayOrder,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Social Links</h1>
          <p className="text-sm text-slate-400">Manage your online presence</p>
        </div>
        <Link
          href="/pranaypatel18/social-links/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors shadow-[0_0_15px_rgba(147,51,234,0.2)]"
        >
          <Plus className="w-4 h-4" />
          Add Link
        </Link>
      </div>

      <DataTable
        columns={socialLinkColumns}
        data={formattedLinks}
        searchKey="platform"
      />
    </div>
  );
}
