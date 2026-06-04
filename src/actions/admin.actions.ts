"use server";

import { auth } from "@/lib/auth";
import { Admin } from "@/models/admin";
import connectDB from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function updateAdminCredentials(currentPassword: string, newPassword: string) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "Not authenticated" };
    }

    await connectDB();
    const admin = await Admin.findOne({ email: session.user.email });
    
    if (!admin) {
      return { success: false, error: "Admin not found" };
    }

    const isValid = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isValid) {
      return { success: false, error: "Current password is incorrect" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    admin.passwordHash = hashedPassword;
    await admin.save();

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
