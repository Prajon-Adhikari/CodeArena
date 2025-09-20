import express from "express";
import { fechHackathonsForPanel, fetchHosterForAdmin, fetchJudgesForAdmin, fetchUserForAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/dashboard", fechHackathonsForPanel);

router.get("/users", fetchUserForAdmin);

router.get("/judges", fetchJudgesForAdmin);

router.get("/hosters", fetchHosterForAdmin);

export default router;