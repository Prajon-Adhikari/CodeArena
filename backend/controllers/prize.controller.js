import Hackathon from "../models/hackathon.model.js";
import Prize from "../models/prize.model.js";

export const getPrizeDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: hackathonId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User Id not found" });
    }

    if (!hackathonId) {
      return res.status(400).json({ message: "Hackathon Id not found" });
    }

    const hackathon = await Hackathon.findById({
      _id: hackathonId,
      organizerId: userId,
    });

    if (!hackathon) {
      return res.status(400).json({ message: "Hackathon not found" });
    }

    const prizeIds = hackathon.prizes;

    const prizes = await Prize.find({ _id: { $in: prizeIds } });

    return res.status(200).json({ message: "Fetching prize details", prizes });
  } catch (error) {
    console.log("Internal error while fetching prizes", error);
    return res
      .status(500)
      .json({ message: "Internal error while fetching prizes" });
  }
};
