import mongoose from "mongoose";

const submittedProjectSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    tech: {
      type: [String],
      required: true,
    },
    // Video Field: Support multiple video uploads
    videos: [
      {
        url: { type: String, required: true }, // Cloud URL
        public_id: { type: String, required: true }, // For deletion
        format: { type: String }, // e.g., mp4, webm
        duration: { type: Number }, // in seconds
        thumbnail: { type: String }, // optional preview
      },
    ],

    // Tags field for categorization or filtering
    tags: {
      type: [String], // e.g., ["AI", "HealthTech"]
      default: [],
    },

    // Optional: Reference to the user who submitted
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const submittedProject = mongoose.model("sumittedProject", submittedProjectSchema);

export default submittedProject;
