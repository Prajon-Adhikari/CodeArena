import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function SpecificBlog() {
  const { id } = useParams();
  const [portfolioProject, setPortfolioProject] = useState({});

  useEffect(() => {
    const fetchSpecificPortfolioProjectDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/profile/${id}`
        );
        const data = await response.json();
        setPortfolioProject(data.portfolioProject);
      } catch (error) {
        console.log("Error while fetching specific portfolio project");
      }
    };
    fetchSpecificPortfolioProjectDetails();
  }, [id]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="mt-[80px]">
      <div className="px-[140px] py-10">
        <p className="font-semibold text-xl">
          <Link to="/profile" className="pr-2 ">
            Profile
          </Link>{" "}
          <span className="text-orange-600">&rarr;</span>{" "}
          <Link to={`/profile/${id}`} className="pl-2 text-orange-600">
            {portfolioProject.projectTitle}
          </Link>
        </p>
        <div className="pt-10 flex gap-20">
          <div className="pb-2 pt-1 w-[600px]">
            <div className="pt-8 font-semibold text-5xl">
              {portfolioProject.projectTitle}
            </div>
            <div className="pt-6">
              {portfolioProject?.images?.map((img, index) => (
                <img
                  key={index}
                  src={img.url} // Cloudinary URL
                  alt={`Project Image ${index + 1}`}
                  className="w-[200px] h-[200px] object-cover rounded-lg mb-4"
                />
              ))}
            </div>
            <div className="text-lg font-semibold py-6 italic text-gray-700">
              {portfolioProject.projectDescription}
            </div>
            <div className="pt-6 text-xl pb-2 pl-1 font-semibold text-gray-600">
              Skills and Delieveries
            </div>
            <div className="flex flex-wrap gap-2">
              {portfolioProject?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-red-700 px-4 py-1 rounded-full font-medium capitalize"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="shadow-[0px_0px_5px_gray] w-[620px] h-[300px] rounded-xl">
              {portfolioProject?.videos?.map((vid, index) => (
                <video
                  key={index}
                  src={vid.url} // Cloudinary URL
                  alt={`Project Video ${index + 1}`}
                  controls
                  controlsList="nodownload"
                  className="w-full h-full rounded-lg mb-4"
                />
              ))}
            </div>
            <div className=" pt-4 text-right px-1 text-gray-700 text-md ">
              Published on : {formatDate(portfolioProject.createdAt)}
            </div>
            <div className="pt-8">
              {portfolioProject.projectLink && (
                <div className="border p-4 rounded-lg shadow-md bg-gray-50">
                  <h2 className="text-gray-700 font-semibold">Project Link</h2>
                  <a
                    href={portfolioProject.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {portfolioProject.projectLink}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
