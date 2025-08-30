import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import aboutUsHeroImage from "../assets/aboutusheroimage.jpg";
import aboutUsCoding1 from "../assets/aboutuscoding1.jpg";
import aboutUsCoding2 from "../assets/aboutuscoding2.jpg";
const About = () => {
  return (
    <>
      <div className="pt-[80px]">
        <div
          className="h-[600px] bg-gray-300"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 70% 100%, 0% 87.5%)",
          }}
        >
          <div
            className="bg-cover bg-center h-[520px] flex items-center px-[150px] text-white"
            style={{
              backgroundImage: `url(${aboutUsHeroImage})`,
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 90%, 70% 100%, 40% 90%, 0% 100%)",
            }}
          >
            <div className="w-[500px]">
              <p className="text-4xl underline font-bold pb-5 text-orange-300">
                About Us
              </p>
              <p className="text-6xl pb-4">
                Unleashing Potential, Building the Future of Tech
              </p>
              <p className="text-gray-400 pb-5">
                We believe that coding is more than just writing lines of
                code—it's about creating, learning, and growing together. Join
                us in shaping a better tomorrow through technology.
              </p>
              <p>
                <Link to="/" className="pr-2 ">
                  Home
                </Link>{" "}
                <span className="text-orange-300">&rarr;</span>{" "}
                <Link to="/about" className="pl-2 text-orange-300">
                  About
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="px-[140px] flex gap-20 items-center py-30 h-[700px]">
          <div className="w-[600px]">
            <div>
              <div className="text-5xl text-orange-400 font-bold">Providing full range </div>
              <span className="text-5xl text-blue-300 font-bold">of transportation</span>
            </div>
            <div className="pt-8 text-xl pb-16">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              quod consequatur temporibus provident numquam labore dolorem
              laborum tempore distinctio autem, nobis architecto, sunt culpa
              voluptatem?
            </div>
            <button className="bg-orange-400 text-white px-8 py-2 text-lg rounded-md">Learn More &rarr;</button>
          </div>
          <div className="relative w-[50%] h-full">
            <img src={aboutUsCoding1} alt="" className="w-[400px] h-[300px] object-cover rounded-xl absolute left-0 top-0"/>
            <img src={aboutUsCoding2} alt=""  className="w-[300px] h-[200px] object-cover rounded-xl absolute bottom-10 right-0" />
            <div className="shadow-[0px_0px_5px_#7F8CAA] inline-block p-4 rounded-md  absolute top-65 right-62 bg-white">
              <p className="text-orange-400 text-center text-3xl font-bold">20 +</p>
              <p>Year Experience</p>
            </div>
          </div>
        </div>
        <div
          className="py-20 bg-gray-300"
          style={{
            clipPath:
              "polygon(0% 10%, 40% 0%, 100% 10%, 100% 10%, 100% 94%, 75% 88%, 0% 90%)",
          }}
        >
          <div
            className="bg-cover bg-center h-[580px] flex items-center px-[150px] text-white"
            style={{
              backgroundImage: `url(${aboutUsHeroImage})`,
              clipPath:
                "polygon(0% 5%, 40% 0%, 70% 5%, 100% 0%, 100% 100%, 75% 90%, 0% 100%)",
            }}
          >
            <div className="w-[500px]">
              <p className="text-4xl underline font-bold pb-5 text-orange-300">
                About Us
              </p>
              <p className="text-6xl pb-4">
                Unleashing Potential, Building the Future of Tech
              </p>
              <p className="text-gray-400 pb-5">
                We believe that coding is more than just writing lines of
                code—it's about creating, learning, and growing together. Join
                us in shaping a better tomorrow through technology.
              </p>
              <p>
                <Link to="/" className="pr-2 ">
                  Home
                </Link>{" "}
                <span className="text-orange-300">&rarr;</span>{" "}
                <Link to="/about" className="pl-2 text-orange-300">
                  About
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
