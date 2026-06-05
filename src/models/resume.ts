import mongoose, { Schema, Document } from "mongoose";

export interface IResume extends Document {
  fileName: string;
  fileData: string;
  updatedAt: Date;
}

const ResumeSchema = new Schema(
  {
    fileName: { type: String, required: true },
    fileData: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Resume =
  mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);
