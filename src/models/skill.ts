import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "DevOps" | "Tools";
  level: number;
  icon?: string;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "Database", "DevOps", "Tools", "AI/ML"],
      required: true,
    },
    level: { type: Number, required: true, min: 1, max: 100 },
    icon: { type: String }, // e.g., name of Lucide icon or simple-icons class
    isFeatured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

SkillSchema.index({ category: 1, displayOrder: 1 });

export const Skill =
  mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);
