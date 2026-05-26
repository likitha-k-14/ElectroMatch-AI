import mongoose from "mongoose";

export async function connectDb(uri) {
  if (!uri) return false;
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.warn("MongoDB unavailable, using in-memory product data.");
    return false;
  }
}
