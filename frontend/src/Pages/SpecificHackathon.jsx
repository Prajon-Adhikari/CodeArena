import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function SpecificHackathon() {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState("");

  useEffect(() => {
    const fetchHackathonDetails = async () => {
      try {
        console.log("Hello");
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
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
  return (
    <div>
      <div>
        {hackathon.bannerUrl ? (
          <img src={bannerUrl} />
        ) : (
          <div className="flex justify-center items-center bg-gray-400 h-[220px] font-semibold text-3xl">
            {hackathon.title}
          </div>
        )}
        <div className="flex justify-center items-center bg-blue-200 text-xl">
          <Link to="/overview" className="px-10 py-4 hover:bg-red-200">
            Overview
          </Link>
          <Link to="/myproject" className="px-10 py-4 hover:bg-red-200">
            My Project
          </Link>
          <Link to="/rules" className="px-10 py-4 hover:bg-red-200">
            Rules
          </Link>
          <Link to="/prizes" className="px-10 py-4 hover:bg-red-200">
            Prizes
          </Link>
          <Link to="/judges" className="px-10 py-4 hover:bg-red-200">
            Judges
          </Link>
        </div>
      </div>
    </div>
  );
}
