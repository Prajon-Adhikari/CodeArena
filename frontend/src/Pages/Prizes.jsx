import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faBuildingColumns,
  faFlag,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

export default function Prizes() {
  const { id } = useParams();
  const location = useLocation();
  const [hackathon, setHackathon] = useState("");
  const [prizes, setPrizes] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [isMyHostedHackathon, setIsMyHostedHackathon] = useState(false);

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
        setParticipants(data.participants);
        setIsMyHostedHackathon(data.isHostedHackathon || false);
      } catch (error) {
        console.log("Failed to fetch hackathon", error);
      }
    };
    fetchHackathonDetails();
  }, [id]);

  useEffect(() => {
    const fetchPrizesDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/${id}/prizes`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        setPrizes(data.prizes);
      } catch (error) {
        console.log("Error while fetching prizes details", error);
      }
    };
    fetchPrizesDetails();
  }, [id]);
  return (
    <div className="pt-[60px] pb-10">
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
      <div className="px-[180px] py-20 flex justify-between">
        <div>
          <div className="flex justify-between items-center mb-10 mr-20">
            <h2 className="text-5xl font-bold pb-1 ">Prizes</h2>
            {isMyHostedHackathon?<button className="border-2 cursor-pointer hover:shadow-[0px_0px_5px_gray] border-gray-600 px-8 rounded-lg text-lg">Edit</button>:<div></div>}
          </div>
          <div className="grid grid-cols-2 gap-10">
            {prizes.map((prize, index) => {
              return (
                <div key={index} className="w-[360px] mb-8">
                  <div className="font-bold text-[24px] pb-2">
                    ⭐ {prize.title}
                  </div>
                  <div className="pl-10">
                    <div className="text-gray-700 pb-2">
                      {prize.winnersCount} winner
                    </div>
                    <div className="text-lg font-semibold pb-2">
                      {prize.description}
                    </div>
                    <div className="text-lg font-semibold pb-2">
                      $ {prize.prizeValue} in cash
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
                  {(hackathon.themes || []).slice(0, 3).map((theme, index) => (
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
  );
}
