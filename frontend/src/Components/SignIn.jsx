import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log("Error on logging in", error);
    }
  };

  return (
    <div className="bg-[url(./assets/coding-background.jpg)] bg-no-repeat w-full  min-h-screen flex items-center justify-center bg-cover">
      <div className="backdrop-blur-lg bg-white/10 p-8 pb-[50px] rounded-2xl shadow-lg w-full max-w-md">
        <p className="text-white mb-1">START FOR FREE</p>
        <h2 className="text-yellow-500 text-4xl font-bold mb-2">Welcome !</h2>
        <p className="text-white mb-8">
          Don't have an account ?{" "}
          <Link to="/api/auth/signup" className=" underline">
            Sign Up
          </Link>
        </p>
        <form className="space-y-5" onSubmit={handleLogIn}>
          <div className="flex items-center bg-white/20 rounded-lg px-4 py-3 text-lg">
            <FontAwesomeIcon icon={faEnvelope} className="text-white mr-3" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent focus:outline-none w-full text-white placeholder-white"
            />
          </div>

          <div className="flex items-center bg-white/20 rounded-lg px-4 py-3 text-lg relative">
            <FontAwesomeIcon icon={faLock} className="text-white mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent focus:outline-none w-full text-white placeholder-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-white"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-white text-indigo-600 font-semibold py-3 px-4 rounded-lg text-lg hover:bg-gray-300 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
