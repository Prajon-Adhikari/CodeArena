import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who will see notification
    type: { type: String, enum: ["friend_request", "project_invite"], required: true },
    data: { type: mongoose.Schema.Types.Mixed }, // e.g., { senderId, message }
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
