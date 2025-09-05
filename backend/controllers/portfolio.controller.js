import Portfolio from "../models/portfolio.model.js";
import Hackathon from "../models/hackathon.model.js"

export const getPortfolioProject = async (req, res) =>{
  try {
    const userId = req.user._id;

    if(!userId){
      return res.status(400).json({message: "User Id not found"});
    }

    const hackathons = await Hackathon.find({userId});

    const portfolioProjects = await Portfolio.find({
      userId
    });

    return res.status(200).json({message: "Fetching portfolio projects", portfolioProjects, hackathons });
  } catch (error) {
    console.log("Internal error while fetching portfolio projects");
    return res.status(500).json({message: "Internal error while fetching portfolio projects"});
  }
}

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


