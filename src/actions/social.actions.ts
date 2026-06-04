"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import { SocialLink } from "@/models/social-link";
import { socialLinkSchema, SocialLinkFormValues } from "@/validations/schema";
import { auth } from "@/lib/auth";

export async function createSocialLink(data: SocialLinkFormValues) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const validatedData = socialLinkSchema.parse(data);
    
    await connectDB();
    const newLink = await SocialLink.create(validatedData);
    
    revalidatePath("/pranaypatel18/social-links");
    revalidatePath("/");
    
    return { success: true, data: JSON.parse(JSON.stringify(newLink)) };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create social link" };
  }
}

export async function updateSocialLink(id: string, data: SocialLinkFormValues) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const validatedData = socialLinkSchema.parse(data);
    
    await connectDB();
    const updatedLink = await SocialLink.findByIdAndUpdate(id, validatedData, { new: true });
    
    if (!updatedLink) throw new Error("Social link not found");

    revalidatePath("/pranaypatel18/social-links");
    revalidatePath("/");
    
    return { success: true, data: JSON.parse(JSON.stringify(updatedLink)) };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update social link" };
  }
}

export async function deleteSocialLink(id: string) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");
    
    await connectDB();
    await SocialLink.findByIdAndDelete(id);
    
    revalidatePath("/pranaypatel18/social-links");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete social link" };
  }
}

export async function toggleSocialLinkStatus(id: string, isActive: boolean) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");
    
    await connectDB();
    await SocialLink.findByIdAndUpdate(id, { isActive });
    
    revalidatePath("/pranaypatel18/social-links");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to toggle status" };
  }
}

export async function reorderSocialLinks(items: { id: string; displayOrder: number }[]) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    await connectDB();
    
    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { displayOrder: item.displayOrder }
      }
    }));
    
    await SocialLink.bulkWrite(bulkOps);
    
    revalidatePath("/pranaypatel18/social-links");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: "Failed to reorder social links" };
  }
}
