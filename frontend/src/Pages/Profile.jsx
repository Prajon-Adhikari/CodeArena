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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

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
                <span className="pr-2">100</span><span>Follower</span>
                <span className="pl-10 pr-2">100</span><span>Following</span>
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
          <div className="flex pb-2"><div className="font-bold pr-2 w-[180px]">Availability : </div><span className="text-gray-500">Full-time</span></div>
          <div className="flex pb-2"><div className="font-bold pr-2 w-[180px]">Age : </div><span className="text-gray-500">32</span></div>
          <div className="flex pb-6"><div className="font-bold pr-2 w-[180px]">Year Experience : </div><span className="text-gray-500">6 </span></div>
          <div className="flex gap-8 text-2xl text-blue-400">
            <FaFacebook/>
            <FaInstagram/>
            <FaLinkedin/>
            <FaTwitter/>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-3 px-[50px] pb-10">
        {/* Skills */}
        
        <div className="col-span-1 bg-white py-6 px-8 rounded-2xl">
          <h3 className="text-lg font-semibold mb-3">About</h3>
          <p className="mb-5 text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Deserunt excepturi velit sint nemo harum a accusamus tempore
                nisi? Laborum culpa asperiores adipisci maiores ut quas alias
                neque, corrupti accusamus non?
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
      </div>
    </div>
  );
};

export default Profile;
