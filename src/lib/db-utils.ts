import { connectToDatabase } from "./mongodb";
import User, { IUser } from "./models/User";
import Anime from "./models/Anime";
import Episode from "./models/Episode";
import mongoose from "mongoose";

// Connect to MongoDB
export async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// User operations
export const userOperations = {
  async createUser(userData: {
    name: string;
    email: string;
    password: string;
  }) {
    await connectDB();
    const user = new User(userData);
    return await user.save();
  },

  async findUserByEmail(email: string) {
    await connectDB();
    return await User.findOne({ email }).select("+password");
  },

  async findUserById(id: string) {
    await connectDB();
    return await User.findById(id);
  },

  async updateUser(id: string, updateData: Partial<IUser>) {
    await connectDB();
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  },

  async addToWatchlist(userId: string, animeId: string) {
    await connectDB();
    return await User.findByIdAndUpdate(
      userId,
      { $addToSet: { watchlist: animeId } },
      { new: true }
    );
  },

  async removeFromWatchlist(userId: string, animeId: string) {
    await connectDB();
    return await User.findByIdAndUpdate(
      userId,
      { $pull: { watchlist: animeId } },
      { new: true }
    );
  },

  async getUserWatchlist(userId: string) {
    await connectDB();
    const user = await User.findById(userId).populate("watchlist");
    return user?.watchlist || [];
  },
};

// Anime operations
export const animeOperations = {
  async createAnime(animeData: any) {
    await connectDB();
    const anime = new Anime(animeData);
    return await anime.save();
  },

  async findAnimeById(id: string) {
    await connectDB();
    return await Anime.findById(id);
  },

  async findAnimesByGenre(genre: string, limit = 20, skip = 0) {
    await connectDB();
    return await Anime.find({ genres: genre })
      .sort({ rating: -1, createdAt: -1 })
      .limit(limit)
      .skip(skip);
  },

  async searchAnimes(query: string, limit = 20, skip = 0) {
    await connectDB();
    return await Anime.find({
      $text: { $search: query },
    })
      .sort({ score: { $meta: "textScore" }, rating: -1 })
      .limit(limit)
      .skip(skip);
  },

  async getPopularAnimes(limit = 20, skip = 0) {
    await connectDB();
    return await Anime.find({ status: "completed" })
      .sort({ rating: -1, year: -1 })
      .limit(limit)
      .skip(skip);
  },

  async getRecentAnimes(limit = 20, skip = 0) {
    await connectDB();
    return await Anime.find().sort({ createdAt: -1 }).limit(limit).skip(skip);
  },

  async getOngoingAnimes(limit = 20, skip = 0) {
    await connectDB();
    return await Anime.find({ status: "ongoing" })
      .sort({ rating: -1 })
      .limit(limit)
      .skip(skip);
  },

  async updateAnime(id: string, updateData: any) {
    await connectDB();
    return await Anime.findByIdAndUpdate(id, updateData, { new: true });
  },

  async deleteAnime(id: string) {
    await connectDB();
    return await Anime.findByIdAndDelete(id);
  },
};

// Episode operations
export const episodeOperations = {
  async createEpisode(episodeData: any) {
    await connectDB();
    const episode = new Episode(episodeData);
    return await episode.save();
  },

  async findEpisodeById(id: string) {
    await connectDB();
    return await Episode.findById(id);
  },

  async findEpisodesByAnimeId(animeId: string, limit = 50, skip = 0) {
    await connectDB();
    return await Episode.find({ animeId })
      .sort({ episodeNumber: 1 })
      .limit(limit)
      .skip(skip);
  },

  async findEpisodeByAnimeAndNumber(animeId: string, episodeNumber: number) {
    await connectDB();
    return await Episode.findOne({ animeId, episodeNumber });
  },

  async updateEpisode(id: string, updateData: any) {
    await connectDB();
    return await Episode.findByIdAndUpdate(id, updateData, { new: true });
  },

  async deleteEpisode(id: string) {
    await connectDB();
    return await Episode.findByIdAndDelete(id);
  },
};

// Utility functions
export const utils = {
  async getAnimeWithEpisodes(animeId: string) {
    await connectDB();
    const anime = await Anime.findById(animeId);
    const episodes = await Episode.find({ animeId }).sort({ episodeNumber: 1 });
    return { anime, episodes };
  },

  async getAnimeStats() {
    await connectDB();
    const totalAnimes = await Anime.countDocuments();
    const totalEpisodes = await Episode.countDocuments();
    const ongoingAnimes = await Anime.countDocuments({ status: "ongoing" });
    const completedAnimes = await Anime.countDocuments({ status: "completed" });

    return {
      totalAnimes,
      totalEpisodes,
      ongoingAnimes,
      completedAnimes,
    };
  },
};
