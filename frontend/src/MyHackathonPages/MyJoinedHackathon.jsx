import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import dragon from "../assets/dragon.jpg";
import demo from "../assets/demo-logo.jpg";

export default function MyJoinedHackathon() {
  const location = useLocation();

  const isJoinedActive = location.pathname.includes("joined");
  const isHostedActive = location.pathname.includes("hosted");
  const isJudgedActive = location.pathname.includes("judged");

  const [joinedHackathon, setJoinedHackathon] = useState([]);

  useEffect(() => {
    const fetchJoinedHackathon = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/myjoinedhackathon`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setJoinedHackathon(data.hackathons || []);
      } catch (error) {
        console.log("Error while fetching hackathon tournaments", error);
      }
    };

    fetchJoinedHackathon();
  }, []);

  return (
    <div className="pt-30 px-[130px] pb-10">
      <h1 className="font-bold text-5xl pb-10">My Hackathons</h1>
      <div className="flex gap-20 text-2xl mb-10">
        <Link
          to="/myjoinedhackathon"
          className={`pb-2 ${
            isJoinedActive ? "border-b-4 border-blue-400" : ""
          }`}
        >
          Joined Hackathon
        </Link>
        <Link
          to="/myhostedhackathon"
          className={`pb-2 ${
            isHostedActive ? "border-b-4 border-blue-600" : ""
          }`}
        >
          Hosted Hackathon
        </Link>
        <Link
          to="/myjudgedhackathon"
          className={`pb-2 ${
            isJudgedActive ? "border-b-4 border-blue-400" : ""
          }`}
        >
          Judged Hackathon
        </Link>
      </div>
      {joinedHackathon.length === 0 ? (
        <div className="flex flex-col items-center my-30">
          <div className="text-5xl pb-10 font-bold text-gray-700">
            You haven't joined any hackathons yet.
          </div>
          <Link to="/join/hackathon">
            <button className="bg-blue-400 text-white px-8 py-3 text-2xl rounded-md cursor-pointer">
              Join Hackathon Now
            </button>
          </Link>
        </div>
      ) : (
        joinedHackathon.map((hackathon) => (
          <Link to={`/${hackathon._id}/overview`} key={hackathon._id}>
            <div className="group relative bg-transparent pr-[50px] py-[2px] w-[800px] h-[250px] mb-6 overflow-hidden">
              {/* Animated Background Layer */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-in-out z-0"></div>

              {/* Content Layer */}
              <div
                style={{ backgroundImage: `url(${dragon})` }}
                className="relative z-10 mb-4  bg-cover bg-center flex w-[760px] h-full border border-l-8 cursor-pointer border-blue-300"
              >
                <div className="flex gap-8 p-6 w-full">
                  <img src={demo} alt="" className="h-20 w-20 object-cover" />{" "}
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
          </Link>
        ))
      )}
    </div>
  );
}
