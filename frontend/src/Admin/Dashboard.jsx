import React, { useEffect, useState } from "react";
import Panel from "./Panel";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import Chart from "react-apexcharts";

export default function Dashboard() {
  const [hackathonLength, setHackathonLength] = useState(0);
  const [usersLength, setUsersLength] = useState(0);
  const [projectsLength, setProjectsLength] = useState(0);
  const [completedHackathons, setCompletedHackathons] = useState(0);
  const [judgelength, setJudgeLength] = useState(0);
  const [participantsLength, setParticipantsLength] = useState(0);
  const [hackathonsPerMonth, setHackathonsPerMonth] = useState([]);
  const [themeCounts, setThemeCounts] = useState({});

  useEffect(() => {
    const fetchDataForDashboard = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/menu/dashboard`
        );
        const data = await response.json();
        setHackathonLength(data.hackathonLength);
        setUsersLength(data.usersLength);
        setProjectsLength(data.projectsLength);
        setCompletedHackathons(data.completedHackathons);
        setJudgeLength(data.judgeLength);
        setParticipantsLength(data.participantslength);
        setHackathonsPerMonth(data.hackathonsPerMonth || []);
        setThemeCounts(data.themeCounts || {});
      } catch (error) {
        console.log("Error while fetching data for dashboard");
      }
    };
    fetchDataForDashboard();
  }, []);

  const formattedThemes = Object.keys(themeCounts).map(
    (t) => t.charAt(0).toUpperCase() + t.slice(1)
  );

  const options = {
    chart: {
      id: "hackathons-line",
      zoom: { enabled: false },
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Hackathons Created per Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  };

  const series = [
    {
      name: "Hackathons",
      data: hackathonsPerMonth, // ✅ dynamic data from backend
    },
  ];

  const barOptions = {
    chart: { id: "bar-chart", type: "bar" },
    plotOptions: { bar: { borderRadius: 10, columnWidth: "50%" } },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    grid: { row: { colors: ["#fff", "#f2f2f2"] } },
    xaxis: {
      categories: formattedThemes, // ✅ theme names on x-axis
      labels: { rotate: -45 },
      tickPlacement: "on",
    },
    yaxis: { title: { text: "Hackathons" } }, // ✅ y-axis = number of hackathons
    fill: {
      type: "solid",
    },
  };

  const barSeries = [
    {
      name: "Hackathons per Theme",
      data: Object.values(themeCounts), // ✅ count values for y-axis
    },
  ];

  const pieOptions = {
     labels: ["Users", "Judges", "Participants", "Hosters"],
    legend: { position: "right" },
  };

  const pieSeries = [
    usersLength,
    judgelength,
    participantsLength,
    hackathonLength, // ✅ Hosters = hackathon count
  ];

  return (
    <div>
      <div className="bg-white flex rounded-bl-xl justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl text-slate-600 font-bold">DASHBOARD</h2>
      </div>
      <div className="flex gap-6">
        <div>
          {/* ✅ Panels Section */}
          <div className="mt-8">
            <div className="grid grid-cols-2 w-[600px] gap-10">
              <Panel
                title="Total Users"
                figure={faChartSimple}
                amount={`${usersLength}`}
                description="Users"
                begColor="from-pink-500"
                midColor="via-pink-600"
                endColor="to-pink-700"
              />

              <Panel
                title="Total Hackathons"
                figure={faChartSimple}
                amount={`${hackathonLength}`}
                description="Hackathons"
                begColor="from-blue-400"
                midColor="via-blue-500"
                endColor="to-indigo-600"
              />

              <Panel
                title="Total Submissions"
                figure={faChartSimple}
                amount={`${projectsLength}`}
                description="Submissions"
                begColor="from-teal-400"
                midColor="via-teal-500"
                endColor="to-teal-600"
              />

              <Panel
                title="Completed Hackathons"
                figure={faChartSimple}
                amount={`${completedHackathons}`}
                description="Completed"
                begColor="from-yellow-400"
                midColor="via-yellow-500"
                endColor="to-yellow-600"
              />
            </div>
            {/* ✅ Chart Section */}
            <div className="bg-white mt-8 p-4 rounded-xl shadow w-[600px]">
              <Chart
                options={options}
                series={series}
                type="line"
                height={400}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white mt-8 p-4 rounded-xl shadow w-[600px]">
            <Chart
              options={barOptions}
              series={barSeries}
              type="bar"
              height={400}
            />
          </div>
          <div className="bg-white mt-8 p-4 flex justify-center items-center rounded-xl shadow w-[600px]">
            <Chart
              options={pieOptions}
              series={pieSeries}
              type="pie"
              width={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
