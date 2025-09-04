import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaBehance,
  FaDribbble,
  FaInstagram,
  FaPhone,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoVerified } from "react-icons/go";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import {
  faBriefcase,
  faLocationDot,
  faPlus,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import folder from "../assets/folder.jpg";

const skillsOptions = [
  { value: "react", label: "React" },
  { value: "javascript", label: "JavaScript" },
  { value: "nodejs", label: "Node.js" },
  { value: "mongodb", label: "MongoDB" },
  { value: "express", label: "Express" },
];

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [skills, setSkills] = useState([]);
  const [projectDescription, setProjectDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [portfolioProjects, setPortfolioProjects] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const portfolioModal = location.pathname === "/profile/portfolio";

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.log("Failed to fetch user:", error);
      }
    };

    const fetchProfileData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/profile");
        setProfileData(res.data);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoggedInUser();
    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchPortfolioProjects = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        setPortfolioProjects(data.portfolioProjects);
      } catch (error) {
        console.log("Error while fetching portfolio projects", error);
      }
    };
    fetchPortfolioProjects();
  }, []);

  const handlePortfolioSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("projectTitle", projectTitle);
      formData.append("projectDescription", projectDescription);
      formData.append("skills", skills.map((s) => s.value).join(","));
      formData.append("projectLink", projectLink);
      formData.append("image", selectedImage);

      if (selectedVideo) {
        formData.append("video", selectedVideo);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/home/profile/portfolio`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // backend extracts userId
          },
          withCredentials: true,
        }
      );

      navigate("/profile");

      setProjectTitle("");
      setProjectDescription("");
      setProjectLink("");
      setSkills([]);
      setSelectedVideo(null);
      setSelectedImage(null);
      toast.success("Portfolio project submitted successfully 🎉");
    } catch (err) {
      console.error("Failed to submit blog:", err);
      toast.error("Failed to submit blog");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 pt-[80px] text-[#2B2C34] ">
      <div className="py-10 bg-white rounded-xl px-[80px] mt-[10px] mx-[50px] flex items-center">
        <div className="flex justify-between w-[800px] pr-10">
          <div className="flex gap-8">
            <img
              src={profileData?.avatar}
              alt="avatar"
              className="w-40 h-40 rounded-full border-4 border-white"
            />
            <div className="pt-4 w-[400px]">
              <h2 className="text-3xl font-bold pb-2">{profileData?.name}</h2>
              <p className="text-gray-500 pb-2 text-sm">
                <FontAwesomeIcon icon={faBriefcase} className="pr-3" />
                {profileData?.role}
              </p>
              <p className="text-gray-500 text-sm">
                <FontAwesomeIcon icon={faLocationDot} className="pr-3" />
                {profileData?.location}
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
              Edit Profile
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
          <div className="flex gap-8 text-2xl text-blue-400">
            <FaFacebook />
            <FaInstagram />
            <FaLinkedin />
            <FaTwitter />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mt-3 px-[50px] pb-10">
        {/* Skills */}

        <div className="col-span-1 bg-white py-6 px-8 rounded-2xl">
          <h3 className="text-lg font-semibold mb-3">About</h3>
          <p className="mb-5 text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt
            excepturi velit sint nemo harum a accusamus tempore nisi? Laborum
            culpa asperiores adipisci maiores ut quas alias neque, corrupti
            accusamus non?
          </p>
          <h3 className="text-lg font-semibold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profileData?.skills.map((skill, i) => (
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
            {profileData?.verifications.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <GoVerified className="text-green-500" /> {item} Verified
              </li>
            ))}
          </ul>

          {/* Proficiency */}
          <h3 className="text-lg font-semibold mt-6 mb-4">Proficiency</h3>
          <ul className="text-sm space-y-1">
            {profileData?.proficiency.map((prof, i) => (
              <li key={i}>{prof}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-2xl w-[945px] px-8 py-6 ">
          <div className="flex  items-center justify-between">
            <h2 className="font-semibold text-2xl">Portfolio</h2>
            <FontAwesomeIcon
              icon={faPlus}
              onClick={() => navigate("/profile/portfolio")}
              className="px-[9px] py-2 border-2 cursor-pointer border-blue-400 text-blue-400 rounded-full"
            />
          </div>
          <div className="pt-3 border-b-1 border-gray-300 pb-12">
            {portfolioProjects.length > 0 ? (
              <div className="grid grid-cols-3 gap-10">
                {portfolioProjects.map((project, index) => {
                  return (
                    <div className=" h-[280px] shadow-lg p-2 rounded-lg ">
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
                  );
                })}
              </div>
            ) : (
              <div>
                <div className="flex flex-col items-center">
                  <img src={folder} alt="" className="w-[220px] h-[220px]"/>
                  <p className="font-bold text-lg">No projects yet, When you create a new project it appears here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {portfolioModal && (
        <div className="fixed inset-0  bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-[1200px] max-h-[90vh] overflow-y-auto  shadow-[0px_0px_5px_gray] relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-gray-800"
            >
              ✖
            </button>
            <h2 className="text-3xl font-semibold ">
              Add a new portfolio project
            </h2>
            <p className="text-gray-500 mb-6">
              All fields are required unless otherwise indicated
            </p>
            <form
              onSubmit={handlePortfolioSubmit}
              className="flex flex-col gap-4"
            >
              <div>
                <label htmlFor="projectTitle" className="text-sm">
                  Project title
                </label>
                <br />
                <input
                  type="text"
                  name="projectTitle"
                  id="projectTitle"
                  placeholder="Enter a brief but descriptive title"
                  className="border-2 w-full border-gray-400 rounded-lg text-sm py-2 px-4"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-20 ">
                <div>
                  <div>
                    <label htmlFor="description" className="text-sm">
                      Project description
                    </label>
                    <br />
                    <textarea
                      id="description"
                      name="projectDescription"
                      placeholder="Briefly describe the project's goals, your solution and the impact you made here"
                      className="border-2 w-[500px] min-h-[200px] border-gray-400 text-sm rounded-lg py-2 px-4"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="py-4">
                    <label htmlFor="tech" className=" text-sm px-1 py-1">
                      Skills Used
                    </label>
                    <Select
                      isMulti
                      name="skills"
                      options={skillsOptions}
                      value={skills}
                      onChange={setSkills}
                      placeholder="Mention skills you used..."
                      className="text-sm w-[500px]"
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderWidth: "2px",
                          borderRadius: "12px",
                          borderColor: "#B7B7B7",
                          padding: "1px 6px",
                          boxShadow: "none",
                          "&:hover": { borderColor: "#6B7280" },
                        }),
                        multiValue: (base) => ({
                          ...base,
                          borderWidth: "2px",
                          borderRadius: "9999px",
                          borderColor: "#000000",
                          backgroundColor: "#FFFFFF",
                          padding: "0px 8px",
                          "&:hover": { backgroundColor: "#EEEEEE" },
                        }),
                        multiValueLabel: (base) => ({
                          ...base,
                          color: "#000000", // Tailwind blue-900
                          fontWeight: "500",
                        }),
                        multiValueRemove: (base) => ({
                          ...base,
                          borderRadius: "9999px",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "#EEEEEE",
                            cursor: "pointer",
                            color: "#000000",
                          },
                        }),
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="projectLink" className="text-sm">
                      Project Link
                    </label>
                    <br />
                    <input
                      type="text"
                      id="projectLink"
                      placeholder="Enter a brief but descriptive title"
                      className="border-2 w-[500px] border-gray-400 rounded-lg text-sm py-2 px-4"
                      value={projectLink}
                      name="projectLink"
                      onChange={(e) => setProjectLink(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-6 mt-4">
                  <div className="border-2 border-dotted border-gray-400 h-[180px] w-[400px] flex justify-center flex-col items-center rounded-3xl relative">
                    {!selectedVideo ? (
                      <>
                        <label
                          htmlFor="videoUpload"
                          className="cursor-pointer flex items-center gap-4 border-1 border-dotted px-[15px] py-[16px] rounded-full w-fit hover:bg-gray-50 "
                        >
                          <FontAwesomeIcon icon={faVideo} x className="" />
                        </label>
                        <p className="text-sm pt-3">Upload a video</p>
                        <input
                          type="file"
                          id="videoUpload"
                          name="video"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => setSelectedVideo(e.target.files[0])}
                        />
                      </>
                    ) : (
                      <div className="relative">
                        {/* Cross button */}
                        <button
                          type="button"
                          onClick={() => setSelectedVideo(null)}
                          className="absolute -top-3 -right-3 cursor-pointer  text-black font-semibold bg-gray-200 rounded-full px-2 py-1 flex items-center justify-center text-sm"
                        >
                          ✕
                        </button>

                        <div className="w-[400px] h-[180px] rounded-2xl border overflow-hidden">
                          <video
                            src={URL.createObjectURL(selectedVideo)}
                            controls
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="border-2 border-dotted border-gray-400 h-[180px] w-[400px] flex flex-col items-center justify-center py-4 rounded-3xl relative">
                    {!selectedImage ? (
                      <>
                        <label
                          htmlFor="thumbnailUpload"
                          className="cursor-pointer flex items-center gap-4 border-1 border-dotted px-[15px] py-[14px] rounded-full w-fit hover:bg-gray-50 "
                        >
                          📷
                        </label>
                        <p className="text-sm pt-3">Upload a thumbnail</p>
                        <input
                          type="file"
                          id="thumbnailUpload"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => setSelectedImage(e.target.files[0])}
                        />
                      </>
                    ) : (
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setSelectedImage(null)}
                          className="absolute -top-3 -right-3 cursor-pointer text-black font-semibold bg-gray-200 rounded-full px-2 py-1 flex items-center justify-center text-sm"
                        >
                          ✕
                        </button>
                        <div className="w-[150px] h-[150px] rounded-xl border overflow-hidden">
                          <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Thumbnail Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white w-[140px] cursor-pointer py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                {submitting ? "Submitting..." : "Submit Project"}
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
    </div>
  );
};

export default Profile;
