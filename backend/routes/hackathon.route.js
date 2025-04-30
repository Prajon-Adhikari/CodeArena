import express from "express";
import { hackathon } from "../controllers/hackathon.controller.js";

const router = express.Router();

router.post("/", hackathon);

export default router;
