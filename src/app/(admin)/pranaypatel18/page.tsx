import { auth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock, ShieldCheck } from "lucide-react";

export default async function AdminRootPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh] space-y-6 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-2">
          <Lock className="w-8 h-8 text-rose-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Authentication Required</h1>
        <p className="text-slate-400 max-w-md mx-auto">
          You are trying to access a protected area. Please log in to continue to the admin dashboard.
        </p>
        <Link href="/pranaypatel18/login">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white mt-4 shadow-lg shadow-emerald-500/20">
            Go to Login Page
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] space-y-6 text-center px-4">
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
        <ShieldCheck className="w-8 h-8 text-emerald-500" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Welcome, {session.user.name || "Admin"}!</h1>
      <p className="text-slate-400 max-w-md mx-auto">
        You are successfully authenticated and have access to the admin area.
      </p>
      <Link href="/pranaypatel18/dashboard">
        <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white mt-4 shadow-lg shadow-emerald-500/20">
          Enter Dashboard
        </Button>
      </Link>
    </div>
  );
}
