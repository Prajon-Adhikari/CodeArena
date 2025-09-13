import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloudinary config
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

// Multer disk storage for temporary files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../tmp"); // ensure tmp folder exists
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadMiddleware = multer({ storage }).single("video");

// Upload handler
const upload = (req, res, next) => {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      console.error("Multer upload error:", err);
      return res.status(500).json({ message: "File upload failed", error: err.message });
    }

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video",
        folder: "videos",
      });

      fs.unlinkSync(req.file.path); // delete temp file
      req.file.cloudinaryUrl = result.secure_url;
      next();
    } catch (uploadErr) {
      console.error("Cloudinary upload error:", uploadErr);
      fs.unlinkSync(req.file.path);
      return res.status(500).json({ message: "Cloudinary upload failed", error: uploadErr.message });
    }
  });
};

export default upload;
