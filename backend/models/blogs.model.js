import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Hackathon planning", "Participant resources", "Business impact"],
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    description:{
      type: String,
      required: true,
    },
    images: [
      // 👈 new field for images
      {
        url: { type: String },
        public_id: { type: String },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogSchema);

export default Blog;
