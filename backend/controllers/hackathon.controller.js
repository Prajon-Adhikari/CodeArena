import Hackathon from "../models/hackathon.model.js";
import User from "../models/user.model.js";
import JoinedHackathon from "../models/joinedHackathon.model.js";
import Prize from "../models/prize.model.js";
import Judge from "../models/judge.model.js";
import Rules from "../models/rules.model.js";
import SubmittedProject from "../models/submitedProject.model.js";

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
  const userId = req.user._id;
  try {
    const hackathon = await Hackathon.findById(id);

    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    const judges = await Judge.find({
      userId,
    });

    const judgeIds = judges.map((j) => j._id); // extract userId values

    const judgedHackahons = await Hackathon.find({
      judges: { $in: judgeIds },
    });

    const isJudgedHackathon = judgedHackahons.some(
      (h) => h._id.toString() === hackathon._id.toString()
    );

    const isHostedHackathon =
      hackathon.organizerId.toString() === userId.toString();

    const participants = await JoinedHackathon.find({ hackathonId: id });

    if (isHostedHackathon || isJudgedHackathon) {
      const submittedProjects = await SubmittedProject.find({ hackathonId: id })
        .populate("tags", "fullName email") // tags = team members
        .lean();

      // Get all joined records for this hackathon in one query
      const joinedRecords = await JoinedHackathon.find({
        hackathonId: id,
      }).lean();

      // Create a map: userId -> teamName
      const teamMap = {};
      joinedRecords.forEach((record) => {
        teamMap[record.userId.toString()] = record.teamName;
      });

      // Attach teamName to each project
      submittedProjects.forEach((project) => {
        const teamMemberIds =
          project.tags?.map((tag) => tag._id.toString()) || [];
        const teamNames = teamMemberIds
          .map((uid) => teamMap[uid])
          .filter(Boolean);
        project.teamName = teamNames.length > 0 ? teamNames[0] : "N/A";
      });

      return res.status(200).json({
        message: "Successfully fetched hosted hackathon details",
        hackathon,
        isHostedHackathon,
        participants,
        submittedProjects,
        isJudgedHackathon,
      });
    } else {
      let isRegistered = false;

      const alreadyJoined = await JoinedHackathon.findOne({
        userId: req.user._id,
        hackathonId: id,
      });

      if (alreadyJoined) isRegistered = true;

      return res.status(200).json({
        message: "Successfully fetched hackathon details",
        hackathon,
        isRegistered,
        participants,
        isHostedHackathon: false,
        isJudgedHackathon,
      });
    }
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

export const updateHackathon = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedHackathon = await Hackathon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedHackathon);
  } catch (err) {
    res.status(500).json({ error: "Failed to update hackathon" });
  }
};
