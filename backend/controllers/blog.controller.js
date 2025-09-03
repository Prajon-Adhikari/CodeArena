import Blog from "../models/blogs.model.js";

export const submitBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, category, likes } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User Id is missing" });
    }

    const imageUrl = req.file?.path || "";
    const imagePublicId = req.file?.filename || req.file?.public_id || "";

    const newBlog = new Blog({
      title,
      category,
      likes,
      images: [
        {
          url: imageUrl,
          public_id: imagePublicId,
        },
      ],
      userId,
    });

    await newBlog.save();

    res.status(200).json({message: "Submitting blog "});
  } catch (error) {
    console.log("Internal error while submitting blog", error)
    return res.status(500).json({message: "Internal error while submitting blog"})
  }
};
