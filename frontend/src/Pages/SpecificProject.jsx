import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProgressBar = ({ label, value, max = 10, onChange }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="mb-6 w-[80%]">
      {/* Label + Value */}
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-indigo-600">
          {value}/{max}
        </span>
      </div>

      {/* Slider styled like progress bar */}
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #6366F1 ${percentage}%, #e5e7eb ${percentage}%)`,
        }}
      />
    </div>
  );
};

export default function SpecificProject() {
  const [submittedProject, setSubmittedProject] = useState({});
  const { id } = useParams();
  const location = useLocation();
  const [showJudging, setShowJudging] = useState(false);
  const [manuallyOpened, setManuallyOpened] = useState(false);
  const [isJudgingAlreadyExist, setIsJudgingAlreadyExist] = useState(false);
  const [isJudgedHackathon, setIsJudgedHackathon] = useState(false);

  const [scores, setScores] = useState([
    { label: "Innovation", value: 0 },
    { label: "Technical", value: 0 },
    { label: "Design", value: 0 },
    { label: "Impact", value: 0 },
    { label: "Presentation", value: 0 },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const body = {
      innovation: scores[0].value,
      technicalImplementation: scores[1].value,
      design: scores[2].value,
      impact: scores[3].value,
      presentation: scores[4].value,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/home/project/${id}/judging`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success("Edited successfully!");
    } catch (err) {

      if (err.response) {
        // Server returned a response with error code
        setError(err.response.data.message || "Failed to submit scores");
      } else if (err.request) {
        // Request made but no response
        setError("No response from server. Please try again.");
      } else {
        // Other errors
        setError("Error while submitting scores");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSpecificProjectDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/project/${id}`
        );
        const data = await response.json();
        setSubmittedProject(data.submittedProject || {});
      } catch (error) {
        console.log("Error while fetching specific project", error);
      }
    };
    fetchSpecificProjectDetails();
  }, [id]);

  useEffect(() => {
    const fetchJudgingScores = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/project/${id}/judging`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.judgingScore) {
          setScores([
            {
              label: "Innovation",
              value: data.judgingScore.criteria.innovation || 0,
            },
            {
              label: "Technical",
              value: data.judgingScore.criteria.technicalImplementation || 0,
            },
            { label: "Design", value: data.judgingScore.criteria.design || 0 },
            { label: "Impact", value: data.judgingScore.criteria.impact || 0 },
            {
              label: "Presentation",
              value: data.judgingScore.criteria.presentation || 0,
            },
          ]);
          setShowJudging(true); // automatically show sliders if scores exist
          setManuallyOpened(false);
          setIsJudgingAlreadyExist(true);
          setIsJudgedHackathon(data.isJudgedHackathon);
        }
      } catch (error) {
        console.log("Error while fetching judging score", error);
      }
    };
    fetchJudgingScores();
  }, [id]);

  const previousPath = location.state?.from || "/";

  const handleScoreChange = (index, newValue) => {
    setScores((prevScores) =>
      prevScores.map((s, i) => (i === index ? { ...s, value: newValue } : s))
    );
  };

  return (
    <div className="mt-[140px] px-[140px] pb-20">
      <p className="font-semibold text-xl pb-10">
        <Link to={previousPath} className="pr-2 ">
          Project
        </Link>{" "}
        <span className="text-orange-600">&rarr;</span>{" "}
        <Link to={`/project/${id}`} className="pl-2 text-orange-600">
          {submittedProject.projectTitle}
        </Link>
      </p>
      <div className="flex gap-30">
        <div className="w-[710px]">
          {submittedProject?.videos?.map((video, index) => (
            <video
              key={index}
              src={video.url}
              controls
              className="w-[640px] rounded-lg border mb-4"
            />
          ))}
          <h2 className="font-bold text-4xl pt-4">
            {submittedProject.projectTitle}
          </h2>
          <div className="text-xl pt-3 text-gray-800">
            {submittedProject.projectDescription}
          </div>
          {!showJudging && !manuallyOpened && isJudgedHackathon && (
            <button
              onClick={() => {
                setShowJudging(true);
                setManuallyOpened(true); // mark as manually opened
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg mt-6"
            >
              Judge Now
            </button>
          )}
          {showJudging && (
            <div className="pt-16">
              <h3 className="font-bold text-3xl mb-3">Judging Scores</h3>
              {scores.map((s, i) => (
                <ProgressBar
                  key={i}
                  label={s.label}
                  value={s.value}
                  max={10}
                  onChange={(newValue) => handleScoreChange(i, newValue)}
                />
              ))}

              {error && <p className="text-red-500 mb-3">{error}</p>}

              {isJudgedHackathon && (
                <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg mt-4"
              >
                {loading
                  ? isJudgingAlreadyExist
                    ? "Editing..."
                    : "Submitting..."
                  : isJudgingAlreadyExist
                  ? "Edit Scores"
                  : "Submit Scores"}
              </button>
              )}

              {showJudging && manuallyOpened && isJudgedHackathon && (
                <button
                  onClick={() => {
                    setShowJudging(false);
                    setManuallyOpened(false);
                  }}
                  className="font-semibold px-6 py-2 rounded-lg mt-4 bg-gray-300 ml-6 hover-gray-200"
                >
                  Cancel
                </button>
              )}
            </div>
          )}
        </div>
        <div className="pt-3">
          <h3 className="font-bold text-3xl">Technologies Used</h3>
          <div className="pt-3 flex flex-wrap">
            {submittedProject?.tech?.map((t, index) => {
              return (
                <span
                  key={index}
                  className="border-2 mr-4 px-6 py-1 mt-3 capitalize rounded-3xl text-xl"
                >
                  {t}
                </span>
              );
            })}
          </div>
          <h3 className="font-bold text-3xl mt-10">Tags</h3>
          <div className="pt-3 flex flex-wrap">
            {submittedProject?.tags?.map((t, index) => {
              return (
                <span
                  key={index}
                  className="border-2 mr-4 px-6 py-1 mt-3 rounded-3xl text-xl"
                >
                  {t.fullName}
                </span>
              );
            })}
          </div>
          <div className="pt-10">
            {submittedProject.githubLink && (
              <div className="border p-4 rounded-lg shadow-md bg-gray-50">
                <h2 className="text-gray-700 font-semibold">Github Link</h2>
                <a
                  href={submittedProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {submittedProject.githubLink}
                </a>
              </div>
            )}
          </div>
          <div className="pt-10">
            {submittedProject.projectLink && (
              <div className="border p-4 rounded-lg shadow-md bg-gray-50">
                <h2 className="text-gray-700 font-semibold">Project Link</h2>
                <a
                  href={submittedProject.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {submittedProject.projectLink}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
