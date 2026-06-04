"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import { Project } from "@/models/project";
import { projectSchema, ProjectFormValues } from "@/validations/schema";
import { auth } from "@/lib/auth";

export async function createProject(data: ProjectFormValues) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const validatedData = projectSchema.parse(data);
    
    if (!validatedData.slug) {
      validatedData.slug = validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }
    
    validatedData.shortDescription = validatedData.shortDescription || "";
    validatedData.fullDescription = validatedData.fullDescription || "";
    validatedData.category = validatedData.category || "";
    
    await connectDB();
    const newProject = await Project.create(validatedData);
    
    revalidatePath("/pranaypatel18/projects");
    revalidatePath("/");
    
    return { success: true, data: JSON.parse(JSON.stringify(newProject)) };
  } catch (error: any) {
    console.error("Create project error:", error);
    return { success: false, error: error.message || "Failed to create project" };
  }
}

export async function updateProject(id: string, data: ProjectFormValues) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const validatedData = projectSchema.parse(data);
    
    if (!validatedData.slug) {
      validatedData.slug = validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }
    
    validatedData.shortDescription = validatedData.shortDescription || "";
    validatedData.fullDescription = validatedData.fullDescription || "";
    validatedData.category = validatedData.category || "";
    
    await connectDB();
    const updatedProject = await Project.findByIdAndUpdate(id, validatedData, { new: true });
    
    if (!updatedProject) throw new Error("Project not found");

    revalidatePath("/pranaypatel18/projects");
    revalidatePath("/");
    
    return { success: true, data: JSON.parse(JSON.stringify(updatedProject)) };
  } catch (error: any) {
    console.error("Update project error:", error);
    return { success: false, error: error.message || "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");
    
    await connectDB();
    await Project.findByIdAndDelete(id);
    
    revalidatePath("/pranaypatel18/projects");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete project" };
  }
}

export async function toggleProjectFeatured(id: string, isFeatured: boolean) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");
    
    await connectDB();
    await Project.findByIdAndUpdate(id, { isFeatured });
    
    revalidatePath("/pranaypatel18/projects");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to toggle status" };
  }
}

export async function reorderProjects(items: { id: string; displayOrder: number }[]) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    await connectDB();
    
    // Bulk write for performance
    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { displayOrder: item.displayOrder }
      }
    }));
    
    await Project.bulkWrite(bulkOps);
    
    revalidatePath("/pranaypatel18/projects");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: "Failed to reorder projects" };
  }
}
