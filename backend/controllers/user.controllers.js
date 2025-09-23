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
        role: newUser.role,
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

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill up all fields" });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role,
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

    const token = jwt.sign({ email: checkUser.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const receiver = {
      from: process.env.MY_GMAIL,
      to: email,
      subject: "Password Reset",
      text: `${process.env.CLIENT_URL}/api/auth/resetpassword/${token}`, // ✅ fixed line
    };

    await transporter.sendMail(receiver);

    return res.status(200).send({
      message: "Password reset link sent to your email",
      status: "success",
    });
  } catch (error) {
    console.log("Error on forgot password", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

///// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password)
      return res.status(400).send({ message: "Password is required" });

    if (password.length < 6)
      return res
        .status(400)
        .send({ message: "Password must be at least 6 characters long" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Token has expired" });
      }
      return res.status(401).send({ message: "Invalid token" });
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      return res
        .status(400)
        .send({ message: "New password must be different from the old one" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    return res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error.message);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      { role: { $ne: "admin" } }, // exclude admins
      "_id fullName email"
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false, // set true if using HTTPS in production
  });
  return res.status(200).json({ message: "Logged out successfully" });
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      fullName,
      email,
      work,
      country,
      city,
      street,
      about,
      skills,
      profilePic,
    } = req.body;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (fullName) user.fullName = fullName;

    // Check if updating email
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
      user.email = email;
    }

    // Update other fields if provided
    if (work) user.work = work;
    if (country) user.country = country;
    if (city) user.city = city;
    if (street) user.street = street;
    if (about) user.about = about;
    if (skills)
      user.skills = Array.isArray(skills) ? skills : skills.split(","); // Accept comma-separated string
    if (req.file && req.file.path) {
      user.profilePic = req.file.path;
    } else if (profilePic) {
      user.profilePic = profilePic; // in case you’re sending URL directly
    }
    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        work: user.work,
        country: user.country,
        city: user.city,
        street: user.street,
        about: user.about,
        skills: user.skills,
        profilePic: user.profilePic,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({ message: "Failed to update user" });
  }
};
