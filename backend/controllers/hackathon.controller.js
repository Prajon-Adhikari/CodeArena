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
