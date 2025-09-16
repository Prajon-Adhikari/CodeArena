import Judging from "../models/judging.model.js";
import Judge from "../models/judge.model.js";
import SubmittedProject from "../models/submitedProject.model.js";
import Hackathon from "../models/hackathon.model.js";
import mongoose from "mongoose";
export const addJudgingScore = async (req, res) => {
  try {
    const {
      innovation,
      technicalImplementation,
      design,
      impact,
      presentation,
    } = req.body || {};
    const userId = req.user._id;
    const { id: projectId } = req.params;

    if (
      innovation == null ||
      technicalImplementation == null ||
      design == null ||
      impact == null ||
      presentation == null
    ) {
      return res
        .status(400)
        .json({ message: "All criteria scores are required" });
    }

    const existing = await Judging.findOne({
      judgeId: userId,
      projectId,
    });
    if (existing) await existing.deleteOne();

    // ✅ calculate total score
    const totalScore =
      innovation + technicalImplementation + design + impact + presentation;

    // ✅ create judging entry
    const judging = new Judging({
      judgeId: userId,
      projectId,
      criteria: {
        innovation,
        technicalImplementation,
        design,
        impact,
        presentation,
      },
      totalScore,
    });

    await judging.save();

    res.status(201).json({
      message: "Judging score submitted successfully",
      judging,
    });
  } catch (error) {
    console.error("Error saving judging score:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getJudgingScores = async (req, res) => {
  try {
    const { id: projectId } = req.params;
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User Id not found" });
    }

    if (!projectId) {
      return res.status(400).json({ message: "Project Id is missing" });
    }

    const project = await SubmittedProject.findById(projectId);

    const hacakthonId = project.hackathonId;

    const judgingScore = await Judging.findOne({
      judgeId: userId,
      projectId,
    });

    const judges = await Judge.find({
      userId,
    });

    const judgeIds = judges.map((j) => j._id); // extract userId values

    const judgedHackahons = await Hackathon.find({
      judges: { $in: judgeIds },
    });

    const isJudgedHackathon = judgedHackahons.some(
      (h) => h._id.toString() === hacakthonId.toString()
    );

    return res
      .status(200)
      .json({
        message: "Fetching judging scores",
        judgingScore,
        isJudgedHackathon,
      });
  } catch (error) {
    console.log("Internal error while fetching judging scores", error);
    return res
      .status(500)
      .json({ message: "Internal error while fetching judging scores" });
  }
};

export const getOverallJudgingScores = async (req, res) => {
  try {
    const { id: projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ message: "Project Id is missing" });
    }

    // 🟢 Aggregation pipeline to calculate averages
    const result = await Judging.aggregate([
      { $match: { projectId: new mongoose.Types.ObjectId(projectId) } },
      {
        $group: {
          _id: "$projectId",
          avgInnovation: { $avg: "$criteria.innovation" },
          avgTechnical: { $avg: "$criteria.technicalImplementation" },
          avgDesign: { $avg: "$criteria.design" },
          avgImpact: { $avg: "$criteria.impact" },
          avgPresentation: { $avg: "$criteria.presentation" },
          avgTotalScore: { $avg: "$totalScore" },
          judgesCount: { $sum: 1 },
        },
      },
    ]);

    if (!result.length) {
      return res.status(404).json({ message: "No judging scores found" });
    }

    res.status(200).json({
      message: "Overall average judging scores",
      overall: result[0],
    });
  } catch (error) {
    console.log("Internal error while fetching overall judging scores", error);
    return res.status(500).json({
      message: "Internal error while fetching overall judging scores",
    });
  }
};
