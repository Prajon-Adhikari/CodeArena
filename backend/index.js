import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import multer from "multer";
import cors from "cors";
import { connectDB } from "./libs/db.js";

import authRoute from "./routes/user.route.js";
import hackathonRoute from "./routes/hackathon.route.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

cloudinary.v2.config();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "videos", // your folder name
    resource_type: "video", // required for video upload
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("video"), (req, res) => {
  res.status(200).json({
    message: "Video uploaded to Cloudinary",
    url: req.file.path,
  });
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/home", hackathonRoute);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
  connectDB();
});
