import Hackathon from "../models/hackathon.model.js";
import User from "../models/user.model.js";
import SubmittedProject from "../models/submitedProject.model.js";
import Judge from "../models/judge.model.js";
import JoinedHackathon from "../models/joinedHackathon.model.js";

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
