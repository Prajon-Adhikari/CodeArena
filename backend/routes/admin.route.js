import express from "express";
import { fechHackathonsForPanel, fetchHosterForAdmin, fetchJudgesForAdmin, fetchParticipantsForAdmin, fetchUserForAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/dashboard", fechHackathonsForPanel);

router.get("/users", fetchUserForAdmin);

router.get("/judges", fetchJudgesForAdmin);

router.get("/hosters", fetchHosterForAdmin);

router.get("/participants", fetchParticipantsForAdmin);

export default router;