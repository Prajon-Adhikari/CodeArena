import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import dragon from "../assets/dragon.jpg";
import developer from "../assets/developer.png";

export default function home() {
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
    <div className="min-h-screen ">
      <div className="flex px-[120px] py-[80px] gap-20 items-center">
        <div className="w-[700px]">
          <h1
            className="text-6xl pb-14 text-blue-300"
            style={{ WebkitTextStroke: "1px" }}
          >
            Unlock your Potential with{" "}
            <span className="text-orange-300">CodeArena</span>
          </h1>
          <p className="text-[1.2rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis,
            illum veritatis at, explicabo cum eos blanditiis accusamus quaerat
            enim officiis laborum quidem magni, ipsa dicta minus maxime fugit ad
            labore similique cumque iusto. Vitae ex laudantium dolore incidunt
            mollitia doloremque inventore odit! Quasi nihil quam amet illum
            perspiciatis deserunt.
          </p>
          <div className="flex gap-10 text-white pt-14">
            <button className="hover:shadow-[0px_0px_7px_#60B5FF] cursor-pointer bg-gradient-to-r from-[#60B5FF] to-[#8DD8FF] px-7 py-3 text-lg rounded-md">
              Join a Hackathon &rarr;
            </button>
            <button className="hover:shadow-[0px_0px_7px_#60B5FF] cursor-pointer bg-gradient-to-r from-[#60B5FF] to-[#8DD8FF] px-7 py-3 text-lg rounded-md">
              Host a Hackathon &rarr;
            </button>
          </div>
        </div>
        <div className="h-[500px] ">
          <img
            src={developer}
            alt=""
            className="w-full h-full drop-shadow-xl"
          />
        </div>
      </div>
      <div className="pb-[200px] pt-20 w-[100%] overflow-hidden relative">
        <div
          className="bg-blue-300  text-gray-700 h-14 absolute rotate-3 w-[100%] z-24 flex items-center justify-center gap-[110px] text-2xl px-8"
          style={{ WebkitTextStroke: "1px" }}
        >
          <FontAwesomeIcon icon={faStarOfLife} />
          <span> CODE </span>
          <FontAwesomeIcon icon={faStarOfLife} /> <span>CREATE </span>
          <FontAwesomeIcon icon={faStarOfLife} /> <span>HACK </span>
          <FontAwesomeIcon icon={faStarOfLife} /> <span>CONQUER </span>
          <FontAwesomeIcon icon={faStarOfLife} />
        </div>
        <div className="bg-orange-300 text-gray-700 h-14 absolute -rotate-3 w-[100%] flex items-center justify-center gap-[110px] text-2xl px-8">
          <FontAwesomeIcon icon={faStarOfLife} />
          <span> CONQUER </span>
          <FontAwesomeIcon icon={faStarOfLife} /> <span>HACK </span>
          <FontAwesomeIcon icon={faStarOfLife} /> <span>CREATE </span>
          <FontAwesomeIcon icon={faStarOfLife} /> <span>CODE </span>
          <FontAwesomeIcon icon={faStarOfLife} />
        </div>
      </div>
      <div className="ml-[100px] mt-10">
        {hackathons.map((hackathon, index) => {
          return (
            <div
              key={hackathon._id}
              className="group relative bg-transparent pr-[50px] py-[2px] w-[700px] h-[250px] mb-6 overflow-hidden"
            >
              {/* Animated Background Layer */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-in-out z-0"></div>

              {/* Content Layer */}
              <div
                style={{ backgroundImage: `url(${dragon})` }}
                className="relative z-10 mb-4  bg-cover bg-center flex w-[660px] h-full border border-l-8 cursor-pointer border-blue-300"
              >
                <div className="flex gap-8 p-6 w-full">
                  <div className="bg-[url('./src/assets/demo-logo.jpg')] h-24 w-24 bg-cover bg-center"></div>
                  <div className="w-[500px]">
                    <h2 className="text-[22px] font-semibold h-[100px]">
                      {hackathon.title}
                    </h2>
                    <div className="flex justify-between pr-10 py-3">
                      <p className="text-lg text-gray-500">
                        Starts:{" "}
                        <span className="text-black">
                          {new Date(hackathon.startDate).toLocaleDateString()}
                        </span>
                      </p>
                      <p className="text-lg text-gray-500">
                        Ends:{" "}
                        <span className="text-black">
                          {new Date(hackathon.endDate).toLocaleDateString()}
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
