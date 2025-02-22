import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import defaultPic from "../assets/defulteimage.png";
import { AuthContext } from "../provider/AuthProvider";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg z-50 transition-all">
      <div className="container mx-auto py-3 flex justify-between items-center px-2">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2 rounded-lg" />
          <Link to="/" className="text-xl font-bold">
            Task Management System
          </Link>
        </div>

        {/* Navigation Links (Large Devices) */}
        <div className="hidden lg:flex gap-4">
          <Link to="/" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
            Home
          </Link>
          <Link to="/add-task" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
            Add Task
          </Link>
          <Link to="/task-manage" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
            Task Manage
          </Link>
        </div>

        {/* User Profile, Login, and Dark Mode */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/profile">
                <img
                  src={user?.photoURL || defaultPic}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
                />
              </Link>
              <button
                onClick={logOut}
                className="bg-yellow-400 px-4 py-2 rounded-lg text-gray-800 hover:bg-yellow-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="bg-yellow-400 px-4 py-2 rounded-lg text-gray-800 hover:bg-yellow-500"
            >
              Login
            </Link>
          )}
        </div>
        <div className="flex">
            {/* Mobile Menu Button */}
            {user ? (
                    <Link to="/profile">
                      <img
                        src={user?.photoURL || defaultPic}
                        alt="User"
                        className="w-8 h-8 mt-3 lg:hidden rounded-full border-2 border-gray-300 dark:border-gray-600"
                      />
                    </Link>
                  ) : null}
            <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden btn btn-ghost hover:bg-none"
                  aria-label="Toggle Menu"
                >
                  <svg className="w-6 h-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>

        </div>
    

      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-[4.5rem] right-0 w-40 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg z-50 lg:hidden rounded-md">
          <div className="flex flex-col items-start gap-2 p-4">
            <Link to="/" className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700">
              Home
            </Link>


            {user ? (
              <>
                <Link to="/add-task" className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700">
                  Add Task
                </Link>
                <Link to="/task-manage" className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700">
                  Task Manage
                </Link>
                <Link to="/profile" className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700">
                  Profile
                </Link>
                <button
                  onClick={logOut}
                  className="btn w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth/login"
                className="btn w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800"
              >
                Login
              </Link>
            )}

            {/* Dark Mode Toggle (Mobile) */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="btn w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white mt-2"
            >
              {isDarkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
