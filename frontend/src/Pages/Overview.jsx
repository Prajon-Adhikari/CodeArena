import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faBuildingColumns,
  faFlag,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function Overview() {
  const { id } = useParams();
  const location = useLocation();
  const [hackathon, setHackathon] = useState("");
  const [teamStatus, setTeamStatus] = useState("");
  const [referer, setReferer] = useState("");
  const [teamName, setTeamName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [showUnregisterConfirm, setShowUnregisterConfirm] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);

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
        setIsRegistered(data.isRegistered);
      } catch (error) {
        console.log("Failed to fetch hackathon", error);
      }
    };
    fetchHackathonDetails();
  }, [id]);

  useEffect(() => {
    if (hackathon?.startDate && hackathon?.endDate) {
      const registrationStart = moment(
        hackathon.registrationStart,
        "YYYY-MM-DD"
      ).toDate();
      const registrationEnd = moment(
        hackathon.registrationDeadline,
        "YYYY-MM-DD"
      ).toDate();
      const submissionStart = moment(
        hackathon.startDate,
        "YYYY-MM-DD"
      ).toDate();
      const submissionEnd = moment(hackathon.endDate, "YYYY-MM-DD").toDate();

      setEvents([
        {
          title: "Registration Period",
          start: registrationStart,
          end: registrationEnd,
        },
        {
          title: "Submission Period",
          start: submissionStart,
          end: submissionEnd,
        },
      ]);
      setCurrentDate(registrationStart);
    }
  }, [hackathon]);

  const handleHackathonRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/home/${id}/overview`,
        {
          teamName,
          teamStatus,
          referer,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Registration successful!");
      setIsRegistered(true);
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleUnregister = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/home/${id}/overview`,

        {
          withCredentials: true,
        }
      );
      toast.success("Unregistered successfully");
      setIsRegistered(false);
      setShowUnregisterConfirm(false);
    } catch (error) {
      toast.error("Failed to unregister");
      console.error("Unregister failed:", error);
    }
  };

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
      <div className="px-[140px] py-16 flex gap-20">
        <div className="w-[800px] ">
          <h1 className="text-4xl font-bold">{hackathon.title}</h1>
          <p className="text-[22px] pt-8">{hackathon.description}</p>
          {!isRegistered ? (
            <a href="#registration">
              <button className="bg-blue-400 cursor-pointer text-white py-2.5 px-8 my-14 text-xl rounded-[4px] hover:bg-blue-300">
                Join Hackathon
              </button>
            </a>
          ) : (
            <button
              onClick={() => setShowUnregisterConfirm(true)}
              className="bg-orange-500 text-white cursor-pointer py-2.5 px-8 my-14 text-xl rounded-[4px] hover:bg-orange-400"
            >
              Unregister
            </button>
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
      <div className="px-[140px] font-bold text-[40px] pb-4 pt-2 text-slate-800">
        Time Schedule
      </div>

      {events.length > 0 && (
        <div style={{ height: "700px" }} className="px-[140px]">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={["month"]}
            defaultView="month"
            date={currentDate || new Date()}
            onNavigate={(date) => setCurrentDate(date)}
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
            eventPropGetter={(event) => {
              let backgroundColor = "";
              let textColor = "black";

              if (event.title === "Registration Period") {
                backgroundColor = "#BBDCE5";
              } else if (event.title === "Submission Period") {
                backgroundColor = "#DFCCFB";
              } else {
                backgroundColor = "#F59E0B";
              }

              return {
                style: {
                  backgroundColor,
                  color: textColor,
                  padding: "25px",
                  textAlign: "center",
                  fontWeight: "bold",
                  borderRadius: "6px",
                },
              };
            }}
          />
        </div>
      )}

      <div id="registration"></div>
      {!isRegistered && (
        <div className="px-[140px] py-26 flex gap-30 items-center">
          <form
            action=""
            onSubmit={handleHackathonRegistration}
            className=" border-1 rounded-lg border-gray-400 w-[660px] p-10"
          >
            <h1 className="font-bold text-4xl">Register</h1>
            <p className="text-xl pt-2 pb-6 border-b-1 border-gray-400 text-gray-500">
              Please support our community guidelines
            </p>
            <div>
              <p className="pt-6 font-semibold text-xl pb-2">
                <span className="text-red-600">*</span> Team Name
              </p>
              <input
                type="text"
                placeholder="Enter you team name"
                className="border-2 border-gray-400 w-[90%] px-4 py-2 rounded-lg"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <p className="pt-6 font-semibold text-xl pb-2">
              <span className="text-red-600">*</span> Indicate your
              participation type
            </p>
            <div className="flex items-center text-lg">
              <input
                type="radio"
                name="teamStatus"
                value="individual"
                checked={teamStatus === "indivdual"}
                onChange={(e) => setTeamStatus(e.target.value)}
                id="solo"
                required
              />
              <label className="pl-2 pr-18 cursor-pointer" htmlFor="solo">
                Indivdual
              </label>
              <input
                type="radio"
                name="teamStatus"
                value="team"
                id="team"
                checked={teamStatus === "team"}
                onChange={(e) => setTeamStatus(e.target.value)}
              />
              <label className="pl-2 cursor-pointer" htmlFor="team">
                Already have team
              </label>
            </div>
            <p className="pt-8 pb-3 text-xl font-semibold">
              <span className="text-red-600">*</span> Who told you about{" "}
              {hackathon.title}?
            </p>
            <div className="flex items-center text-lg">
              <input
                type="radio"
                name="referer"
                value="codearena"
                id="codearena"
                checked={referer === "codearena"}
                onChange={(e) => setReferer(e.target.value)}
                required
              />
              <label className="pl-2 pr-18 cursor-pointer" htmlFor="codearena">
                CodeArena
              </label>
              <input
                type="radio"
                name="referer"
                value="college"
                id="college"
                checked={referer === "college"}
                onChange={(e) => setReferer(e.target.value)}
              />
              <label className="pl-2 pr-18 cursor-pointer" htmlFor="college">
                College
              </label>
              <input
                type="radio"
                name="referer"
                value="friend"
                id="friend"
                checked={referer === "friend"}
                onChange={(e) => setReferer(e.target.value)}
              />
              <label className="pl-2  pr-18 cursor-pointer" htmlFor="friend">
                Friends
              </label>
              <input
                type="radio"
                name="referer"
                value="other"
                id="other"
                checked={referer === "other"}
                onChange={(e) => setReferer(e.target.value)}
              />
              <label className="pl-2 cursor-pointer" htmlFor="other">
                Others
              </label>
            </div>

            <div className=" flex pt-8 border-t-1 border-gray-400 mt-8">
              <div>
                <input
                  type="checkbox"
                  name="termsAndConditions"
                  value="termsandconditions"
                  id="terms"
                  required
                />
              </div>
              <label
                htmlFor="terms"
                className="pl-2 text-xl font-semibold mb-8 cursor-pointer"
              >
                <span className="text-red-600">*</span> I have read and agree to
                your Community Guidelines and CodeArena Terms of Service
              </label>
            </div>
            <input
              type="submit"
              value="Register"
              className=" bg-blue-400 text-white text-xl py-2 px-8 cursor-pointer rounded-sm"
            />
          </form>
          <div>
            <h1 className="text-4xl font-bold ml-2 underline mb-8 text-red-400">
              Rules to Consider
            </h1>
            <ol className="list-decimal pl-6 space-y-2 text-2xl flex flex-col gap-6">
              <li>
                Please fill in all fields marked with an asterisk (
                <span className="font-bold text-red-600">*</span>).
              </li>
              <li>
                If you already have a team, make sure all members are registered
                bt their account before the deadline.
              </li>
              <li>
                Only one team leader should submit the project and invite the
                rest of the team during submission.
              </li>
              <li>
                If any team member is involved in multiple project submissions,
                the entire team will be disqualified.
              </li>
            </ol>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
      />
      {showUnregisterConfirm && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/20 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center w-[400px]">
            <h2 className="text-2xl font-bold mb-4">Confirm Unregister</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to unregister from this hackathon?
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={handleUnregister}
                className="bg-red-500 cursor-pointer text-white px-6 py-2 rounded hover:bg-red-400"
              >
                Yes
              </button>
              <button
                onClick={() => setShowUnregisterConfirm(false)}
                className="bg-gray-300 text-gray-800 cursor-pointer px-6 py-2 rounded hover:bg-gray-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
