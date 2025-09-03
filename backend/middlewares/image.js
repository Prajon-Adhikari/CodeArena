import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";

// Cloudinary config
cloudinary.v2.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

// Storage for images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "images", // 👈 Cloudinary folder name
    resource_type: "image", // 👈 Specify image
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // optional
  },
});

// Multer middleware
const uploadImageMiddleware = multer({ storage: imageStorage }).single("image");

// Express middleware wrapper
const uploadImage = (req, res, next) => {
  uploadImageMiddleware(req, res, (err) => {
    console.log("Uploading image...");
    if (err) {
      console.error("Multer or Cloudinary upload error:", err);
      return res
        .status(500)
        .json({ message: "Image upload failed", error: err.message });
    }
    next();
  });
};

export default uploadImage;
