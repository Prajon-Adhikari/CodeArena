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

export const updatePrizes = async (req, res) => {
  try {
    const { prizes } = req.body;
    const { id } = req.params;

    const hackathon = await Hackathon.findById(id);
    if (!hackathon) return res.status(404).json({ message: "Hackathon not found" });

    // Delete old prizes
    await Prize.deleteMany({ _id: { $in: hackathon.prizes } });

    // Create new prizes
    const createdPrizes = await Prize.insertMany(prizes);

    // Update hackathon prizes array without overwriting other fields
    const updatedHackathon = await Hackathon.findByIdAndUpdate(
      id,
      { prizes: createdPrizes.map((p) => p._id) },
      { new: true } // return updated document
    );

    return res.json({ prizes: createdPrizes });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};
