import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HostHackathon() {
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home`,
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
        console.log("Error while fetching hackathon tournaments", error);
      }
    };
    fetchHackathons();
  }, []);

  return (
  <>     
  
         <div className="pt-10 pb-10 px-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
  {/* Left Content */}
  <div>
    <p className="text-2xl mb-4">
      Branded &nbsp; | &nbsp; Quality &nbsp; | &nbsp; Products
    </p>
    <h2 className="text-[30px] font-bold mb-4">
      WE OFFER A PLATFORM FOR{" "}
      <span className="text-[#60B5FF]">HACKATHON</span>
    </h2>
    <p className="text-xl mb-10">
      Lorem ipsum dolor sit amet consectetur adipisicing elit...
    </p>
    <a
      href="#host-hackathon"
      className="cursor-pointer hover:shadow-[0px_0px_7px_#60B5FF] bg-gradient-to-r from-[#60B5FF] to-[#8DD8FF] text-white py-3 px-6 rounded-lg text-base md:text-lg"
    >
      Host a hackathon →
    </a>
  </div>

  {/* Right Image */}

    
  </div>

        {/* Features Section */}
        <div className="bg-white p-6 flex flex-col items-center">
          <p className="text-sm text-gray-500 mb-2 uppercase font-medium tracking-wide">
            HACKATHONS WE'VE HOSTED
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            Featured CodeArena Hackathons
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ml-[100px]">
            {hackathons.map((hackathon) => (
              <div
                key={hackathon._id}
                className="bg-white shadow hover:shadow-md transition-shadow rounded-md text-center"
              >
                <img
                  src={hackathon.image || "/default-thumbnail.png"}
                  alt={hackathon.title}
                  className="w-full h-48 object-cover rounded-t-md"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">
                    {hackathon.title}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    {hackathon.participants || "0"} participants
                  </p>
                  <a
                    href={`/hackathon/${hackathon._id}`}
                    className="text-blue-600 text-sm underline hover:text-blue-800"
                  >
                    View hackathon
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Host Section */}
        <div className="bg-white p-6 flex flex-col items-center">
          <p className="text-sm text-gray-500 mb-2 uppercase font-medium tracking-wide">
            Start your hackathon today
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            What kind of hackathon do you want to run?
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
            {/* Company Card */}
            <div className="border border-blue-300 rounded-md p-6 hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <p className="text-xs text-gray-500 font-semibold uppercase mb-2">
                  For Companies
                </p>
                <div className="text-3xl mb-4">💡👥</div>
              </div>

              <div id="host-hackathon">
                <h2 className="text-xl font-semibold mb-2">
                  Online hackathons for companies
                </h2>
                <p className="text-gray-600 mb-4">
                  Reach developers globally. Get planning and marketing support.
                </p>
                <Link to="/host/hackathon">
                  <button className="bg-gradient-to-r from-[#60B5FF] to-[#8DD8FF] text-white py-2 px-4 rounded">
                    Host online
                  </button>
                </Link>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">
                  In-person hackathon for companies
                </h2>
                <p className="text-gray-600 mb-4">
                  Manage your registrations and project submissions with
                  Devpost.
                </p>
                <button className="bg-gradient-to-r from-[#60B5FF] to-[#8DD8FF] text-white py-2 px-4 rounded">
                  Host in-person
                </button>
              </div>
            </div>

            {/* Student Card */}
            <div className="border border-green-300 rounded-md p-6 hover:shadow-md transition-shadow">
              <p className="text-xs text-gray-500 font-semibold uppercase mb-4">
                For Students
              </p>
              <div className="text-3xl mb-4">🎓🧠</div>
              <h2 className="text-xl font-semibold mb-2">
                Student hackathons
              </h2>
              <p className="text-gray-600 mb-6">
                Students can run all their hackathons for free on Devpost.
              </p>
              <div className="flex flex-col gap-2">
                <button className="bg-gradient-to-r from-[#60B5FF] to-[#8DD8FF] text-white py-2 px-4 rounded">
                  Host online
                </button>
                <button className="bg-gradient-to-r from-[#60B5FF] to-[#8DD8FF] text-white py-2 px-4 rounded">
                  Host in-person
                </button>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
}
