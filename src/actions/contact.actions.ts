"use server";

import connectDB from "@/lib/mongodb";
import { ContactMessage } from "@/models/contact-message";

export async function submitContactMessage(data: { name: string; email: string; subject: string; message: string }) {
  try {
    if (!data.name || !data.email || !data.subject || !data.message) {
      throw new Error("All fields are required");
    }

    await connectDB();
    await ContactMessage.create(data);
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to submit message" };
  }
}
