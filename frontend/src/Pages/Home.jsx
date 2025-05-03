import React, { useState, useEffect } from "react";
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
    <div className="min-h-screen ">
      <div className="ml-[100px] mt-10">
        {hackathons.map((hackathon, index) => {
          return (
            <div
              key={hackathon._id}
              className="group relative bg-transparent pr-[50px] py-[2px] w-[700px] h-[250px] mb-6 overflow-hidden"
            >
              {/* Animated Background Layer */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-in-out z-0"></div>

              {/* Content Layer */}
              <div className="relative z-10 mb-4 bg-white flex w-[660px] h-full border border-l-8 cursor-pointer border-blue-300">
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
