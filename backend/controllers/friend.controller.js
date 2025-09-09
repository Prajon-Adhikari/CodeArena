import Friend from "../models/friend.model.js";
import User from "../models/user.model.js";

export const fetchFriends = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User Id not found" });
    }

    const friends = await Friend.find({
      $or: [{ user1: userId }, { user2: userId }],
    });

    const friendIds = friends.map((f) =>
      f.user1.toString() === userId.toString() ? f.user2 : f.user1
    );

    // Fetch full user info
    const friendUsers = await User.find({ _id: { $in: friendIds } }).select(
      "fullName email"
    );

    // Format for react-select
    const formatted = friendUsers.map((friend) => ({
      value: friend._id,
      label: friend.fullName,
    }));

    return res
      .status(200)
      .json({ message: "Fetching friends", friends: formatted });

  } catch (error) {
    console.log("Internal error while fetching friends", error);
    return res
      .status(500)
      .json({ message: "Internal error while fetching friends" });
  }
};
