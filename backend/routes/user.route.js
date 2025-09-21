import express from "express";
import { signin, signup, forgotpassword, resetPassword, logout } from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/signin", signin);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/forgotpassword", forgotpassword);

router.post("/resetpassword/:token", resetPassword);

export default router;
