import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faGlobe,
  faBuildingColumns,
  faFlag,
  faTags,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

export default function Judges() {
  const { id } = useParams();
  const location = useLocation();
  const [hackathon, setHackathon] = useState("");
  const [judges, setJudges] = useState([]);
  const [users, setUsers] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [isMyHostedHackathon, setIsMyHostedHackathon] = useState(false);
  const [editing, setEditing] = useState(false);
  const [originalJudges, setOriginalJudges] = useState([]);

  const tabs = [
    { path: "overview", label: "Overview" },
    { path: "myproject", label: "My Project" },
    { path: "rules", label: "Rules" },
    { path: "prizes", label: "Prizes" },
    { path: "judges", label: "Judges" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/home/users`,
          {
            withCredentials: true,
          }
        );
        setUsers(res.data); // make sure backend returns [{_id, fullName, email}, ...]
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

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
            credentials: "include",
          }
        );
        const data = await response.json();
        setHackathon(data.hackathon);
        setParticipants(data.participants);
        setIsMyHostedHackathon(data.isHostedHackathon || false);
      } catch (error) {
        console.log("Failed to fetch hackathon", error);
      }
    };
    fetchHackathonDetails();
  }, [id]);

  useEffect(() => {
    const fetchJudgesDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/${id}/judges`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        setJudges(data.judges);
        setOriginalJudges(data.judges);
      } catch (error) {
        console.log("Error while fetching judges data", error);
      }
    };
    fetchJudgesDetails();
  }, [id]);

  const handleJudgeChange = (index, field, value) => {
    const updated = [...judges];
    updated[index][field] = value;
    setJudges(updated);
  };

  const removeJudge = (index) => {
    const updated = judges.filter((_, i) => i !== index);
    setJudges(updated);
  };

  const addJudge = () => {
    setJudges([...judges, { name: "", bio: "", role: "", photoUrl: "" }]);
  };

  const saveJudges = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/home/${id}/judges`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ judges }),
        }
      );
      const data = await res.json();
      setJudges(data.judges);
      setOriginalJudges(data.judges);
      setEditing(false);
      toast.success("Judges updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update judges.");
    }
  };

  const cancelEdit = () => {
    setJudges(originalJudges);
    setEditing(false);
  };

  return (
    <div className="pt-[60px] pb-10">
      <ToastContainer />
      <div>
        {hackathon && hackathon.bannerUrl ? (
          <img src={hackathon.bannerUrl} />
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
      <div className="px-[180px] py-20 flex gap-6">
        <div>
          <div className="flex justify-between items-center mb-10 mr-20">
            <h2 className="text-5xl font-bold pb-1 ">Judges</h2>
            {isMyHostedHackathon && !editing && (
              <button
                onClick={() => setEditing(true)}
                className="border-2 cursor-pointer hover:shadow-[0px_0px_5px_gray] border-gray-600 px-8 rounded-lg text-lg"
              >
                Edit
              </button>
            )}{" "}
          </div>
          <div className="grid grid-cols-2 gap-10">
            {judges.map((judge, index) => {
              return (
                <div key={index} className="mb-8 flex gap-5 items-start">
                  {judge.photoUrl ? (
                    <img src={judge.photoUrl} />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-5xl bg-gray-400 text-white px-7 py-[24px] rounded-full"
                    />
                  )}
                  <div>
                    <div className="font-bold text-[24px] pb-2">
                      {judge.name.split(" (")[0]}
                    </div>

                    <div className="text-lg pb-1.5 line-clamp-2 overflow-hidden break-words">
                      {judge.bio}
                    </div>
                    <div className="text-gray-700 pb-2 italic">
                      {judge.role}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
                  <span className="font-bold">{participants.length}</span>{" "}
                  participants
                </p>
              </div>
            </div>
            <div className="my-8 mx-5">
              <div className="flex items-center justify-start gap-5 text-lg mb-5">
                <FontAwesomeIcon
                  icon={faFlag}
                  className="text-slate-700 text-xl"
                />
                <span>{hackathon.organizerName}</span>
              </div>
              <div className="flex justify-start gap-5 text-sm">
                <FontAwesomeIcon
                  icon={faTags}
                  className="text-slate-700 text-xl pt-1"
                />
                <span>
                  {(hackathon.themes || []).slice(0, 3).map((theme, index) => (
                    <div
                      key={index}
                      className="bg-orange-200 capitalize mb-1 mr-1 inline-block px-4 py-1"
                    >
                      {theme}
                    </div>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
          <div className="fixed inset-0 z-50 flex justify-center items-start pt-20 overflow-auto">
            <div className="bg-white rounded-xl p-10 m-4 shadow-lg w-[900px]">
              <h2 className="text-3xl font-bold mb-6">Edit Judges</h2>
              <div className="grid grid-cols-2 gap-6">
                {judges.map((judge, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-lg flex flex-col justify-between h-[300px]"
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      Judge {index + 1}
                    </h3>

                    {/* Name Dropdown */}
                    <select
                      value={judge.name}
                      onChange={(e) =>
                        handleJudgeChange(index, "name", e.target.value)
                      }
                      className="w-full border-b-2 border-gray-300 focus:outline-none pb-1"
                      required
                    >
                      <option value="">
                        Select Judge (must have CodeArena account)
                      </option>
                      {users.map((user) => (
                        <option key={user._id} value={user.fullName}>
                          {user.fullName} ({user.email})
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Judge Role"
                      value={judge.role}
                      onChange={(e) =>
                        handleJudgeChange(index, "role", e.target.value)
                      }
                      className="border-b-2 border-gray-300 mb-2 outline-none"
                    />
                    <textarea
                      placeholder="Judge Bio"
                      value={judge.bio}
                      onChange={(e) =>
                        handleJudgeChange(index, "bio", e.target.value)
                      }
                      className="border-b-2 border-gray-300 mb-2 outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Photo URL"
                      value={judge.photoUrl}
                      onChange={(e) =>
                        handleJudgeChange(index, "photoUrl", e.target.value)
                      }
                      className="border-b-2 border-gray-300 mb-2 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeJudge(index)}
                      className="bg-red-400 cursor-pointer hover:bg-red-300 text-white py-1 rounded mt-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={addJudge}
                  className="bg-green-400 text-white cursor-pointer hover:bg-green-300 px-4 py-2 rounded"
                >
                  Add Judge
                </button>
                <button
                  onClick={saveJudges}
                  className="bg-blue-400 cursor-pointer hover:bg-blue-300 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-400 cursor-pointer hover:bg-gray-300 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
