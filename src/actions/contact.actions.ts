"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import { ContactMessage } from "@/models/contact-message";
import { auth } from "@/lib/auth";

export async function submitContactMessage(data: { name: string; email: string; subject: string; message: string }) {
  try {
    if (!data.name || !data.email || !data.subject || !data.message) {
      throw new Error("All fields are required");
    }

    await connectDB();
    const newMessage = await ContactMessage.create({
      ...data,
      read: false
    });

    revalidatePath("/pranaypatel18/dashboard");
    
    return { success: true, data: JSON.parse(JSON.stringify(newMessage)) };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to submit message" };
  }
}

export async function deleteContactMessage(id: string) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    await connectDB();
    await ContactMessage.findByIdAndDelete(id);

    revalidatePath("/pranaypatel18/dashboard");
    revalidatePath("/pranaypatel18/messages");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete message" };
  }
}

export async function getRecentUnreadMessages() {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    await connectDB();
    const messages = await ContactMessage.find({ read: { $ne: true } })
      .sort({ createdAt: -1 })
      .limit(5);

    return {
      success: true,
      data: messages.map((m) => ({
        id: m._id.toString(),
        name: m.name,
        email: m.email,
        subject: m.subject,
        message: m.message,
        read: m.read,
        createdAt: m.createdAt.toISOString(),
      })),
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch notifications" };
  }
}

export async function getUnreadMessagesCount() {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    await connectDB();
    const count = await ContactMessage.countDocuments({ read: { $ne: true } });
    return { success: true, count };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to count unread messages" };
  }
}

export async function markMessageAsRead(id: string) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    await connectDB();
    await ContactMessage.findByIdAndUpdate(id, { $set: { read: true } });

    revalidatePath("/pranaypatel18/dashboard");
    revalidatePath("/pranaypatel18/messages");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to mark message as read" };
  }
}

export async function markAllMessagesAsRead() {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    await connectDB();
    await ContactMessage.updateMany({ read: { $ne: true } }, { $set: { read: true } });

    revalidatePath("/pranaypatel18/dashboard");
    revalidatePath("/pranaypatel18/messages");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to mark all messages as read" };
  }
}

export async function getAllContactMessages() {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    await connectDB();
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    return {
      success: true,
      data: messages.map((m) => ({
        id: m._id.toString(),
        name: m.name,
        email: m.email,
        subject: m.subject,
        message: m.message,
        read: m.read,
        createdAt: m.createdAt.toISOString(),
      })),
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch all messages" };
  }
}
