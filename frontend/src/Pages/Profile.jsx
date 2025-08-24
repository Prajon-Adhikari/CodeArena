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
import { MdEmail } from "react-icons/md";
import { GoVerified } from "react-icons/go";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/home`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
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

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center mt-10 text-gray-500">Please log in to view your profile.</div>;
  }

  return (
    <div className="bg-white min-h-screen text-[#2B2C34] p-6 md:p-12">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={profileData?.avatar}
              alt="avatar"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <div>
              <h2 className="text-xl font-bold">{profileData?.name}</h2>
              <p className="text-sm">{profileData?.role}</p>
              <p className="text-xs">{profileData?.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <p className="text-sm">
              <span className="font-semibold">Work:</span> {profileData?.work}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Education:</span> {profileData?.education}
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
              Hire Me
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-6 text-lg">
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedin />
          <MdEmail />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {/* Skills */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profileData?.skills.map((skill, i) => (
              <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
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

        {/* About & Experience */}
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mb-4">About Me</h3>
          <ul className="list-disc ml-6 text-sm space-y-2">
            {profileData?.about.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          {/* Experience */}
          <h3 className="text-lg font-semibold mt-6 mb-4">Experience</h3>
          <ul className="text-sm space-y-3">
            {profileData?.experience.map((exp, i) => (
              <li key={i}>
                <strong>{exp.role}</strong> @ {exp.company} ({exp.duration})
              </li>
            ))}
          </ul>

          {/* Portfolio */}
          <h3 className="text-lg font-semibold mt-6 mb-4">Portfolio</h3>
          <div className="grid grid-cols-3 gap-4">
            {profileData?.portfolio.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Portfolio ${i}`}
                className="w-full h-28 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;