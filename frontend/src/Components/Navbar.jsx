import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isHostPage = pathname === "/host/hackathon";

  const navLinkClass = "text-lg font-semibold hover:underline";
  const authButtonClass = `px-4 py-2 rounded text-sm transition-all ${
    isHostPage
      ? "bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] text-white"
      : "bg-orange-500 text-white hover:bg-blue-600"
  }`;

  return (
    <nav
      className={`w-full z-20 ${
        isHostPage ? "absolute top-4 left-0 text-white" : "bg-white shadow text-gray-800"
      } transition-all`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className={`text-xl font-bold px-3 py-1 rounded ${
            isHostPage
              ? "bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] text-white"
              : "text-blue-900 bg-cyan-500"
          }`}
        >
          Hacked
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/join/hackathon" className={navLinkClass}>
            Join a hackathon
          </Link>
          <Link to="/host/hackathon" className={navLinkClass}>
            Host a hackathon
          </Link>
          <Link to="#" className={navLinkClass}>
            Resources
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/api/auth/signin" className="text-sm hover:underline">
            Sign in
          </Link>
          <Link to="/api/auth/signup" className={authButtonClass}>
            Sign up
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`md:hidden flex flex-col items-start px-6 pb-6 gap-4 ${
            isHostPage ? "bg-black text-white" : "bg-white text-gray-800"
          }`}
        >
          <Link to="/join/hackathon" onClick={() => setIsOpen(false)} className={navLinkClass}>
            Join a hackathon
          </Link>
          <Link to="/host/hackathon" onClick={() => setIsOpen(false)} className={navLinkClass}>
            Host a hackathon
          </Link>
          <Link to="#" onClick={() => setIsOpen(false)} className={navLinkClass}>
            Resources
          </Link>
          <Link to="/api/auth/signin" onClick={() => setIsOpen(false)} className="text-sm hover:underline">
            Sign in
          </Link>
          <Link to="/api/auth/signup" onClick={() => setIsOpen(false)} className={authButtonClass}>
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
