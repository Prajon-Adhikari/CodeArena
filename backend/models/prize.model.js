import mongoose from "mongoose";

const prizeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    winnersCount: { type: Number, default: 1, required: true },
    prizeValue: { type: Number, required: true },
  },
  { timestamps: true }
);

const Prize = mongoose.model("Prize", prizeSchema);

export default Prize;
