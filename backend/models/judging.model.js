import mongoose from "mongoose";

const judgingSchema = new mongoose.Schema(
  {
    judgeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubmittedProject",
      required: true,
    },
    criteria: {
      innovation: { type: Number, min: 0, max: 10, required: true },
      technicalImplementation: {
        type: Number,
        min: 0,
        max: 10,
        required: true,
      },
      design: { type: Number, min: 0, max: 10, required: true },
      impact: { type: Number, min: 0, max: 10, required: true },
      presentation: { type: Number, min: 0, max: 10, required: true },
    },
    totalScore: { type: Number, required: true },
  },
  { timestamps: true }
);

const Judging = mongoose.model("judging", judgingSchema);

export default Judging;
