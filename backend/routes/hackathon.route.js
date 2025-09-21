import express from "express";
import {
  hackathon,
  getHackathonTournament,
  getTopHackathon,
  getSpecificHackathonDetails,
  joinedHackathon,
  updateHackathon,
} from "../controllers/hackathon.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  deleteAlreadyJoinedHackathon,
  getHostedHackathon,
  getMyJoinedHackathon,
  getMyJudgedHackathon,
} from "../controllers/myhackathon.controller.js";
import {
  getSpecificProject,
  getSubmittedProject,
  submitProject,
} from "../controllers/submittedProject.controller.js";
import { getRules, updateRules } from "../controllers/rules.controller.js";
import upload from "../middlewares/video.js";
import { getPrizeDetails, updatePrizes } from "../controllers/prize.controller.js";
import { getJudgesDetails, updateJudges } from "../controllers/judges.controller.js";
import uploadImage from "../middlewares/image.js";
import { fetchBlog, getSpecificBlogDetails, submitBlog } from "../controllers/blog.controller.js";
import { getPortfolioProject, getSpecificPortfolioProject, submitPortfolioProject } from "../controllers/portfolio.controller.js";
import {uploadPortfolio} from "../middlewares/uploadPortfolio.js";
import { submitContact } from "../controllers/contact.controller.js";
import { getSearchedProfile } from "../controllers/searchProfile.controller.js";
import { sentFriendRequest } from "../controllers/friendRequest.controller.js";
import { getNotifications } from "../controllers/notifications.controller.js";
import { acceptFriendRequest, rejectFriendRequest } from "../controllers/friendRequest.controller.js";
import { getAllUsers, updateUser } from "../controllers/user.controllers.js";
import { fetchFriends } from "../controllers/friend.controller.js";
import { acceptProjectRequest, rejectProjectRequest } from "../controllers/projectRequest.controller.js";
import { unfriendUser } from "../controllers/unfriend.controller.js";
import { addJudgingScore, getJudgingScores, getOverallJudgingScores } from "../controllers/judging.controller.js";
import { getMessages, submitChatMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/host/hackathon", protectRoute, hackathon);

router.get("/join/hackathon", protectRoute, getHackathonTournament);

router.get("/", protectRoute, getTopHackathon);

router.get("/users",getAllUsers);

router.put("/users", protectRoute, uploadImage, updateUser);

router.get("/friends", protectRoute, fetchFriends);

router.get("/profile", protectRoute, getPortfolioProject);

router.get("/profile/:id", getSpecificPortfolioProject);

router.get("/messages/:id", protectRoute, getMessages);

router.post("/messages/:id", protectRoute, submitChatMessage);

router.get("/notifications", protectRoute, getNotifications);

router.post("/notifications/:id/accept", protectRoute, acceptFriendRequest);

router.post("/notifications/:id/reject", protectRoute, rejectFriendRequest);

router.post("/projects/notifications/:id/accept", protectRoute, acceptProjectRequest);

router.post("/projects/notifications/:id/reject", protectRoute, rejectProjectRequest);

router.get("/blogs", protectRoute, fetchBlog);

router.post("/blogs", protectRoute, uploadImage, submitBlog);

router.get("/blog/:id", getSpecificBlogDetails);

router.get("/project/:id", getSpecificProject);

router.get("/project/:id/judging", protectRoute, getJudgingScores);

router.get("/project/:id/overalljudging", getOverallJudgingScores);

router.post("/project/:id/judging", protectRoute, addJudgingScore);

router.post("/contact",protectRoute, submitContact);

router.put("/hackathons/:id",protectRoute, updateHackathon);

router.get("/myjoinedhackathon", protectRoute, getMyJoinedHackathon);

router.get("/myhostedhackathon", protectRoute, getHostedHackathon);

router.get("/myjudgedhackathon", protectRoute, getMyJudgedHackathon);

router.post("/profile/portfolio",protectRoute,uploadPortfolio, submitPortfolioProject);

router.get("/:id/myproject", protectRoute, getSubmittedProject);

router.get("/:id/profile",protectRoute, getSearchedProfile);

router.get("/:id", protectRoute, getSpecificHackathonDetails);

router.post("/:id/friend-request", protectRoute, sentFriendRequest);

router.delete("/:id/unfriend",protectRoute, unfriendUser);

router.get("/:id/rules", protectRoute, getRules);

router.put("/:id/rules", updateRules);

router.get("/:id/prizes", protectRoute, getPrizeDetails);

router.put("/:id/prizes", updatePrizes);

router.get("/:id/judges", protectRoute, getJudgesDetails);

router.put("/:id/judges", updateJudges);

router.post("/:id/overview", protectRoute, joinedHackathon);

router.post("/:id/myproject", protectRoute, upload, submitProject);

router.delete("/:id/overview", protectRoute, deleteAlreadyJoinedHackathon);

export default router;
