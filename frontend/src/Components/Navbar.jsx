import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="px-6 md:px-12 flex items-center justify-between py-4 bg-white shadow">
      <div className="flex items-center space-x-6">
        <Link
           to="/"
          className="text-2xl font-bold text-blue-900 bg-cyan-500 px-3 py-1 rounded"
        >
          Hacked
        </Link>
        <Link
          to="/join-hackathon"
          className="text-sm text-gray-700 hover:underline"
        >
          Join a hackathon
        </Link>
        <Link
          to="/host/hackathon"
          className="text-sm text-gray-700 hover:underline"
        >
          Host a hackathon
        </Link>
        <Link
          to="#"
          className="text-sm text-gray-700 hover:underline"
        >
          Resources
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          to="/api/auth/signin"
          className="text-sm text-gray-700 hover:underline"
        >
          Sign in
        </Link>
        <Link
          to="/api/auth/signup"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
