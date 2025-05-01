import express from "express";
import { signin, signup, forgotpassword, resetPassword } from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/signin", signin);

router.post("/signup", signup);

router.post("/forgotpassword", forgotpassword);

router.post("/resetpassword/:token", resetPassword);


export default router;
