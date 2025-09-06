import Blog from "../models/blogs.model.js";
import User from "../models/user.model.js";

export const fetchBlog = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("userId", "fullName");

    if (!blogs) {
      return res.status(400).json({ message: "No blogs to show" });
    }

    const popularBlog = await Blog.findOne().sort({ likes: -1 }).limit(1);

    return res
      .status(200)
      .json({ message: "Fetching blogs", blogs, popularBlog });
  } catch (error) {
    console.log("Internal error while fetching blogs", error);
    return res
      .status(500)
      .json({ message: "Internal error while fetching blogs" });
  }
};

export const submitBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, category, likes, description } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User Id is missing" });
    }

    const imageUrl = req.file?.path || "";
    const imagePublicId = req.file?.filename || req.file?.public_id || "";

    const newBlog = new Blog({
      title,
      category,
      likes,
      description,
      images: [
        {
          url: imageUrl,
          public_id: imagePublicId,
        },
      ],
      userId,
    });

    await newBlog.save();

    res.status(200).json({ message: "Submitting blog ", blog: newBlog });
  } catch (error) {
    console.log("Internal error while submitting blog", error);
    return res
      .status(500)
      .json({ message: "Internal error while submitting blog" });
  }
};

export const getSpecificBlogDetails = async (req, res) => {
  try {
    const { id: blogId } = req.params;

    if (!blogId) {
      return res.status(400).json({ message: "Blog id is not defined" });
    }

    const blog = await Blog.findOne({
      _id: blogId,
    }).populate("userId", "fullName");

    if(!blog){
      return res.status(400).json({message: "Blog not found"});
    }

    const blogCategory = blog.category;

    const relatedBlog = await Blog.find({category: blogCategory}).populate("userId", "fullName").limit(3);

    return res.status(200).json({message: "Fetching specific blog", blog ,relatedBlog});
  } catch (error) {
    console.log("Internal error while fetching specific blog",error);
    return res.status(500).json({message: "Internal error while fetching specific blogs"})
  }
};
