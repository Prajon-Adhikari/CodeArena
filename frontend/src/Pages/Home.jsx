import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faStarOfLife,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import dragon from "../assets/dragon.jpg";
import developer from "../assets/developer.png";
import coding1 from "../assets/coding1.jpg";
import coding2 from "../assets/coding2.jpg";
import coding3 from "../assets/coding3.jpg";
import coding4 from "../assets/coding4.jpg";

export default function home() {
  const [hackathons, setHackathons] = useState([]);

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
      <div className="flex px-[120px] pt-[100px] pb-[80px] gap-20 items-center">
        <div className="w-[700px]">
          <h1
            className="text-6xl pb-14 text-blue-300"
            style={{ WebkitTextStroke: "1px" }}
          >
            Unlock your Potential with{" "}
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
              className="hover:shadow-[0px_0px_7px_#60B5FF] cursor-pointer bg-gradient-to-r from-[#60B5FF] to-[#8DD8FF] px-7 py-3 text-lg rounded-md"
            >
              Join a Hackathon &rarr;
            </Link>
            <Link
              to="/hackathon"
              className="hover:shadow-[0px_0px_7px_#60B5FF] cursor-pointer bg-gradient-to-r from-[#60B5FF] to-[#8DD8FF] px-7 py-3 text-lg rounded-md"
            >
              Host a Hackathon &rarr;
            </Link>
          </div>
        </div>
        <div className="h-[500px] ">
          <img
            src={developer}
            alt=""
            className="w-full h-full drop-shadow-[10px_10px_10px_rgba(0,0,0,0.3)]"
          />
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
                  <tr className="hover:bg-blue-50 cursor-pointer">
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
      <div className="bg-[#2E5077]  text-white h-[780px] my-20 px-[100px] py-[100px] flex gap-30 ">
        <div className="w-[600px] relative">
          <img
            src={coding1}
            alt=""
            className="h-[440px] w-[360px] object-cover absolute top-10 left-30  rounded-4xl z-10 shadow-[0px_0px_10px_#79D7BE]"
          />
          <img
            src={coding4}
            alt=""
            className="h-[100px] absolute top-18 left-0  rounded-2xl shadow-[0px_0px_10px_#79D7BE]"
          />
          <img
            src={coding2}
            alt=""
            className="h-[160px] w-[220px] object-cover absolute bottom-5 left-0  rounded-4xl shadow-[0px_0px_10px_#4DA1A9]"
          />
          <img
            src={coding3}
            alt=""
            className="h-[230px] w-[300px] object-cover absolute bottom-0 right-0 z-20  rounded-4xl shadow-[0px_0px_10px_#4DA1A9]"
          />
        </div>
        <div className="w-[600px] flex flex-col justify-center gap-10">
          <h1 className="text-[3.4rem] font-bold">
            Explore more about{" "}
            <span className="text-orange-400">CODEARENA</span>
          </h1>
          <p className="text-lg">
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
            className="hover:shadow-[0px_0px_7px_#FF9D3D] cursor-pointer bg-[#FF9D3D] w-[200px] px-7 py-3 text-lg rounded-md"
          >
            Explore More &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
