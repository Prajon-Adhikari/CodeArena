import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function home() {
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home`
        );
        const data = await response.json();
        console.log(data.hackathons);
        setHackathons(data.hackathons);
      } catch (error) {
        console.log("Error while fetching hackathon tournaments", error);
      }
    };
    fetchHackathons();
  }, []);
  return (
    <div className="min-h-screen  bg-gray-50">
      <nav className="px-22 flex items-center justify-between py-4 bg-white shadow">
        <div className="flex items-center space-x-6">
          <div className="text-2xl font-bold text-blue-900 bg-cyan-500 px-3 py-1 rounded">
            Hacked
          </div>
          <Link className="text-sm text-gray-700 hover:underline">
            Join a hackathon
          </Link>
          <Link className="text-sm text-gray-700 hover:underline">
            Host a hackathon
          </Link>
          <Link className="text-sm text-gray-700 hover:underline">
            Resources
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/api/auth/signin" className="text-sm text-gray-700">
            Sign in
          </Link>
          <Link
            to="/api/auth/signup"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign up
          </Link>
        </div>
      </nav>
      <div>
        {hackathons.map((hackathon, index) => {
          return (
            <div
              key={hackathon._id}
              className="mb-4 p-4 bg-white rounded shadow"
            >
              <h2 className="text-xl font-semibold">{hackathon.title}</h2>
              <p>{hackathon.description}</p>
              <p className="text-sm text-gray-500">
                Starts: {new Date(hackathon.startDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Ends: {new Date(hackathon.endDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Registration Deadline:{" "}
                {new Date(hackathon.registrationDeadline).toLocaleDateString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
