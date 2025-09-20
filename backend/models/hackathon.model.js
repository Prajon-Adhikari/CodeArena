import mongoose from "mongoose";

const HackathonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    organizerName: { type: String, required: true },
    organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    contactEmail: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    registrationStart: {type: Date, required: true},
    registrationDeadline: { type: Date, required: true },
    themes: { type: [String], required: true },
    mode: { type: String, required: true },
    bannerUrl: {type: String, required: false},
    rules: { type: mongoose.Schema.Types.ObjectId, ref: "Rules" },
    prizes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prize" }],
    judges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Judge" }],
  },
  { timestamps: true }
);

export default mongoose.model("Hackathon", HackathonSchema);
