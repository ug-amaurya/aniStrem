import mongoose, { Document, Schema } from "mongoose";

export interface IEpisode extends Document {
  _id: string;
  animeId: string;
  episodeNumber: number;
  title: string;
  description?: string;
  duration: number; // in minutes
  thumbnail?: string;
  streamingSources: {
    name: string;
    url: string;
    quality: string;
    subtitles?: {
      language: string;
      url: string;
    }[];
  }[];
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const EpisodeSchema = new Schema<IEpisode>(
  {
    animeId: {
      type: String,
      required: [true, "Anime ID is required"],
      ref: "Anime",
    },
    episodeNumber: {
      type: Number,
      required: [true, "Episode number is required"],
      min: [1, "Episode number must be at least 1"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 minute"],
    },
    thumbnail: {
      type: String,
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
        quality: {
          type: String,
          required: true,
          enum: ["360p", "480p", "720p", "1080p", "4K"],
        },
        subtitles: [
          {
            language: {
              type: String,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
    releaseDate: {
      type: Date,
      required: [true, "Release date is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better performance
EpisodeSchema.index({ animeId: 1, episodeNumber: 1 });
EpisodeSchema.index({ animeId: 1 });
EpisodeSchema.index({ releaseDate: -1 });

// Ensure unique episode number per anime
EpisodeSchema.index({ animeId: 1, episodeNumber: 1 }, { unique: true });

export default mongoose.models.Episode ||
  mongoose.model<IEpisode>("Episode", EpisodeSchema);
