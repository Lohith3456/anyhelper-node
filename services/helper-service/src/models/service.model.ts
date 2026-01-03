import mongoose, { Schema, Document } from 'mongoose';

export interface ServiceDoc extends Document {
  name: string;
  slug: string;
  description?: string;
  category?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<ServiceDoc>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    category: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ServiceModel =
  (mongoose.models.Service as mongoose.Model<ServiceDoc>) ||
  mongoose.model<ServiceDoc>('Service', ServiceSchema);
