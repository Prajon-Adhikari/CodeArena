import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HostHackathon() {
  return (
    <div>
      <nav className="px-22 flex items-center justify-between py-4 bg-white shadow">
        <div className="flex items-center space-x-6">
          <div className="text-2xl font-bold text-blue-900 bg-cyan-500 px-3 py-1 rounded">
            Hacked
          </div>
          <Link className="text-sm text-gray-700 hover:underline">
            Join a hackathon
          </Link>
          <Link
            to="/host/hackathon"
            className="text-sm text-gray-700 hover:underline"
          >
            Host a hackathon
          </Link>
          <Link className="text-sm text-gray-700 hover:underline">
            Resources
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/api/auth/signin" className="text-sm text-gray-700">
            Sign in
          </Link>
          <Link
            to="/api/auth/signup"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign up
          </Link>
        </div>
      </nav>
      <div className="bg-[url(../src/assets/host-hackathon.jpg)] h-[500px] bg-cover bg-center bg-repeat">
        Host a hackathon
      </div>
    </div>
  );
}
