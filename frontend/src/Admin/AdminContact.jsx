import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminContact() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/menu/contact`,
          {
            withCredentials: true, // if using cookies for auth
          }
        );
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching contact messages:", error);
      }
    };

    fetchContacts();
  }, []);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Contact Messages</h2>

      <table className="w-full border-collapse rounded-lg shadow-sm overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Message</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr
              key={msg.id}
              className="border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedMessage(msg)}
            >
              <td className="p-3">
                {msg.firstName} {msg.lastName}
              </td>
              <td className="p-3">{msg.email}</td>
              <td className="p-3">{msg.phone}</td>
              <td className="p-3 truncate max-w-xs">{msg.message}</td>
              <td className="p-3">
                {new Date(msg.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 flex items-center justify-center 
                  bg-black/30 backdrop-blur-sm"
        >
          <div className="bg-white rounded-lg shadow-lg w-[500px] p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray- cursor-pointer hover:text-gray-700"
              onClick={() => setSelectedMessage(null)}
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-2">
              Message from {selectedMessage.firstName}{" "}
              {selectedMessage.lastName}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Email: {selectedMessage.email} <br />
              Phone: {selectedMessage.phone} <br />
              Date: {new Date(selectedMessage.createdAt).toLocaleString()}
            </p>
            <p className="mb-6">{selectedMessage.message}</p>

            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-500 cursor-pointer text-white rounded-lg hover:bg-green-600">
                Mark as Resolved
              </button>
              <button className="px-4 py-2 bg-yellow-500 cursor-pointer text-white rounded-lg hover:bg-yellow-600">
                In Progress
              </button>
              <button className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded-lg hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
