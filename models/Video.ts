import mongoose, { Schema } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbNailUrl: string;
  controls?: boolean;
  transformation?: {
    height: number;
    width: number;
    quallity?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const videoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbNailUrl: {
      type: String,
      required: true,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    transformation: {
      height: {
        type: Number,
        default: VIDEO_DIMENSIONS,
      },
      width: {
        type: Number,
        default: VIDEO_DIMENSIONS,
      },
      quality: {
        type: Number,
        min: 1,
        max: 100,
        default: VIDEO_DIMENSIONS,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Video =
  mongoose.models?.Video || mongoose.model<IVideo>("Video", videoSchema);

export default Video;
