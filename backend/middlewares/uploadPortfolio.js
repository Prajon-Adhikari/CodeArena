import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });

// Multer storage that handles both image & video
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.mimetype.startsWith("image/")) {
      return { folder: "images", resource_type: "image" };
    } else if (file.mimetype.startsWith("video/")) {
      return { folder: "videos", resource_type: "video" };
    }
    throw new Error("Unsupported file type");
  },
});

export const uploadPortfolio = multer({ storage }).fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);
