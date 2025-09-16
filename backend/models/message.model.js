import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true, // The text message
    },
    read: {
      type: Boolean,
      default: false, // Whether the receiver has seen it
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Message = mongoose.model("message", messageSchema)

export default Message;
