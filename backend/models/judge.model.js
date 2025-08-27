import mongoose from "mongoose";

const JudgeSchema = new mongoose.Schema(
  {
    name: { type: String },
    role: { type: String },
    bio: { type: String },
    photoUrl: { type: String }, // store uploaded photo URL
  },
  { timestamps: true }
);

const Judge = mongoose.model("Judge", JudgeSchema);

export default Judge;
