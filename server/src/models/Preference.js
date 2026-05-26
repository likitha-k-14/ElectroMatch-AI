import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: String,
    budget: Number,
    purpose: String,
    battery: String,
    performance: String,
    camera: String,
    portability: String,
    brand: String,
    os: String
  },
  { timestamps: true }
);

export default mongoose.model("Preference", preferenceSchema);
