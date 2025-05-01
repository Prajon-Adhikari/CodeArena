import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../libs/utils.js";
import nodemailer from "nodemailer";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();
// SignUp
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "Filled up all fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be longer than 6 letter" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already used" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error on sigining", error);
    res.status(500).json({ message: "Internal error on signing" });
  }
};

// Signin

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Password doesnot match" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error on login In", error);
    res.status(500).json({ message: "Internal Error while logging" });
  }
};



//forgot password
export const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const token = jwt.sign(
      { email: checkUser.email }, // ✅ include email
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.MY_GMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

const receiver ={
  from : process.env.MY_GMAIL,
  to: email,
  subject: "Password Reset",
  text: `http://localhost:5173/api/auth/resetpassword/${token}`

};

await transporter.sendMail(receiver);

return res.status(200).send({message: "Password reset link sent to your email",    status: "success",    });


  }catch (error) {
    console.log("Error on forgot password", error);   
  }
}


///// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) return res.status(400).send({ message: "Password is required" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).send({ message: "Invalid or expired token" });
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    return res.status(200).send({ message: "Password reset successfully" });

  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
