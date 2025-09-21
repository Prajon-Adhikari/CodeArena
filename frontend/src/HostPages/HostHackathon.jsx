import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import collaboration from "../assets/collaboration.jpg";
import image2 from "../assets/aboutuscoding1.jpg";
import image3 from "../assets/coding3.jpg";
import image4 from "../assets/design.jpg";
import image5 from "../assets/homeimg4.jpg";
import community from "../assets/community.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faFlag,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function HostHackathon() {
  const [hackathons, setHackathons] = useState([]);
  const location = useLocation();

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
    <div className="pt-[80px] pb-10">
      <div className="py-20">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-5xl w-[800px] text-center left-slide-animation">
            Grow Your Developer Ecosystem with CodeArena
          </h1>
          <p className="text-gray-600 pt-4 text-lg w-[700px] text-center right-slide-animation">
            Inspire developers to build with your tools through hackathons
            managed by CodeArena
          </p>
          <a href="#host-hackathon">
            <button className="mt-10 bg-black text-white px-8 py-2 text-lg rounded-md">
              Get Started
            </button>
          </a>
        </div>
        <div className="relative h-[470px] ">
          <div className=" w-[280px] max-h-[340px] left-slide-animation pb-7 -rotate-10 bg-white shadow-[0px_0px_5px_gray] p-2 rounded-2xl absolute bottom-70 left-24">
            <img
              src={image4}
              alt=""
              className="h-[200px] w-full object-cover rounded-xl "
            />
            <div className="pt-4 font-bold text-xl pl-1">Hackathon</div>
            <p className="text-sm pl-1 text-gray-600">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
          <div className=" w-[280px] max-h-[340px] right-slide-animation pb-7 rotate-7 bg-white  shadow-[0px_0px_5px_gray] p-2 rounded-2xl absolute bottom-25 left-80">
            <img
              src={collaboration}
              alt=""
              className="h-[200px] w-full object-cover  rounded-xl "
            />
            <div className="pt-4 font-bold text-xl pl-1">Hackathon</div>
            <p className="text-sm pl-1 text-gray-600">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
          <div className=" w-[280px] max-h-[340px] left-slide-animation pb-7 bg-white shadow-[0px_0px_5px_gray] p-2 rounded-2xl absolute bottom-15 left-156">
            <img
              src={image5}
              alt=""
              className="h-[200px] w-full object-cover  rounded-xl "
            />
            <div className="pt-4 font-bold text-xl pl-1">Hackathon</div>
            <p className="text-sm pl-1 text-gray-600">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
          <div className=" w-[280px] max-h-[340px] right-slide-animation z-10 pb-7 -rotate-7 bg-white shadow-[0px_0px_5px_gray] p-2 rounded-2xl absolute bottom-25 right-78">
            <img
              src={image3}
              alt=""
              className="h-[200px] w-full object-cover  rounded-xl "
            />
            <div className="pt-4 font-bold text-xl pl-1">Hackathon</div>
            <p className="text-sm pl-1 text-gray-600">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
          <div className=" w-[280px] max-h-[340px] left-slide-animation pb-7 rotate-10 bg-white shadow-[0px_0px_5px_gray] p-2 rounded-2xl absolute bottom-65 right-24">
            <img
              src={image2}
              alt=""
              className="h-[200px] w-full object-cover  rounded-xl "
            />
            <div className="pt-4 font-bold text-xl pl-1">Hackathon</div>
            <p className="text-sm text-gray-600 pl-1">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>
      </div>
      <div className="pl-[200px] pr-[160px] pb-30 flex justify-between animation">
        <div className="w-[500px]">
          <h2 className="text-2xl text-blue-500 pb-2 font-semibold">
            Developer Community
          </h2>
          <p className="w-[380px] text-4xl">
            Reach an experienced, global community
          </p>
          <p className="pt-6 text-lg text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto ad
            saepe mollitia, expedita odio incidunt eos!
          </p>
          <div className="text-lg text-gray-600 pt-10 flex flex-col gap-6">
            <p className="flex gap-4 items-center text-lg">
              <span className="text-red-400 font-bold mx-2 text-xl">
                <FontAwesomeIcon icon={faUsers} />
              </span>{" "}
              4 million+ users
            </p>
            <p className="flex gap-5 items-center text-lg">
              <span className="text-purple-300 font-bold mx-2 text-xl">
                <FontAwesomeIcon icon={faFlag} />
              </span>{" "}
              80 countries represented
            </p>

            <p className="flex gap-5 items-center text-lg">
              <span className="text-green-300 font-bold mx-2 text-xl">
                <FontAwesomeIcon icon={faListCheck} />
              </span>{" "}
              220,000+ projects submission
            </p>
          </div>
        </div>
        <div>
          <img
            src={community}
            alt=""
            className="w-[620px] h-[400px] object-cover"
          />
        </div>
      </div>
      {/* Host Section */}
      <div
        id="host-hackathon"
        className="bg-white p-6 flex flex-col items-center animation"
      >
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
              <Link to="/host/hackathon" state={{ from: location.pathname }}>
                <button className="bg-gradient-to-r from-[#60B5FF] to-[#8DD8FF] text-white cursor-pointer py-2 px-4 rounded">
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
            </div>
          </div>

          {/* Student Card */}
          <div className="border border-green-300 w-[400px] flex flex-col justify-between rounded-md p-6 hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase mb-4">
                For Students
              </p>
              <div className="text-3xl mb-4">🎓🧠</div>
              <h2 className="text-xl font-semibold mb-2">Student hackathons</h2>
              <p className="text-gray-600 mb-6">
                Students can run all their hackathons for free on Devpost.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/host/hackathon" state={{ from: location.pathname }}>
                <button className="bg-gradient-to-r cursor-pointer from-[#60B5FF] to-[#8DD8FF] w-full text-white py-2 px-4 rounded">
                  Host online
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
