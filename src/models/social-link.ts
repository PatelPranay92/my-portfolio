import mongoose, { Schema, Document } from "mongoose";

export interface ISocialLink extends Document {
  platform: string;
  icon?: string;
  url: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const SocialLinkSchema = new Schema(
  {
    platform: { type: String, required: true },
    icon: { type: String }, // optional string representing the icon name
    url: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

SocialLinkSchema.index({ displayOrder: 1 });

export const SocialLink =
  mongoose.models.SocialLink ||
  mongoose.model<ISocialLink>("SocialLink", SocialLinkSchema);
