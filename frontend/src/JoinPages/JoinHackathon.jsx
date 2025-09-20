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
import { Link, useLocation } from "react-router-dom";
import demo from "../assets/demo-logo.jpg";

const JoinHackathon = () => {
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const preSelectedTheme = queryParams.get("theme");
  const [hackathons, setHackathons] = useState([]);
  const [filters, setFilters] = useState({
    mode: [],
    theme: [],
  });
  const [sortBy, setSortBy] = useState("recent");

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

        if (preSelectedTheme) {
        setFilters((prev) => ({
          ...prev,
          theme: [preSelectedTheme],
        }));
      }
      } catch (error) {
        console.log("Error while fetching hackathons on join page", error);
      }
    };
    fetchHackathons();
  }, [preSelectedTheme]);

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

  const allThemes = Array.from(
    new Set(hackathons.flatMap((h) => h.themes || []))
  );

  const filteredHackathons = hackathons.filter((hackathon) => {
    // Mode filter
    if (
      filters.mode.length > 0 &&
      !filters.mode.includes(hackathon.mode.toLowerCase())
    ) {
      return false;
    }

    // Theme filter
    if (
      filters.theme.length > 0 &&
      !hackathon.themes?.some((t) => filters.theme.includes(t))
    ) {
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
              <label className=" pl-2 cursor-pointer" htmlFor="online">
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
              <label className=" pl-2 cursor-pointer" htmlFor="offline">
                Offline
              </label>
            </div>
          </div>

          <div className="pt-9">
            <h3 className="text-xl font-semibold pb-3">Interested tags</h3>
            {allThemes.map((theme, index) => (
              <div key={index} className="pb-2">
                <input
                  type="checkbox"
                  name="theme"
                  id={theme}
                  value={theme}
                  checked={filters.theme.includes(theme)}
                  onChange={() => handleCheckboxChange("theme", theme)}
                />{" "}
                <label
                  className="pl-2 capitalize cursor-pointer"
                  htmlFor={theme}
                >
                  {theme}
                </label>
              </div>
            ))}
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
              </div>
            </div>
          </div>

          <div>
            {sortedHackathons.map((hackathon) => {
              return (
                <Link key={hackathon._id} to={`/${hackathon._id}/overview`}>
                  <div className="group relative bg-transparent pr-[50px] py-[2px] w-[1030px] h-[250px] mb-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-in-out z-0"></div>
                    <div
                      style={{ backgroundImage: `url(${dragon})` }}
                      className="relative z-10 mb-4  bg-cover bg-center flex w-[990px] h-full border border-l-8 cursor-pointer border-blue-300"
                    >
                      <div className="flex gap-8 p-6 w-full">
                        <img
                          src={demo}
                          alt=""
                          className="h-20 w-20 object-cover"
                        />{" "}
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
                      <div className="my-6 py-2 px-7 w-[428px] flex flex-col justify-between gap-5 border-l border-gray-500">
                        <div className="flex items-center justify-start gap-5 text-lg">
                          <FontAwesomeIcon
                            icon={faFlag}
                            className="text-slate-700 text-xl"
                          />
                          <span>{hackathon.organizerName}</span>
                        </div>
                        <div className="flex items-center justify-start gap-5 text-lg">
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="text-slate-700 text-xl"
                          />
                          <span>
                            {new Date(
                              hackathon.registrationStart
                            ).toLocaleDateString()}{" "}
                            - {new Date(hackathon.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-start gap-5 text-sm">
                          <FontAwesomeIcon
                            icon={faTags}
                            className="text-slate-700 text-xl pt-1"
                          />
                          <span>
                            {(hackathon.themes || [])
                              .slice(0, 3)
                              .map((theme, index) => (
                                <div
                                  key={index}
                                  className="bg-orange-200 capitalize mb-1 mr-1 inline-block px-4 py-1"
                                >
                                  {theme}
                                </div>
                              ))}
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
