import express from "express";
import {
  hackathon,
  getHackathonTournament,
} from "../controllers/hackathon.controller.js";

const router = express.Router();

router.post("/host/hackathon", hackathon);

router.get("/", getHackathonTournament);

export default router;
