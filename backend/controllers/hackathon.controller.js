import Hackathon from "../models/hackathon.model.js";
import User from "../models/user.model.js";
import JoinedHackathon from "../models/joinedHackathon.model.js";
import Prize from "../models/prize.model.js";
import Judge from "../models/judge.model.js";
import Rules from "../models/rules.model.js";

export const hackathon = async (req, res) => {
  const organizerId = req.user._id;
  const {
    title,
    description,
    organizerName,
    contactEmail,
    startDate,
    endDate,
    registrationStart,
    registrationDeadline,
    themes,
    mode,
    rules: rulesData,
    prizes: prizesData,
    judges: judgesData,
  } = req.body;

  try {
    const rules = await Rules.insertMany(rulesData);

    // 1️⃣ Create Prize documents and get their IDs
    const prizes = await Prize.insertMany(prizesData);

    // 2️⃣ Create Judge documents and get their IDs
    const judges = await Judge.insertMany(judgesData);

    // 3️⃣ Create Hackathon with references
    const newHackathon = new Hackathon({
      title,
      description,
      organizerName,
      organizerId,
      contactEmail,
      startDate,
      endDate,
      registrationStart,
      registrationDeadline,
      themes,
      mode,
      rules: rules.map((r) => r._id),
      prizes: prizes.map((p) => p._id),
      judges: judges.map((j) => j._id),
    });

    await newHackathon.save();

    res.status(200).json({ message: "Hackathon created successfully" });
  } catch (error) {
    console.error("Error creating hackathon:", error);
    res.status(500).json({ message: "Internal server error" });
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

    const participants = await JoinedHackathon.find({
      hackathonId: id
    })

    return res.status(200).json({
      message: "Successfully fetched specific hackathon details",
      hackathon,
      isRegistered,
      participants,
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
    const { teamName, teamStatus, referer } = req.body;

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
      teamName,
      teamStatus,
      referer,
      userId: user._id,
      hackathonId,
    });

    await joined.save();

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
