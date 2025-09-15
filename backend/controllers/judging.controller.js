import Judging from "../models/judging.model.js";

export const addJudgingScore = async (req, res) => {
  try {
    const { innovation, technicalImplementation, design, impact, presentation } =
      req.body || {};
    const userId  = req.user._id;
    const {id: projectId} = req.params;

    if (
      innovation == null ||
      technicalImplementation == null ||
      design == null ||
      impact == null ||
      presentation == null
    ) {
      return res.status(400).json({ message: "All criteria scores are required" });
    }

    // ✅ calculate total score
    const totalScore =
      innovation +
      technicalImplementation +
      design +
      impact +
      presentation;

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


export const getJudgingScores = async(req,res) =>{
    try {
        const {id: projectId} = req.params;
        const userId = req.user._id;

        if(!userId){
            return res.status(400).json({message: "User Id not found"});
        }

        if(!projectId){
            return res.status(400).json({message: "Project Id is missing"});
        }

        const judgingScore = await Judging.findOne({
            judgeId: userId,
            projectId,
        });

        return res.status(200).json({message: "Fetching judging scores", judgingScore});
    } catch (error) {
        console.log("Internal error while fetching judging scores", error);
        return res.status(500).json({message: "Internal error while fetching judging scores"});
    }
}