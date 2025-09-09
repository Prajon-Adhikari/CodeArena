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

    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    userName: {
      type: "String",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    hackathonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
    },

    githubLink: {
      type: String,
      required: true,
    },

    projectLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SubmittedProject = mongoose.model(
  "sumittedProject",
  submittedProjectSchema
);

export default SubmittedProject;
