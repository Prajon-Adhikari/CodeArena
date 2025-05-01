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
          <Link
            to="/host/hackathon"
            className="text-sm text-gray-700 hover:underline"
          >
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
      <div className="ml-[100px] mt-10">
        {hackathons.map((hackathon, index) => {
          return (
            <div
              key={hackathon._id}
              className="group relative pl-[6px] bg-gray-50 pr-[50px] py-[1px] w-[700px] h-[250px] mb-6 overflow-hidden"
            >
              {/* Animated Background Layer */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-100 ease-in-out z-0"></div>

              {/* Content Layer */}
              <div className="relative z-10 mb-4 bg-white outline-none flex w-[660px] h-full border cursor-pointer border-teal-500">
                <div className="p-[2px] bg-teal-500 transition-all duration-200">
                  {" "}
                </div>
                <div className="flex gap-8 p-6 w-full">
                  <div className="bg-[url('./src/assets/demo-logo.jpg')] h-24 w-24 bg-cover bg-center"></div>
                  <div className="w-[500px]">
                    <h2 className="text-[22px] font-semibold h-[100px]">
                      {hackathon.title}
                    </h2>
                    <div className="flex justify-between pr-10 py-3">
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
                    <div className="flex justify-between pr-10 pt-3">
                      <p className="text-lg text-gray-500">
                        Registration Deadline:{" "}
                        <span className="text-black">
                          {new Date(
                            hackathon.registrationDeadline
                          ).toLocaleDateString()}
                        </span>
                      </p>
                      <p className="text-lg">
                        <FontAwesomeIcon
                          icon={faGlobe}
                          className="text-gray-500"
                        />
                        <span className="ml-2 capitalize">
                          {hackathon.mode}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
