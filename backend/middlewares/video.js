import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "videos",
    resource_type: "video",
  },
});

const uploadMiddleware = multer({ storage }).single("video");

const upload = (req, res, next) => {
  uploadMiddleware(req, res, (err) => {
    console.log("Uploading");
    if (err) {
      console.error("Multer or Cloudinary upload error:", err); // 👈 log full error
      return res
        .status(500)
        .json({ message: "File upload failed", error: err.message });
    }
    next();
  });
};

export default upload;
