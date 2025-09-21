import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function SpecificBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [relatedBlog, setRelatedBlog] = useState([]);

  useEffect(() => {
    const fetchSpecificBlogDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/blog/${id}`
        );
        const data = await response.json();
        setBlog(data.blog);
        setRelatedBlog(data.relatedBlog);
      } catch (error) {
        console.log("Error while fetching specific blog");
      }
    };
    fetchSpecificBlogDetails();
  }, [id]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="mt-[80px]">
      <div className="px-[140px] py-10 ">
        <p className="font-semibold text-xl">
          <Link to="/blog" className="pr-2 ">
            Blog
          </Link>{" "}
          <span className="text-orange-600">&rarr;</span>{" "}
          <Link to={`/blog/${id}`} className="pl-2 text-orange-600">
            {blog.title}
          </Link>
        </p>
        <div className="pt-10 flex gap-20 ">
          <div className="pb-2 pt-1 w-[600px] left-slide-animation">
            <div>
              <span
                className={`text-lg px-6 py-2 text-gray-700 ${
                  blog.category === "Hackathon planning"
                    ? "bg-teal-400"
                    : blog.category === "Participant resources"
                    ? "bg-blue-300"
                    : "bg-orange-300"
                }  rounded-lg font-medium`}
              >
                {blog.category}
              </span>
            </div>
            <div className="pt-8 font-semibold text-5xl">{blog.title}</div>
            <div className="text-lg font-semibold py-8 italic text-gray-700">
              {blog.description}
            </div>
            <div className="text-lg pt-10">
              By {blog.userId?.fullName || "Unknown"}
            </div>
            <div className="text-lg pt-2">
              Created at: {formatDate(blog.createdAt)}
            </div>
          </div>
          <div className="right-slide-animation">
            {blog?.images?.map((img, index) => (
              <img
                key={index}
                src={img.url} // Cloudinary URL
                alt={`Project Image ${index + 1}`}
                className="w-[620px] h-[400px] object-cover rounded-lg mb-4"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="px-[140px] ">
        {relatedBlog.length > 0 && (
          <>
            <h2 className="text-center font-semibold text-5xl py-10">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
              {relatedBlog.map((post, index) => (
                <Link to={`/blog/${post._id}`}>
                  <div
                    key={index}
                    className="rounded-xl shadow-[0px_0px_4px_gray] hover:shadow-[0px_0px_10px_gray] cursor-pointer p-2 pt-11 overflow-hidden bg-white"
                  >
                    <div
                      className={`h-50 flex  items-center justify-center mb-4`}
                    >
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
          </>
        )}
        <div className="w-full text-center mb-24">
            <Link to="/blog"><button className="bg-blue-400 cursor-pointer hover:bg-blue-300 text-white text-xl px-9 py-[10px] rounded-lg">View All Posts</button></Link>
        </div>
      </div>
    </div>
  );
}
