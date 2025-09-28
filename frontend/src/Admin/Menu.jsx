import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { LuMessageSquareMore } from "react-icons/lu";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { RiContactsBookFill } from "react-icons/ri";

export default function Menu({ user }) {
  const location = useLocation();
  const today = new Date();
  const yearMonth = today.toISOString().slice(0, 7);

  const isAdmin = user?.role === "admin";

  const isActive = (basePath) => location.pathname.startsWith(basePath);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/api/auth/signin"; // redirect to signin
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex gap-6 bg-gray-100">
      <div className="h-screen rounded-tl-2xl bg-white w-[220px] fixed">
        <h2 className="text-2xl font-bold text-center py-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white">
          CODEARENA
        </h2>
        <div className="text-slate-600 text-lg flex flex-col items-center mt-[60px] gap-8">
          {isAdmin && (
            <>
              <Link
                to="/menu/dashboard"
                className={`w-full pl-10 py-1 menu-elements ${
                  isActive("/menu/dashboard") ? "active-element" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <MdDashboard /> Dashboard
                </div>
              </Link>

              <Link
                to={`/menu/users`}
                className={`w-full pl-10 py-1 menu-elements ${
                  isActive("/menu/users") ? "active-element" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <PiUsersThreeFill /> Users
                </div>
              </Link>
              <Link
                to="/menu/hackathons"
                className={`w-full pl-10 py-1 menu-elements ${
                  isActive("/menu/hackathons") ? "active-element" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <HiOutlineSpeakerphone /> Hackathons
                </div>
              </Link>
              <Link
                to="/menu/contact"
                className={`w-full pl-10 py-1 menu-elements ${
                  isActive("/menu/contact") ? "active-element" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <RiContactsBookFill /> Contact
                </div>
              </Link>
              <Link
                to="/menu/setting"
                className={`w-full pl-10 py-1 menu-elements ${
                  isActive("/menu/setting") ? "active-element" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <IoSettingsSharp /> Setting
                </div>
              </Link>

              <Link
                onClick={handleLogout}
                className={`w-full pl-10 py-1 menu-elements`}
              >
                <div className="flex items-center gap-3">
                  <MdLogout /> Logout
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="ml-[260px] flex-1 h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
