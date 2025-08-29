import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faBuildingColumns,
  faFlag,
  faTags,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Judges() {
  const { id } = useParams();
  const location = useLocation();
  const [hackathon, setHackathon] = useState("");
  const [judges, setJudges] = useState([]);

  const tabs = [
    { path: "overview", label: "Overview" },
    { path: "myproject", label: "My Project" },
    { path: "rules", label: "Rules" },
    { path: "prizes", label: "Prizes" },
    { path: "judges", label: "Judges" },
  ];

  useEffect(() => {
    const fetchHackathonDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/${id}`,
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
      } catch (error) {
        console.log("Failed to fetch hackathon", error);
      }
    };
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
    <div className="pt-[60px]">
      <div>
        {hackathon && hackathon.bannerUrl ? (
          <img src={hackathon.bannerUrl} />
        ) : (
          <div className="flex justify-center items-center text-white bg-gray-700 h-[220px] font-semibold text-3xl">
            {hackathon.title}
          </div>
        )}
        <div className="flex justify-center items-center bg-gray-900 text-white text-xl">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={`/${id}/${tab.path}`}
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
      <div className="px-[180px] py-20 flex gap-10">
        <div>
          <h2 className="text-5xl font-bold mb-10 pb-4 pl-1">Judges</h2>
          <div className="grid grid-cols-2 gap-10">
            {judges.map((judge, index) => {
              return (
                <div key={index} className="mb-8 flex gap-5 items-start">
                  {judge.photoUrl ? (
                    <img src={judge.photoUrl} />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-5xl bg-gray-300 px-7 py-[24px] rounded-full"
                    />
                  )}
                  <div>
                    <div className="font-bold text-[24px] pb-2">
                      {judge.name}
                    </div>

                    <div className="text-lg pb-2 line-clamp-2 overflow-hidden break-words">
                      {judge.bio}
                    </div>
                    <div className="text-gray-700 pb-2 italic">
                      {judge.role} winner
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
            <p className="text-lg font-bold mt-2 pl-2">Registraion Deadline</p>
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
                  <FontAwesomeIcon icon={faBuildingColumns} className="mr-2" />
                  Public
                </p>
                <p>
                  <span className="font-bold">923</span> participants
                </p>
              </div>
            </div>
            <div className="my-8 mx-5">
              <div className="flex items-center justify-start gap-5 text-lg mb-5">
                <FontAwesomeIcon
                  icon={faFlag}
                  className="text-slate-700 text-xl"
                />
                <span>Google</span>
              </div>
              <div className="flex justify-start gap-5 text-sm">
                <FontAwesomeIcon
                  icon={faTags}
                  className="text-slate-700 text-xl pt-1"
                />
                <span>
                  <div className="bg-orange-200 mb-1 mr-1 inline-block  px-4 py-1">
                    Machine Learning
                  </div>
                  <div className="bg-orange-200 mb-1 mr-1 inline-block  px-4 py-1">
                    IoT
                  </div>
                  <div className="bg-orange-200 mb-1 mr-1 inline-block  px-4 py-1">
                    Beginner Friendly
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
