import mongoose from "mongoose";

const HackathonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    organizerName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    registrationDeadline: { type: Date },
    mode: { type: String },
    rules: { type: mongoose.Schema.Types.ObjectId, ref: "Rules" },
    prizes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prize" }],
    judges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Judge" }],
  },
  { timestamps: true }
);

export default mongoose.model("Hackathon", HackathonSchema);
