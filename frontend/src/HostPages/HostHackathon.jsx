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
      <section className="relative min-h-[550px]  pt-[50px] flex items-center bg-gradient-radial from-yellow-400/10 via-black to-black/90 overflow-hidden">
        {/* Inline keyframes definition */}
        <style>
          {`
          @keyframes floatY {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}
        </style>

        {/* SVG Grid Overlay */}
        <div className="absolute inset-0 opacity-30 z-0 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="white"
                  strokeOpacity="0.05"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto px-6 md:px-10 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-[30px] font-bold mb-4">
              WE OFFER A PLATFORM FOR{" "}
              <span className="text-[#60B5FF]">HACKATHON</span>
            </h2>
            <p className="text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
              sint tempore esse, suscipit iusto laudantium, distinctio natus
              recusandae earum amet eos facilis laboriosam repellendus, magnam
              quam. Deserunt fuga vitae minus.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-[#60B5FF] to-[#8DD8FF] font-bold py-3 px-6 rounded-xl shadow-lg hover:-translate-y-1 transition transform">
                Host a hackathon →
              </button>
            </div>
          </div>

          {/* Game Preview with float animation */}
          <div className="flex justify-center items-center">
            <div
              className="relative rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/20 shadow-2xl max-w-md transition duration-300 hover:scale-105"
              style={{
                animation: "floatY 4s ease-in-out infinite",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop"
                alt="Featured Game"
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 text-white">
                <h3 className="text-xl font-bold">Space Explorer</h3>
                <p className="text-yellow-400 font-medium">
                  Action • Adventure
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                Manage your registrations and project submissions with Devpost.
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
            <h2 className="text-xl font-semibold mb-2">Student hackathons</h2>
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
