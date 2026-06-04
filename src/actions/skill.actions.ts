"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import { Skill } from "@/models/skill";
import { skillSchema, SkillFormValues } from "@/validations/schema";
import { auth } from "@/lib/auth";

export async function createSkill(data: SkillFormValues) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const validatedData = skillSchema.parse(data);
    
    await connectDB();
    const newSkill = await Skill.create(validatedData);
    
    revalidatePath("/pranaypatel18/skills");
    revalidatePath("/");
    
    return { success: true, data: JSON.parse(JSON.stringify(newSkill)) };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create skill" };
  }
}

export async function updateSkill(id: string, data: SkillFormValues) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const validatedData = skillSchema.parse(data);
    
    await connectDB();
    const updatedSkill = await Skill.findByIdAndUpdate(id, validatedData, { new: true });
    
    if (!updatedSkill) throw new Error("Skill not found");

    revalidatePath("/pranaypatel18/skills");
    revalidatePath("/");
    
    return { success: true, data: JSON.parse(JSON.stringify(updatedSkill)) };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update skill" };
  }
}

export async function deleteSkill(id: string) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");
    
    await connectDB();
    await Skill.findByIdAndDelete(id);
    
    revalidatePath("/pranaypatel18/skills");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete skill" };
  }
}

export async function reorderSkills(items: { id: string; displayOrder: number }[]) {
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
    
    await Skill.bulkWrite(bulkOps);
    
    revalidatePath("/pranaypatel18/skills");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: "Failed to reorder skills" };
  }
}
