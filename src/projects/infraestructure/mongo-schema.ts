import mongoose, { Document } from "mongoose";
import { ProjectDto } from "../domain/project-dto";

export interface MongoProject extends ProjectDto, Document {}

const ProjectSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
      default: ["default image"],
    },
    video: {
      type: String,
      required: false,
      default: "default video",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<MongoProject>("project", ProjectSchema);
