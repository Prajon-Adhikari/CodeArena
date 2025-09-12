import Hackathon from "../models/hackathon.model.js";
import Rules from "../models/rules.model.js";

export const getRules = async (req, res) => {
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
      return res.status(404).json({ message: "Hackathon not found" });
    }

    const rulesId = hackathon.rules;

    const rules = await Rules.findById({ _id: rulesId });

    if (!rules) {
      return res.status(400).json({ message: "Rules not found" });
    }

    return res.status(200).json({ message: "Fetching rules", rules });
  } catch (error) {
    console.log("Internal error while fetching rules", error);
    return res
      .status(500)
      .json({ message: "Internal error while fetching rules" });
  }
};


export const updateRules = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRules = req.body;

    const rules = await Rules.findByIdAndUpdate(id, updatedRules, {
      new: true,
      runValidators: true,
    });

    if (!rules) {
      return res.status(404).json({ message: "Rules not found" });
    }

    res.json({ message: "Rules updated successfully", rules });
  } catch (error) {
    console.error("Error updating rules:", error);
    res.status(500).json({ message: "Server error" });
  }
};
