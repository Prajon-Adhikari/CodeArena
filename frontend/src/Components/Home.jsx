import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

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
      <div className="grid grid-cols-2 gap-6 py-12 px-[100px]">
        {hackathons.map((hackathon, index) => {
          return (
            <div
              key={hackathon._id}
              className="mb-4 p-4 bg-white rounded shadow flex gap-10"
            >
              <div className="bg-[url('./src/assets/demo-logo.jpg')]  h-30 w-30 bg-cover bg-center">
                {" "}
              </div>
              <div className="w-[500px]">
                <h2 className="text-3xl font-semibold h-[120px]">
                  {hackathon.title}
                </h2>
                <div className="flex justify-between pr-10 py-4">
                  <p className="text-lg text-gray-500">
                    Starts:{" "}
                    <span className="text-black">
                      {new Date(hackathon.startDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-lg text-gray-500">
                    Ends:{" "}
                    <span className="text-black">
                      {new Date(hackathon.endDate).toLocaleDateString()}
                    </span>
                  </p>
                </div>
                <div className="flex justify-between pr-10 py-4">
                  <p className="text-lg text-gray-500">
                    Registration Deadline:{" "}
                    <span className="text-black">
                      {new Date(
                        hackathon.registrationDeadline
                      ).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-lg">
                    <FontAwesomeIcon icon={faGlobe} className="text-gray-500" />
                    <span className="ml-2 capitalize">{hackathon.mode}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
