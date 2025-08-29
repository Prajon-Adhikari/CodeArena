import express from "express";
import {
  hackathon,
  getHackathonTournament,
  getTopHackathon,
  getSpecificHackathonDetails,
  joinedHackathon,
} from "../controllers/hackathon.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  deleteAlreadyJoinedHackathon,
  getHostedHackathon,
  getMyJoinedHackathon,
} from "../controllers/myhackathon.controller.js";
import {
  getSubmittedProject,
  submitProject,
} from "../controllers/submittedProject.controller.js";
import { getRules } from "../controllers/rules.controller.js";
import upload from "../middlewares/video.js";
import { getPrizeDetails } from "../controllers/prize.controller.js";

const router = express.Router();

router.post("/host/hackathon", protectRoute, hackathon);

router.get("/join/hackathon", protectRoute, getHackathonTournament);

router.get("/", protectRoute, getTopHackathon);

router.get("/myjoinedhackathon", protectRoute, getMyJoinedHackathon);

router.get("/myhostedhackathon", protectRoute, getHostedHackathon);

router.get("/:id", protectRoute, getSpecificHackathonDetails);

router.get("/:id/myproject", protectRoute, getSubmittedProject);

router.get("/:id/rules", protectRoute, getRules);

router.get("/:id/prizes", protectRoute, getPrizeDetails);

router.post("/:id/overview", protectRoute, joinedHackathon);

router.post("/:id/myproject", protectRoute, upload, submitProject);

router.delete("/:id/overview", protectRoute, deleteAlreadyJoinedHackathon);

export default router;
