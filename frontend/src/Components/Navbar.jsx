import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const isHostPage = pathname === "/hackathon";

  const navLinks = [
    { to: "/join/hackathon", label: "Join a hackathon" },
    { to: "/hackathon", label: "Host a hackathon" },
    { to: "/myjoinedhackathon", label: "My hackathon" },
  ];

  // ✅ Dynamic class with gradient sliding underline
  const navLinkClass = (to) =>
    `relative text-base font-medium transition-colors duration-150 text-xl pb-3 
     ${pathname === to ? "text-blue-300" : "hover:text-blue-300"} 
     after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[5px] 
     after:bg-gradient-to-r after:from-blue-200 after:to-blue-500 
     after:transition-all after:duration-500 after:rounded-full 
     ${pathname === to ? "after:w-full" : "after:w-0 "}`;

  const authButtonClass =
    "px-4 py-2 rounded text-sm font-medium transition-all duration-200 bg-orange-500 text-white hover:bg-blue-600";

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data?.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchLoggedInUser();
  }, []);

  return (
    <nav className="bg-white shadow text-gray-800 fixed left-0 right-0 top-0 z-50">
      <div className="max-w-screen-xl mx-[80px] px-4 md:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold px-5 py-2 rounded logo">
          CodeArena
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-14">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={navLinkClass(to)}>
              {label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        {user?.fullName ? (
          <Link to="/profile">
            <div className="w-[52px] h-[50px] rounded-full bg-indigo-900 text-white flex items-center justify-center font-bold text-xl">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
          </Link>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <Link to="/api/auth/signin" className="text-sm hover:underline">
              Sign in
            </Link>
            <Link to="/api/auth/signup" className={authButtonClass}>
              Sign up
            </Link>
          </div>
        )}

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
      {isOpen && (
        <div
          className={`md:hidden px-6 pb-4 pt-2 space-y-3 transition-all duration-300 ${
            isHostPage ? "bg-black text-white" : "bg-white text-gray-800"
          }`}
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={navLinkClass(to)}
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
      )}
    </nav>
  );
};

export default Navbar;
