import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Resume } from "@/models/resume";

export async function GET() {
  try {
    await connectDB();
    const resume = await Resume.findOne().lean();

    if (!resume || !resume.fileData) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    // The fileData is stored as a data URL: "data:application/pdf;base64,JVBERi0xLjQK..."
    // We need to extract the base64 part.
    const base64Data = resume.fileData.split(",")[1];
    
    if (!base64Data) {
      return NextResponse.json({ error: "Invalid resume data" }, { status: 500 });
    }

    const pdfBuffer = Buffer.from(base64Data, "base64");

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${resume.fileName || "resume.pdf"}"`,
      },
    });
  } catch (error: any) {
    console.error("Error downloading resume:", error);
    return NextResponse.json({ error: "Failed to download resume" }, { status: 500 });
  }
}
