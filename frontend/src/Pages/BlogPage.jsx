import React, { useState } from "react";
import { Link } from "react-router-dom";
import blogHeroImage from "../assets/blog-hero-image.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categoriesOptions = [
  { value: "hackathonPlanning", label: "Hackathon Planning" },
  { value: "participantResources", label: "Participant Resources" },
  { value: "businessImpact", label: "Business Impact" },
];

const posts = [
  {
    title: "The ultimate internal hackathon template and planning kit",
    category: "Hackathon planning",
    imageText: "Internal hackathon template and planning kit",
    imageBg: "bg-teal-600",
    createdDate: "Oct 17, 2025",
    likes: 24,
  },
  {
    title:
      "Dive into innovation: The Google Cloud AI in Action Hackathon on Devpost",
    category: "Participant resources",
    imageText: "Google Cloud AI in Action Hackathon on Devpost",
    imageBg: "bg-blue-600",
    createdDate: "Oct 17, 2025",
    likes: 24,
  },
  {
    title:
      "How to get executive buy-in for internal hackathons (With templates)",
    category: "Hackathon planning",
    imageText:
      "How to get exec buy-in for internal hackathons (With templates)",
    imageBg: "bg-teal-600",
    createdDate: "Oct 17, 2025",
    likes: 24,
  },
  {
    title: "From idea to impact: Measuring business outcomes from hackathons",
    category: "Business impact",
    imageText: "Measuring business outcomes from hackathons",
    imageBg: "bg-purple-600",
    createdDate: "Oct 17, 2025",
    likes: 24,
  },
  {
    title: "Top 10 tips for winning your next online hackathon",
    category: "Participant resources",
    imageText: "Top 10 tips for winning hackathons",
    imageBg: "bg-indigo-600",
    createdDate: "Oct 17, 2025",
    likes: 24,
  },
  {
    title: "How companies use internal hackathons to drive innovation",
    category: "Business impact",
    imageText: "Companies driving innovation with hackathons",
    imageBg: "bg-pink-600",
    createdDate: "Oct 17, 2025",
    likes: 24,
  },
  {
    title: "Hackathon planning checklist: Everything you need to prepare",
    category: "Hackathon planning",
    imageText: "Hackathon planning checklist",
    imageBg: "bg-orange-600",
    createdDate: "Oct 17, 2025",
    likes: 24,
  },
  {
    title: "Why participants love cross-functional team challenges",
    category: "Participant resources",
    imageText: "Cross-functional team benefits",
    imageBg: "bg-green-600",
    createdDate: "Oct 17, 2025",
    likes: 24,
  },
  {
    title: "The ROI of hackathons: What your CFO wants to know",
    category: "Business impact",
    imageText: "The ROI of hackathons",
    imageBg: "bg-red-600",
    createdDate: "Oct 17, 2025",
    likes: 24,
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All posts");
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState("All posts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const filteredPosts =
    selectedCategory === "All posts"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !selectedImage) {
      toast.error("Please fill all fields and select an image!");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("image", selectedImage); // single image

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/blogs`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // backend extracts userId
          },
          withCredentials: true,
        }
      );

      toast.success("Blog submitted successfully 🎉");

      // reset form
      setTitle("");
      setCategory("");
      setSelectedImage(null);

      console.log("Blog submitted:", res.data);
    } catch (err) {
      console.error("Failed to submit blog:", err);
      toast.error("Failed to submit blog");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="bg-gray-100 bg-cover bg-center h-[500px] px-[120px] mt-[80px] flex flex-col justify-center"
        style={{ backgroundImage: `url(${blogHeroImage})` }}
      >
        <h1 className="text-6xl w-[740px] text-white mb-8">
          Your Arena for Coding Stories & Insights.
        </h1>
        <p className="text-white w-[650px] mb-14">
          Welcome to CodeArena Blogs — a hub where developers, students, and
          innovators share coding knowledge, hackathon journeys, and the latest
          in tech. Whether you’re here to learn, compete, or get inspired, we’ve
          got you covered.
        </p>
        <div className="relative w-84 hidden md:block">
          <span className="absolute inset-y-0 left-5 flex items-center  text-gray-400">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-full border bg-white pl-13  pr-27 py-[10px] text-gray-700 outline-none"
          />
          <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-400 cursor-pointer text-white px-4 py-[10px] rounded-full text-sm hover:bg-blue-500">
            Search &rarr;
          </button>
        </div>
      </div>

      {/* Featured Article */}
      <div className="bg-white px-[140px] flex gap-4 rounded-lg mt-12 mb-16">
        {/* Left Graphic Side */}
        <div className="bg-teal-600 text-white h-[360px] w-[680px] p-8 relative">
          <h2 className="text-3xl font-bold ">
            How to get exec buy-in for internal hackathons (With templates)
          </h2>
          {/* Placeholder Images */}
          <div className="absolute bottom-4 right-4 flex gap-4">
            <div className="w-16 h-16 bg-white rounded shadow-sm"></div>
            <div className="w-16 h-16 bg-white rounded shadow-sm"></div>
            <div className="w-16 h-16 bg-white rounded shadow-sm"></div>
          </div>
        </div>

        {/* Right Content Side */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <span className="text-xs bg-teal-600 text-white px-3 py-1 rounded-full w-fit mb-4">
            Hackathon planning
          </span>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            How to get executive buy-in for your internal hackathons (With
            templates)
          </h3>
          <p className="text-gray-600 mb-6">
            Learn how to secure leadership approval for your internal hackathon
            — and get access to a business case template you can use to build
            your pitch.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-fit">
            Read more
          </button>
        </div>
      </div>

      {/* Tabs (Blog navigation) */}
      <div className=" px-[140px]">
        <div className="flex justify-center gap-8 cursor-pointer border-b pb-4 mb-6">
          <Link to="">
            {" "}
            <button className="text-gray-800 font-medium hover:text-blue-600 border-b-2 border-blue-600">
              Blog posts
            </button>{" "}
          </Link>
          <Link to="/all-resources">
            {" "}
            <button className="text-gray-500 hover:text-blue-600">
              All resources
            </button>{" "}
          </Link>
          <Link to="/customer-stories">
            {" "}
            <button className="text-gray-500 hover:text-blue-600">
              Customer stories
            </button>{" "}
          </Link>
          <Link to="/guides">
            {" "}
            <button className="text-gray-500 hover:text-blue-600">
              Guides
            </button>{" "}
          </Link>
          <Link to="/events">
            {" "}
            <button className="text-gray-500 hover:text-blue-600">
              Webinars & events
            </button>{" "}
          </Link>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-10">
          {categoriesOptions.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategory(cat.value);
                setSelectedCategoryLabel(cat.label);
              }}
              className={`px-4 py-2 rounded border cursor-pointer text-sm ${
                selectedCategory === cat.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Post grid */}
        <div className="flex justify-between items-center mb-6 mr-2">
          <h2 className="text-3xl font-semibold">{selectedCategoryLabel}</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="border-1 px-7 py-2 rounded-md font-semibold text-gray-600 cursor-pointer bg-gray-50"
          >
            {" "}
            Add Blog
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {filteredPosts.map((post, index) => (
            <div
              key={index}
              className="rounded overflow-hidden border shadow-sm bg-white"
            >
              <div
                className={`h-40 flex items-center justify-center text-white text-lg font-semibold p-4 ${post.imageBg}`}
              >
                {post.imageText}
              </div>
              <div className="p-4">
                <div className="pb-2">
                  <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                </div>
                <span className="text-sm text-gray-500 pl-1">
                  {post.createdDate}
                </span>
                <h3 className="mt-2 font-semibold text-lg leading-tight">
                  {post.title}
                </h3>
                <div className="flex justify-between pt-4 pr-5 items-center">
                  <button className="text-orange-500">Learn More &rarr;</button>
                  <span>
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-gray-500 mr-2 cursor-pointer"
                    />
                    {post.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-[500px] shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-gray-800"
            >
              ✖
            </button>
            <h2 className="text-2xl font-semibold mb-6">Add New Blog</h2>
            <form onSubmit={handleBlogSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Blog Title"
                className="border rounded p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select
                className="border rounded p-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                {categoriesOptions.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Blog Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border-2 border-gray-300 rounded p-2"
                />
                {selectedImage && (
                  <div className="mt-3">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      className="w-60 h-40 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                {submitting ? "Submitting..." : "Submit Blog"}
              </button>
            </form>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar
            />
          </div>
        </div>
      )}
    </>
  );
}
