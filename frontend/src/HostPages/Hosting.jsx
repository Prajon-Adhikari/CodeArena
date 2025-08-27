import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faCalendar,
  faMapMarkerAlt,
  faLink,
  faGift,
  faList,
  faClock,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Hosting() {
  const [step, setStep] = useState(1); // track which section we are on

  // form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("");
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

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="flex justify-center my-14 pt-[50px] mt-20">
      <form className="space-y-7 w-[800px]" onSubmit={handleSubmit}>
        {/* STEP 1: BASIC INFO */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
            <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg">
              <FontAwesomeIcon icon={faList} className="mr-3" />
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-transparent focus:outline-none w-full"
              />
            </div>
            <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg">
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-transparent focus:outline-none w-full"
              />
            </div>
            <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg">
              <FontAwesomeIcon icon={faCalendar} className="mr-3" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent focus:outline-none w-full"
              />
            </div>
            <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg">
              <FontAwesomeIcon icon={faCalendar} className="mr-3" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent focus:outline-none w-full"
              />
            </div>
            <div className="flex justify-between">
              <div />
              <button
                type="button"
                onClick={nextStep}
                className="bg-purple-500 text-white py-2 px-4 rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: RULES */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Rules</h2>
            <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg">
              <textarea
                placeholder="Rules"
                value={rules}
                onChange={(e) => setRules(e.target.value)}
                className="bg-transparent focus:outline-none w-full"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-purple-500 text-white py-2 px-4 rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PRIZES */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Prizes</h2>
            <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg">
              <FontAwesomeIcon icon={faGift} className="mr-3" />
              <input
                type="text"
                placeholder="Prize Details"
                value={prizeDetails}
                onChange={(e) => setPrizeDetails(e.target.value)}
                className="bg-transparent focus:outline-none w-full"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-purple-500 text-white py-2 px-4 rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: JUDGES */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Judges</h2>
            <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg">
              <FontAwesomeIcon icon={faList} className="mr-3" />
              <input
                type="text"
                placeholder="Judging Criteria"
                value={judgingCriteria}
                onChange={(e) => setJudgingCriteria(e.target.value)}
                className="bg-transparent focus:outline-none w-full"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
