import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import demoBack from "../assets/demo-background.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function HostHackathon() {

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
    <div className="">
      <div className="h-[160vh]">
        {/* Hero Section */}
        <div
          className="relative h-[100vh] bg-fixed bg-cover bg-center px-10  text-white"
          style={{ backgroundImage: `url(${demoBack})` }}
        >
          <div className="absolute inset-0 bg-black opacity-88 z-0"></div>
          <div className="relative z-10 max-w-4xl mx-[100px] px-2 pt-[250px]">
            <p className="text-2xl mb-4">
              Branded &nbsp; | &nbsp; Quality &nbsp; | &nbsp; Products
            </p>
            <h2 className="text-[60px] font-bold mb-4">
              WE OFFER A PLATFORM FOR
              <span className="text-[#D69ADE]"> HACKATHON</span>
            </h2>
            <p className="text-xl mb-10">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non amet
              neque nobis. Fugiat eos id esse excepturi velit, debitis alias.
            </p>
            <a
              href="host-hackathon"
              className="cursor-pointer hover:shadow-[0px_0px_7px_#D69ADE] bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] text-white py-3 px-6 rounded-lg text-base md:text-lg"
            >
              Host a hackathon &rarr;
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 cursor-pointer md:grid-cols-3 gap-12 my-20 px-6 md:px-20">
          {["Best Quality", "Fast Delivery", "Best Price"].map((title, idx) => (
            <div
              key={idx}
              className="rounded-xl p-8 [clip-path:polygon(0%_0%,_88%_0%,_100%_12%,_100%_100%,_0%_100%)] h-[340px] shadow-md bg-[#D69ADE] hover:bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] transition-all text-black hover:text-white"
            >
              <div className="text-3xl md:text-5xl mb-4 font-bold">
                0{idx + 1}
              </div>
              <h3 className="text-3xl font-semibold mb-5">{title}</h3>
              <p className="text-[1.1rem]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
                deserunt ad, officiis illo voluptates aspernatur quod quidem
                unde perferendis nostrum!
              </p>
            </div>
          ))}
        </div>
      </div>
{/* Features Section */}
<div className=" bg-white p-6 flex flex-col items-center">
  <p className="text-sm text-gray-500 mb-2 uppercase font-medium tracking-wide">
    HACKATHONS WE'VE HOSTED
  </p>
  <h1 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
    Features CodeArena Hackathons
  </h1>
 


  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ml-[100px]">
    {hackathons.map((hackathon) => (
      <div
        key={hackathon._id}
        className="bg-white shadow hover:shadow-md transition-shadow rounded-md text-center"
      >
        <img
          src={hackathon.image || "/default-thumbnail.png"} // use hackathon.image if available
          alt={hackathon.title}
          className="w-full h-48 object-cover rounded-t-md"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{hackathon.title}</h3>
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



      {/* host  Section */}
<div className=" bg-white p-6 flex flex-col items-center">
  <p className="text-sm text-gray-500 mb-2 uppercase font-medium tracking-wide">
    Start your hackathon today
  </p>
  <h1 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
    What kind of hackathon do you want to run?
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
    {/* Combined company card with two sections inside */}
    <div className="border border-blue-300 rounded-md p-6 hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Header that spans both columns */}
      <div className="md:col-span-2">
        <p className="text-xs text-gray-500 font-semibold uppercase mb-2">For Companies</p>
        <div className="text-3xl mb-4">💡👥</div>
      </div>

      {/* Online hackathons section */}
      <div id="host-hackathon">
        <h2 className="text-xl font-semibold mb-2">Online hackathons for companies</h2>
        <p className="text-gray-600 mb-4">
          Reach developers globally. Get planning and marketing support.
        </p>
        <Link to="/host/hackathon">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Host online
        </button>
         </Link>
      </div>

      {/* In-person hackathons section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">In-person hackathon for companies</h2>
        <p className="text-gray-600 mb-4">
          Manage your registrations and project submissions with Devpost.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Host in-person
        </button>
      </div>
    </div>

    {/* Student hackathons */}
    <div className="border border-green-300 rounded-md p-6 hover:shadow-md transition-shadow">
      <p className="text-xs text-gray-500 font-semibold uppercase mb-4">For Students</p>
      <div className="text-3xl mb-4">🎓🧠</div>
      <h2 className="text-xl font-semibold mb-2">Student hackathons</h2>
      <p className="text-gray-600 mb-6">
        Students can run all their hackathons for free on Devpost.
      </p>
      <div className="flex flex-col gap-2">
        <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
          Host online
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
          Host in-person
        </button>
      </div>
    </div>
  </div>
</div>



    </div>
  );
}
