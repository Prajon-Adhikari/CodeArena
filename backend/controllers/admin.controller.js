import Hackathon from "../models/hackathon.model.js";
import User from "../models/user.model.js";
import SubmittedProject from "../models/submitedProject.model.js";

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
      (h) => new Date(h.submissionEndDate) < today
    ).length;

     const hackathonsPerMonth = Array(12).fill(0); // Jan → Dec
    hackathons.forEach((h) => {
      const month = new Date(h.createdAt).getMonth(); // 0 = Jan
      hackathonsPerMonth[month]++;
    });

    return res.status(200).json({
      message: "Fetching data for admin panel",
      hackathonLength,
      usersLength,
      projectsLength,
      completedHackathons,
      hackathonsPerMonth,
    });
  } catch (error) {
    console.log("Internal error while fetching data for admin panel", error);
    return res
      .status(500)
      .json({ message: "Internal error while fetching data for admin panel" });
  }
};
