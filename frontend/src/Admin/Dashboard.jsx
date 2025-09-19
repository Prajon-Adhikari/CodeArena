import React, { useEffect, useState } from "react";
import Panel from "./Panel";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import Chart from "react-apexcharts";

export default function Dashboard() {
  const [hackathonLength, setHackathonLength] = useState(0);
  const [usersLength, setUsersLength] = useState(0);
   const [projectsLength, setProjectsLength] = useState(0);
  const [completedHackathons, setCompletedHackathons] = useState(0);

  useEffect(() =>{
    const fetchDataForDashboard = async () =>{
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/menu/dashboard`,
        );
        const data = await response.json();
        setHackathonLength(data.hackathonLength);
        setUsersLength(data.usersLength);
        setProjectsLength(data.projectsLength);
        setCompletedHackathons(data.completedHackathons);
      } catch (error) {
        console.log("Error while fetching data for dashboard");
      }
    }
    fetchDataForDashboard();
  },[])
  const options = {
    chart: {
      id: "basic-line",
      zoom: { enabled: false },
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Product Trends by Month",
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
      ],
    },
  };

  const series = [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];

  return (
    <div>
      <div className="bg-white flex rounded-bl-xl justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl text-slate-600 font-bold">DASHBOARD</h2>
      </div>

      {/* ✅ Panels Section */}
      <div className="mt-8">
        <div className="grid grid-cols-2 w-[630px] gap-4">
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
        <div className="bg-white mt-8 p-4 rounded-xl shadow w-[700px]">
          <Chart options={options} series={series} type="line" height={350} />
        </div>
      </div>
    </div>
  );
}
