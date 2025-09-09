import mongoose from "mongoose";

const projectRequestedSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "SubmittedProject" },
    hackathonId: { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

const projectRequest = mongoose.model("projectRequest", projectRequestedSchema);
export default projectRequest;
