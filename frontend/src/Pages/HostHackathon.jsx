import React from "react";
import meeting3 from "../assets/meeting3.jpg";
import bgImage from "../assets/host-hackathon.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function HostHackathon() {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative h-[670px] flex items-center bg-cover bg-center text-white px-[150px] py-[120px]"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
        <div className="relative z-10 max-w-4xl">
          <p className="text-lg mb-2">Branded &nbsp; | &nbsp; Quality &nbsp; | &nbsp; Products</p>
          <h2 className="text-5xl font-bold mb-4">
            WE OFFER <span className="text-[#D69ADE]">QUALITY</span> PRODUCTS
          </h2>
          <p className="text-lg mb-6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non amet neque nobis. Fugiat eos id esse excepturi velit, debitis alias.
          </p>
          <button className="bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] text-white py-2 px-6 rounded-lg text-lg">
            Read More &rarr;
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex justify-center gap-8 my-20 px-[180px]">
        {["Best Quality", "Fast Delivery", "Best Price"].map((title, idx) => (
          <div key={idx} className="rounded-lg p-10 shadow-md bg-gradient-to-t from-pink-400 to-pink-200 hover:from-pink-600 hover:to-pink-400 transition-all text-black hover:text-white">
            <div className="text-5xl mb-4 font-bold">0{idx + 1}</div>
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet deserunt ad, officiis illo voluptates aspernatur quod quidem unde perferendis nostrum!
            </p>
          </div>
        ))}
      </div>

      {/* About Us Section */}
      <div className="flex items-center gap-20 px-[180px] my-[140px]">
        <img src={meeting3} alt="Meeting" className="w-[400px] h-[600px] object-cover rounded-tr-[40px] rounded-bl-[40px] rounded-br-[40px] shadow-xl" />
        <div>
          <h4 className="text-blue-400 underline text-2xl mb-4 font-semibold">ABOUT US</h4>
          <h2 className="text-4xl font-bold mb-4">Building More Business Competition</h2>
          <p className="text-lg mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero eligendi odio cupiditate, minus consectetur provident placeat, atque magni libero culpa unde reprehenderit molestias vel repellat? Dolor nulla quia eveniet quod.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6 text-lg">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCheckCircle} className="text-[#D69ADE]" />
              <p>Technology Services</p>
            </div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCheckCircle} className="text-[#D69ADE]" />
              <p>Technology Services</p>
            </div>
          </div>

          <div className="flex gap-8 mb-6">
            <div className="flex items-center border border-dotted border-black p-4 gap-4 w-[260px]">
              <p className="text-3xl font-bold">10<sup>+</sup></p>
              <p className="text-lg font-medium w-[130px]">Years of Experience</p>
            </div>
            <div className="flex items-center border border-dotted border-black p-4 gap-4 w-[260px]">
              <p className="text-3xl font-bold">70<sup>k</sup></p>
              <p className="text-lg font-medium w-[130px]">Individual Customers</p>
            </div>
          </div>

          <button className="bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] text-white py-2 px-6 rounded-lg text-lg">
            Learn More &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
