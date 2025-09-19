import express from "express";
import { fechHackathonsForPanel, fetchUserForAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/dashboard", fechHackathonsForPanel);

router.get("/users", fetchUserForAdmin);

export default router;