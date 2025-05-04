import React from "react";
import { Link } from "react-router-dom";
import meeting3 from "../assets/meeting3.jpg";
import demoBack from "../assets/demo-background.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function HostHackathon() {
  return (
    <div className="relative">
      <div className="h-[130vh] ">
        {/* Hero Section */}
        <div
          className="relative h-[840px] bg-fixed bg-cover bg-center  text-white"
          style={{ backgroundImage: `url(${demoBack})` }}
        >
          <div className="absolute inset-0 bg-black opacity-88 z-0"></div>
          <div className="relative z-10 max-w-4xl mx-[100px] px-6 pt-[160px]">
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
            <Link
              to="/host/hackathon"
              className="cursor-pointer hover:shadow-[0px_0px_7px_#D69ADE] bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] text-white py-3 px-6 rounded-lg text-base md:text-lg"
            >
              Host a hackathon &rarr;
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 cursor-pointer md:grid-cols-3 gap-12 my-20 px-6 md:px-20 absolute top-140">
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
      {/* About Us Section */}
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 px-6 md:px-20 my-[100px]">
        <img
          src={meeting3}
          alt="Meeting"
          className="w-full lg:w-[400px] h-[400px] md:h-[600px] object-cover rounded-tr-[40px] rounded-bl-[40px] rounded-br-[40px] shadow-xl"
        />
        <div className="w-full">
          <h4 className="text-blue-400 underline text-xl md:text-2xl mb-4 font-semibold">
            ABOUT US
          </h4>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Building More Business Competition
          </h2>
          <p className="text-base md:text-lg mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
            eligendi odio cupiditate, minus consectetur provident placeat, atque
            magni libero culpa unde reprehenderit molestias vel repellat? Dolor
            nulla quia eveniet quod.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-base md:text-lg">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-[#D69ADE]"
                />
                <p>Technology Services</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center border border-dotted border-black p-4 gap-4 w-full sm:w-[260px]">
              <p className="text-2xl md:text-3xl font-bold">
                10<sup>+</sup>
              </p>
              <p className="text-sm md:text-lg font-medium">
                Years of Experience
              </p>
            </div>
            <div className="flex items-center border border-dotted border-black p-4 gap-4 w-full sm:w-[260px]">
              <p className="text-2xl md:text-3xl font-bold">
                70<sup>k</sup>
              </p>
              <p className="text-sm md:text-lg font-medium">
                Individual Customers
              </p>
            </div>
          </div>
          <button className="cursor-pointer bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] text-white py-2 px-6 rounded-lg text-base md:text-lg">
            Learn More &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
