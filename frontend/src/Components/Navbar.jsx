import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBell, faMessage } from "@fortawesome/free-solid-svg-icons";

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

  const navLinkClass = (to) => {
    if (
      to === "/myjoinedhackathon" &&
      (pathname === "/myjoinedhackathon" || pathname === "/myhostedhackathon")
    ) {
      return `relative text-base font-medium transition-colors duration-150 text-xl 
      text-blue-300 flex items-center
      after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[4px] 
      after:bg-gradient-to-r after:from-blue-200 after:to-blue-500 
      after:transition-all after:duration-500 after:rounded-full after:w-full`;
    }

    return `relative text-base font-medium transition-colors duration-150 text-lg
     ${
       pathname === to ? "text-blue-300" : "hover:text-blue-300"
     } flex items-center
     after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:h-[4px] 
     after:bg-gradient-to-r after:from-blue-200 after:to-blue-500 
     after:transition-all after:duration-500 after:rounded-full 
     ${pathname === to ? "after:w-full" : "after:w-0 "}`;
  };

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
      <div className=" mx-[60px] px-4 md:px-8 py-5 flex items-center justify-between">
        {/* Left Side: Logo + Links */}
        <div className="flex items-center gap-14">
          <Link to="/" className="text-2xl font-bold logo">
            CodeArena
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-14">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={navLinkClass(to)}>
              {label}
            </Link>
          ))}
        </div>

        <div className="flex gap-8 items-center">
          <div className="relative w-64 hidden md:block">
            <span className="absolute inset-y-0 left-3 flex items-center  text-gray-400">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-lg border border-gray-400 pl-10 pr-4 py-[6px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>
          
          <div>
            <FontAwesomeIcon icon={faBell} className="text-gray-600 text-2xl cursor-pointer"/>
          </div>

          <div>
            <FontAwesomeIcon icon={faMessage} className="text-gray-600 text-2xl cursor-pointer"/>
          </div>

          {/* Right Side: Auth / Profile */}
          <div className="flex items-center gap-4">
            {user?.fullName ? (
              <Link to="/profile">
                <div className="w-[40px] h-[40px] rounded-full bg-indigo-900 text-white flex items-center justify-center font-bold ">
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
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
