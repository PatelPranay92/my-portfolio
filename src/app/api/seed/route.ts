import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import { Admin } from "@/models/admin";

export async function GET() {
  try {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "Admin credentials not configured in environment variables." },
        { status: 500 }
      );
    }

    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (existingAdmin) {
      return NextResponse.json(
        { message: "Admin user already exists." },
        { status: 200 }
      );
    }

    const passwordHash = await bcrypt.hash(adminPassword, 10);

    const newAdmin = new Admin({
      name: "Portfolio Admin",
      email: adminEmail,
      passwordHash,
    });

    await newAdmin.save();

    return NextResponse.json(
      { message: "Admin user created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed admin user." },
      { status: 500 }
    );
  }
}
