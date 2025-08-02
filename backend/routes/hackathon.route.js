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
  getMyJoinedHackathon,
} from "../controllers/myhackathon.controller.js";
import { submitProject } from "../controllers/submittedProject.controller.js";

const router = express.Router();

router.post("/host/hackathon", protectRoute, hackathon);

router.get("/join/hackathon", protectRoute, getHackathonTournament);

router.get("/", protectRoute, getTopHackathon);

router.get("/myjoinedhackathon", protectRoute, getMyJoinedHackathon);

router.get("/:id", protectRoute, getSpecificHackathonDetails);

router.post("/:id/overview", protectRoute, joinedHackathon);

router.post("/:id/myproject", protectRoute, submitProject);

router.delete("/:id/overview", protectRoute, deleteAlreadyJoinedHackathon);

export default router;
