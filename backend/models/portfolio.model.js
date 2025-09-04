import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
    projectTitle:{
        type: String,
        required: true,
    },
    projectDescription:{
        type: String,
        required: true,
    },
    skills:{
        type: [String],
        required: true,
    },
    projectLink:{
      type: String,
    },
     videos: [
      {
        url: { type: String, required: true }, // Cloud URL
        public_id: { type: String, required: true }, // For deletion
        format: { type: String }, // e.g., mp4, webm
        duration: { type: Number }, // in seconds
        thumbnail: { type: String }, // optional preview
      },
    ],
    images: [
      // 👈 new field for images
      {
        url: { type: String },
        public_id: { type: String },
      },
    ],
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {timestamps: true});

const Portfolio = mongoose.model("portfolio", portfolioSchema);

export default Portfolio;