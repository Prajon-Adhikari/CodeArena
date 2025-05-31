import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isHostPage = pathname === "/hackathon";

  const navLinks = [
    { to: "/join/hackathon", label: "Join a hackathon" },
    { to: "/hackathon", label: "Host a hackathon" },
    { to: "/resources", label: "Resources" }, // This one has a dropdown
  ];

  const resources = [
    { title: "Blog", description: "Insights into hackathon planning", to: "/blogpage" },
    { title: "Customer stories", description: "Inspiration from industry leaders", to: "/resources/stories" },
    { title: "Planning guides", description: "Best practices for events", to: "/resources/guides" },
    { title: "Webinars & events", description: "Upcoming and on-demand", to: "/resources/webinars" },
    { title: "Help desk", description: "Support documentation", to: "/resources/help" },
  ];

  const navLinkClass =
    "text-base font-medium hover:underline transition-colors duration-150";

  const authButtonClass = `px-4 py-2 rounded text-sm font-medium transition-all duration-200 ${
    isHostPage
      ? "bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] text-white"
      : "bg-orange-500 text-white hover:bg-blue-600"
  }`;

  return (
    <nav
      className={`w-full z-50 ${
        isHostPage
          ? "absolute top-4 left-0 text-white"
          : "bg-white shadow text-gray-800"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-bold px-5 py-2 rounded ${
            isHostPage
              ? "bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] text-white"
              : "text-blue-900 bg-cyan-500"
          }`}
        >
          CodeArena
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 relative">
          {navLinks.map(({ to, label }) =>
            label === "Resources" ? (
              <div key={to} className="relative group">
                <span className={`${navLinkClass} cursor-pointer`}>
                  {label}
                </span>

                {/* Dropdown */}
                <div className="absolute left-0 top-full mt-2 w-[320px] bg-white rounded-xl shadow-xl p-4 space-y-3
                  opacity-0 invisible group-hover:visible group-hover:opacity-100 
                  transition-all duration-200 z-50"
                >
                  {resources.map((item, idx) => (
                    <Link
                      to={item.to}
                      key={idx}
                      className="block border rounded-xl p-4 hover:border-blue-500 hover:bg-blue-50 active:scale-[0.98] transition-all"
                    >
                      <h3 className="text-blue-600 font-semibold">{item.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={to} to={to} className={navLinkClass}>
                {label}
              </Link>
            )
          )}
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden px-6 pb-4 pt-2 space-y-3 transition-all duration-300 ${
          isOpen
            ? isHostPage
              ? "bg-black text-white"
              : "bg-white text-gray-800"
            : "hidden"
        }`}
      >
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setIsOpen(false)}
            className={navLinkClass}
          >
            {label}
          </Link>
        ))}
        <Link
          to="/api/auth/signin"
          onClick={() => setIsOpen(false)}
          className="text-sm hover:underline"
        >
          Sign in
        </Link>
        <Link
          to="/api/auth/signup"
          onClick={() => setIsOpen(false)}
          className={authButtonClass}
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
