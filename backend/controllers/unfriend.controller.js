import Friend from "../models/friend.model.js";

export const unfriendUser = async (req, res) => {
  try {
    const { id: friendId } = req.params; // the user you want to unfriend
    const userId = req.user._id; // logged in user

    if (!friendId) {
      return res.status(400).json({ message: "Friend Id not found" });
    }

    // Delete friendship both ways (user1-user2 OR user2-user1)
    const deleted = await Friend.findOneAndDelete({
      $or: [
        { user1: userId, user2: friendId },
        { user1: friendId, user2: userId },
      ],
    });

    if (!deleted) {
      return res.status(404).json({ message: "Friendship not found" });
    }

    return res.status(200).json({ message: "Unfriended successfully" });
  } catch (error) {
    console.error("Error while unfriending:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
