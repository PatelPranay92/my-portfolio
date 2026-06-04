import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  technologies: string[];
  category: string;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, default: "" },
    fullDescription: { type: String, default: "" },
    imageUrl: { type: String },
    githubUrl: { type: String },
    liveDemoUrl: { type: String },
    technologies: [{ type: String }],
    category: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Add indexes for efficient querying
ProjectSchema.index({ displayOrder: 1 });
ProjectSchema.index({ isFeatured: -1 });

export const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
