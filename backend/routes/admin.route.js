import express from "express";
import { fechHackathonsForPanel } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/dashboard", fechHackathonsForPanel);
export default router;