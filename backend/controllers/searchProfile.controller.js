
import Portfolio from "../models/portfolio.model.js";
import Hackathon from "../models/hackathon.model.js"
import User from "../models/user.model.js";
import FriendRequest from "../models/friendRequest.model.js";
import Friend from "../models/friend.model.js";

export const getSearchedProfile = async (req, res) =>{
  try {
    const {id: searchId} = req.params;
    const userId = req.user._id;

    if(!searchId){
      return res.status(400).json({message: "Search Id not found"});
    }

    if(!userId){
      return res.status(400).json({message: "User Id not found"});
    }

    const user = await User.findOne({_id: searchId});

    const hackathons = await Hackathon.find({searchId});

    const portfolioProjects = await Portfolio.find({
      userId: searchId
    });

    const friendRequest = await FriendRequest.find({
      sender: userId,
      reciever: searchId
    });

   const friends = await Friend.find({
  $or: [{ user1: searchId }, { user2: searchId }]
});
    return res.status(200).json({message: "Fetching portfolio projects", portfolioProjects,friendRequest,friends, hackathons, user });
  } catch (error) {
    console.log("Internal error while fetching portfolio projects");
    return res.status(500).json({message: "Internal error while fetching portfolio projects"});
  }
}

