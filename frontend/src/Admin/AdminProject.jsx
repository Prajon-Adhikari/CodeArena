import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import folder from "../assets/folder.jpg";

export default function AdminProject() {
  const { id } = useParams();
  const location = useLocation();
  const [hackathon, setHackathon] = useState({});
  const [fetchSubmittedProjects, setFetchSubmittedProjects] = useState([]);

  const tabs = [
    { path: "overview", label: "Overview" },
    { path: "myproject", label: "My Project" },
    { path: "rules", label: "Rules" },
    { path: "prizes", label: "Prizes" },
    { path: "judges", label: "Judges" },
  ];

  const fetchHackathonDetails = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/menu/${id}/admin/overview`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setHackathon(data.hackathon);
      setFetchSubmittedProjects(data.submittedProjects || []);
    } catch (error) {
      console.log("Failed to fetch hackathon", error);
    }
  };
  useEffect(() => {
    fetchHackathonDetails();
  }, [id]);

  return (
    <div className=" pb-10 ">
      <div className="bg-white flex rounded-bl-xl justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl text-slate-600 font-bold">HACKATHONS</h2>
      </div>
      <div className="bg-white rounded-xl">
        <div className="mt-10 mr-8">
          {hackathon && hackathon.bannerUrl ? (
            <img src={hackathon.bannerUrl} className="rounded-t-xl"/>
          ) : (
            <div className="flex justify-center items-center rounded-t-xl text-white bg-gray-700 h-[220px] font-semibold text-3xl">
              {hackathon.title}
            </div>
          )}
          <div className="flex justify-center items-center bg-gray-900 text-white text-xl">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                to={`/menu/${id}/admin/${tab.path}`}
                className={`px-10 py-4 ${
                  location.pathname.endsWith(tab.path)
                    ? "bg-white text-gray-900 font-semibold"
                    : "hover:underline"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className=" py-20 ">
            {fetchSubmittedProjects.length !== 0 ? (
              <>
                <h2 className="text-4xl font-bold pl-20">Submitted Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 px-18 mt-15">
                  {fetchSubmittedProjects.map((project, index) => (
                    <>
                      <Link
                        to={`/project/${project._id}`}
                        state={{ from: location.pathname }}
                      >
                        <div
                          key={index}
                          className="rounded-xl h-[520px] shadow-[0px_0px_4px_gray] hover:shadow-[0px_0px_10px_gray] cursor-pointer p-2 pb-4 overflow-hidden bg-white"
                        >
                          <div
                            className={`min-h-48 flex  items-center justify-center mb-4`}
                          >
                            {project?.videos?.map((vdo, index) => (
                              <video
                                key={index}
                                src={vdo.url} // Cloudinary URL
                                alt={`Project Image ${index + 1}`}
                                className="w-[640px] h-[200px] rounded-lg border-1 border-gray-400"
                              />
                            ))}
                          </div>

                          <div className="mt-2 px-2">
                            {/* Team Name */}
                            <div className=" text-gray-800 font-bold text-lg">
                              Team: {project.teamName || "N/A"}
                            </div>
                            <div className=" flex flex-wrap">
                              {project?.tags?.map((member, index) => (
                                <span
                                  key={index}
                                  className="border-2 mr-4 px-4 py-1 mt-3 rounded-3xl text-sm"
                                >
                                  {member.fullName}
                                </span>
                              ))}
                            </div>
                            <h3 className="mt-4 font-bold text-lg leading-tight pl-1 line-clamp-2">
                              {project.projectTitle}
                            </h3>
                            <div className="pt-2 pl-1 pr-2 text-gray-700 line-clamp-3">
                              {project.projectDescription}
                            </div>
                            <div className="flex justify-between pt-4 pl-1 pr-5 items-center">
                              <button className="text-orange-500">
                                Learn More &rarr;
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="flex flex-col items-center">
                    <img src={folder} alt="" className="w-[220px] h-[220px]" />
                    <p className="font-bold text-2xl">
                      No projects submitted yet, When project submitted it
                      appears here
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
