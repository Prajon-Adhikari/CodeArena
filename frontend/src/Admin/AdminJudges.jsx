import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faBuildingColumns,
  faFlag,
  faTags,
  faUser
} from "@fortawesome/free-solid-svg-icons";

export default function AdminJudges() {
  const { id } = useParams();
  const location = useLocation();
  const [hackathon, setHackathon] = useState({});
  const [judges, setJudges] = useState([]);
  const [participants, setParticipants] = useState([]);

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
      setParticipants(data.participants);
    } catch (error) {
      console.log("Failed to fetch hackathon", error);
    }
  };
  useEffect(() => {
    fetchHackathonDetails();
  }, [id]);

  useEffect(() => {
    const fetchJudgesDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/${id}/judges`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        setJudges(data.judges);
      } catch (error) {
        console.log("Error while fetching judges data", error);
      }
    };
    fetchJudgesDetails();
  }, [id]);
  return (
    <div className=" pb-10">
      <div className="bg-white flex rounded-bl-xl justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl text-slate-600 font-bold">HACKATHONS</h2>
      </div>
      <div className="bg-white rounded-xl">
        <div className="mt-10 mr-8">
          {hackathon && hackathon.bannerUrl ? (
            <img src={hackathon.bannerUrl} className="rounded-t-xl" />
          ) : (
            <div className="flex justify-center items-center text-white rounded-t-xl bg-gray-700 h-[220px] font-semibold text-3xl">
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
        <div className="px-[80px] py-20 flex gap-6">
          <div>
            <div className="flex justify-between items-center mb-10 mr-20">
              <h2 className="text-5xl font-bold pb-1 ">Judges</h2>
            </div>
            <div className="grid grid-cols-2 gap-10">
              {judges.map((judge, index) => {
                return (
                  <div key={index} className="mb-8 flex gap-5 items-start">
                    {judge.photoUrl ? (
                      <img src={judge.photoUrl} />
                    ) : (
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-4xl bg-gray-400 text-white px-7 py-[26px] rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-bold text-[24px] pb-2">
                        {judge.name.split(" (")[0]}
                      </div>

                      <div className="text-lg pb-1.5 line-clamp-2 overflow-hidden break-words">
                        {judge.bio}
                      </div>
                      <div className="text-gray-700 pb-2 italic">
                        {judge.role}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="bg-[#F8F8F8] border-1 border-gray-400 p-6  w-[400px] rounded-lg">
              <p className="bg-orange-200 w-45 text-center py-1 rounded-3xl">
                {" "}
                {(() => {
                  const deadline = new Date(hackathon.registrationDeadline);
                  const today = new Date();
                  const timeDiff = deadline.getTime() - today.getTime();
                  const remainingDays = Math.ceil(
                    timeDiff / (1000 * 60 * 60 * 24)
                  );

                  return remainingDays > 0
                    ? `${remainingDays} days to deadline`
                    : "Deadline passed";
                })()}
              </p>
              <p className="text-lg font-bold mt-2 pl-2">
                Registraion Deadline
              </p>
              <p className="pl-2 pt-1 pb-4 border-b-1 border-gray-400">
                {" "}
                {(() => {
                  const deadline = new Date(hackathon.registrationDeadline);
                  const formattedDate = deadline.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });

                  return formattedDate;
                })()}
              </p>
              <div className="flex justify-between px-4 py-8 text-lg border-b-1 border-gray-400">
                <div className="flex flex-col gap-5">
                  <p>
                    <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                    {hackathon.mode
                      ? hackathon.mode.charAt(0).toUpperCase() +
                        hackathon.mode.slice(1)
                      : ""}
                  </p>
                  <p>
                    <span className="font-bold">$ 100000</span> in cash
                  </p>
                </div>
                <div className="flex flex-col gap-5">
                  <p>
                    <FontAwesomeIcon
                      icon={faBuildingColumns}
                      className="mr-2"
                    />
                    Public
                  </p>
                  <p>
                    <span className="font-bold">{participants.length}</span>{" "}
                    participants
                  </p>
                </div>
              </div>
              <div className="my-8 mx-5">
                <div className="flex items-center justify-start gap-5 text-lg mb-5">
                  <FontAwesomeIcon
                    icon={faFlag}
                    className="text-slate-700 text-xl"
                  />
                  <span>{hackathon.organizerName}</span>
                </div>
                <div className="flex justify-start gap-5 text-sm">
                  <FontAwesomeIcon
                    icon={faTags}
                    className="text-slate-700 text-xl pt-1"
                  />
                  <span>
                    {(hackathon.themes || [])
                      .slice(0, 3)
                      .map((theme, index) => (
                        <div
                          key={index}
                          className="bg-orange-200 capitalize mb-1 mr-1 inline-block px-4 py-1"
                        >
                          {theme}
                        </div>
                      ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
