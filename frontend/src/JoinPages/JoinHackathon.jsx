import React from "react";
import { useState, useEffect } from "react";
import dragon from "../assets/dragon.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faStarOfLife,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const JoinHackathon = () => {
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/join/hackathon`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setHackathons(data.hackathons);
      } catch (error) {
        console.log("Error while fetching hackathons on join page", error);
      }
    };
    fetchHackathons();
  }, []);
  return (
    <div>
      {hackathons.map((hackathon, index) => {
        return (
          <div
            key={hackathon._id}
            className="group relative bg-transparent pr-[50px] py-[2px] w-[700px] h-[250px] mb-6 overflow-hidden"
          >
            {/* Content Layer */}
            <div
              style={{ backgroundImage: `url(${dragon})` }}
              className="relative z-10 mb-4  bg-cover bg-center flex w-[660px] h-full border border-l-8 cursor-pointer border-blue-300"
            >
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
                      <span className="ml-2 capitalize">{hackathon.mode}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JoinHackathon;
