import express from "express";
import {
  hackathon,
  getHackathonTournament,
  getTopHackathon,
} from "../controllers/hackathon.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/host/hackathon", protectRoute, hackathon);

router.get("/join/hackathon", protectRoute, getHackathonTournament);

router.get("/", protectRoute, getTopHackathon);

export default router;
