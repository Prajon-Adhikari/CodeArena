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
import Select from "react-select";
import "react-calendar/dist/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReactApexChart from "react-apexcharts";

const localizer = momentLocalizer(moment);

export default function Overview() {
  const [date, setDate] = useState(new Date());
  const { id } = useParams();
  const location = useLocation();
  const [hackathon, setHackathon] = useState({});
  const [teamStatus, setTeamStatus] = useState("team");
  const [referer, setReferer] = useState("");
  const [teamName, setTeamName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [showUnregisterConfirm, setShowUnregisterConfirm] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isMyHostedHackathon, setIsMyHostedHackathon] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [submittedProjects, setSubmittedProjects] = useState([]);
  const [isJudgedHackathon, setIsJudgedHackathon] = useState(false);

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
      setParticipants(data.participants);
      setIsMyHostedHackathon(data.isHostedHackathon || false);
      setSubmittedProjects(data.submittedProjects);
      setIsJudgedHackathon(data.isJudgedHackathon);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/home/hackathons/${id}`,
        hackathon, // send updated hackathon
        { withCredentials: true }
      );
      toast.success("Hackathon updated!");
      setIsEditing(false);
      fetchHackathonDetails();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update hackathon");
    }
  };


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

  // Compute chart data based on participants
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

  const registrationStart = new Date(hackathon.registrationStart);
  const registrationDeadline = new Date(hackathon.registrationDeadline);
  const today = new Date();
  const registrationOpen = today >= registrationStart && today <= registrationDeadline;

  const submissionEnded = new Date() > new Date(hackathon.endDate);

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
      {isMyHostedHackathon ? (
        <>
          <div className="px-[140px] py-16 flex justify-between">
            <div className="w-[800px] ">
              <div className="flex justify-between items-center mr-20">
                <h2 className="text-4xl font-bold pb-1 ">{hackathon.title}</h2>
                {isMyHostedHackathon ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="border-2 cursor-pointer hover:shadow-[0px_0px_5px_gray] border-gray-600 px-8 rounded-lg text-lg"
                  >
                    Edit
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
              <p className="text-[21px] pt-8">{hackathon.description}</p>
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
          <div className="px-[140px] font-bold text-[40px] pb-4 pt-2 text-slate-800">
            Time Schedule
          </div>

          <div className="px-[140px] flex gap-20">
            <div>
              {events.length > 0 && (
                <div style={{ height: "500px", width: "750px" }}>
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
                      borderRadius: "16px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    }}
                    eventPropGetter={(event) => {
                      let backgroundColor = "";
                      let textColor = "grey";

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
                          padding: "4px",
                          textAlign: "center",
                          fontWeight: "bold",
                          borderRadius: "6px",
                        },
                      };
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <h2 className="mt-5 font-semibold text-2xl mb-2">Themes</h2>
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
              <div>
                <h2 className="mt-10 font-semibold text-2xl mb-2">
                  Contact Email
                </h2>
                <p className="hover:underline cursor-pointer">
                  {hackathon.contactEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="px-[140px] mt-16 flex justify-between">
            {submittedProjects.length > 0 && (
              <div className="shadow-[0px_0px_5px_gray] rounded-lg py-6 px-2">
                <h2 className="text-xl font-bold mb-4 px-6">
                  Project Members Count
                </h2>
                <ReactApexChart
                  options={{
                    chart: {
                      type: "bar",
                       height: 100,
                    },
                    plotOptions: {
                      bar: {
                        horizontal: true,
                        borderRadius: 6,
                        barHeight: "40px",
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
                  height={300}
                  width={840}
                />
              </div>
            )}
            {participants.length > 0 && (
              <div className="shadow-[0px_0px_5px_gray] py-6 px-2 rounded-lg">
                <h1 className="text-xl font-bold mb-4 px-6">
                  Source of Visits
                </h1>
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
            )}
          </div>
          <div className="px-[140px] mt-16">
            <h2 className="text-3xl font-bold mb-4">Participants</h2>
            {(participants || []).length > 0 ? (
              <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full border-collapse">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-3 px-6 text-left border-b">#</th>
                      <th className="py-3 px-6 text-left border-b">
                        Full Name
                      </th>
                      <th className="py-3 px-6 text-left border-b">
                        Team Name
                      </th>
                      <th className="py-3 px-6 text-left border-b">Referer</th>
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

          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
          />
          {isEditing && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
              <div className="bg-white p-8 rounded-lg shadow-xl w-[700px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleUpdate}>
                  <h2 className="text-3xl font-bold mb-6">Update Hackathon</h2>

                  {/* Title */}
                  <label className="block font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={hackathon.title}
                    onChange={(e) =>
                      setHackathon({ ...hackathon, title: e.target.value })
                    }
                    className="border px-4 py-2 w-full mb-4 rounded"
                  />

                  {/* Description */}
                  <label className="block font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    value={hackathon.description}
                    onChange={(e) =>
                      setHackathon({
                        ...hackathon,
                        description: e.target.value,
                      })
                    }
                    className="border px-4 py-2 w-full mb-4 rounded"
                  />

                  {/* Organizer Name */}
                  <label className="block font-semibold mb-2">
                    Organizer Name
                  </label>
                  <input
                    type="text"
                    value={hackathon.organizerName || ""}
                    onChange={(e) =>
                      setHackathon({
                        ...hackathon,
                        organizerName: e.target.value,
                      })
                    }
                    className="border px-4 py-2 w-full mb-4 rounded"
                  />

                  {/* Contact Email */}
                  <label className="block font-semibold mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={hackathon.contactEmail || ""}
                    onChange={(e) =>
                      setHackathon({
                        ...hackathon,
                        contactEmail: e.target.value,
                      })
                    }
                    className="border px-4 py-2 w-full mb-4 rounded"
                  />

                  {/* Themes */}
                  <label className="block font-semibold mb-2">Themes</label>
                  <Select
                    isMulti
                    name="themes"
                    value={(hackathon.themes || []).map((theme) => ({
                      value: theme,
                      label: theme,
                    }))}
                    onChange={(selectedOptions) =>
                      setHackathon({
                        ...hackathon,
                        themes: selectedOptions.map((option) => option.value),
                      })
                    }
                    options={[
                      { value: "ai-ml", label: "AI/ML" },
                      { value: "blockchain", label: "Blockchain" },
                      { value: "iot", label: "IoT" },
                      {
                        value: "beginner-friendly",
                        label: "Beginner Friendly",
                      },
                      { value: "fintech", label: "FinTech" },
                      { value: "web development", label: "Web Development" },
                      {
                        value: "mobile development",
                        label: "Mobile App Development",
                      },
                      { value: "game development", label: "Game Development" },
                      { value: "cybersecurity", label: "Cybersecurity" },
                      { value: "AR/VR", label: "AR/VR" },
                      { value: "data science", label: "Data Science" },
                      { value: "healthTech", label: "HealthTech" },
                      { value: "edTech", label: "EdTech" },
                      { value: "climate tech", label: "Climate Tech" },
                      { value: "robotics", label: "Robotics" },
                      { value: "ecommerce", label: "E-commerce" },
                      { value: "social good", label: "Social Good" },
                      { value: "sustainability", label: "Sustainability" },
                      { value: "open innovation", label: "Open Innovation" },
                      { value: "cloud computing", label: "Cloud Computing" },
                      { value: "devops", label: "DevOps" },
                      { value: "agriTech", label: "AgriTech" },
                      { value: "smart cities", label: "Smart Cities" },
                      { value: "space tech", label: "Space Tech" },
                      {
                        value: "quantum computing",
                        label: "Quantum Computing",
                      },
                    ]}
                    className="basic-multi-select mb-4 capitalize"
                    classNamePrefix="select"
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderWidth: "2px",
                        borderRadius: "12px",
                        borderColor: "#B7B7B7",
                        padding: "7px 6px",
                        boxShadow: "none",
                        "&:hover": { borderColor: "#6B7280" },
                      }),
                      multiValue: (base) => ({
                        ...base,
                        borderWidth: "2px",
                        borderRadius: "9999px",
                        borderColor: "#000000",
                        backgroundColor: "#FFFFFF",
                        padding: "1px 8px",
                        "&:hover": { backgroundColor: "#EEEEEE" },
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: "#000000", // Tailwind blue-900
                        fontWeight: "500",
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        borderRadius: "9999px",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "#EEEEEE",
                          cursor: "pointer",
                          color: "#000000",
                        },
                      }),
                    }}
                  />
                  {/* Mode */}
                  <label className="block font-semibold mb-2">Mode</label>
                  <input
                    type="text"
                    value={hackathon.mode || ""}
                    onChange={(e) =>
                      setHackathon({ ...hackathon, mode: e.target.value })
                    }
                    className="border px-4 py-2 w-full mb-4 rounded"
                  />

                  {/* Registration Start */}
                  <label className="block font-semibold mb-2">
                    Registration Start
                  </label>
                  <input
                    type="date"
                    value={hackathon.registrationStart?.split("T")[0]}
                    onChange={(e) =>
                      setHackathon({
                        ...hackathon,
                        registrationStart: e.target.value,
                      })
                    }
                    className="border px-4 py-2 w-full mb-4 rounded"
                  />

                  {/* Registration Deadline */}
                  <label className="block font-semibold mb-2">
                    Registration Deadline
                  </label>
                  <input
                    type="date"
                    value={hackathon.registrationDeadline?.split("T")[0]}
                    onChange={(e) =>
                      setHackathon({
                        ...hackathon,
                        registrationDeadline: e.target.value,
                      })
                    }
                    className="border px-4 py-2 w-full mb-4 rounded"
                  />

                  {/* Start Date */}
                  <label className="block font-semibold mb-2">
                    Submission Start
                  </label>
                  <input
                    type="date"
                    value={hackathon.startDate?.split("T")[0]}
                    onChange={(e) =>
                      setHackathon({ ...hackathon, startDate: e.target.value })
                    }
                    className="border px-4 py-2 w-full mb-4 rounded"
                  />

                  {/* End Date */}
                  <label className="block font-semibold mb-2">
                    Submission End
                  </label>
                  <input
                    type="date"
                    value={hackathon.endDate?.split("T")[0]}
                    onChange={(e) =>
                      setHackathon({ ...hackathon, endDate: e.target.value })
                    }
                    className="border px-4 py-2 w-full mb-4 rounded"
                  />

                  {/* Buttons */}
                  <div className="flex gap-4 mt-6 justify-end">
                    <button
                      type="submit"
                      className="bg-blue-500 cursor-pointer text-white px-6 py-2 rounded hover:bg-blue-400"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-400 text-white  cursor-pointer px-6 py-2 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

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
        </>
      ) : (
        <>
          <div className="px-[140px] py-16 flex justify-between">
            <div className="w-[800px] ">
              <h1 className="text-4xl font-bold">{hackathon.title}</h1>
              <p className="text-[22px] pt-8">{hackathon.description}</p>
              {!isJudgedHackathon && (
                <>
                  {!submissionEnded ? ( // ✅ if submission not ended
                    registrationOpen ? (
                      !isRegistered ? (
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
                      )
                    ) : (
                      isRegistered && (
                        <button
                          className="bg-gray-400 text-white py-2.5 px-8 my-14 text-xl rounded-[4px]"
                          disabled
                        >
                          Unregister (Disabled)
                        </button>
                      )
                    )
                  ) : null}
                </>
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
          <div className="px-[140px] font-bold text-[40px] pb-4 pt-2 text-slate-800">
            Time Schedule
          </div>

          <div className="px-[140px] flex gap-30">
            <div>
              {events.length > 0 && (
                <div style={{ height: "500px", width: "750px" }}>
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
                      borderRadius: "16px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    }}
                    eventPropGetter={(event) => {
                      let backgroundColor = "";
                      let textColor = "grey";

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
                          padding: "4px",
                          textAlign: "center",
                          fontWeight: "bold",
                          borderRadius: "6px",
                        },
                      };
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <h2 className="mt-5 font-semibold text-2xl mb-2">Themes</h2>
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
              <div>
                <h2 className="mt-10 font-semibold text-2xl mb-2">
                  Contact Email
                </h2>
                <p className="hover:underline cursor-pointer">
                  {hackathon.contactEmail}
                </p>
              </div>
            </div>
          </div>
          <div id="registration"></div>
          {isJudgedHackathon ? (
            ""
          ) : (
            <>
              {registrationOpen && !isRegistered && (
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
                      <label
                        className="pl-2 pr-18 cursor-pointer"
                        htmlFor="codearena"
                      >
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
                      <label
                        className="pl-2 pr-18 cursor-pointer"
                        htmlFor="college"
                      >
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
                      <label
                        className="pl-2  pr-18 cursor-pointer"
                        htmlFor="friend"
                      >
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
                        <span className="text-red-600">*</span> I have read and
                        agree to your Community Guidelines and CodeArena Terms
                        of Service
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
                        If you already have a team, make sure all members are
                        registered bt their account before the deadline.
                      </li>
                      <li>
                        Only one team leader should submit the project and
                        invite the rest of the team during submission.
                      </li>
                      <li>
                        If any team member is involved in multiple project
                        submissions, the entire team will be disqualified.
                      </li>
                    </ol>
                  </div>
                </div>
              )}
            </>
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
        </>
      )}
    </div>
  );
}
