import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faBuildingColumns,
  faFlag,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

export default function Overview() {
  const { id } = useParams();
  const location = useLocation(); // 👉 Get current location
  const [hackathon, setHackathon] = useState("");

  const tabs = [
    { path: "overview", label: "Overview" },
    { path: "myproject", label: "My Project" },
    { path: "rules", label: "Rules" },
    { path: "prizes", label: "Prizes" },
    { path: "judges", label: "Judges" },
  ];

  useEffect(() => {
    const fetchHackathonDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setHackathon(data.hackathon);
      } catch (error) {
        console.log("Failed to fetch hackathon", error);
      }
    };
    fetchHackathonDetails();
  }, [id]);
  return (
    <div className="pt-[60px]">
      <div>
        {hackathon.bannerUrl ? (
          <img src={bannerUrl} />
        ) : (
          <div className="flex justify-center items-center text-white bg-gray-700 h-[220px] font-semibold text-3xl">
            {hackathon.title}
          </div>
        )}
        <div className="flex justify-center items-center bg-gray-900 text-white text-xl">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={`/${id}/${tab.path}`}
              className={`px-10 py-4 ${
                location.pathname.endsWith(tab.path)
                  ? "bg-white text-gray-900 font-semibold"
                  : "hover:underline"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="px-[100px] py-16 flex gap-20">
        <div className="w-[800px] ">
          <h1 className="text-4xl font-bold">{hackathon.title}</h1>
          <p className="text-[22px] pt-8">{hackathon.description}</p>
          <a href="#registration">
            <button className="bg-blue-400 cursor-pointer text-white py-2.5 px-8 my-14 text-xl rounded-[4px] hover:bg-blue-300">
              Join Hackathon
            </button>
          </a>
        </div>
        <div>
          <div className="bg-[#F8F8F8] border-1 border-gray-400 p-6  w-[400px] rounded-lg">
            <p className="bg-orange-200 w-45 text-center py-1 rounded-3xl">
              {" "}
              {(() => {
                const deadline = new Date(hackathon.registrationDeadline);
                const today = new Date();
                const timeDiff = deadline.getTime() - today.getTime();
                const remainingDays = Math.ceil(
                  timeDiff / (1000 * 60 * 60 * 24)
                );

                return remainingDays > 0
                  ? `${remainingDays} days to deadline`
                  : "Deadline passed";
              })()}
            </p>
            <p className="text-lg font-bold mt-2 pl-2">Registraion Deadline</p>
            <p className="pl-2 pt-1 pb-4 border-b-1 border-gray-400">
              {" "}
              {(() => {
                const deadline = new Date(hackathon.registrationDeadline);
                const formattedDate = deadline.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });

                return formattedDate;
              })()}
            </p>
            <div className="flex justify-between px-4 py-8 text-lg border-b-1 border-gray-400">
              <div className="flex flex-col gap-5">
                <p>
                  <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                  {hackathon.mode
                    ? hackathon.mode.charAt(0).toUpperCase() +
                      hackathon.mode.slice(1)
                    : ""}
                </p>
                <p>
                  <span className="font-bold">$ 100000</span> in cash
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <p>
                  <FontAwesomeIcon icon={faBuildingColumns} className="mr-2" />
                  Public
                </p>
                <p>
                  <span className="font-bold">923</span> participants
                </p>
              </div>
            </div>
            <div className="my-8 mx-5">
              <div className="flex items-center justify-start gap-5 text-lg mb-5">
                <FontAwesomeIcon
                  icon={faFlag}
                  className="text-slate-700 text-xl"
                />
                <span>Google</span>
              </div>
              <div className="flex justify-start gap-5 text-sm">
                <FontAwesomeIcon
                  icon={faTags}
                  className="text-slate-700 text-xl pt-1"
                />
                <span>
                  <div className="bg-orange-200 mb-1 mr-1 inline-block  px-4 py-1">
                    Machine Learning
                  </div>
                  <div className="bg-orange-200 mb-1 mr-1 inline-block  px-4 py-1">
                    IoT
                  </div>
                  <div className="bg-orange-200 mb-1 mr-1 inline-block  px-4 py-1">
                    Beginner Friendly
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[108px] font-bold text-[50px] pb-10 pt-2 text-slate-800">
        Time Schedule
      </div>
      <div className="px-[100px] flex justify-center text-xl">
        <table className=" ">
          <thead className="bg-orange-300 text-left">
            <tr>
              <th className=" py-2 px-4">PERIOD</th>
              <th className=" py-2 px-4">BEGINS</th>
              <th className=" py-2 px-4">ENDS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className=" py-2 px-4">Registration</td>
              <td className=" py-2 px-4 ">
                {(() => {
                  const deadline = new Date(hackathon.registrationDeadline);
                  const formattedDate = deadline.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  return formattedDate;
                })()}
              </td>
              <td className="py-2 px-4">
                {(() => {
                  const deadline = new Date(hackathon.registrationDeadline);
                  const formattedDate = deadline.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  return formattedDate;
                })()}
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className=" w-[430px] py-2 px-4">Submissions</td>
              <td className=" py-2 px-4 w-[430px]">
                {(() => {
                  const deadline = new Date(hackathon.startDate);
                  const formattedDate = deadline.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  return formattedDate;
                })()}
              </td>
              <td className="py-2 px-4 w-[430px]">
                {(() => {
                  const deadline = new Date(hackathon.endDate);
                  const formattedDate = deadline.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  return formattedDate;
                })()}
              </td>
            </tr>
            <tr className="bg-white">
              <td className=" py-2 px-4 ">Judging</td>
              <td className=" py-2 px-4">
                {(() => {
                  const deadline = new Date(hackathon.endDate);
                  const formattedDate = deadline.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  return formattedDate;
                })()}
              </td>
              <td className="py-2 px-4">
                {(() => {
                  const deadline = new Date(hackathon.endDate);
                  const formattedDate = deadline.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  return formattedDate;
                })()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="registration"></div>
      <div className="px-[100px] py-26 flex gap-30 items-center">
        <form
          action=""
          className="shadow-[0px_0px_10px_#B6B09F] rounded-2xl w-[660px] p-10"
        >
          <h1 className="font-bold text-4xl">Register</h1>
          <p className="text-xl pt-2 pb-6 border-b-1 border-gray-400 text-gray-500">
            Please support our community guidelines
          </p>
          <p className="pt-6 font-semibold text-xl pb-2">
            <span className="text-red-600">*</span> Are you working solo or with
            a team?
          </p>
          <div className="flex items-center text-lg">
            <input
              type="radio"
              name="teamStatus"
              value="solo"
              id="solo"
              required
            />
            <label className="pl-2 pr-18 cursor-pointer" htmlFor="solo">
              Working solo
            </label>
            <input type="radio" name="teamStatus" value="team" id="team" />
            <label className="pl-2 cursor-pointer" htmlFor="team">
              Already have team
            </label>
          </div>
          <p className="pt-8 pb-3 text-xl font-semibold">
            <span className="text-red-600">*</span> Who told you about{" "}
            {hackathon.title}?
          </p>
          <div className="flex items-center text-lg">
            <input
              type="radio"
              name="referer"
              value="codearena"
              id="codearena"
              required
            />
            <label className="pl-2 pr-18 cursor-pointer" htmlFor="codearena">
              CodeArena
            </label>
            <input type="radio" name="referer" value="college" id="college" />
            <label className="pl-2 pr-18 cursor-pointer" htmlFor="college">
              College
            </label>
            <input type="radio" name="referer" value="friend" id="friend" />
            <label className="pl-2  pr-18 cursor-pointer" htmlFor="friend">
              Friends
            </label>
            <input type="radio" name="referer" value="other" id="other" />
            <label className="pl-2 cursor-pointer" htmlFor="other">
              Others
            </label>
          </div>
          <div className=" flex pt-8 border-t-1 border-gray-400 mt-8">
            <div>
              <input
                type="checkbox"
                name="termsAndConditions"
                value="termsandconditions"
                id="terms"
                required
              />
            </div>
            <label
              htmlFor="terms"
              className="pl-2 text-xl font-semibold mb-8 cursor-pointer"
            >
              <span className="text-red-600">*</span> I have read and agree to
              your Community Guidelines and CodeArena Terms of Service
            </label>
          </div>
          <input
            type="submit"
            value="Register"
            className=" bg-blue-400 text-white text-xl py-1 px-6 rounded-sm"
          />
        </form>
        <div>
          <h1 className="text-4xl font-bold ml-2 underline mb-8 text-red-400">
            Rules to Consider
          </h1>
          <ol className="list-decimal pl-6 space-y-2 text-2xl flex flex-col gap-6">
            <li>
              Please fill in all fields marked with an asterisk (
              <span className="font-bold">*</span>).
            </li>
            <li>
              If you already have a team, make sure all members are registered
              bt their account before the deadline.
            </li>
            <li>
              Only one team leader should submit the project and invite the rest
              of the team during submission.
            </li>
            <li>
              If any team member is involved in multiple project submissions,
              the entire team will be disqualified.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
