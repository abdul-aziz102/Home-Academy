import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Courses", path: "/courses" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkRegistration = () => {
      const registered = localStorage.getItem("isRegistered") === "true";
      setIsRegistered(registered);
    };
    checkRegistration();
    window.addEventListener("storage", checkRegistration);
    window.addEventListener("userRegistered", checkRegistration);
    return () => {
      window.removeEventListener("storage", checkRegistration);
      window.removeEventListener("userRegistered", checkRegistration);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isRegistered");
    setIsRegistered(false);
    navigate("/");
  };

  return (
    <header
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.img
            src="/homeicon.png"
            alt="Logo"
            className="w-10 h-10"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
          />
          <span className="text-xl font-bold text-blue-600">Home </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-6 relative">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-medium transition-colors px-3 py-2 ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-500"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-t-md"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          {/* Register / Logout Button */}
          {isRegistered ? (
            <button
              onClick={handleLogout}
              className="ml-4 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold"
            >
              Logout
            </button>
          ) : (
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold"
              >
                Register
              </motion.button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden text-2xl text-gray-800"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block text-gray-700 hover:text-blue-600 text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {isRegistered ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold"
            >
              Logout
            </button>
          ) : (
            <Link to="/register">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-semibold"
              >
                Register
              </button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
