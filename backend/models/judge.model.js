import mongoose from "mongoose";

const JudgeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    photoUrl: { type: String }, // store uploaded photo URL
  },
  { timestamps: true }
);

const Judge = mongoose.model("Judge", JudgeSchema);

export default Judge;
