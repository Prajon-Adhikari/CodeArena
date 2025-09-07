import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState({ users: [], hackathons: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // store selected item

  const isHostPage = pathname === "/hackathon";

  const navigate = useNavigate();

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

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults({ users: [], hackathons: [] });
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/search?q=${searchQuery}`
        );
        const data = await res.json();
        setResults(data);
        setShowDropdown(true);
      } catch (err) {
        console.error("Search failed:", err);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // 🔹 Reset search when route changes
  useEffect(() => {
    setSearchQuery("");
    setShowDropdown(false);
  }, [pathname]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && selectedItem) {
      if (selectedItem.type === "user") {
        navigate(`/${selectedItem.id}/profile`);
      } else if (selectedItem.type === "hackathon") {
        navigate(`/${selectedItem.id}/overview`);
      }
      setShowDropdown(false);
      setSearchQuery("");
      setSelectedItem(null);
    }
  };

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
              value={searchQuery}
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-400 pl-10 pr-4 py-[6px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-300"
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // small delay to allow click
            />

            {showDropdown &&
              (results?.users?.length > 0 ||
                results?.hackathons?.length > 0) && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg border rounded mt-1 z-50 max-h-64 overflow-y-auto">
                  {results?.users?.length > 0 && (
                    <div className="p-2 border-b">
                      <div className="text-gray-500 text-sm font-semibold">
                        Users
                      </div>
                      {results.users.map((user) => (
                        <div className="flex mb-2">
                          {user?.profilePic ? (
                            <img
                              src={user?.profilePic}
                              alt="avatar"
                              className="w-[40px] h-[40px] rounded-full object-cover border-4 border-white"
                            />
                          ) : (
                            <div className="w-[40px] h-[40px] rounded-full border-4 flex items-center justify-center bg-indigo-900 text-white text-sm">
                              {user.fullName.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div
                            key={user._id}
                            className="block px-2 py-1 hover:bg-gray-100 cursor-pointer"
                            onMouseDown={() => {
                              setSearchQuery(user.fullName); // set search input
                              setSelectedItem({ type: "user", id: user._id });
                            }}
                          >
                            {user.fullName}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {results?.hackathons?.length > 0 && (
                    <div className="p-2">
                      <div className="text-gray-500 text-sm font-semibold">
                        Hackathons
                      </div>
                      {results.hackathons.map((hack) => (
                        <div
                          key={hack._id}
                          className="block px-2 py-1 hover:bg-gray-100 cursor-pointer mb-2"
                          onMouseDown={() => {
                            setSearchQuery(hack.title); // set search input
                            setSelectedItem({
                              type: "hackathon",
                              id: hack._id,
                            });
                          }}
                        >
                          {hack.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
          </div>

          <div>
            <FontAwesomeIcon
              icon={faBell}
              className="text-gray-400 text-2xl cursor-pointer"
            />
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
