import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import coding1 from "../assets/coding1.jpg";
import collaboration from "../assets/collaboration.jpg";
import image2 from "../assets/aboutuscoding1.jpg"
import image3 from "../assets/coding3.jpg";
import image4 from "../assets/design.jpg";
import image5 from "../assets/homeimg4.jpg";

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
    <div className="pt-[80px]">
      <div className="py-20">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-6xl w-[800px] text-center">
            Grow Your Developer Ecosystem with CodeArena
          </h1>
          <p className="text-gray-600 pt-4 text-lg w-[720px]">
            Inspire developers to build with your tools through hackathons
            managed by CodeArena
          </p>
         <a href="#host-hackathon">
           <button className="mt-10 bg-black text-white px-8 py-2 text-lg rounded-md">
            Get Started
          </button>
         </a>
        </div>
        <div className="relative h-[480px]">
          <div className=" w-[280px] max-h-[340px] pb-7 -rotate-7 bg-white shadow-[0px_0px_5px_gray] p-2 rounded-2xl absolute bottom-75 left-12">
            <img
              src={image4}
              alt=""
              className="h-[200px] w-full object-cover rounded-xl "
            />
            <div className="pt-4 font-bold text-xl pl-1">Hackathon</div>
            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className=" w-[280px] max-h-[340px] pb-7 rotate-7 bg-white  shadow-[0px_0px_5px_gray] p-2 rounded-2xl absolute bottom-30 left-75">
            <img
              src={collaboration}
              alt=""
              className="h-[200px] w-full object-cover  rounded-xl "
            />
            <div className="pt-4 font-bold text-xl pl-1">Hackathon</div>
            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className=" w-[280px] max-h-[340px] pb-7 bg-white shadow-[0px_0px_5px_gray] p-2 rounded-2xl absolute bottom-20 left-155">
            <img
              src={image5}
              alt=""
              className="h-[200px] w-full object-cover  rounded-xl "
            />
            <div className="pt-4 font-bold text-xl pl-1">Hackathon</div>
            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className=" w-[280px] max-h-[340px] pb-7 -rotate-7 bg-white shadow-[0px_0px_5px_gray] p-2 rounded-2xl absolute bottom-30 right-75">
            <img
              src={image3}
              alt=""
              className="h-[200px] w-full object-cover  rounded-xl "
            />
            <div className="pt-4 font-bold text-xl pl-1">Hackathon</div>
            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className=" w-[280px] max-h-[340px] pb-7 rotate-7 bg-white shadow-[0px_0px_5px_gray] p-2 rounded-2xl absolute bottom-70 right-10">
            <img
              src={image2}
              alt=""
              className="h-[200px] w-full object-cover  rounded-xl "
            />
            <div className="pt-4 font-bold text-xl pl-1">Hackathon</div>
            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
        </div>
      </div>
      {/* Host Section */}
      <div id="host-hackathon" className="bg-white p-6 flex flex-col items-center">
        <p className="text-sm text-gray-500 mb-2 uppercase font-medium tracking-wide">
          Start your hackathon today
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
          What kind of hackathon do you want to run?
        </h1>

        <div className="flex gap-6 px-[100px]">
          {/* Company Card */}
          <div className="border border-blue-300 w-[660px] rounded-md p-6 hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="border border-green-300 w-[400px] rounded-md p-6 hover:shadow-md transition-shadow">
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
    </div>
  );
}
