import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faBuildingColumns,
  faFlag,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

export default function Rules() {
  const { id } = useParams();
  const location = useLocation();
  const [hackathon, setHackathon] = useState("");
  const [hackathonRules, setHackathonRules] = useState({});

  const tabs = [
    { path: "overview", label: "Overview" },
    { path: "myproject", label: "My Project" },
    { path: "rules", label: "Rules" },
    { path: "prizes", label: "Prizes" },
    { path: "judges", label: "Judges" },
  ];

  const ruleStyle = {
    marginBottom: "15px",
    whiteSpace: "pre-line", // <- preserves \n as line breaks
    paddingLeft: "8px",
  };

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
    const fetchHackathonRules = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/${id}/rules`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        setHackathonRules(data.rules);
      } catch (error) {
        console.log("Error while fetching hackathon rules", error);
      }
    };
    fetchHackathonRules();
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
      <div className="flex px-[200px] py-20  gap-20">
        <div className="">
          <h2 className="text-5xl font-bold mb-10 pb-1 px-2 inline-block border-b-3 border-b-gray-700">
            Rules
          </h2>

          {hackathonRules?.eligibility && (
            <div style={ruleStyle}>
              <h3 className="text-2xl font-bold pb-2">Eligibility</h3>
              {hackathonRules.eligibility.split("\n").map((line, index) => (
                <p key={index} className="text-xl mb-4">
                  {line}
                </p>
              ))}
            </div>
          )}
          {hackathonRules?.teamFormation && (
            <div style={ruleStyle}>
              <h3 className="text-2xl font-bold pb-2 pt-6">Team Formation</h3>
              {hackathonRules.teamFormation.split("\n").map((line, index) => (
                <p key={index} className="text-xl mb-4">
                  {line}
                </p>
              ))}
            </div>
          )}

          {hackathonRules?.submissionRequirements && (
            <div style={ruleStyle}>
              <h3 className="text-2xl font-bold pb-2 pt-6">
                Submission Requirements
              </h3>
              {hackathonRules.submissionRequirements
                .split("\n")
                .map((line, index) => (
                  <p key={index} className="text-xl mb-4">
                    {line}
                  </p>
                ))}
            </div>
          )}

          {hackathonRules?.codeOfConduct && (
            <div style={ruleStyle}>
              <h3 className="text-2xl font-bold pb-2 pt-6">Code of Conduct</h3>
              {hackathonRules.codeOfConduct.split("\n").map((line, index) => (
                <p key={index} className="text-xl mb-4">
                  {line}
                </p>
              ))}
            </div>
          )}

          {hackathonRules?.prohibited && (
            <div style={ruleStyle}>
              <h3 className="text-2xl font-bold pb-2 pt-6">Prohibited</h3>
              {hackathonRules.prohibited.split("\n").map((line, index) => (
                <p key={index} className="text-xl mb-4">
                  {line}
                </p>
              ))}
            </div>
          )}

          {hackathonRules?.disqualification && (
            <div style={ruleStyle}>
              <h3 className="text-2xl font-bold pb-2 pt-6">Disqualification</h3>
              {hackathonRules.disqualification
                .split("\n")
                .map((line, index) => (
                  <p key={index} className="text-xl mb-4">
                    {line}
                  </p>
                ))}
            </div>
          )}
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
