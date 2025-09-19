import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Users() {
  const [usersData, setUsersData] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/menu/users`
        ); // your endpoint
        setUsersData(data.usersWithFriends);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const toggleSelect = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  return (
    <div>
      <div className="bg-white flex rounded-bl-xl justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl text-slate-600 font-bold">USERS</h2>
      </div>
      <div className="mt-6 ml-3">
        <div className="flex justify-between mr-20 items-center">
          <div>
            <div className="font-bold text-2xl">Users Details</div>
            <div className="text-sm text-gray-600">
              All users who have accounts
            </div>
          </div>
          <div className=" flex items-center gap-8">
            <div className="border-blue-200 border-2 bg-white px-5 py-2 rounded-md flex items-center gap-4 focus-within:ring-1 focus-within:ring-blue-200">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-sm text-blue-400"
              />
              <input
                type="text"
                placeholder="Search a person ..."
                className=" w-[240px]   outline-none"
              />
            </div>
            <div>
              <select className="border-2 border-gray-400 rounded-md px-4 py-2 bg-white text-gray-700 text-sm font-medium transition duration-150">
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
          All {usersData.length} users
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
                        ? setSelected(usersData.map((_, i) => i))
                        : setSelected([])
                    }
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Full Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Work
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Account Created
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Friends
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {usersData.map((user, index) => (
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
                  <td className="px-4 py-3 flex items-center gap-4">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt={user.fullName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center font-semibold">
                         {user.fullName[0].toUpperCase()}
                      </div>
                    )}
                    <span>{user.fullName}</span>
                   </td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.location}</td>
                  <td className="px-4 py-3">{user.work}</td>
                  <td className="px-4 py-3 font-semibold">
                    {" "}
                    {new Date(user.accountCreated).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {user.friendsCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
