import Friend from "../models/friend.model.js";
import JoinedHackathon from "../models/joinedHackathon.model.js";
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
      "fullName email profilePic"
    );

    // Format for react-select
    const formatted = friendUsers.map((friend) => ({
      value: friend._id,
      label: friend.fullName,
      profilePic: friend.profilePic,
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

export const fetchTagsFriend = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: hackathonId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User Id missing" });
    }

    if (!hackathonId) {
      return res.status(400).json({ message: "Hackathon Id missing" });
    }

    const joinedHackathon = await JoinedHackathon.findOne({
      userId,
      hackathonId,
    });

    if (!joinedHackathon) {
      return res.status(404).json({ message: "You are not in this hackathon" });
    }

    // Find teammates with the same team name and hackathon, excluding self
    const teammates = await JoinedHackathon.find({
      teamName: joinedHackathon.teamName,
      hackathonId,
      userId: { $ne: userId },
    }).populate("userId", "fullName profilePic");

    // Format for react-select
    const formatted = teammates.map((t) => ({
      value: t.userId._id, // ✅ real ObjectId
      label: t.userId.fullName, // ✅ display name
      profilePic: t.userId.profilePic || "",
    }));

    return res
      .status(200)
      .json({ message: "Fetching tag friends", tagfriends: formatted });
  } catch (error) {
    console.log("Internal error while fetching tag friends", error);
    return res
      .status(500)
      .json({ message: "Internal error while fetching tag friends" });
  }
};
