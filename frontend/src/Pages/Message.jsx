import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faPhone,
  faVideo,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { io } from "socket.io-client";
import chatBgImage from "../assets/chatbgimage.jpg";

export default function Message() {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null); // current user ID
  const messagesEndRef = useRef(null); // for scrolling
  const socket = useRef(null);

  // connect socket
  useEffect(() => {
    socket.current = io(import.meta.env.VITE_API_BASE_URL, {
      withCredentials: true,
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (userId && socket.current) {
      socket.current.emit("join", userId);
    }
  }, [userId]);

  // listen for new messages
  useEffect(() => {
    if (!socket.current) return;

    socket.current.on("receiveMessage", (msg) => {
      if (
        (msg.sender === selectedFriendId && msg.receiver === userId) ||
        (msg.sender === userId && msg.receiver === selectedFriendId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });
  }, [selectedFriendId, userId]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/friends`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        setFriends(data.friends);
      } catch (error) {
        console.log("Error while fetching friends", error);
      }
    };
    fetchFriends();
  }, []);

  useEffect(() => {
    if (!selectedFriendId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/home/messages/${selectedFriendId}`,
          { withCredentials: true }
        );
        setUserId(res.data.userId);
        setMessages(res.data.messages);
      } catch (err) {
        console.log("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [selectedFriendId]);

  const filteredFriends = friends.filter(
    (friend) =>
      friend.label && friend.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    // Scroll to bottom whenever messages update
    const chatContainer = messagesEndRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedFriendId) return;

    const newMsg = {
      sender: userId,
      receiver: selectedFriendId,
      content: message,
    };

    try {
      await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/home/messages/${selectedFriendId}`,
        { content: message },
        { withCredentials: true }
      );

      // emit via websocket
      socket.current.emit("sendMessage", newMsg);

      setMessages((prev) => [...prev, newMsg]); // instantly update own chat
      setMessage("");
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  const selectedFriend = friends.find((f) => f.value === selectedFriendId);

  return (
    <div className="mt-[80px] px-[100px] bg-gray-100">
      <div className="pt-4 pb-10 flex">
        {/* Left Friend List */}
        <div className="w-[400px] bg-white py-8 h-[84vh] overflow-y-auto rounded-l-2xl">
          <div className="px-8">
            <h1 className="font-bold text-2xl mb-4">Messages</h1>

            {/* Search Bar */}
            <div className="bg-gray-100 w-full px-5 py-2 rounded-full flex items-center gap-4 focus-within:ring-1 focus-within:ring-blue-400">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-sm text-gray-400"
              />
              <input
                type="text"
                placeholder="Search ..."
                className="w-full text-sm outline-none bg-gray-100"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Friends List */}
          <div className="mt-4 overflow-y-auto">
            {filteredFriends.length === 0 ? (
              <p className="text-gray-500 text-center mt-4">
                No friends found.
              </p>
            ) : (
              filteredFriends.map((friend) => {
                // Find the last message for this friend
                const friendMessages = messages.filter(
                  (msg) =>
                    msg.sender === friend.value || msg.receiver === friend.value
                );
                const lastMessage = friendMessages[friendMessages.length - 1];

                return (
                  <div
                    key={friend._id}
                    onClick={() => setSelectedFriendId(friend.value)}
                    className={`flex items-center gap-4 border-b px-8 border-gray-300 py-6 cursor-pointer hover:bg-gray-100 transition ${
                      selectedFriendId === friend.value ? "bg-gray-200" : ""
                    }`}
                  >
                    {friend.profilePic ? (
                      <img
                        src={friend.profilePic}
                        alt={friend.label}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-gray-500 text-2xl"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-lg line-clamp-1">
                        {friend.label}
                      </p>
                      <p className="text-gray-500 text-sm line-clamp-1">
                        {lastMessage
                          ? `${lastMessage.sender === userId ? "You: " : ""}${
                              lastMessage.content
                            }`
                          : "Start your conversation ..."}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Chat Panel */}
        <div
          className="  bg-center flex flex-col justify-between bg-gray-200 w-[1000px] rounded-r-2xl"
          style={{ backgroundImage: `url(${chatBgImage})` }}
        >
          {selectedFriend ? (
            <>
              {/* Header */}
              <div className="px-8 pt-4 flex items-center justify-between bg-[#c8e1e9] pb-4 rounded-tr-2xl">
                <div className="flex items-center gap-4 ">
                  {selectedFriend.profilePic ? (
                    <img
                      src={selectedFriend.profilePic}
                      alt={selectedFriend.label}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-gray-500 text-xl"
                      />
                    </div>
                  )}
                  <p className="font-semibold text-lg">
                    {selectedFriend.label}
                  </p>
                </div>
                <div className="flex gap-8 mr-8">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-lg text-gray-500"
                  />
                  <FontAwesomeIcon
                    icon={faVideo}
                    className="text-lg text-gray-500"
                  />
                </div>
              </div>

              {/* Chat Messages */}
              <div
                className="flex-1 px-8 py-4 flex flex-col gap-2 overflow-y-auto"
                ref={messagesEndRef}
                style={{ maxHeight: "60vh" }} // optional, ensures scrollable area
              >
                {" "}
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-800 text-2xl mt-10">
                      No messages yet. Start chatting with{" "}
                      {selectedFriend.label}!
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMine = msg.sender === userId;
                    console.log(isMine);
                    return (
                      <div
                        key={msg._id}
                        className={`max-w-[60%] px-4 py-2 rounded-lg break-words ${
                          isMine
                            ? "bg-blue-400 text-white self-end"
                            : "bg-gray-300 text-black self-start"
                        }`}
                      >
                        {msg.content}
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="mt-4 flex items-center bg-gray-50 gap-4 px-4 rounded-br-2xl">
                <button className="p-3 rounded-full transition ">
                  <FontAwesomeIcon
                    icon={faPaperclip}
                    className="text-gray-700"
                  />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 py-3 rounded-full outline-none text-lg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="p-3 text-blue-300 mr-8 text-lg"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-3xl">
              Select a friend to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
