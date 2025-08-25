import SubmittedProject from "../models/submitedProject.model.js";
import User from "../models/user.model.js";

export const getSubmittedProject = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: hackathonId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User Id is missing" });
    }

    if (!hackathonId) {
      return res.status(400).json({ message: "Hackathon Id is missing" });
    }

    const submittedProject = await SubmittedProject.findOne({
      userId,
      hackathonId,
    });

    if (!submittedProject) {
      return res.json(null);
    }

    return res.status(200).json({
      message: "Successfully fetched submitted Project",
      submittedProject,
    });
  } catch (error) {
    console.log("Error while fetching already submitted project", error);
    res.status(500).json({
      message: "Internal error while fetching already submitted project",
    });
  }
};

export const submitProject = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: hackathonId } = req.params;

    // Defensive fallback for req.body
    const {
      projectTitle = "",
      projectDescription = "",
      tech = "",
      tags = "",
    } = req.body || {};

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

    // Convert comma separated strings to arrays
    const techArray = tech ? tech.split(",").map((t) => t.trim()) : [];
    const tagsArray = tags ? tags.split(",").map((t) => t.trim()) : [];

    // Video info from multer-cloudinary
    const videoUrl = req.file?.path || "";
    const videoPublicId = req.file?.filename || req.file?.public_id || "";

    const newProject = new SubmittedProject({
      projectTitle,
      projectDescription,
      tech: techArray,
      videos: [
        {
          url: videoUrl,
          public_id: videoPublicId,
        },
      ],
      tags: tagsArray,
      userName, // should be String in schema, not ObjectId
      userId,
      hackathonId,
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
