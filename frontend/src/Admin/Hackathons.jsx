import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faGlobe } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import dragon from "../assets/dragon.jpg";
import demo from "../assets/demo-logo.jpg";

export default function Hackathons() {
  const [type, setType] = useState("operating");
  const [hackathons, setHackathons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === "operating") {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/menu/hackathons/operating`
          );
          setHackathons(data.hackathons);
        } else if (type === "completed") {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/menu/hackathons/completed`
          );
          setHackathons(data.hackathons);
        }
      } catch (error) {
        console.error("Error fetching hackathons:", error);
      }
    };

    fetchData();
  }, [type]);

  const filteredHackathons = hackathons.filter((h) =>
    h.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="bg-white flex rounded-bl-xl justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl text-slate-600 font-bold">HACKATHONS</h2>
      </div>
      <div className="mt-6 ml-3">
        <div className="flex justify-between mr-14 items-center">
          <div>
            <div className="font-bold text-2xl">
              {type === "operating"
                ? "Operating Hackathon Details"
                : "Completed Hackathon Details"}
            </div>
            <div className="text-sm text-gray-600">
              {type === "operating"
                ? "All hackathons that are currently operating"
                : "All hackathons that have ended"}
            </div>
          </div>
          <div className=" flex items-center gap-8">
            <div className="border-gray-300 border-2 bg-white px-5 py-2 rounded-md flex items-center gap-4 focus-within:ring-1 focus-within:ring-blue-200">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-sm text-gray-400"
              />
              <input
                type="text"
                placeholder="Search a person ..."
                className=" w-[240px] outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border-2 border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 text-sm font-medium transition duration-150"
              >
                <option value="operating">Operating Hackathons</option>
                <option value="completed">Completed Hackathons</option>
              </select>
            </div>
          </div>
        </div>
        <div className="my-16 grid grid-cols-2 gap-2">
          {filteredHackathons.length > 0 ? (
            filteredHackathons.map((hackathon, index) => (
              <Link to={`/menu/${hackathon._id}/admin/overview`}>
                <div
                  key={hackathon._id}
                  className="group relative bg-transparent pr-[50px] py-[2px] w-[600px] h-[230px] mb-6 overflow-hidden"
                >
                  {/* Animated Background Layer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-in-out z-0"></div>

                  {/* Content Layer */}
                  <div
                    style={{ backgroundImage: `url(${dragon})` }}
                    className="relative z-10 mb-4  bg-cover bg-center flex w-[570px] h-full border border-l-8 cursor-pointer border-blue-300"
                  >
                    <div className="flex gap-8 p-6 w-full">
                      <img
                        src={demo}
                        alt=""
                        className="h-20 w-20 object-cover"
                      />
                      <div className="w-[500px]">
                        <h2 className="text-[20px] font-semibold h-[100px]">
                          {hackathon.title}
                        </h2>
                        <div className="flex justify-between pr-10 py-3">
                          <p className=" text-gray-500">
                            Starts:{" "}
                            <span className="text-black">
                              {new Date(
                                hackathon.startDate
                              ).toLocaleDateString()}
                            </span>
                          </p>
                          <p className=" text-gray-500">
                            Ends:{" "}
                            <span className="text-black">
                              {new Date(hackathon.endDate).toLocaleDateString()}
                            </span>
                          </p>
                        </div>
                        <div className="flex justify-between pr-10 pt-3">
                          <p className=" text-gray-500">
                            Registration Deadline:{" "}
                            <span className="text-black">
                              {new Date(
                                hackathon.registrationDeadline
                              ).toLocaleDateString()}
                            </span>
                          </p>
                          <p className="">
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
              </Link>
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500 text-lg">
              {type === "completed"
                ? "No completed hackathons yet."
                : "No hackathons found."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
