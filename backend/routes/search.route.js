import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getSearchData } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/", getSearchData);

export default router;