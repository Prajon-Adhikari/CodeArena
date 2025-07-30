import Hackathon from "../models/hackathon.model.js";
import JoinedHackathon from "../models/joinedHackathon.model.js";

export const getMyJoinedHackathon = async (req, res) => {
  const userId = req.user._id;
  try {
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    const joinedHackathons = await JoinedHackathon.find({ userId });

    if (!joinedHackathons || joinedHackathons.length === 0) {
      return res
        .status(400)
        .json({ message: "You have not joined any hackathon" });
    }

    const hackathonIDs = joinedHackathons.map((record) => record.hackathonId);

    const hackathons = await Hackathon.find({ _id: { $in: hackathonIDs } });

    return res.status(200).json({hackathons});
  } catch (error) {
    console.log("Internal error while fetching joined hackathons", error);
    return res
      .status(500)
      .json({ message: "Internal error while fetching joined hackathons" });
  }
};
