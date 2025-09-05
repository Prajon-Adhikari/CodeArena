import { useState, useEffect } from "react";
import dragon from "../assets/dragon.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faFilter,
  faMagnifyingGlass,
  faTags,
  faFlag,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const JoinHackathon = () => {
  const [hackathons, setHackathons] = useState([]);
  const [filters, setFilters] = useState({
    mode: [],
    length: [],
    theme: [],
  });
  const [sortBy, setSortBy] = useState("recent"); // Options: "recent", "deadline", "prize"

  const hackthonData = [
    {
      theme: "IoT",
      hackathonNumber: 53,
      totalPrizes: 1749000,
    },
    {
      theme: "Machine Learning",
      hackathonNumber: 45,
      totalPrizes: 1561000,
    },
    {
      theme: "Social Goods ",
      hackathonNumber: 35,
      totalPrizes: 749000,
    },
    {
      theme: "Web ",
      hackathonNumber: 30,
      totalPrizes: 649000,
    },
    {
      theme: "Education",
      hackathonNumber: 28,
      totalPrizes: 499000,
    },
    {
      theme: "Open Ended",
      hackathonNumber: 25,
      totalPrizes: 461000,
    },
    {
      theme: "Low/No Code",
      hackathonNumber: 22,
      totalPrizes: 349000,
    },
    {
      theme: "IoT ",
      hackathonNumber: 20,
      totalPrizes: 259000,
    },
    {
      theme: "Blockchain",
      hackathonNumber: 17,
      totalPrizes: 209000,
    },
  ];

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

  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => {
      const currentValues = prevFilters[category];
      if (currentValues.includes(value)) {
        // Remove if already selected
        return {
          ...prevFilters,
          [category]: currentValues.filter((v) => v !== value),
        };
      } else {
        // Add if not selected
        return {
          ...prevFilters,
          [category]: [...currentValues, value],
        };
      }
    });
  };

  const filteredHackathons = hackathons.filter((hackathon) => {
    // Mode filter
    if (
      filters.mode.length > 0 &&
      !filters.mode.includes(hackathon.mode.toLowerCase())
    ) {
      return false;
    }

    // Length filter
    if (filters.length.length > 0) {
      const daysDiff =
        (new Date(hackathon.endDate) - new Date(hackathon.startDate)) /
        (1000 * 3600 * 24);

      // Map your length filters to ranges in days
      const lengthMatches = filters.length.some((length) => {
        if (length === "days") return daysDiff >= 1 && daysDiff <= 6;
        if (length === "weeks") return daysDiff >= 7 && daysDiff <= 28;
        if (length === "months") return daysDiff > 28;
        return false;
      });

      if (!lengthMatches) return false;
    }

    // Theme filter
    if (filters.theme.length > 0 && !filters.theme.includes(hackathon.theme)) {
      return false;
    }

    return true;
  });

  const sortedHackathons = [...filteredHackathons].sort((a, b) => {
    if (sortBy === "deadline") {
      return (
        new Date(a.registrationDeadline) - new Date(b.registrationDeadline)
      );
    }
    if (sortBy === "prize") {
      return (a.totalPrizes || 0) - (b.totalPrizes || 0); // handle missing field
    }
  });

  return (
    <div className=" pt-[50px] pb-10">
      <div
        className="text-center py-32 text-[50px] font-extrabold bg-cover bg-center  text-white mb-16"
        style={{ backgroundImage: "url('/src/assets/join-heroimage.jpg')" }}
      >
        Join the best hackathon that matches your passion
      </div>

      <div className="flex justify-center gap-4 pb-10 mb-10 border-b-1 border-gray-300">
        <div className="border-blue-400 border-2 px-5 py-3 rounded-sm flex items-center gap-4 focus-within:ring-1 focus-within:ring-blue-400">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-xl text-blue-400"
          />
          <input
            type="text"
            placeholder="Serach for your dream hackathon"
            className=" w-[640px] text-xl outline-none"
          />
        </div>
        <button className="bg-blue-400 hover:bg-blue-500 cursor-pointer text-xl text-white px-8 rounded-sm">
          Search Hackathon
        </button>
      </div>
      <div className="flex mx-[90px] gap-30">
        <div>
          <h3 className="text-xl text-gray-500 pt-2">
            Search by filters{" "}
            <FontAwesomeIcon icon={faFilter} className="pl-2" />
          </h3>
          <div className="pt-12">
            <h3 className="text-xl font-semibold pb-3">Mode</h3>
            <div>
              <input
                type="checkbox"
                name="mode"
                id="online"
                value="online"
                checked={filters.mode.includes("online")}
                onChange={() => handleCheckboxChange("mode", "online")}
              />{" "}
              <label className=" pl-2" htmlFor="online">
                Online
              </label>
            </div>
            <div className="pt-2">
              <input
                type="checkbox"
                name="mode"
                id="offline"
                value="offline"
                checked={filters.mode.includes("offline")}
                onChange={() => handleCheckboxChange("mode", "offline")}
              />{" "}
              <label className=" pl-2" htmlFor="offline">
                Offline
              </label>
            </div>
          </div>

          <div className="pt-9">
            <h3 className="text-xl font-semibold pb-3">Length</h3>
            <div>
              <input
                type="checkbox"
                name="length"
                id="days"
                value="days"
                checked={filters.mode.includes("days")}
                onChange={() => handleCheckboxChange("length", "days")}
              />{" "}
              <label className=" pl-2" htmlFor="days">
                1-6 days
              </label>
            </div>
            <div className="pt-2">
              <input
                type="checkbox"
                name="length"
                id="weeks"
                value="weeks"
                checked={filters.mode.includes("weeks")}
                onChange={() => handleCheckboxChange("length", "weeks")}
              />{" "}
              <label className=" pl-2" htmlFor="weeks">
                1-4 weeks
              </label>
            </div>
            <div className="pt-2">
              <input
                type="checkbox"
                name="length"
                id="months"
                value="months"
                checked={filters.mode.includes("months")}
                onChange={() => handleCheckboxChange("length", "months")}
              />{" "}
              <label className=" pl-2" htmlFor="months">
                1+ month
              </label>
            </div>
          </div>
          <div className="pt-9">
            <h3 className="text-xl font-semibold pb-3">Interested tags</h3>

            {hackthonData.map((hack, index) => {
              return (
                <div key={index} className="pb-2">
                  <input
                    type="checkbox"
                    name="theme"
                    id={hack.theme}
                    value={hack.theme}
                    checked={filters.mode.includes(hack.theme)}
                    onChange={() => handleCheckboxChange("theme", hack.theme)}
                  />{" "}
                  <label className="pl-2 " htmlFor={hack.theme}>
                    {hack.theme}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="  pb-10 flex justify-between items-center">
            <div className="text-gray-500 text-xl">
              Showing {hackathons.length} hackathons
            </div>
            <div className="flex list-none gap-5 text-lg mr-14 items-center">
              <span>Sort :</span>
              <div className="flex gap-10 text-md border-2 px-10 py-2 rounded-sm border-blue-200">
                <li
                  className={`cursor-pointer ${
                    sortBy === "recent" ? "text-blue-300" : ""
                  }`}
                  onClick={() => setSortBy("recent")}
                >
                  Most recent
                </li>
                <li
                  className={`cursor-pointer ${
                    sortBy === "deadline" ? "text-blue-300" : ""
                  }`}
                  onClick={() => setSortBy("deadline")}
                >
                  Submission Date
                </li>
                <li
                  className={`cursor-pointer ${
                    sortBy === "prize" ? "text-blue-300" : ""
                  }`}
                  onClick={() => setSortBy("prize")}
                >
                  Prize amount
                </li>
              </div>
            </div>
          </div>
          <div>
            {sortedHackathons.map((hackathon, index) => {
              return (
                <Link to={`/${hackathon._id}/overview`}>
                  <div
                    key={hackathon._id}
                    className="group relative bg-transparent pr-[50px] py-[2px] w-[1030px] h-[250px] mb-6 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-in-out z-0"></div>

                    {/* Content Layer */}
                    <div
                      style={{ backgroundImage: `url(${dragon})` }}
                      className="relative z-10 mb-4  bg-cover bg-center flex w-[990px] h-full border border-l-8 cursor-pointer border-blue-300"
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
                                {new Date(
                                  hackathon.startDate
                                ).toLocaleDateString()}
                              </span>
                            </p>
                            <p className="text-lg text-gray-500">
                              Ends:{" "}
                              <span className="text-black">
                                {new Date(
                                  hackathon.endDate
                                ).toLocaleDateString()}
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
                      <div className="my-6 py-2 px-7 w-[428px] flex flex-col gap-5 border-l border-gray-500">
                        <div className="flex items-center justify-start gap-5 text-lg">
                          <FontAwesomeIcon
                            icon={faFlag}
                            className="text-slate-700 text-xl"
                          />
                          <span>Google</span>
                        </div>
                        <div className="flex items-center justify-start gap-5 text-lg">
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="text-slate-700 text-xl"
                          />
                          <span>
                            {new Date(hackathon.endDate).toLocaleDateString()} -{" "}
                            {new Date(hackathon.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-start gap-5 text-sm">
                          <FontAwesomeIcon
                            icon={faTags}
                            className="text-slate-700 text-xl pt-1"
                          />
                          <span>
                            {hackthonData.slice(0, 3).map((data, index) => {
                              return (
                                <div className="bg-orange-200 mb-1 mr-1 inline-block  px-4 py-1">
                                  {data.theme}
                                </div>
                              );
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinHackathon;
