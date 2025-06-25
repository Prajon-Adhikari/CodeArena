import Hackathon from "../models/hackathon.model.js";

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

    return res.status(200).json({
      message: "Successfully fetched specific hackathon details",
      hackathon,
    });
  } catch (error) {
    console.log("Error while fetching specific hackathon details", error);
    res.status(500).json({
      message: "Internal error while fetching specific hackathon detailss",
    });
  }
};
