import mongoose from "mongoose";

const savedRecommendationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    preferences: Object,
    products: [Object]
  },
  { timestamps: true }
);

export default mongoose.model("SavedRecommendation", savedRecommendationSchema);
