import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import meeting1 from "../assets/meeting.webp";
import meeting2 from "../assets/meeting2.webp";
import person1 from "../assets/person1.jpeg";
import person2 from "../assets/person2.jpg";
import person3 from "../assets/person3.jpg";
import person4 from "../assets/person4.jpg";
import meeting3 from "../assets/meeting3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function HostHackathon() {
  return (
    <div>
      <nav className="px-24 flex items-center justify-between py-10 pb-12 absolute top-0 left-0 z-2 right-0 bg-transparent">
        <div className="flex items-center space-x-8">
          <div className="text-3xl font-bold text-white bg-gradient-to-r from-[#D69ADE] to-[#AA60C8]  px-3 py-1 rounded">
            Hacked
          </div>
          <Link className="text-xl text-white hover:underline pl-8">
            Join a hackathon
          </Link>
          <Link
            to="/host/hackathon"
            className="text-xl text-white hover:underline"
          >
            Host a hackathon
          </Link>
          <Link className="text-xl text-white hover:underline">Resources</Link>
        </div>
        <div className="flex items-center space-x-8">
          <Link to="/api/auth/signin" className="text-xl text-white">
            Sign in
          </Link>
          <Link
            to="/api/auth/signup"
            className="bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] text-xl text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign up
          </Link>
        </div>
      </nav>
      <div className="aboutus-hero-section">
        <div className="left-aboutus-hero-section ">
          <p>Branded &nbsp; | &nbsp; Quality &nbsp; | &nbsp; Products</p>
          <h2>
            WE OFFER <span>QUALITY</span> PRODUCTS
          </h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non amet
            neque nobis. Fugiat eos id esse excepturi velit, debitis alias.
          </p>
          <button>Read More &rarr;</button>
        </div>
      </div>

      <div className="features-section">
        <div className="features">
          <div className="feature-top-section">
            <p>01</p>
          </div>
          <div className="feature-bottom-section">
            <h3>Best Quality</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
              deserunt ad, officiis illo voluptates aspernatur quod quidem unde
              perferendis nostrum!
            </p>
          </div>
        </div>
        <div className="features">
          <div className="feature-top-section">
            <p>02</p>
          </div>
          <div className="feature-bottom-section">
            <h3>Fast Delivery</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
              deserunt ad, officiis illo voluptates aspernatur quod quidem unde
              perferendis nostrum!
            </p>
          </div>
        </div>
        <div className="features">
          <div className="feature-top-section">
            <p>03</p>
          </div>
          <div className="feature-bottom-section">
            <h3>Best Price</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
              deserunt ad, officiis illo voluptates aspernatur quod quidem unde
              perferendis nostrum!
            </p>
          </div>
        </div>
      </div>
      <div className="aboutus-contents">
        <img className="aboutus-content-image" src={meeting3} alt="" />
        <div className="aboutus-description">
          <h4>ABOUT US</h4>
          <h2>Building More Business Competition</h2>
          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
            eligendi odio cupiditate, minus consectetur provident placeat, atque
            magni libero culpa unde reprehenderit molestias vel repellat? Dolor
            nulla quia eveniet quod.
          </p>
          <div className="about-qualities">
            <div className="about-quality">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="circle-check-icon"
              />
              <p>Technology Services</p>
            </div>
            <div className="about-quality">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="circle-check-icon"
              />
              <p>Technology Services</p>
            </div>
          </div>
          <div className="experiences">
            <div className="experience">
              <p className="experience-section-leftside">
                10 <sup>+</sup>
              </p>
              <p className="experience-section-rightside">
                Years of Experience
              </p>
            </div>
            <div className="experience">
              <p className="experience-section-leftside">
                70 <sup>k</sup>
              </p>
              <p className="experience-section-rightside">
                Individual Customers
              </p>
            </div>
          </div>
          <button className="learn-btn">Learn More &rarr;</button>
        </div>
      </div>
    </div>
  );
}
