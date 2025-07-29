import mongoose from "mongoose";

const joinedHackathonSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    teamStatus: {
      type: String,
      rquired: true,
      enum: ["solo", "team"],
    },
    referer: {
      type: String,
      required: true,
      enum: ["codearena", "college", "friend", "other"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hackathonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
      required: true,
    },
  },
  { timestamps: true }
);

const JoinedHackathon = mongoose.model(
  "joinedHackathon",
  joinedHackathonSchema
);

export default JoinedHackathon;
