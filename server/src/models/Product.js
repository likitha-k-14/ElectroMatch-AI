import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true, index: true },
    brand: String,
    os: String,
    price: Number,
    image: String,
    rating: Number,
    sentiment: { positive: Number, neutral: Number, negative: Number },
    tags: [String],
    specs: {
      ram: String,
      storage: String,
      processor: String,
      battery: String,
      display: String,
      weight: String,
      camera: String,
      gpu: String,
      performanceScore: Number
    },
    scores: {
      battery: Number,
      performance: Number,
      camera: Number,
      portability: Number,
      gaming: Number,
      value: Number
    },
    priceTrend: [Number],
    pros: [String],
    cons: [String]
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
