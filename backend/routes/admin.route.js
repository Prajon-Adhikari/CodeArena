import express from "express";
import { fechHackathonsForPanel,fetchOperatingHackathons ,fetchHosterForAdmin, fetchJudgesForAdmin, fetchParticipantsForAdmin, fetchUserForAdmin, fetchCompletedHackathons } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/dashboard", fechHackathonsForPanel);

router.get("/users", fetchUserForAdmin);

router.get("/judges", fetchJudgesForAdmin);

router.get("/hosters", fetchHosterForAdmin);

router.get("/participants", fetchParticipantsForAdmin);

router.get("/hackathons/operating", fetchOperatingHackathons);

router.get("/hackathons/completed", fetchCompletedHackathons);

export default router;