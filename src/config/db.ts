import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI as string;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
