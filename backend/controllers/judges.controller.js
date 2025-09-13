import Hackathon from "../models/hackathon.model.js";
import Judge from "../models/judge.model.js";

export const getJudgesDetails = async (req, res) => {
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

    const judgesIds = hackathon.judges;

    const judges = await Judge.find({ _id: { $in: judgesIds } });

    res.status(200).json({ message: "Fetching judges details", judges });
  } catch (error) {
    console.log("Internal error while fetching judges details", error);
    return res
      .status(500)
      .json({ message: "Internal error while fetching judges details" });
  }
};

export const updateJudges = async (req, res) => {
  try {
    const { judges } = req.body;
    const { id } = req.params;

    const hackathon = await Hackathon.findById(id);
    if (!hackathon)
      return res.status(404).json({ message: "Hackathon not found" });

    // Delete old prizes
    await Judge.deleteMany({ _id: { $in: hackathon.judges } });

    // Create new prizes
    const createdJudges = await Judge.insertMany(judges);

    // Update hackathon prizes array without overwriting other fields
    hackathon.judges = createdJudges.map((j) => j._id);
    await hackathon.save();

    return res.json({ judges: createdJudges });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};
