import express from "express";
import {
  hackathon,
  getHackathonTournament,
  getTopHackathon,
  getSpecificHackathonDetails,
} from "../controllers/hackathon.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/host/hackathon", protectRoute, hackathon);

router.get("/join/hackathon", protectRoute, getHackathonTournament);

router.get("/", protectRoute, getTopHackathon);

router.get("/:id", getSpecificHackathonDetails);

export default router;
