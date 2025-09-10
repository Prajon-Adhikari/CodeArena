import mongoose from "mongoose";

const RulesSchema = new mongoose.Schema({
  eligibility: { type: String, required: true },
  teamFormation: { type: String, required: true },
  submissionRequirements: { type: String, required: true },
  codeOfConduct: { type: String, required: true },
  prohibited: { type: String, required: true },
  disqualification: { type: String, required: true },
});

const Rules = mongoose.model("Rules", RulesSchema);

export default Rules;
