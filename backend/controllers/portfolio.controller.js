import Portfolio from "../models/portfolio.model.js";

export const submitPortfolioProject = async (req, res) => {
  try {
    const userId = req.user._id;

    const { projectTitle = "", projectDescription = "", skills = "", projectLink = "" } = req.body;

    const skillsArray = skills ? skills.split(",").map(s => s.trim()) : [];

    const videoFile = req.files?.video?.[0];
    const imageFile = req.files?.image?.[0];

    const videos = videoFile ? [{
      url: videoFile.path || videoFile.filename,    // Cloudinary returns `path` in multer-storage-cloudinary
      public_id: videoFile.filename || videoFile.public_id
    }] : [];

    const images = imageFile ? [{
      url: imageFile.path || imageFile.filename,
      public_id: imageFile.filename || imageFile.public_id
    }] : [];

    const project = new Portfolio({
      projectTitle,
      projectDescription,
      skills: skillsArray,
      projectLink,
      videos,
      images,
      userId
    });

    await project.save();
    res.status(200).json({ message: "Portfolio project submitted successfully", project });

  } catch (error) {
    console.error("Internal error while submitting portfolio project", error);
    return res.status(500).json({ message: "Internal error while submitting portfolio project" });
  }
};


