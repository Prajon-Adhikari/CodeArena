import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faCalendar,
  faMapMarkerAlt,
  faLink,
  faUser,
  faGift,
  faList,
  faClock,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Hosting() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [prizeDetails, setPrizeDetails] = useState("");
  const [rules, setRules] = useState("");
  const [judgingCriteria, setJudgingCriteria] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/home/host/hackathon`,
        {
          title,
          description,
          startDate,
          endDate,
          registrationDeadline,
          location,
          mode,
          organizer,
          prizeDetails,
          rules,
          judgingCriteria,
          bannerUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      navigate("/hackathon");
    } catch (error) {
      console.log("Error while hosting hackathon", error);
    }
  };

  return (
    <div className="flex justify-center my-14">
      <form className="space-y-7 w-[1000px]" onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="flex gap-[70px] w-full justify-center ">
          <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg">
            <FontAwesomeIcon icon={faList} className="mr-3" />
            <input
              type="text"
              placeholder="Title"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent focus:outline-none w-[400px]"
            />
          </div>
          {/* Prize Details Input */}
          <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg relative">
            <FontAwesomeIcon icon={faGift} className="mr-3" />
            <input
              type="text"
              placeholder="Prize Details"
              value={prizeDetails}
              name="prizeDetails"
              onChange={(e) => setPrizeDetails(e.target.value)}
              className="bg-transparent focus:outline-none w-[400px]"
            />
          </div>
        </div>

        {/* Start Date Input */}
        <div className="flex gap-[70px] w-full justify-center ">
          <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg relative">
            <FontAwesomeIcon icon={faCalendar} className="mr-3" />
            <input
              type="date"
              placeholder="Start Date"
              value={startDate}
              name="startDate"
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent focus:outline-none w-[400px]"
            />
          </div>

          {/* End Date Input */}
          <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg relative">
            <FontAwesomeIcon icon={faCalendar} className="mr-3" />
            <input
              type="date"
              placeholder="End Date"
              value={endDate}
              name="endDate"
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent focus:outline-none w-[400px]"
            />
          </div>
        </div>

        <div className="flex gap-[70px] w-full justify-center ">
          {/* Registration Date Input */}
          <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg relative">
            <FontAwesomeIcon icon={faClock} className="mr-3" />
            <input
              type="date"
              placeholder="Registration Date"
              value={registrationDeadline}
              name="registrationDeadline"
              onChange={(e) => setRegistrationDeadline(e.target.value)}
              className="bg-transparent focus:outline-none w-[400px]"
            />
          </div>

          {/* Location Input */}
          <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg relative">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3" />
            <input
              type="text"
              placeholder="Location"
              value={location}
              name="location"
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent focus:outline-none w-[400px]"
            />
          </div>
        </div>

        <div className="flex gap-[70px] w-full justify-center ">
          {/* Mode Input */}
          <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg relative">
            <FontAwesomeIcon icon={faDesktop} className="mr-3" />
            <select
              value={mode}
              name="mode"
              onChange={(e) => setMode(e.target.value)}
              className="bg-transparent focus:outline-none w-[400px]"
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* Organizer Input */}
          <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg relative">
            <FontAwesomeIcon icon={faUser} className="mr-3" />
            <input
              type="text"
              placeholder="Organizer"
              value={organizer}
              name="organizer"
              onChange={(e) => setOrganizer(e.target.value)}
              className="bg-transparent focus:outline-none w-[400px]"
            />
          </div>
        </div>

        <div className="flex gap-[70px] w-full justify-center ">
          {/* Judging Criteria Input */}
          <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg relative">
            <FontAwesomeIcon icon={faList} className="mr-3" />
            <input
              type="text"
              placeholder="Judging Criteria"
              value={judgingCriteria}
              name="judgingCriteria"
              onChange={(e) => setJudgingCriteria(e.target.value)}
              className="bg-transparent focus:outline-none w-[400px]"
            />
          </div>

          {/* Banner URL Input */}
          <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg relative">
            <FontAwesomeIcon icon={faLink} className="mr-3" />
            <input
              type="url"
              placeholder="Banner URL"
              value={bannerUrl}
              name="bannerUrl"
              onChange={(e) => setBannerUrl(e.target.value)}
              className="bg-transparent focus:outline-none w-[400px]"
            />
          </div>
        </div>

        <div className="flex gap-[70px] w-full justify-center ">
          {/* Description Input */}
          <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg">
            <textarea
              placeholder="Description"
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              className="bg-transparent focus:outline-none w-[432px]"
            />
          </div>

          {/* Rules Input */}
          <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg relative">
            <textarea
              placeholder="Rules"
              value={rules}
              name="rules"
              onChange={(e) => setRules(e.target.value)}
              className="bg-transparent focus:outline-none w-[432px]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#D69ADE] text-white font-semibold py-3 px-4 mt-5 rounded-lg text-lg hover:bg-purple-400 transition"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
