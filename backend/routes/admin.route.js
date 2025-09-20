import express from "express";
import { fechHackathonsForPanel,fetchOperatingHackathons ,fetchHosterForAdmin, fetchJudgesForAdmin, fetchParticipantsForAdmin, fetchUserForAdmin, fetchCompletedHackathons, getOverviewDetailsForAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/dashboard", fechHackathonsForPanel);

router.get("/users", fetchUserForAdmin);

router.get("/judges", fetchJudgesForAdmin);

router.get("/hosters", fetchHosterForAdmin);

router.get("/participants", fetchParticipantsForAdmin);

router.get("/hackathons/operating", fetchOperatingHackathons);

router.get("/hackathons/completed", fetchCompletedHackathons);

router.get("/:id/admin/overview", getOverviewDetailsForAdmin);

export default router;