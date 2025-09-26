import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faStarOfLife,
  faMagnifyingGlass,
  faPeopleGroup,
  faGraduationCap,
  faUser,
  faBookmark,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import dragon from "../assets/dragon.jpg";
import coding1 from "../assets/coding1.jpg";
import coding2 from "../assets/coding2.jpg";
import coding4 from "../assets/coding4.jpg";
import coding5 from "../assets/coding5.jpg";
import homeimg1 from "../assets/homeimg1.jpg";
import homeimg2 from "../assets/homeimg2.jpg";
import homeimg3 from "../assets/homeimg3.jpg";
import homeimg4 from "../assets/homeimg4.jpg";
import homeimg5 from "../assets/homeimg5.jpg";
import meeting from "../assets/meeting.webp";
import hackathon from "../assets/hackathon.jpg";
import hackathon2 from "../assets/hackathon2.jpg";
import chatting from "../assets/chatting.jpg";
import demo from "../assets/demo-logo.jpg";

export default function home() {
  const [hackathons, setHackathons] = useState([]);
  const [images, setImages] = useState([homeimg4, homeimg3, homeimg5]);
  const [imageIndex, setImageIndex] = useState(0);
  const [tagline1, setTagline1] = useState("");
  const [tagline2, setTagline2] = useState("");
  const [themeCounts, setThemeCounts] = useState({});
  const hasTyped = useRef(false); // Prevents double typing

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    if (hasTyped.current) return; // Skip if already run
    hasTyped.current = true;

    setTagline1(""); // Clear before typing
    setTagline2("");

    const text1 = "Coode Create Conquer";
    const text2 = "Onne Arena. Infinite Possibilities.";

    let i = 0;
    let j = 0;

    const typeText1 = () => {
      if (i < text1.length) {
        setTagline1((prev) => prev + text1.charAt(i));
        i++;
        setTimeout(typeText1, 100);
      } else {
        setTimeout(typeText2, 500);
      }
    };

    const typeText2 = () => {
      if (j < text2.length) {
        setTagline2((prev) => prev + text2.charAt(j));
        j++;
        setTimeout(typeText2, 80);
      }
    };

    typeText1();
  }, []);

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
        setHackathons(data.hackathons || []);
        setThemeCounts(data.themeCounts || {});
      } catch (error) {
        console.log("Error while fetching hackathon tournaments", error);
      }
    };
    fetchHackathons();
  }, []);

  return (
    <div className="min-h-screen pt-[50px]">
      <div className="flex px-[100px] pt-[100px] pb-[80px] gap-20 items-center">
        <div className="w-[650px] left-slide-animation">
          <h1
            className="text-6xl pb-10 text-[#43aced]"
            style={{ WebkitTextStroke: "3px" }}
          >
            Unlock your potential with{" "}
            <span className="text-orange-300">CodeArena</span>
          </h1>
          <p className="text-[1.2rem] ">
            CodeArena is the ultimate platform for coders, developers, and tech
            enthusiasts to compete, collaborate, and showcase their skills.
            Participate in hackathons, solve real-world challenges, and build a
            portfolio that stands out. Whether you’re a beginner or an
            experienced programmer, CodeArena empowers you to learn, innovate,
            and shine in the world of technology.
          </p>
          <div className="flex gap-10 text-white pt-14">
            <Link
              to="/join/hackathon"
              className="hover:shadow-[0px_0px_7px_#60B5FF] cursor-pointer  bg-gradient-to-r from-[#3396D3] to-[#4DA8DA] px-7 py-3 text-lg rounded-md"
            >
              Join a Hackathon &rarr;
            </Link>
            <Link
              to="/hackathon"
              className="hover:shadow-[0px_0px_7px_#60B5FF] cursor-pointer bg-gradient-to-r from-[#3396D3] to-[#4DA8DA] px-7 py-3 text-lg rounded-md"
            >
              Host a Hackathon &rarr;
            </Link>
          </div>
        </div>
        <div className="h-[500px] w-[570px] relative right-slide-animation">
          <img
            src={images[imageIndex]}
            alt=""
            className="w-[290px] h-[360px] z-10 object-cover rounded-2xl absolute top-15 right-30"
          />
          <img
            src={homeimg2}
            alt=""
            className="w-[180px] h-[220px] object-cover rounded-xl absolute bottom-0 left-10"
          />
          <img
            src={homeimg1}
            alt=""
            className="w-[160px] h-[120px] object-cover rounded-xl absolute top-10 right-0 z-20"
          />
          <div className="bg-white/20 text-xl text-black backdrop-blur-md border font-semibold border-white/20 rounded-xl px-6 py-4 shadow-lg absolute top-20 left-0 z-20 ">
            {" "}
            {tagline1}
          </div>
          <div className="bg-white/20 text-xl text-black backdrop-blur-md border font-semibold border-white/20 rounded-xl px-6 py-4 shadow-lg absolute bottom-10 z-20 right-0 ">
            {tagline2}
          </div>
        </div>
      </div>
      <div className="pb-[180px] pt-20 w-[100%]  overflow-hidden relative">
        <div
          className="bg-blue-300  text-gray-600 h-14 absolute rotate-3 w-[100%] z-24 flex items-center justify-center gap-[110px] text-2xl px-8"
          style={{ WebkitTextStroke: "1px" }}
        >
          <FontAwesomeIcon icon={faStarOfLife} />
          <span> CODE </span>
          <FontAwesomeIcon icon={faStarOfLife} /> <span>CREATE </span>
          <FontAwesomeIcon icon={faStarOfLife} /> <span>HACK </span>
          <FontAwesomeIcon icon={faStarOfLife} /> <span>CONQUER </span>
          <FontAwesomeIcon icon={faStarOfLife} />
        </div>
        <div className="bg-orange-300 text-gray-600 h-14 absolute -rotate-3 w-[100%] flex items-center justify-center gap-[110px] text-2xl px-8">
          <FontAwesomeIcon icon={faStarOfLife} />
          <span> CONQUER </span>
          <FontAwesomeIcon icon={faStarOfLife} /> <span>HACK </span>
          <FontAwesomeIcon icon={faStarOfLife} /> <span>CREATE </span>
          <FontAwesomeIcon icon={faStarOfLife} /> <span>CODE </span>
          <FontAwesomeIcon icon={faStarOfLife} />
        </div>
      </div>
      <h1 className=" text-center text-4xl font-bold pb-16 animation">
        Search For Your Dream <span className="text-orange-400">Hackathon</span>
      </h1>
      <div className="flex justify-center gap-4 pb-14 animation">
        <div className="border-blue-400 border-2 px-5 py-3 rounded-sm flex items-center gap-4 focus-within:ring-1 focus-within:ring-blue-400">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-xl text-blue-400"
          />
          <input
            type="text"
            placeholder="Find your next hackathon"
            className=" w-[640px] text-xl  outline-none"
          />
        </div>
        <button className="bg-blue-400 hover:bg-blue-500 cursor-pointer text-xl text-white px-8 rounded-sm">
          Search Hackathon
        </button>
      </div>
      <div className="flex ml-[100px] mt-10 gap-30 animation">
        <div>
          <h1 className="text-4xl pb-10 font-semibold pl-4">
            Hackathons for you{" "}
          </h1>
          {hackathons.map((hackathon, index) => {
            return (
              <Link to={`/${hackathon._id}/overview`}>
                <div
                  key={hackathon._id|| ""}
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
                      <img
                        src={demo}
                        alt=""
                        className="h-20 w-20 object-cover"
                      />
                      <div className="w-[500px]">
                        <h2 className="text-[22px] font-semibold h-[100px]">
                          {hackathon.title|| ""}
                        </h2>
                        <div className="flex justify-between pr-10 py-3">
                          <p className="text-lg text-gray-500">
                            Starts:{" "}
                            <span className="text-black">
                              {new Date(
                                hackathon.startDate
                              ).toLocaleDateString()}
                            </span>
                          </p>
                          <p className="text-lg text-gray-500">
                            Ends:{" "}
                            <span className="text-black">
                              {new Date(hackathon.endDate|| "").toLocaleDateString()}
                            </span>
                          </p>
                        </div>
                        <div className="flex justify-between pr-10 pt-3">
                          <p className="text-lg text-gray-500">
                            Registration Deadline:{" "}
                            <span className="text-black">
                              {new Date(
                                hackathon.registrationDeadline
                              ).toLocaleDateString()|| ""}
                            </span>
                          </p>
                          <p className="text-lg">
                            <FontAwesomeIcon
                              icon={faGlobe}
                              className="text-gray-500"
                            />
                            <span className="ml-2 capitalize">
                              {hackathon.mode|| ""}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          <Link to="/join/hackathon">
            <button className="bg-blue-400 px-10 py-3 text-xl mt-5  rounded-sm cursor-pointer text-white hover:shadow-[0px_0px_4px_#60B5FF]">
              View All Hackathon <span className="pl-4">&rarr;</span>
            </button>
          </Link>
        </div>
        <div>
          <h2 className=" text-2xl font-semibold pl-4 pb-6 text-gray-600">
            Top Hackathon Themes
          </h2>
          <table className="border-separate border-spacing-y-4">
            <thead className="text-left text-xl">
              <tr className=" text-gray-600 ">
                <th className="w-[280px] py-4 px-6">Theme</th>
                <th className="w-[160px]">Hackathons</th>
                <th className="w-[40px]"></th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(themeCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 11)
                .map(([theme, hackathonNumber], index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50 cursor-pointer"
                    onClick={() => navigate(`/join/hackathon?theme=${theme}`)}
                  >
                    <td className="p-4">
                      <span className="bg-orange-200 rounded-2xl py-2 px-6 capitalize">
                        {theme || ""}
                      </span>
                    </td>
                    <td className="text-lg">{hackathonNumber}</td>
                    <td className="text-lg font-semibold">&rarr;</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="  h-[690px] my-30 px-[100px] py-[70px]  flex gap-30 bg-[#4d97bf] text-white">
        <div className="w-[600px] relative animation">
          <img
            src={coding1}
            alt=""
            className="h-[420px] w-[340px] object-cover absolute top-10 left-30  rounded-4xl z-10 shadow-[0px_0px_8px_gray]"
          />
          <img
            src={coding4}
            alt=""
            className="h-[100px] absolute top-20 left-0  rounded-2xl shadow-[0px_0px_8px_gray]"
          />
          <img
            src={coding5}
            alt=""
            className="h-[78px] w-[78px] object-cover absolute top-40 right-12  rounded-2xl z-10 shadow-[0px_0px_8px_gray]"
          />
          <img
            src={coding2}
            alt=""
            className="h-[150px] w-[210px] object-cover absolute bottom-5 left-0  rounded-4xl shadow-[0px_0px_8px_gray]"
          />
          <img
            src={meeting}
            alt=""
            className="h-[210px] w-[290px] object-cover absolute bottom-0 right-5 z-20  rounded-4xl shadow-[0px_0px_8px_gray]"
          />
        </div>
        <div className="w-[600px] flex flex-col justify-center text-center gap-8 animation">
          <h1 className="text-[3.9rem] font-extrabold">
            Explore more about{" "}
            <span className="text-orange-400">CODEARENA</span>
          </h1>
          <p className="text-xl pl-5">
            Explore a world of hackathons, coding challenges, and innovative
            projects on CodeArena. Connect with fellow developers, sharpen your
            skills, and discover opportunities to showcase your talent to the
            global tech community.
          </p>
          <Link
            to="/about"
            className="hover:shadow-[0px_0px_7px_#FF9D3D] mx-auto cursor-pointer text-white bg-[#FF9D3D] w-[200px] px-7 py-3 text-lg rounded-md"
          >
            Explore More &rarr;
          </Link>
        </div>
      </div>
      <div className="px-[140px] animation">
        <h1 className="text-[3.4rem] font-bold text-center mb-20 text-[#F79327]">
          Level up with <span className="text-black">CodeArena</span>
        </h1>
        <div className="flex justify-between">
          <div>
            <div className="flex gap-5 bg-white w-[680px] px-8 py-6 shadow-[5px_5px_10px_#d1d5db,-1px_-1px_2px_#d1d5db] rounded-2xl ">
              <FontAwesomeIcon
                icon={faCalendarDays}
                className=" text-2xl border-[2px] border-[#d9d3d3] p-2 rounded-xl "
              />
              <div>
                <h1 className="font-semibold text-xl mb-3">Special Events</h1>
                <p className="text-gray-500">
                  Participate in exclusive events organized by CodeArena. From
                  coding sprints to hackathons, these events give you the chance
                  to learn new technologies, network with developers, and
                  challenge yourself with exciting projects.
                </p>
              </div>
            </div>
            <div className="flex gap-10 mt-8">
              <div className=" bg-white w-[320px] px-8 py-6 shadow-[5px_5px_10px_#d1d5db,-1px_-1px_2px_#d1d5db] rounded-2xl ">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="mb-[16px] bg-[#FF9D23] text-white text-3xl  px-3 py-4 rounded-xl"
                />
                <div>
                  <h1 className="font-semibold text-xl mb-3">
                    Student Friendly
                  </h1>
                  <p className="text-gray-500">
                    CodeArena is designed with students in mind. Join
                    competitions, build your portfolio, and gain hands-on
                    experience with real-world coding challenges in a supportive
                    learning environment.
                  </p>
                </div>
              </div>
              <div className=" bg-white w-[320px] px-8 py-6 shadow-[5px_5px_10px_#d1d5db,-1px_-1px_2px_#d1d5db] rounded-2xl ">
                <FontAwesomeIcon
                  icon={faPeopleGroup}
                  className="mb-[16px] text-3xl  border-[2px] border-[#d9d3d3] px-3 py-4 rounded-xl"
                />
                <div>
                  <h1 className="font-semibold text-xl mb-3 ">
                    Community Building
                  </h1>
                  <p className="text-gray-500">
                    Connect with like-minded developers, share ideas, and
                    collaborate on projects. CodeArena helps you build a strong
                    professional network while fostering teamwork and
                    creativity.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white w-[510px] p-3 shadow-[5px_5px_10px_#d1d5db,-1px_-1px_2px_#d1d5db] rounded-3xl ">
              <img
                src={meeting}
                alt=""
                className="rounded-2xl h-[320px] w-full object-cover"
              />
              <div className="mx-4 mt-4 mb-2">
                <h1 className="font-semibold text-2xl mb-3">
                  All-in-One Hakathon Platform
                </h1>
                <p className="text-gray-500">
                  Manage, participate, and track hackathons all in one place.
                  CodeArena provides tools to join, host, and monitor coding
                  competitions effortlessly, making the entire experience
                  seamless.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-[100px] flex bg-[#4f8bb3] mt-30 rounded-2xl animation">
        <h1 className="text-[36px] bg-[#5EABD6] py-[36px] w-[290px] px-12 rounded-l-2xl text-white text-left font-bold">
          <span className="text-xl font-semibold text-[#feaf4f]">
            SOME NUMBERS
          </span>{" "}
          <br />
          What we did so far
        </h1>
        <div className="flex items-center gap-22 px-[100px]">
          <div className="text-center">
            <div className="text-[50px] font-bold text-[#feaf4f]">350 +</div>
            <div className="text-white font-semibold text-lg">
              COMPLETED HACKATHONS
            </div>
          </div>
          <div className="text-center">
            <div className="text-[50px] font-bold text-[#feaf4f]">12 +</div>
            <div className="text-white font-semibold text-lg">
              YEAR EXPERIENCE
            </div>
          </div>
          <div className="text-center">
            <div className="text-[50px] font-bold text-[#feaf4f]">350 +</div>
            <div className="text-white font-semibold text-lg">
              COMPLETED HACKATHONS{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="px-[100px] py-[100px] animation">
        <h1 className="text-[#4f8bb3] text-[50px] flex flex-col text-center font-bold mb-20">
          Services That Fits <span className="text-[#feaf4f]">Your Needs</span>
        </h1>
        <div className="flex justify-evenly">
          <div className="shadow-[5px_5px_10px_#d1d5db] w-[340px] rounded-xl mt-16 h-[460px]">
            <div className="h-[220px] relative overflow-hidden ">
              <div className="relative h-[86%] w-full">
                <img
                  src={hackathon}
                  alt=""
                  className="h-full w-full object-cover rounded-t-xl"
                />
                {/* Blue gradient overlay directly on image */}
                <div className="absolute inset-0 bg-[linear-gradient(to_top,_#27548A_0%,_transparent,_transparent,_transparent)] rounded-t-xl" />
              </div>
              <FontAwesomeIcon
                icon={faBookmark}
                className="absolute bottom-0 left-5 px-[19px] py-4 text-2xl bg-[#27548A] text-white border-4 border-white rounded-full"
              />
            </div>
            <div className="p-4">
              <h1 className="text-blue-900 text-2xl mb-2 font-bold">
                Join Hackathon
              </h1>
              <p className="text-gray-700 mb-3">
                Discover and join hackathons that match your skills and
                interests. Solve challenges, collaborate with others, and gain
                recognition for your coding expertise on a global platform.
              </p>
              <button className="text-lg text-orange-400 mb-2">
                Learn More &rarr;
              </button>
            </div>
          </div>
          <div className="shadow-[5px_5px_10px_#d1d5db] w-[340px] rounded-xl h-[460px]">
            <div className="h-[220px] relative overflow-hidden ">
              <div className="relative h-[86%] w-full">
                <img
                  src={hackathon2}
                  alt=""
                  className="h-full w-full object-cover rounded-t-xl"
                />
                {/* Blue gradient overlay directly on image */}
                <div className="absolute inset-0 bg-[linear-gradient(to_top,_#27548A_0%,_transparent,_transparent,_transparent)] rounded-t-xl" />
              </div>
              <FontAwesomeIcon
                icon={faCalendar}
                className="absolute bottom-0 left-5 px-[18px] py-4 text-2xl bg-[#27548A] text-white border-4 border-white rounded-full"
              />
            </div>{" "}
            <div className="p-4">
              <h1 className="text-blue-900 text-2xl mb-2 font-bold">
                Host Hackathon
              </h1>
              <p className="text-gray-700 mb-3">
                Organize your own hackathons and reach a global developer
                audience. Easily create challenges, manage registrations, and
                track progress while fostering innovation and creativity.
              </p>
              <button className="text-lg text-orange-400 mb-2">
                Learn More &rarr;
              </button>
            </div>
          </div>
          <div className="shadow-[5px_5px_10px_#d1d5db] w-[340px] rounded-xl mt-16 h-[460px]">
            <div className="h-[220px] relative overflow-hidden ">
              <div className="relative h-[86%] w-full">
                <img
                  src={chatting}
                  alt=""
                  className="h-full w-full object-cover rounded-t-xl"
                />
                {/* Blue gradient overlay directly on image */}
                <div className="absolute inset-0 bg-[linear-gradient(to_top,_#27548A_0%,_transparent,_transparent,_transparent)] rounded-t-xl" />
              </div>
              <FontAwesomeIcon
                icon={faUser}
                className="absolute bottom-0 left-5 px-4 py-[14px] text-2xl bg-[#27548A] text-white border-4 border-white rounded-full"
              />
            </div>
            <div className="p-4">
              <h1 className="text-blue-900 text-2xl mb-2 font-bold">
                Team Messaging
              </h1>
              <p className="text-gray-700 mb-3">
                Collaborate efficiently with your team using CodeArena’s
                messaging system. Share ideas, coordinate tasks, and stay
                connected during hackathons to ensure smooth teamwork and
                success.
              </p>
              <button className="text-lg text-orange-400 mb-2">
                Learn More &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
