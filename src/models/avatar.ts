import mongoose, { Schema, Document } from "mongoose";

export interface IAvatar extends Document {
  fileName: string;
  fileData: string;
  contentType: string;
  updatedAt: Date;
}

const AvatarSchema = new Schema(
  {
    fileName: { type: String, required: true },
    fileData: { type: String, required: true },
    contentType: { type: String, required: true, default: "image/png" },
  },
  {
    timestamps: true,
  }
);

export const Avatar =
  mongoose.models.Avatar || mongoose.model<IAvatar>("Avatar", AvatarSchema);
