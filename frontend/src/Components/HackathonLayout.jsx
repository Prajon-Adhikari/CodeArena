import React from "react";
import { Outlet, Link, useParams, useLocation } from "react-router-dom";

const tabs = [
  { path: "overview", label: "Overview" },
  { path: "myproject", label: "My Project" },
  { path: "rules", label: "Rules" },
  { path: "prizes", label: "Prizes" },
  { path: "judges", label: "Judges" },
];

export default function HackathonLayout() {
  const { id } = useParams();
  const location = useLocation();

  return (
    <div className="pt-[60px]">
      {/* Tabs */}
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

      {/* Outlet renders the child route component here */}
      <Outlet />
    </div>
  );
}
