import dotenv from "dotenv";
import mongoose from "mongoose";
import { products } from "./data/products.js";
import Product from "./models/Product.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/electromatch_ai");
await Product.deleteMany({});
await Product.insertMany(products);
console.log(`Seeded ${products.length} products`);
await mongoose.disconnect();
