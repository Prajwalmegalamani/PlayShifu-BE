import mongoose from "mongoose";
import config from "./config";

// Connect to MongoDB
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
