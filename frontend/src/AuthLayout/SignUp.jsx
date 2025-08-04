import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import login from "../assets/login-img.png";
import google from "../assets/google.png";
import { ToastContainer, toast } from "react-toastify";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
        {
          fullName,
          email,
          password,
        }
      );
      navigate("/api/auth/signin");
    } catch (error) {
      toast.dismiss();
      const errorMsg =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="bg-[url(./assets/coding-background.jpg)] bg-no-repeat w-full  min-h-screen flex items-center justify-center bg-cover">
      <div className="backdrop-blur-lg bg-white/10 p-8 shadow-lg w-[80%] h-[640px] border-1 border-gray-300 rounded-[26px]">
        <div className="flex gap-16 items-center h-full">
          <div className="h-[560px] w-[50%] pl-10">
            <img
              src={login}
              alt=""
              className="h-full w-full object-cover rounded-[22px]"
            />
          </div>
          <div className="w-[460px]">
            <p className="text-white mb-1 text-lg">START FOR FREE</p>
            <h2 className="text-yellow-500 text-5xl font-bold mb-2">
              Create Account
            </h2>
            <p className="text-white mb-8 text-xl">
              Already have an account ?{" "}
              <Link to="/api/auth/signin" className=" underline">
                Log In
              </Link>
            </p>
            <form className="space-y-4" onSubmit={handleSignUp}>
              <div className="flex items-center bg-white/40 rounded-lg px-4 py-3 text-lg">
                <FontAwesomeIcon icon={faUser} className="text-white mr-3" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  name="fullName"
                  autoComplete="off"
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-transparent focus:outline-none w-full text-white placeholder-white"
                />
              </div>
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
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent focus:outline-none w-full text-white placeholder-white"
                />
              </div>
              <div className="flex items-center bg-white/40 rounded-lg px-4 py-3 text-lg relative">
                <FontAwesomeIcon icon={faLock} className="text-white mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  name="password"
                  autoComplete="off"
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
              <p className="text-center text-white">----- or ------</p>
              <button className=" text-white cursor-pointer border-2 rounded-xl w-full py-3 flex justify-center items-center">
                <img src={google} alt="" className="w-5 mr-3" /> Sign Up with
                Google
              </button>
              <button
                type="submit"
                className="w-full bg-white cursor-pointer text-indigo-600 font-semibold py-3 px-4 rounded-lg text-lg hover:bg-gray-300 transition"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
      />
    </div>
  );
}
