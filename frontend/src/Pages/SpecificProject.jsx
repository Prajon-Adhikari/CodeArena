import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

export default function SpecificProject() {
    const [submittedProject, setSubmittedProject] = useState({});
    const {id} = useParams();
    const location = useLocation();

    useEffect(() =>{
        const fetchSpecificProjectDetails = async () =>{
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/home/project/${id}`
                );
                const data = await response.json();
                setSubmittedProject(data.submittedProject || {});
            } catch (error) {
                console.log("Error while fetching specific project", error);
            }
        }
        fetchSpecificProjectDetails();
    }, [id]);

      const previousPath = location.state?.from || "/";

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
    </div>
  );
}
