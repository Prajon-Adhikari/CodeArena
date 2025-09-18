import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Menu() {
  const location = useLocation();
  const today = new Date();
  const yearMonth = today.toISOString().slice(0, 7);

  const isActive = (basePath) => location.pathname.startsWith(basePath);

  return (
    <div className="flex gap-6 bg-gray-100">
      <div className="h-screen rounded-tl-2xl bg-white w-[270px] fixed">
        <h2 className="text-3xl font-bold text-center py-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white">
          CODEARENA
        </h2>
        <div className="text-slate-600 text-2xl flex flex-col items-center mt-[60px] gap-8">
          <Link
            to="/menu/dashboard"
            className={`w-full pl-10 py-1 menu-elements ${
              isActive("/menu/dashboard") ? "active-element" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            to={`/menu/users`}
            className={`w-full pl-10 py-1 menu-elements ${
              isActive("/menu/users") ? "active-element" : ""
            }`}
          >
            Users
          </Link>
          <Link
            to="/menu/hackathons"
            className={`w-full pl-10 py-1 menu-elements ${
              isActive("/menu/hackathons") ? "active-element" : ""
            }`}
          >
            Hackathons
          </Link>
          <Link
            to={`/menu/reports`}
            className={`w-full pl-10 py-1 menu-elements ${
              isActive("/menu/reports") ? "active-element" : ""
            }`}
          >
            Reports
          </Link>
          <Link
            to="/menu/setting"
            className={`w-full pl-10 py-1 menu-elements ${
              isActive("/menu/setting") ? "active-element" : ""
            }`}
          >
            Setting
          </Link>
          <Link to="/api/auth/signin" className={`w-full pl-10 py-1 menu-elements`}>
            Log Out
          </Link>
        </div>
      </div>
      <div className="ml-[320px] flex-1 h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
