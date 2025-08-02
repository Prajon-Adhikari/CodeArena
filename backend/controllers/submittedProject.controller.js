import SubmittedProject from "../models/submitedProject.model.js";
import User from "../models/user.model.js";

export const submitProject = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { projectTitle, projectDescription, tech, videos, tags } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User Id is missing" });
    }

    const alreadySubmitted = await SubmittedProject.findOne({
      userId,
      hackathonId,
    });

    if (alreadySubmitted) {
      return res
        .status(409)
        .json({ message: "You have already submitted project" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userName = user.fullName;

    const newProject = await SubmittedProject({
      projectTitle,
      projectDescription,
      tech,
      videos,
      tags,
      userName,
      userId,
      hackathonId: id,
    });

    await newProject.save();

    res
      .status(200)
      .json({ message: "Project submitted successfully", project: newProject });
  } catch (error) {
    console.log("Internal error while submitting project", error);
    return res
      .status(500)
      .json({ message: "Internal error while submitting project" });
  }
};
