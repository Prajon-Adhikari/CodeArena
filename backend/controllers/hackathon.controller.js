import mongoose from "mongoose";
import Hackathon from "../models/hackathon.model.js";
import User from "../models/user.model.js";
import JoinedHackathon from "../models/joinedHackathon.model.js";

export const hackathon = async (req, res) => {
  const {
    title,
    description,
    startDate,
    endDate,
    registrationDeadline,
    location,
    mode,
    organizer,
    prizeDetails,
    rules,
    judgingCriteria,
    bannerUrl,
  } = req.body;
  try {
    const newHackathon = new Hackathon({
      title,
      description,
      startDate,
      endDate,
      registrationDeadline,
      location,
      mode,
      organizer,
      prizeDetails,
      rules,
      judgingCriteria,
      bannerUrl,
    });
    await newHackathon.save();

    res.status(200).json({ message: "Successfully hackathon created" });
  } catch (error) {
    console.log("Error on creating hackathon", error);
    res
      .status(500)
      .json({ message: "Internal error while creating hackathon" });
  }
};

export const getHackathonTournament = async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.status(200).json({
      message: "Successfully fetched hackathon tournaments",
      hackathons,
      user: req.user,
    });
  } catch (error) {
    console.log("Error on fetching hackathon tournaments", error);
    res
      .status(400)
      .json({ message: "Internal error while fetching hackathon tournaments" });
  }
};

export const getTopHackathon = async (req, res) => {
  try {
    const hackathons = await Hackathon.find().limit(3);
    res.status(200).json({
      message: "Successfully fetched hackathon tournaments",
      hackathons,
      user: req.user,
    });
  } catch (error) {
    console.log("Error on fetching hackathon tournaments", error);
    res
      .status(400)
      .json({ message: "Internal error while fetching hackathon tournaments" });
  }
};

export const getSpecificHackathonDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const hackathon = await Hackathon.findById(id);

    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    let isRegistered = false;

    if (req.user?._id) {
      const alreadyJoined = await JoinedHackathon.findOne({
        userId: req.user._id,
        hackathonId: id,
      });

      if (alreadyJoined) {
        isRegistered = true;
      }
    }

    return res.status(200).json({
      message: "Successfully fetched specific hackathon details",
      hackathon,
      isRegistered,
    });
  } catch (error) {
    console.log("Error while fetching specific hackathon details", error);
    res.status(500).json({
      message: "Internal error while fetching specific hackathon detailss",
    });
  }
};

export const joinedHackathon = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: hackathonId } = req.params;
    const { teamStatus, referer } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!hackathonId) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    const alreadyJoined = await JoinedHackathon.findOne({
      userId,
      hackathonId,
    });

    if (alreadyJoined) {
      return res
        .status(409)
        .json({ message: "User already joined this hackathon" });
    }

    const joined = new JoinedHackathon({
      username: user.fullName,
      email: user.email,
      teamStatus,
      referer,
      userId: user._id,
      hackathonId,
    });

    await joined.save();

    console.log("User registered");
    return res
      .status(200)
      .json({ message: "Successfully registered to hackathon" });
  } catch (error) {
    console.error("Error in joinedHackathon:", error);
    return res
      .status(500)
      .json({ message: "Internal error while registering to hackathon" });
  }
};
