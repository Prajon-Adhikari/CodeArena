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
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReactApexChart from "react-apexcharts";

const localizer = momentLocalizer(moment);

export default function AdminJudges() {
  const { id } = useParams();
  const location = useLocation();
  const [hackathon, setHackathon] = useState({});

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
    } catch (error) {
      console.log("Failed to fetch hackathon", error);
    }
  };
  useEffect(() => {
    fetchHackathonDetails();
  }, [id]);
  return (
    <div className=" pb-10">
         <div className="bg-white flex rounded-bl-xl justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl text-slate-600 font-bold">HACKATHONS</h2>
      </div>
      <div className="mt-10 mr-8">
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
    </div>
  );
}
