import Notification from "../models/notifications.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id; // logged-in user

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 }) // newest first
      .lean();

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};
