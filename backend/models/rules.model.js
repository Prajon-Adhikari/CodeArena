import mongoose from "mongoose";

const RulesSchema = new mongoose.Schema({
  eligibility: { type: String },
  teamFormation: { type: String },
  submissionRequirements: { type: String },
  codeOfConduct: { type: String },
  prohibited: { type: String },
  disqualification: { type: String },
});

const Rules = mongoose.model("Rules", RulesSchema);

export default Rules;
