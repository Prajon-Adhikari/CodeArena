import express from "express";
import profileData from "../data/profileData.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(profileData);
});

export default router;
