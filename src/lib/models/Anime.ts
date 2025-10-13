import mongoose, { Document, Schema } from "mongoose";

export interface IAnime extends Document {
  _id: string;
  title: string;
  description: string;
  image: string;
  genres: string[];
  status: "ongoing" | "completed" | "upcoming";
  rating: number;
  year: number;
  episodes: number;
  duration: number; // in minutes
  studio: string;
  source: string; // manga, light novel, original, etc.
  streamingSources: {
    name: string;
    url: string;
    quality: string[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const AnimeSchema = new Schema<IAnime>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    genres: [
      {
        type: String,
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["ongoing", "completed", "upcoming"],
      default: "ongoing",
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1900, "Year must be after 1900"],
      max: [
        new Date().getFullYear() + 5,
        "Year cannot be more than 5 years in the future",
      ],
    },
    episodes: {
      type: Number,
      required: [true, "Episodes count is required"],
      min: [1, "Episodes must be at least 1"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 minute"],
    },
    studio: {
      type: String,
      required: [true, "Studio is required"],
      trim: true,
    },
    source: {
      type: String,
      required: [true, "Source is required"],
      enum: ["manga", "light novel", "original", "web novel", "game", "other"],
    },
    streamingSources: [
      {
        name: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        quality: [String],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create indexes for better performance
AnimeSchema.index({ title: "text", description: "text" });
AnimeSchema.index({ genres: 1 });
AnimeSchema.index({ status: 1 });
AnimeSchema.index({ year: -1 });
AnimeSchema.index({ rating: -1 });
AnimeSchema.index({ createdAt: -1 });

export default mongoose.models.Anime ||
  mongoose.model<IAnime>("Anime", AnimeSchema);
