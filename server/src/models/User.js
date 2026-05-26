import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, sparse: true },
    passwordHash: String,
    wishlist: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
