import FriendRequest from "../models/friendRequest.model.js";
import Notification from "../models/notifications.model.js";
import Friend from "../models/friend.model.js";
import User from "../models/user.model.js";

export const sentFriendRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: receiverid } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User Id not found" });
    }

    if (!receiverid) {
      return res.status(400).json({ message: "Receiver Id not found" });
    }

    const alreadyRequested = await FriendRequest.find({
      sender: userId,
      reciever: receiverid,
    });

    if (alreadyRequested.length > 0) {
      return res.status(400).json({ message: " Request already sent" });
    }

    const newFriendRequest = new FriendRequest({
      sender: userId,
      reciever: receiverid,
    });

    await newFriendRequest.save();

    const senderUser = await User.findById(userId);
    const senderName = senderUser?.fullName || "Someone";

    await Notification.create({
      user: receiverid,
      type: "friend_request",
      data: { senderId: userId, message: `${senderName} sent you a friend request` },
    });

    res.status(200).json({ message: "Friend Request sent" });
  } catch (error) {
    console.log("Internal error while sending friend request");
    return res
      .status(500)
      .json({ message: "Internal error while sending friend request" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { id } = req.params; 
    const userId = req.user._id;

    const notif = await Notification.findById(id);
    if (!notif) return res.status(404).json({ message: "Notification not found" });

    const { senderId } = notif.data;

    await Notification.findByIdAndDelete(id);

    // remove friend request
    await FriendRequest.findOneAndDelete({ sender: senderId, receiver: userId });

    // add to friend schema
    await Friend.create({ user1: userId, user2: senderId });

    return res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Reject Friend Request
export const rejectFriendRequest = async (req, res) => {
  try {
    const { id } = req.params; // notificationId
    const userId = req.user._id;

    const notif = await Notification.findById(id);
    if (!notif) return res.status(404).json({ message: "Notification not found" });

    const { senderId } = notif.data;

    // remove notification
    await Notification.findByIdAndDelete(id);

    // remove friend request
    await FriendRequest.findOneAndDelete({ sender: senderId, receiver: userId });

    return res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    console.error("Error rejecting friend request:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
