
import Portfolio from "../models/portfolio.model.js";
import Hackathon from "../models/hackathon.model.js"
import User from "../models/user.model.js";

export const getSearchedProfile = async (req, res) =>{
  try {
    const {id: userId} = req.params;

    if(!userId){
      return res.status(400).json({message: "User Id not found"});
    }

    const user = await User.findOne({_id: userId});

    const hackathons = await Hackathon.find({userId});

    const portfolioProjects = await Portfolio.find({
      userId
    });

    return res.status(200).json({message: "Fetching portfolio projects", portfolioProjects, hackathons, user });
  } catch (error) {
    console.log("Internal error while fetching portfolio projects");
    return res.status(500).json({message: "Internal error while fetching portfolio projects"});
  }
}

