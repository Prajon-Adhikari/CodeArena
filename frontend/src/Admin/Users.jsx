import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Users() {
  const [data, setData] = useState([]); // holds either users or judges
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("users"); // dropdown selection

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === "users") {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/menu/users`
          );
          setData(data.usersWithFriends);
        } else if (type === "judges") {
          console.log(type);
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/menu/judges`
          );
          setData(data.judgeWithHackathons); // assuming backend returns { judges: [...] }
        } else if (type === "hoster") {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/menu/hosters`
          );
          setData(data.hosters); // backend sends hackathons with organizer populated
        } else if (type === "participants") {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/menu/participants`
          );
          setData(data.participants); // backend returns populated participants
        }
      } catch (error) {
        console.error(`Error fetching ${type}:`, error);
      }
    };
    fetchData();
  }, [type]);

  const toggleSelect = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const filteredData = data.filter((item) => {
    if (type === "users") {
      return item.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (type === "judges") {
      return item.name?.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (type === "hoster") {
      return (
        item.organizerId?.fullName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (type === "participants") {
      return (
        item.userId?.fullName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.hackathonId?.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }
    return false;
  });

  return (
    <div>
      <div className="bg-white flex rounded-bl-xl justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl text-slate-600 font-bold">USERS</h2>
      </div>
      <div className="mt-6 ml-3">
        <div className="flex justify-between mr-20 items-center">
          <div>
            <div className="font-bold text-2xl">
              {type === "users"
                ? "Users Details"
                : type === "judges"
                ? "Judges Details"
                : type === "hoster"
                ? "Hosters Details"
                : "Participants Details"}
            </div>

            <div className="text-sm text-gray-600">
              {type === "users"
                ? "All users who have accounts"
                : type === "judges"
                ? "All judges who are part of hackathons"
                : type === "hoster"
                ? "All hosters who organized hackathons"
                : "All participants registered for hackathons"}
            </div>
          </div>
          <div className=" flex items-center gap-8">
            <div className="border-gray-300 border-2 bg-white px-5 py-2 rounded-md flex items-center gap-4 focus-within:ring-1 focus-within:ring-blue-200">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-sm text-gray-400"
              />
              <input
                type="text"
                placeholder="Search a person ..."
                className=" w-[240px]   outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border-2 border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 text-sm font-medium transition duration-150"
              >
                <option value="users">Users</option>
                <option value="judges">Judges</option>
                <option value="hoster">Hosters</option>
                <option value="participants">Participants</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 mt-10 mr-10 bg-gray-50 rounded-xl min-h-screen">
        <h2 className="text-lg text-gray-500 ml-2 mb-4">
          All {filteredData.length} users
        </h2>
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      e.target.checked
                        ? setSelected(data.map((_, i) => i))
                        : setSelected([])
                    }
                  />
                </th>
                {type === "users" ? (
                  <>
                    <th className="px-4 py-3 text-left">Full Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Location</th>
                    <th className="px-4 py-3 text-left">Work</th>
                    <th className="px-4 py-3 text-left">Account Created</th>
                    <th className="px-4 py-3 text-left">Friends</th>
                  </>
                ) : type === "judges" ? (
                  <>
                    <th className="px-4 py-3 text-left">Full Name</th>
                    <th className="px-4 py-3 text-left">Hackathon</th>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Bio</th>
                  </>
                ) : type === "hoster" ? (
                  <>
                    <th className="px-4 py-3 text-left">Hoster Name</th>
                    <th className="px-4 py-3 text-left">Contact Email</th>
                    <th className="px-4 py-3 text-left">Hackathon Title</th>
                    <th className="px-4 py-3 text-left">Organization Name</th>
                    <th className="px-4 py-3 text-left">Work</th>
                  </>
                ) : (
                  // participants
                  <>
                    <th className="px-4 py-3 text-left">Participant Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Team Name</th>
                    <th className="px-4 py-3 text-left">Hackathon Title</th>
                    <th className="px-4 py-3 text-left">Joined At</th>
                    <th className="px-4 py-3 text-left">Referer</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  className={selected.includes(index) ? "bg-blue-50" : ""}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(index)}
                      onChange={() => toggleSelect(index)}
                    />
                  </td>

                  {type === "users" ? (
                    <>
                      <td className="px-4 py-3 flex items-center gap-4">
                        {item.profilePic ? (
                          <img
                            src={item.profilePic}
                            alt={item.fullName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center font-semibold">
                            {item.fullName?.[0]?.toUpperCase()}
                          </div>
                        )}
                        <span>{item.fullName}</span>
                      </td>
                      <td className="px-4 py-3">{item.email}</td>
                      <td className="px-4 py-3">{item.location}</td>
                      <td className="px-4 py-3">{item.work}</td>
                      <td className="px-4 py-3 font-semibold">
                        {new Date(item.accountCreated).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        {item.friendsCount}
                      </td>
                    </>
                  ) : type === "judges" ? (
                    <>
                      <td className="px-4 py-3 flex items-center gap-4">
                        {item.photoUrl ? (
                          <img
                            src={item.photoUrl}
                            alt={item.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-green-400 text-white flex items-center justify-center font-semibold">
                            {item.name?.[0]?.toUpperCase()}
                          </div>
                        )}
                        <span>{item.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        {item.hackathons?.length > 0 ? (
                          <ul className="list-disc ml-4">
                            {item.hackathons.map((h, i) => (
                              <li key={i}>{h.title}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-gray-400">No Hackathons</span>
                        )}
                      </td>
                      <td className="px-4 py-3">{item.role}</td>
                      <td className="px-4 py-3">{item.bio}</td>
                    </>
                  ) : type === "hoster" ? (
                    <>
                      <td className="px-4 py-3 flex items-center gap-4">
                        {item.organizerId?.profilePic ? (
                          <img
                            src={item.organizerId.profilePic}
                            alt={item.organizerId.fullName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-purple-400 text-white flex items-center justify-center font-semibold">
                            {item.organizerId?.fullName
                              ? item.organizerId.fullName[0].toUpperCase()
                              : "?"}
                          </div>
                        )}
                        <span>{item.organizerId?.fullName || "Unknown"}</span>
                      </td>
                      <td className="px-4 py-3">{item.contactEmail}</td>
                      <td className="px-4 py-3">{item.title}</td>
                      <td className="px-4 py-3">{item.organizerName}</td>
                      <td className="px-4 py-3">
                        {item.organizerId?.work ? item.organizerId.work : "-"}
                      </td>
                    </>
                  ) : (
                    // participants rendering
                    <>
                      <td className="px-4 py-3 flex items-center gap-4">
                        {item.userId?.profilePic ? (
                          <img
                            src={item.userId.profilePic}
                            alt={item.userId.fullName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-pink-400 text-white flex items-center justify-center font-semibold">
                            {item.userId?.fullName
                              ? item.userId.fullName[0].toUpperCase()
                              : "?"}
                          </div>
                        )}
                        <span>{item.userId?.fullName || "Unknown"}</span>
                      </td>
                      <td className="px-4 py-3">{item.userId?.email || "-"}</td>
                      <td className="px-4 py-3">{item.teamName || "-"}</td>
                      <td className="px-4 py-3">
                        {item.hackathonId?.title || "-"}
                      </td>
                      <td className="px-4 py-3">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-4 py-3">{item.referer || "-"}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
