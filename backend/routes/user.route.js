import express from "express";
import {
  signin,
  signup,
  forgotpassword,
  resetPassword,
  logout,
} from "../controllers/user.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { checkAuth } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/check", protectRoute, checkAuth);

router.post("/signin", signin);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/forgotpassword", forgotpassword);

router.post("/resetpassword/:token", resetPassword);

export default router;
