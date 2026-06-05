import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import { ContactMessage } from "@/models/contact-message";
import { MessagesList } from "./messages-list";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function MessagesPage() {
  const session = await auth();
  if (!session) {
    redirect("/pranaypatel18/login?callbackUrl=/pranaypatel18/messages");
  }

  await connectDB();
  const messages = await ContactMessage.find().sort({ createdAt: -1 });

  // Mark all unread messages as read in the database
  const hasUnread = messages.some((m) => !m.read);
  if (hasUnread) {
    await ContactMessage.updateMany({ read: { $ne: true } }, { $set: { read: true } });
  }

  const formattedMessages = messages.map((m) => ({
    id: m._id.toString(),
    name: m.name,
    email: m.email,
    subject: m.subject,
    message: m.message,
    read: m.read,
    createdAt: m.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Contact Messages</h1>
        <p className="text-sm text-slate-400">View and manage inquiries from visitors</p>
      </div>

      <MessagesList initialMessages={formattedMessages} />
    </div>
  );
}
