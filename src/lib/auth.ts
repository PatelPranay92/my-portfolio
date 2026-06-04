import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "./mongodb";
import { Admin } from "@/models/admin";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectDB();
          let admin = await Admin.findOne({ email: credentials.email });

          // Auto-seed: If admin doesn't exist, check against environment variables
          if (!admin) {
            const envEmail = process.env.ADMIN_EMAIL || "admin@pranaypatel.dev";
            const envPassword = process.env.ADMIN_PASSWORD || "Pranay@92";

            if (credentials.email === envEmail && credentials.password === envPassword) {
              const passwordHash = await bcrypt.hash(envPassword, 10);
              admin = await Admin.create({
                name: "Admin",
                email: envEmail,
                passwordHash,
              });
            } else {
              return null; // Invalid credentials and no admin found
            }
          }

          const passwordsMatch = await bcrypt.compare(
            credentials.password as string,
            admin.passwordHash
          );

          if (passwordsMatch) {
            return {
              id: admin._id.toString(),
              email: admin.email,
              name: admin.name,
            };
          }

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
});
