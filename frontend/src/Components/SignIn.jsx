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
import login from "../assets/login-img.png";

import google from "../assets/google.png";

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
      navigate("/");
    } catch (error) {
      console.log("Error on logging in", error);
    }
  };

  return (
    <div className="bg-[url(./assets/coding-background.jpg)] bg-no-repeat w-full  min-h-screen flex items-center justify-center bg-cover">
      <div className="backdrop-blur-lg bg-white/10 p-5 h-[640px] rounded-[26px] shadow-lg w-[80%] border-1 border-gray-300 ">
        <div className="flex gap-16 items-center h-full">
          <div className="h-[560px] w-[50%] pl-10">
            <img
              src={login}
              alt=""
              className="h-full w-full object-cover rounded-[22px]"
            />
          </div>
          <div className="w-[460px]">
            <p className="text-white text-lg mb-1">START FOR FREE</p>
            <h2 className="text-yellow-500 text-5xl font-bold mb-2">
              Welcome !
            </h2>
            <p className="text-white text-lg mb-8">
              Don't have an account ?{" "}
              <Link to="/api/auth/signup" className=" underline">
                Sign Up
              </Link>
            </p>
            <form className="space-y-5" onSubmit={handleLogIn}>
              <div className="flex items-center bg-white/40 rounded-lg px-4 py-3 text-lg">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-white mr-3"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent focus:outline-none w-full text-white placeholder-white"
                />
              </div>

              <div className="flex items-center bg-white/40 rounded-lg px-4 py-3 text-lg relative">
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
              <p className="text-right text-yellow-300 font-medium">
                Forget Password ?{" "}
              </p>
              <p className="text-center text-white">----- or ------</p>
              <button className=" text-white border-2 rounded-xl w-full py-3 flex justify-center items-center">
                <img src={google} alt="" className="w-5 mr-3" /> Login with
                Google
              </button>
              <button
                type="submit"
                className="w-full bg-white text-indigo-600 font-semibold py-3 px-4 rounded-lg text-lg hover:bg-gray-300 transition"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
