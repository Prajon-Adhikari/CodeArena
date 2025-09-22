import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

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

export default function AdminSpecificProject() {
  const [submittedProject, setSubmittedProject] = useState({});
  const { id } = useParams();
  const location = useLocation();

  const [scores, setScores] = useState([
    { label: "Innovation", value: 0 },
    { label: "Technical", value: 0 },
    { label: "Design", value: 0 },
    { label: "Impact", value: 0 },
    { label: "Presentation", value: 0 },
  ]);

  const [overallScores, setOverallScores] = useState(null);

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
    const fetchOverallJudingScore = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/home/project/${id}/overalljudging`
        );
        const data = await response.json();
        if (data.overall) {
          setOverallScores(data.overall);
        }
      } catch (error) {
        console.log("Error while fetching overall judging score");
      }
    };
    fetchOverallJudingScore();
  }, [id]);

  const previousPath = location.state?.from || "/";

  return (
    <div className=" pb-10">
      <div className="bg-white flex rounded-bl-xl justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl text-slate-600 font-bold">HACKATHONS</h2>
      </div>
      <div className="bg-white rounded-xl py-10 mt-10 mr-10">
        <div className=" px-[60px]">
          <p className="font-semibold text-xl pb-10">
            <Link to={previousPath} className="pr-2 ">
              Project
            </Link>{" "}
            <span className="text-orange-600">&rarr;</span>{" "}
            <Link to={`/menu/project/${id}`} className="pl-2 text-orange-600">
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
              {overallScores && (
                <div className="pt-16">
                  <h3 className="font-bold text-3xl mb-3">Average Scores</h3>

                  <ProgressBar
                    label="Innovation"
                    value={overallScores.avgInnovation || 0}
                    max={10}
                    readOnly
                  />
                  <ProgressBar
                    label="Technical"
                    value={overallScores.avgTechnical || 0}
                    max={10}
                    readOnly
                  />
                  <ProgressBar
                    label="Design"
                    value={overallScores.avgDesign || 0}
                    max={10}
                    readOnly
                  />
                  <ProgressBar
                    label="Impact"
                    value={overallScores.avgImpact || 0}
                    max={10}
                    readOnly
                  />
                  <ProgressBar
                    label="Presentation"
                    value={overallScores.avgPresentation || 0}
                    max={10}
                    readOnly
                  />

                  <p className="mt-4 text-lg font-semibold text-gray-700">
                    Average Total Score: {overallScores.avgTotalScore}/50
                  </p>
                  <p className="text-sm text-gray-500">
                    Judged by {overallScores.judgesCount}{" "}
                    {overallScores.judgesCount === 1 ? "judge" : "judges"}
                  </p>
                </div>
              )}
            </div>
            <div className="pt-3 w-[500px]">
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
                    <h2 className="text-gray-700 font-semibold">
                      Project Link
                    </h2>
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
        </div>
      </div>
    </div>
  );
}
