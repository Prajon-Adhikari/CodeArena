import Hackathon from "../models/hackathon.model.js";
import User from "../models/user.model.js";
import SubmittedProject from "../models/submitedProject.model.js";
import Judge from "../models/judge.model.js";
import JoinedHackathon from "../models/joinedHackathon.model.js";
import Friend from "../models/friend.model.js";

export const fechHackathonsForPanel = async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    const hackathonLength = hackathons.length;

    const users = await User.find();
    const usersLength = users.length;

    const projects = await SubmittedProject.find();
    const projectsLength = projects.length;

    const today = new Date();
    const completedHackathons = hackathons.filter(
      (h) => new Date(h.endDate) < today
    ).length;

    const hackathonsPerMonth = Array(12).fill(0); // Jan → Dec
    hackathons.forEach((h) => {
      const month = new Date(h.createdAt).getMonth(); // 0 = Jan
      hackathonsPerMonth[month]++;
    });

    const themeCounts = {};
    hackathons.forEach((h) => {
      if (Array.isArray(h.themes)) {
        h.themes.forEach((theme) => {
          themeCounts[theme] = (themeCounts[theme] || 0) + 1;
        });
      }
    });

    const judges = await Judge.find();
    const judgeLength = judges.length;

    const participants = await JoinedHackathon.find();
    const participantslength = participants.length;

    return res.status(200).json({
      message: "Fetching data for admin panel",
      hackathonLength,
      usersLength,
      projectsLength,
      completedHackathons,
      hackathonsPerMonth,
      themeCounts,
      judgeLength,
      participantslength,
    });
  } catch (error) {
    console.log("Internal error while fetching data for admin panel", error);
    return res
      .status(500)
      .json({ message: "Internal error while fetching data for admin panel" });
  }
};

export const fetchUserForAdmin = async (req, res) => {
  try {
    const users = await User.find();

    const usersWithFriends = await Promise.all(
      users.map(async (user) => {
        const friendsCount = await Friend.countDocuments({
          $or: [{ user1: user._id }, { user2: user._id }],
        });

        return {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          profilePic: user.profilePic,
          location: user.location || "-", // if field doesn't exist, show "-"
          work: user.work || "-",
          accountCreated: user.createdAt,
          friendsCount,
        };
      })
    );

    return res
      .status(200)
      .json({ message: "Fetching user data for admin", usersWithFriends });
  } catch (error) {
    console.log("Internal error while fetching user data for admin", error);
    return res
      .status(500)
      .json({ message: "Internal error while fetching user data for admin" });
  }
};

export const fetchJudgesForAdmin = async (req, res) => {
  try {
    const judges = await Judge.find();

    const judgeWithHackathons = await Promise.all(
      judges.map(async (judge) => {
        const hackathons = await Hackathon.find({ judges: judge._id })
          .select("title description startDate endDate") // select only needed fields
          .lean();

        return {
          ...judge.toObject(),
          hackathons,
        };
      })
    );

    return res.status(200).json({message: "Fetching judge data for admin", judgeWithHackathons});
  } catch (error) {
    console.log("Internal error while fetching judge data for admin", error);
    return res
      .status(500)
      .json({ message: "Internal error while fetching judge data for admin" });
  }
};


export const fetchHosterForAdmin = async (req, res) => {
  try {
    const hackathons = await Hackathon.find()
      .populate("organizerId", "fullName email profilePic"); 
      // only pick needed fields from User model

    return res.status(200).json({
      success: true,
      hosters: hackathons,
    });
  } catch (error) {
    console.log("Internal error while fetching hoster data for admin", error);
    return res
      .status(500)
      .json({ message: "Internal error while fetching hoster data for admin" });
  }
};

export const fetchParticipantsForAdmin = async(req,res) =>{
  try {
    const participants = await JoinedHackathon.find()
      .populate("userId", "fullName email profilePic location work") // only needed user fields
      .populate("hackathonId", "title description organizerName themes") // only needed hackathon fields
      .lean();

    return res.status(200).json({
      success: true,
      message: "Fetching participants data for admin",
      participants,
    });
  } catch (error) {
     console.log("Internal error while fetching particiapants data for admin", error);
    return res
      .status(500)
      .json({ message: "Internal error while fetching participants data for admin" });
  }
}

export const fetchOperatingHackathons = async(req, res) =>{
  try {
    const today = new Date();

    const operatingHackathons = await Hackathon.find({
      endDate: { $gte: today },
    });

     return res.status(200).json({
      success: true,
      message: "Operating hackathons fetched successfully",
      hackathons: operatingHackathons,
    });
 
  } catch (error) {
     console.log("Internal error while fetching operating hackathons data for admin", error);
    return res
      .status(500)
      .json({ message: "Internal error while fetching operating hackathons data for admin" });
  }
}

export const fetchCompletedHackathons = async(req, res) =>{
  try {
    const today = new Date();

    const completedHackathons = await Hackathon.find({
      endDate: { $lte: today },
    });

     return res.status(200).json({
      success: true,
      message: "Operating hackathons fetched successfully",
      hackathons: completedHackathons,
    });
 
  } catch (error) {
     console.log("Internal error while fetching operating hackathons data for admin", error);
    return res
      .status(500)
      .json({ message: "Internal error while fetching operating hackathons data for admin" });
  }
}