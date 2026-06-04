import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import "@/app/globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
  title: "Admin Panel | Portfolio CMS",
  description: "Admin dashboard for managing portfolio content",
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="antialiased h-screen overflow-hidden">
        <SessionProvider session={session}>
          <Providers>
            <AdminShell>{children}</AdminShell>
            <Toaster />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
