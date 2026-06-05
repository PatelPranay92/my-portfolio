import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import { Avatar } from "@/models/avatar";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const isInfoRequest = searchParams.get("info") === "true";

    const avatar = await Avatar.findOne().lean();

    if (!avatar) {
      if (isInfoRequest) {
        return NextResponse.json({ success: true, data: null });
      }
      return NextResponse.json({ error: "Avatar not found" }, { status: 404 });
    }

    if (isInfoRequest) {
      return NextResponse.json({
        success: true,
        data: {
          fileName: avatar.fileName,
          contentType: avatar.contentType,
          updatedAt: avatar.updatedAt,
        },
      });
    }

    // Serving binary image data directly
    const base64Data = avatar.fileData.split(",")[1] || avatar.fileData;
    if (!base64Data) {
      return NextResponse.json({ error: "Invalid avatar data" }, { status: 500 });
    }

    const buffer = Buffer.from(base64Data, "base64");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": avatar.contentType || "image/png",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error: any) {
    console.error("Error handling avatar GET:", error);
    return NextResponse.json({ error: "Failed to load avatar" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { fileName, fileData, contentType } = await req.json();

    if (!fileName || !fileData) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    let avatar = await Avatar.findOne();
    if (avatar) {
      avatar.fileName = fileName;
      avatar.fileData = fileData;
      avatar.contentType = contentType || "image/png";
      await avatar.save();
    } else {
      avatar = await Avatar.create({
        fileName,
        fileData,
        contentType: contentType || "image/png",
      });
    }

    return NextResponse.json({ success: true, data: { fileName: avatar.fileName } });
  } catch (error: any) {
    console.error("Error uploading avatar:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload avatar" },
      { status: 500 }
    );
  }
}
