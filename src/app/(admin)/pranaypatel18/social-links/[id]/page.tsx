import { SocialLinkForm } from "@/components/admin/social-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import { SocialLink } from "@/models/social-link";
import { notFound } from "next/navigation";

export default async function EditSocialLinkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();
  const link = await SocialLink.findById(id);

  if (!link) {
    notFound();
  }

  const linkData = JSON.parse(JSON.stringify(link));

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/pranaypatel18/social-links"
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Edit Social Link</h1>
          <p className="text-sm text-slate-400">Update social link details</p>
        </div>
      </div>

      <SocialLinkForm initialData={linkData} />
    </div>
  );
}
