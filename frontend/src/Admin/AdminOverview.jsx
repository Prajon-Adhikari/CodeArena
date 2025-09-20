import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faBuildingColumns,
  faFlag,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReactApexChart from "react-apexcharts";

const localizer = momentLocalizer(moment);

export default function AdminOverview() {
  const { id } = useParams();
  const location = useLocation();
  const [hackathon, setHackathon] = useState({});
  const [participants, setParticipants] = useState([]);
  const [submittedProjects, setSubmittedProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);

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
      setSubmittedProjects(data.submittedProjects);
    } catch (error) {
      console.log("Failed to fetch hackathon", error);
    }
  };
  useEffect(() => {
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
      )
        .add(1, "days")
        .toDate();
      const submissionStart = moment(
        hackathon.startDate,
        "YYYY-MM-DD"
      ).toDate();
      const submissionEnd = moment(hackathon.endDate, "YYYY-MM-DD")
        .add(1, "days")
        .toDate();

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

  const refererCounts = (participants || []).reduce((acc, participant) => {
    const key = participant.referer || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartLabels = Object.keys(refererCounts); // ["codearena", "college", ...]
  const chartSeries = Object.values(refererCounts); // [1, 2, ...]

  const projectLabels = (submittedProjects || []).map(
    (project, index) => project.title || `Project ${index + 1}`
  );

  const projectMembersCount = (submittedProjects || []).map((project) =>
    project.tags ? project.tags.length : 0
  );

  return (
    <div className="  pb-10">
      <div className="bg-white flex rounded-bl-xl justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl text-slate-600 font-bold">HACKATHONS</h2>
      </div>
      <div className="bg-white mr-8 pb-10 rounded-xl">
        <div className="mt-10 ">
          {hackathon && hackathon.bannerUrl ? (
            <img src={hackathon.bannerUrl} className="rounded-t-xl" />
          ) : (
            <div className="flex justify-center rounded-t-xl items-center text-white bg-gray-700 h-[220px] font-semibold text-3xl">
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
        <div className="px-[60px] py-16 flex justify-between">
          <div className="w-[800px] ">
            <div className="flex justify-between items-center mr-20">
              <h2 className="text-4xl font-bold pb-1 ">{hackathon.title}</h2>
            </div>
            <p className="text-[21px] pt-8">{hackathon.description}</p>
            <div>
              <h2 className="mt-10 font-semibold text-2xl mb-2">Themes</h2>
              <span>
                {(hackathon.themes || []).map((theme, index) => (
                  <div
                    key={index}
                    className="bg-orange-200 text-lg capitalize mb-1 mr-2 rounded-lg inline-block px-4 py-1"
                  >
                    {theme}
                  </div>
                ))}
              </span>
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
        <div className="px-[60px] font-bold text-[40px] pb-4 pt-2 text-slate-800">
          Time Schedule
        </div>

        {events.length > 0 && (
          <div style={{ height: "700px" }} className="px-[60px]">
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

        <div className="px-[60px] mt-16 flex justify-between">
          <div className="shadow-[0px_0px_5px_gray] rounded-lg py-6 px-2">
            <h2 className="text-xl font-bold mb-4 px-6">
              Project Members Count
            </h2>
            <ReactApexChart
              options={{
                chart: {
                  type: "bar",
                  height: 350,
                },
                plotOptions: {
                  bar: {
                    horizontal: true,
                    borderRadius: 6,
                  },
                },
                dataLabels: {
                  enabled: true,
                  formatter: (val) => `${val} members`,
                },
                xaxis: {
                  categories: projectLabels,
                },
              }}
              series={[
                {
                  name: "Members",
                  data: projectMembersCount,
                },
              ]}
              type="bar"
              height={200}
              width={700}
            />
          </div>
          <div className="shadow-[0px_0px_5px_gray] py-6 px-2 rounded-lg">
            <h1 className="text-xl font-bold mb-4 px-6">Source of Visits</h1>
            <ReactApexChart
              options={{
                chart: { type: "pie" },
                labels: chartLabels.map(
                  (label) => label.charAt(0).toUpperCase() + label.slice(1)
                ), // Capitalize
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: { width: 200 },
                      legend: { position: "bottom" },
                    },
                  },
                ],
              }}
              series={chartSeries}
              type="pie"
              width={340}
            />
          </div>
        </div>
        <div className="px-[60px] mt-16">
          <h2 className="text-3xl font-bold mb-4">Participants</h2>
          {(participants || []).length > 0 ? (
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full border-collapse">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-3 px-6 text-left border-b">#</th>
                    <th className="py-3 px-6 text-left border-b">Full Name</th>
                    <th className="py-3 px-6 text-left border-b">Team Name</th>
                    <th className="py-3 px-6 text-left border-b">Referer</th>
                    <th className="py-3 px-6 text-left border-b">Email</th>
                    <th className="py-3 px-6 text-left border-b">
                      Registration Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((participant, index) => (
                    <tr
                      key={participant._id || index}
                      className="hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 border-b">{index + 1}</td>
                      <td className="py-3 px-6 border-b">
                        {participant.username}
                      </td>
                      <td className="py-3 px-6 border-b capitalize">
                        {participant.teamName}
                      </td>
                      <td className="py-3 px-6 border-b capitalize">
                        {participant.referer || "Unknown"}
                      </td>
                      <td className="py-3 px-6 border-b ">
                        {participant.email || "Unknown"}
                      </td>
                      <td className="py-3 px-6 border-b">
                        {new Date(participant.createdAt).toLocaleDateString(
                          "en-US"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-lg">No participants yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
