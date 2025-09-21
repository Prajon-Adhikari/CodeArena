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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoVerified } from "react-icons/go";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation, Link } from "react-router-dom";
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
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [skills, setSkills] = useState([]);
  const [projectDescription, setProjectDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [friends, setFriends] = useState([]);
  const [previewPic, setPreviewPic] = useState(null);

  const [editModal, setEditModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    about: "",
    work: "",
    country: "",
    city: "",
    street: "",
    skills: [],
    profilePic: null,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const portfolioModal = location.pathname === "/profile/portfolio";

  useEffect(() => {
    if (editModal) {
      setPreviewPic(profileData?.profilePic || null);
      setFormData({
        fullName: profileData?.fullName || "",
        about: profileData?.about || "",
        work: profileData?.work || "",
        country: profileData?.country || "",
        city: profileData?.city || "",
        street: profileData?.street || "",
        skills: profileData?.skills || [],
      });
    }
  }, [editModal, profileData]);

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
        setProfileData(data.user);
        setFriends(data.friends);
        setLoading(false);
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

  const dummyVerifications = ["Email", "Phone", "Identity"];

  // Inside your Profile component

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const form = new FormData();

      if (formData.fullName) form.append("fullName", formData.fullName);
      if (formData.work) form.append("work", formData.work);
      if (formData.about) form.append("about", formData.about);
      if (formData.country) form.append("country", formData.country);
      if (formData.city) form.append("city", formData.city);
      if (formData.street) form.append("street", formData.street);
      if (formData.skills) form.append("skills", formData.skills.join(","));
      if (formData.profilePic) form.append("image", formData.profilePic);

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/home/users`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      setProfileData(res.data.user);
      toast.success("Profile updated successfully!");
      setEditModal(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 pt-[80px] text-[#2B2C34] pb-10">
      <div className="py-10 bg-white rounded-xl px-[80px] mt-[10px] mx-[50px] flex items-center">
        <div className="flex justify-between w-[800px] pr-10">
          <div className="flex gap-8">
            {profileData?.profilePic ? (
              <img
                src={profileData?.profilePic}
                alt="avatar"
                className="w-40 h-40 rounded-full object-cover border-4 border-white"
              />
            ) : (
              <div className="w-40 h-40 rounded-full border-4 flex items-center justify-center bg-indigo-900 text-white text-6xl">
                {profileData.fullName.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="pt-4 w-[400px]">
              <h2 className="text-3xl font-bold pb-2">
                {profileData?.fullName || "-"}
              </h2>
              <p className="text-gray-500 pb-2 text-sm">
                <FontAwesomeIcon icon={faBriefcase} className="pr-3" />
                {profileData?.work || "--"}
              </p>
              <p className="text-gray-500 text-sm">
                <FontAwesomeIcon icon={faLocationDot} className="pr-3" />
                {profileData?.city || "--"}, {profileData?.country || "--"}
              </p>
              <div className="text-gray-500 pl-[1px] font-semibold mt-4">
                <span className="pr-2">{friends.length}</span>
                <span>Friends</span>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <button
              onClick={() => setEditModal(true)}
              className="bg-blue-400 text-white rounded-2xl cursor-pointer px-8 py-2"
            >
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
            <div className="flex flex-wrap gap-2">
              {profileData.skills && profileData.skills.length > 0 ? (
                profileData.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 px-3 py-1 capitalize rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm">
                  No skills added yet
                </span>
              )}
            </div>
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
            <FontAwesomeIcon
              icon={faPlus}
              onClick={() => navigate("/profile/portfolio")}
              className="px-[9px] py-2 border-2 cursor-pointer border-blue-400 text-blue-400 rounded-full"
            />
          </div>
          <div className="pt-3 border-b-1 border-gray-300 pb-12">
            {portfolioProjects.length > 0 ? (
              <div className="grid grid-cols-3 gap-10 ">
                {portfolioProjects.map((project, index) => {
                  return (
                    <Link
                      to={`/profile/${project._id}`}
                      state={{ from: location.pathname }}
                    >
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
                <p>{profileData?.country || "-"}</p>
              </div>
              <div>
                <p className="font-bold text-lg">City:</p>
                <p>{profileData?.city || "-"}</p>
              </div>
              <div>
                <p className="font-bold text-lg">Street:</p>
                <p>{profileData?.country || "-"}</p>{" "}
              </div>
            </div>
          </div>
          <div className="py-6">
            <h3 className="text-2xl font-semibold mb-3 pl-1">About</h3>
            <p className="pr-10 pl-1">{profileData?.about || "-"}</p>
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
                <div className="flex flex-col gap-10 mt-7">
                  <div className="border-2 border-dotted border-gray-400 h-[180px] w-[510px] flex justify-center flex-col items-center rounded-3xl relative">
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

                        <div className="w-[510px] rounded-2xl border overflow-hidden">
                          <video
                            src={URL.createObjectURL(selectedVideo)}
                            controls
                            className="w-full h-auto rounded-2xl"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="border-2 border-dotted border-gray-400 h-[180px] w-[510px] flex flex-col items-center justify-center py-4 rounded-3xl relative">
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
      {editModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl w-[600px] max-h-[90vh] overflow-y-auto  shadow-lg relative">
            {/* Close button */}
            <button
              onClick={() => setEditModal(false)}
              className="absolute top-8 cursor-pointer right-3 text-gray-500 hover:text-black"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

            <form
              className="flex flex-col gap-4"
              onSubmit={handleProfileUpdate}
            >
              {/* Profile Pic Upload */}
              <div className="flex flex-col items-center mb-4">
                <div className="relative">
                  {previewPic ? (
                    // Show uploaded or existing picture
                    <img
                      src={previewPic}
                      alt="Profile Preview"
                      className="w-24 h-24 rounded-full object-cover mb-2 border"
                    />
                  ) : (
                    // Show first letter of name
                    <div className="w-24 h-24 rounded-full bg-indigo-900 text-white flex items-center justify-center text-4xl font-bold mb-2 border">
                      {profileData?.fullName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFormData({ ...formData, profilePic: file });
                        setPreviewPic(URL.createObjectURL(file)); // live preview
                      }
                    }}
                    className="hidden"
                    id="profilePicInput"
                  />
                  <label
                    htmlFor="profilePicInput"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded cursor-pointer"
                  >
                    Change
                  </label>
                </div>
              </div>

              {/* Work */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="border w-full p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">Work</label>
                  <input
                    type="text"
                    value={formData.work}
                    onChange={(e) =>
                      setFormData({ ...formData, work: e.target.value })
                    }
                    className="border w-full p-2 rounded-md"
                  />
                </div>
              </div>
              {/* About */}
              <div>
                <label className="block text-sm font-semibold">About</label>
                <textarea
                  value={formData.about}
                  onChange={(e) =>
                    setFormData({ ...formData, about: e.target.value })
                  }
                  className="border w-full p-2 rounded-md h-24"
                />
              </div>

              {/* Country + City */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="border w-full p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="border w-full p-2 rounded-md"
                  />
                </div>
              </div>

              {/* Street */}
              <div>
                <label className="block text-sm font-semibold">Street</label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                  className="border w-full p-2 rounded-md"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-semibold">Skills</label>
                <Select
                  isMulti
                  name="skills"
                  options={skillsOptions}
                  value={formData.skills.map((s) => ({ value: s, label: s }))}
                  onChange={(selected) =>
                    setFormData({
                      ...formData,
                      skills: selected.map((s) => s.value),
                    })
                  }
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

              {/* Save */}
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
