import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogHeroImage from "../assets/blogheroimage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import aws from "../assets/aws.png";
import meta from "../assets/meta.png";
import google from "../assets/google.webp";
import microsoft from "../assets/mircosoft.jpg";
import okta from "../assets/okta.png";
import oracle from "../assets/oracle.png";

const categoriesOptions = [
  { value: "Hackathon planning", label: "Hackathon Planning" },
  { value: "Participant resources", label: "Participant Resources" },
  { value: "Business impact", label: "Business Impact" },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All posts");
  const [selectedCategoryLabel, setSelectedCategoryLabel] =
    useState("All posts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [popularBlog, setPopularBlog] = useState([]);

  const filteredPosts =
    selectedCategory === "All posts"
      ? blogs
      : blogs.filter((post) => post.category === selectedCategory);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const getBlogs = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/home/blogs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setBlogs(data.blogs);
      setPopularBlog(data.popularBlog);
    } catch (error) {
      console.log("Error while fetching blogs", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !selectedImage || !description) {
      toast.error("Please fill all fields and select an image!");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("image", selectedImage); // single image

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/home/blogs`,
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
      setDescription("");
      setSelectedImage(null);

      getBlogs();

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
        className="bg-gray-100 bg-cover bg-center pb-10 relative h-[580px] pt-14 px-[120px] mt-[80px] flex flex-col justify-center"
        style={{ backgroundImage: `url(${blogHeroImage})` }}
      >
        {submitting && (
          <div className="overlay">
            <div className="loader"></div>
            <p className="loader-text">Submitting...</p>
          </div>
        )}
        <div className="absolute inset-0  bg-black opacity-20 ">{""}</div>
        <h1 className="relative text-6xl w-[740px] text-white mb-8 left-slide-animation">
          Your Arena for Coding Stories & Insights.
        </h1>
        <p className="relative text-white w-[650px] mb-14 left-slide-animation">
          Welcome to CodeArena Blogs — a hub where developers, students, and
          innovators share coding knowledge, hackathon journeys, and the latest
          in tech. Whether you’re here to learn, compete, or get inspired, we’ve
          got you covered.
        </p>
        <div className="relative w-84 hidden md:block left-slide-animation">
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
        <div className="relative mt-16 bg-white w-full h-[85px] flex items-center right-slide-animation justify-evenly">
          <img src={microsoft} alt="" className="w-[130px] h-[85px]" />
          <img src={google} alt="" className="w-[150px] h-[85px]" />
          <img src={aws} alt="" className="w-[130px] h-[85px]" />
          <img src={okta} alt="" className="w-[130px] h-[85px]" />
          <img src={oracle} alt="" className="w-[130px] h-[85px]" />
          <img src={meta} alt="" className="w-[120px] h-[70px]" />
        </div>
      </div>

      <div className="bg-white px-[140px] rounded-lg mt-22 mb-16 animation">
        <h2 className="font-semibold text-4xl mb-10 pl-4 ml-1 border-blue-400 border-l-4">
          What's New Today ?
        </h2>
        <div className={`flex items-center gap-10 mb-4`}>
          {popularBlog?.images?.map((img, index) => (
            <img
              key={index}
              src={img.url} // Cloudinary URL
              alt={`Project Image ${index + 1}`}
              className="w-[640px] h-[400px] object-cover rounded-lg mb-4"
            />
          ))}

          {/* Right Content Side */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <span className="text-xs bg-teal-600 text-white px-3 py-1 rounded-full w-fit mb-4">
              {popularBlog.category}
            </span>
            <span className="text-sm text-gray-500 pl-1 pb-6">
              {formatDate(popularBlog.createdAt)}
            </span>
            <h3 className="text-4xl font-semibold text-gray-800 mb-4">
              {popularBlog.title}
            </h3>
            <p className="text-gray-600 mb-6 line-clamp-6">
              {popularBlog.description}
            </p>
            <Link to={`/blog/${popularBlog._id}`}>
              <button className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-blue-700 w-fit">
                Read more
              </button>
            </Link>
          </div>
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
                if (selectedCategory === cat.value) {
                  // If clicking the same category again → reset to All posts
                  setSelectedCategory("All posts");
                  setSelectedCategoryLabel("All posts");
                } else {
                  // Normal behavior → set category
                  setSelectedCategory(cat.value);
                  setSelectedCategoryLabel(cat.label);
                }
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
            <Link to={`/blog/${post._id}`}>
              <div
                key={index}
                className="rounded-xl shadow-[0px_0px_4px_gray] hover:shadow-[0px_0px_10px_gray] cursor-pointer p-2 pt-11 overflow-hidden bg-white"
              >
                <div className={`h-50 flex  items-center justify-center mb-4`}>
                  {post?.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img.url} // Cloudinary URL
                      alt={`Project Image ${index + 1}`}
                      className="w-[640px] h-[260px] object-cover rounded-lg mb-4"
                    />
                  ))}
                </div>

                <div className="py-4 px-3">
                  <div className="pb-2 pt-1">
                    <span
                      className={`text-xs text-gray-700 ${
                        post.category === "Hackathon planning"
                          ? "bg-teal-400"
                          : post.category === "Participant resources"
                          ? "bg-blue-300"
                          : "bg-orange-300"
                      }  px-3 py-1 rounded-full font-medium`}
                    >
                      {post.category}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 pl-1">
                    {formatDate(post.createdAt)}
                  </span>
                  <h3 className="mt-2 font-semibold text-lg leading-tight pl-1 h-12 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="pt-2 pl-1 pr-2 text-gray-700 line-clamp-2">
                    {post.description}
                  </div>
                  <div className="flex justify-between pt-4 pl-1 pr-5 items-center">
                    <button className="text-orange-500">
                      Learn More &rarr;
                    </button>
                    <div className="text-sm italic">
                      <span className="pr-1">Created by :</span>
                      {post.userId.fullName}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0  bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-[500px] shadow-[0px_0px_5px_gray] relative">
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
              <textarea
                placeholder="Blog Description"
                className="border rounded p-2 h-24 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
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
                className="bg-blue-600 text-white py-3 cursor-pointer rounded hover:bg-blue-700 disabled:bg-gray-400"
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
