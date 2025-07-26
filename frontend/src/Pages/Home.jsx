import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

export default function home() {
  const [hackathons, setHackathons] = useState([]);
  const [images, setImages] = useState([homeimg4, homeimg3, homeimg5]);
  const [imageIndex, setImageIndex] = useState(0);
  const [tagline1, setTagline1] = useState("");
  const [tagline2, setTagline2] = useState("");
  const hasTyped = useRef(false); // Prevents double typing

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

  const hackthonData = [
    {
      theme: "Beginner Friendly",
      hackathonNumber: 53,
      totalPrizes: 1749000,
    },
    {
      theme: "Machine Learning",
      hackathonNumber: 45,
      totalPrizes: 1561000,
    },
    {
      theme: "Social Goods ",
      hackathonNumber: 35,
      totalPrizes: 749000,
    },
    {
      theme: "Web ",
      hackathonNumber: 30,
      totalPrizes: 649000,
    },
    {
      theme: "Education",
      hackathonNumber: 28,
      totalPrizes: 499000,
    },
    {
      theme: "Open Ended",
      hackathonNumber: 25,
      totalPrizes: 461000,
    },
    {
      theme: "Low/No Code",
      hackathonNumber: 22,
      totalPrizes: 349000,
    },
    {
      theme: "IoT ",
      hackathonNumber: 20,
      totalPrizes: 259000,
    },
    {
      theme: "Blockchain",
      hackathonNumber: 17,
      totalPrizes: 209000,
    },
  ];

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
        console.log(data.hackathons);
        setHackathons(data.hackathons || []);
      } catch (error) {
        console.log("Error while fetching hackathon tournaments", error);
      }
    };
    fetchHackathons();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex px-[100px] pt-[100px] pb-[80px] gap-20 items-center">
        <div className="w-[650px]">
          <h1
            className="text-6xl pb-14 text-[#1E90FF]"
            style={{ WebkitTextStroke: "3px" }}
          >
            Unlock your potential with{" "}
            <span className="text-orange-300">CodeArena</span>
          </h1>
          <p className="text-[1.2rem] ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis,
            illum veritatis at, explicabo cum eos blanditiis accusamus quaerat
            enim officiis laborum quidem magni, ipsa dicta minus maxime fugit ad
            labore similique cumque iusto. Vitae ex laudantium dolore incidunt
            mollitia doloremque inventore odit! Quasi nihil quam amet illum
            perspiciatis deserunt.
          </p>
          <div className="flex gap-10 text-white pt-14">
            <Link
              to="/join/hackathon"
              className="hover:shadow-[0px_0px_7px_#60B5FF] cursor-pointer  bg-gradient-to-r from-[#1E90FF] to-[#60B5FF] px-7 py-3 text-lg rounded-md"
            >
              Join a Hackathon &rarr;
            </Link>
            <Link
              to="/hackathon"
              className="hover:shadow-[0px_0px_7px_#60B5FF] cursor-pointer bg-gradient-to-r from-[#1E90FF] to-[#60B5FF] px-7 py-3 text-lg rounded-md"
            >
              Host a Hackathon &rarr;
            </Link>
          </div>
        </div>
        <div className="h-[500px] w-[570px] relative ">
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
          <div class="bg-white/20 text-xl text-orange-500 backdrop-blur-md border font-semibold border-white/20 rounded-xl px-6 py-4 shadow-lg absolute top-20 left-0 z-20 ">
            {" "}
            {tagline1}
          </div>
          <div class="bg-white/20 text-xl text-orange-500 backdrop-blur-md border font-semibold border-white/20 rounded-xl px-6 py-4 shadow-lg absolute bottom-10 z-20 right-0 ">
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
      <h1 className=" text-center text-4xl font-bold pb-16">
        Search For Your Dream <span className="text-orange-400">Hackathon</span>
      </h1>
      <div className="flex justify-center gap-4 pb-14 ">
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
      <div className="flex ml-[100px] mt-10 gap-16">
        <div>
          <h1 className="text-4xl pb-10 font-semibold pl-4">
            Hackathons for you{" "}
          </h1>
          {hackathons.map((hackathon, index) => {
            return (
              <Link to={`/${hackathon._id}`}>
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
                              {new Date(
                                hackathon.startDate
                              ).toLocaleDateString()}
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
                <th className="w-[120px]">Prizes</th>
                <th className="w-[40px]"></th>
              </tr>
            </thead>
            <tbody>
              {hackthonData.map((data, index) => {
                return (
                  <tr key={index} className="hover:bg-blue-50 cursor-pointer">
                    <td className="p-4 ">
                      <span className="bg-orange-200 rounded-2xl py-2 px-6">
                        {data.theme}
                      </span>
                    </td>
                    <td className="text-lg">{data.hackathonNumber}</td>
                    <td className="text-lg">{data.totalPrizes}</td>
                    <td className="text-lg font-semibold ">&rarr;</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="  h-[690px] my-30 px-[100px] py-[70px]  flex gap-30 bg-[#4DA1A9] text-white">
        <div className="w-[600px] relative">
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
        <div className="w-[600px] flex flex-col justify-center text-center gap-10">
          <h1 className="text-[3.9rem] font-extrabold">
            Explore more about{" "}
            <span className="text-orange-400">CODEARENA</span>
          </h1>
          <p className="text-xl pl-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur quasi fugiat, culpa hic, laboriosam dolore ipsum
            possimus voluptas placeat eos asperiores, reprehenderit impedit!
            Aliquid libero molestias pariatur ducimus ipsa sit quae, quam quos
            dolor ullam fugit esse ipsum consequuntur ratione facilis!
            Accusantium similique quia facilis neque ut quae eligendi aperiam
            blanditiis hic.
          </p>
          <Link
            to="/about"
            className="hover:shadow-[0px_0px_7px_#FF9D3D] mx-auto cursor-pointer text-white bg-[#FF9D3D] w-[200px] px-7 py-3 text-lg rounded-md"
          >
            Explore More &rarr;
          </Link>
        </div>
      </div>
      <div className="px-[140px]">
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
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Nesciunt non vitae modi, consequuntur recusandae iste maiores
                  deserunt! Obcaecati, quidem explicabo.Obcaecati, quidem
                  explicabo.Obcaecati, quidem explicabo.Obcaecati, quidem
                  explicabo.
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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nesciunt non vitae modi, consequuntur recusandae iste
                    maiores deserunt! Obcaecati, quidem explicabo.
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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nesciunt non vitae modi, consequuntur recusandae iste
                    maiores deserunt! Obcaecati, quidem explicabo.
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
              <div className="mx-4 mt-6 mb-2">
                <h1 className="font-semibold text-2xl mb-5">
                  All-in-One Hakathon Platform
                </h1>
                <p className="text-gray-500">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Nesciunt non vitae modi, consequuntur recusandae iste maiores
                  deserunt! Obcaecati, quidem explicabo.quidem explicabo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-[100px] flex bg-[#4f8bb3] mt-30 rounded-2xl">
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
      <div className="px-[100px] py-[100px]">
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
                Lorem ipsum dolor sit amet elit. Illo accusamus est nihil cumque
                ipsa consequatur assumenda aperiam assumenda aperiam assumenda
                aperiam
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
                Lorem ipsum dolor sit amet elit. Illo accusamus est nihil cumque
                ipsa consequatur assumenda aperiam assumenda aperiam assumenda
                aperiam
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
                Lorem ipsum dolor sit amet elit. Illo accusamus est nihil cumque
                ipsa consequatur assumenda aperiam assumenda aperiam assumenda
                aperiam
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
