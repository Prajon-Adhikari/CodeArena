import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faMapMarkerAlt,
  faLink,
  faUser,
  faGift,
  faList,
  faClipboardCheck,
  faHeading,
  faPen,
  faClock,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";

export default function Hosting() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [registration, setRegistration] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [prizeDetails, setPriceDetails] = useState("");
  const [rules, setRules] = useState("");
  const [judgingCriteria, setJudgingCriteria] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      startDate,
      endDate,
      registration,
      location,
      mode,
      organizer,
      prizeDetails,
      rules,
      judgingCriteria,
      bannerUrl,
    };
    console.log("Form submitted:", formData);
    // You can send `formData` to your backend here
  };

  return (
    <div>
      <form className="space-y-4 w-[500px]" onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg">
          <FontAwesomeIcon icon={faList} className="mr-3" />
          <input
            type="text"
            placeholder="Title"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent focus:outline-none w-full"
          />
        </div>

        {/* Description Input */}
        <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg">
          <FontAwesomeIcon icon={faPen} className="mr-3" />
          <input
            type="text"
            placeholder="Description"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            className="bg-transparent focus:outline-none w-full"
          />
        </div>

        {/* Start Date Input */}
        <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg relative">
          <FontAwesomeIcon icon={faCalendar} className="mr-3" />
          <input
            type="date"
            placeholder="Start Date"
            value={startDate}
            name="startDate"
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-transparent focus:outline-none w-full"
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
            className="bg-transparent focus:outline-none w-full"
          />
        </div>

        {/* Registration Date Input */}
        <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg relative">
          <FontAwesomeIcon icon={faClock} className="mr-3" />
          <input
            type="date"
            placeholder="Registration Date"
            value={registration}
            name="registration"
            onChange={(e) => setRegistration(e.target.value)}
            className="bg-transparent focus:outline-none w-full"
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
            className="bg-transparent focus:outline-none w-full"
          />
        </div>

        {/* Mode Input */}
        <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg relative">
          <FontAwesomeIcon icon={faDesktop} className="mr-3" />
          <select
            value={mode}
            name="mode"
            onChange={(e) => setMode(e.target.value)}
            className="bg-transparent focus:outline-none w-full"
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
            className="bg-transparent focus:outline-none w-full"
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
            onChange={(e) => setPriceDetails(e.target.value)}
            className="bg-transparent focus:outline-none w-full"
          />
        </div>

        {/* Rules Input */}
        <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg relative">
          <FontAwesomeIcon icon={faClipboardCheck} className="mr-3" />
          <textarea
            placeholder="Rules"
            value={rules}
            name="rules"
            onChange={(e) => setRules(e.target.value)}
            className="bg-transparent focus:outline-none w-full"
          />
        </div>

        {/* Judging Criteria Input */}
        <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg relative">
          <FontAwesomeIcon icon={faList} className="mr-3" />
          <input
            type="text"
            placeholder="Judging Criteria"
            value={judgingCriteria}
            name="judgingCriteria"
            onChange={(e) => setJudgingCriteria(e.target.value)}
            className="bg-transparent focus:outline-none w-full"
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
            className="bg-transparent focus:outline-none w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#D69ADE] text-white font-semibold py-3 px-4 rounded-lg text-lg hover:bg-purple-400 transition"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
