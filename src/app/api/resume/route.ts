import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import { Resume } from "@/models/resume";

export async function GET() {
  try {
    await connectDB();
    const resume = await Resume.findOne().select("fileName updatedAt").lean();
    return NextResponse.json({ success: true, data: resume });
  } catch (error: any) {
    console.error("Error fetching resume metadata:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch resume metadata" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { fileName, fileData } = await req.json();

    if (!fileName || !fileData) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if resume already exists, update if yes, else create new
    let resume = await Resume.findOne();
    if (resume) {
      resume.fileName = fileName;
      resume.fileData = fileData;
      await resume.save();
    } else {
      resume = await Resume.create({ fileName, fileData });
    }

    return NextResponse.json({ success: true, data: { fileName: resume.fileName } });
  } catch (error: any) {
    console.error("Error uploading resume:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload resume" },
      { status: 500 }
    );
  }
}
