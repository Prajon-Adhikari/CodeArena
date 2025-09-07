import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaBehance,
  FaDribbble,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import {
  faBriefcase,
  faLocationDot,
  faPlus,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import folder from "../assets/folder.jpg";

const SearchProfile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [portfolioProjects, setPortfolioProjects] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const portfolioModal = location.pathname === "/profile/portfolio";

  useEffect(() => {
    const fetchPortfolioProjects = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/${id}/profile`
        );
        const data = await response.json();
        setPortfolioProjects(data.portfolioProjects);
        setProfileData(data.user);
        setLoading(false);
        console.log(data.user);
      } catch (error) {
        console.log("Error while fetching portfolio projects", error);
      }
    };
    fetchPortfolioProjects();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  const dummySkills = ["React", "JavaScript", "Node.js", "MongoDB", "Express"];
  const dummyVerifications = ["Email", "Phone", "Identity"];

  return (
    <div className="bg-gray-100 pt-[80px] text-[#2B2C34] pb-10">
      <div className="py-10 bg-white rounded-xl px-[80px] mt-[10px] mx-[50px] flex items-center">
        <div className="flex justify-between w-[800px] pr-10">
          <div className="flex gap-8">
            {profileData?.profilePic ? (
              <img
                src={profileData?.profilePic}
                alt="avatar"
                className="w-40 h-40 rounded-full border-4 border-white"
              />
            ) : (
              <div className="w-40 h-40 rounded-full border-4 flex items-center justify-center bg-indigo-900 text-white text-6xl">
                {profileData.fullName.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="pt-4 w-[400px]">
              <h2 className="text-3xl font-bold pb-2">
                {profileData?.fullName}
              </h2>
              <p className="text-gray-500 pb-2 text-sm">
                <FontAwesomeIcon icon={faBriefcase} className="pr-3" />
                Manager at Google
              </p>
              <p className="text-gray-500 text-sm">
                <FontAwesomeIcon icon={faLocationDot} className="pr-3" />
                London, United Kingdom
              </p>
              <div className="text-gray-500 pl-[1px] text-lg font-semibold mt-4">
                <span className="pr-2">100</span>
                <span>Follower</span>
                <span className="pl-10 pr-2">100</span>
                <span>Following</span>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <button className="bg-blue-400 text-white rounded-2xl px-8 py-2">
              Add Friend
            </button>
          </div>
        </div>
        <div className="border-l-2 border-gray-400 text-lg px-20">
          <div className="flex pb-2">
            <div className="font-bold pr-2 w-[180px]">Availability : </div>
            <span className="text-gray-500">Full-time</span>
          </div>
          <div className="flex pb-2">
            <div className="font-bold pr-2 w-[180px]">Age : </div>
            <span className="text-gray-500">32</span>
          </div>
          <div className="flex pb-6">
            <div className="font-bold pr-2 w-[180px]">Year Experience : </div>
            <span className="text-gray-500">6 </span>
          </div>
          <div className="flex gap-10 text-2xl text-blue-400">
            <FaFacebook />
            <FaInstagram />
            <FaLinkedin />
            <FaTwitter />
            <FaGithub />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mt-3 px-[50px] items-start pb-10">
        {/* Skills */}

        <div className="col-span-1 bg-white py-6 px-8 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {dummySkills.map((skill, i) => (
              <span
                key={i}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Links */}
          <h3 className="text-lg font-semibold mt-6 mb-4">Portfolio Links</h3>
          <div className="flex gap-4 text-2xl">
            <FaDribbble />
            <FaBehance />
            <FaLinkedin />
          </div>

          {/* Verifications */}
          <h3 className="text-lg font-semibold mt-6 mb-4">Verifications</h3>
          <ul className="space-y-2">
            {dummyVerifications.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <GoVerified className="text-green-500" /> {item} Verified
              </li>
            ))}
          </ul>

          {/* Proficiency */}
          <h3 className="text-lg font-semibold mt-6 mb-4">Language</h3>
          <ul className="text-sm space-y-1">
            <li>English</li>
            <li>Nepali</li>
            <li>Hindi</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl w-[945px] px-8 py-6 ">
          <div className="flex  items-center justify-between">
            <h2 className="font-semibold text-2xl">Portfolio</h2>
          </div>
          <div className="pt-3 border-b-1 border-gray-300 pb-12">
            {portfolioProjects.length > 0 ? (
              <div className="grid grid-cols-3 gap-10 ">
                {portfolioProjects.map((project, index) => {
                  return (
                    <Link to={`/profile/${project._id}`} state={{ from: location.pathname }}>
                      <div className=" h-[280px] shadow-lg p-2 rounded-lg hover:shadow-[0px_0px_5px_gray] cursor-pointer">
                        {project?.images?.map((img, index) => (
                          <img
                            key={index}
                            src={img.url} // Cloudinary URL
                            alt={`Project Image ${index + 1}`}
                            className="w-full h-[68%] object-cover rounded-lg mb-3"
                          />
                        ))}
                        <div className="pl-2 font-bold">
                          {project.projectTitle}
                        </div>
                        <div className="text-gray-500 text-sm line-clamp-2 pl-2">
                          {project.projectDescription}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div>
                <div className="flex flex-col items-center">
                  <img src={folder} alt="" className="w-[220px] h-[220px]" />
                  <p className="font-bold text-lg">
                    No projects yet, When you create a new project it appears
                    here
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="py-6 border-b-1 border-gray-300 ">
            <h2 className="font-semibold text-2xl pb-4 pl-1">Address</h2>
            <div className="grid grid-cols-2 gap-y-10 pl-2">
              <div>
                <p className="font-bold text-lg">Country:</p>
                <p className="">United Kingdom</p>
              </div>
              <div>
                <p className="font-bold text-lg">City:</p>
                <p className="">London</p>
              </div>
              <div>
                <p className="font-bold text-lg">Street:</p>
                <p className="">5th Street</p>
              </div>
            </div>
          </div>
          <div className="py-6">
            <h3 className="text-2xl font-semibold mb-3 pl-1">About</h3>
            <p className="pr-10 pl-1">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt
              excepturi velit sint nemo harum a accusamus tempore nisi? Laborum
              culpa asperiores adipisci maiores ut quas alias neque, corrupti
              accusamus non? Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Deserunt excepturi velit sint nemo harum a accusamus tempore
              nisi? Laborum culpa asperiores adipisci maiores ut quas alias
              neque, corrupti accusamus non?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProfile;
