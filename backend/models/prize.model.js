import mongoose from "mongoose";

const prizeSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    winnersCount: { type: Number, default: 1 },
    prizeValue: { type: String },
  },
  { timestamps: true }
);

const Prize = mongoose.model("Prize", prizeSchema);

export default Prize;
