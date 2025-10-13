import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  watchlist: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    avatar: {
      type: String,
      default: "",
    },
    watchlist: [
      {
        type: String, // anime IDs
        ref: "Anime",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create indexes for better performance
UserSchema.index({ email: 1 });
UserSchema.index({ createdAt: -1 });

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
