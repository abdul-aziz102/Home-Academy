import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";

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
  const [formData, setFormData] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const checkRegistration = () => {
      const registered = localStorage.getItem("isRegistered") === "true";
      setIsRegistered(registered);
      
      const savedData = localStorage.getItem("registrationData");
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
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
    localStorage.removeItem("registrationData");
    setIsRegistered(false);
    setFormData(null);
    navigate("/");
  };

  const handleSavePDF = () => {
    if (!formData) return;

    const doc = new jsPDF();
    
    // PDF generation code remains the same
    // ... (your existing PDF generation code)
    
    doc.save(`HomeAcademy_Registration_${formData.name || 'Student'}.pdf`);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'} bg-gradient-to-br from-white to-gray-100 shadow-xl`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.img
            src="/homeicon.png"
            alt="Logo"
            className="w-10 h-10 drop-shadow-md"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
          />
          <span className="text-xl font-bold text-blue-600 tracking-tight">Home Academy</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <div 
                key={link.name}
                className="relative perspective-1000"
                onMouseEnter={() => setHoveredItem(link.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to={link.path}
                  className={`relative block px-4 py-2 font-semibold rounded-xl transition-all duration-300 transform translate-z-0 ${
                    isActive 
                      ? 'text-blue-600 bg-gradient-to-br from-blue-100 to-blue-200 shadow-inner-md' 
                      : 'text-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 shadow-md'
                  } ${
                    hoveredItem === link.name ? '-translate-y-1 shadow-xl' : ''
                  }`}
                  style={{
                    boxShadow: isActive 
                      ? 'inset 3px 3px 6px #d1d9e6, inset -3px -3px 6px #ffffff'
                      : hoveredItem === link.name
                        ? '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff'
                        : '5px 5px 10px #d1d9e6, -5px -5px 10px #ffffff'
                  }}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-t-md"
                      style={{ boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4)' }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
                
                {/* Shadow element */}
                <div 
                  className={`absolute bottom-0 left-1/2 w-4/5 h-3 bg-black rounded-full blur-sm transition-all duration-300 ${
                    hoveredItem === link.name ? 'opacity-30 -translate-y-1 scale-90' : 'opacity-0'
                  }`}
                  style={{ transform: 'translateX(-50%)' }}
                />
              </div>
            );
          })}

          {isRegistered ? (
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 2 }}
                onClick={handleSavePDF}
                className="flex items-center gap-2 px-4 py-2 font-semibold text-white rounded-xl shadow-md bg-gradient-to-br from-green-500 to-green-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Save PDF
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 2 }}
                onClick={handleLogout}
                className="px-4 py-2 font-semibold text-white rounded-xl shadow-md bg-gradient-to-br from-red-500 to-red-600"
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <Link to="/register">
              <motion.button
                whileHover={{ y: -3, boxShadow: "0 7px 12px rgba(0,0,0,0.2)" }}
                whileTap={{ y: 1 }}
                className="px-5 py-2 font-semibold text-white rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-md"
                style={{
                  boxShadow: '5px 5px 10px #d1d9e6, -5px -5px 10px #ffffff, inset 2px 2px 5px rgba(255, 255, 255, 0.3), inset -2px -2px 5px rgba(0, 0, 0, 0.1)'
                }}
              >
                Register
              </motion.button>
            </Link>
          )}
        </nav>

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-md"
          style={{
            boxShadow: '3px 3px 6px #d1d9e6, -3px -3px 6px #ffffff'
          }}
        >
          <div className={`hamburger ${isMenuOpen ? "hamburger-open" : ""} w-6 h-5 flex flex-col justify-between`}>
            <span className="block h-0.5 w-full bg-gray-700 rounded transition-all duration-300"></span>
            <span className="block h-0.5 w-full bg-gray-700 rounded transition-all duration-300"></span>
            <span className="block h-0.5 w-full bg-gray-700 rounded transition-all duration-300"></span>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden fixed top-0 left-0 w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 z-40 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-5'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-6 p-6 rounded-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="w-48 text-center px-6 py-4 text-lg font-semibold text-gray-700 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-md"
              style={{
                boxShadow: '5px 5px 10px #d1d9e6, -5px -5px 10px #ffffff'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {isRegistered ? (
            <>
              <button
                onClick={() => {
                  handleSavePDF();
                  setIsMenuOpen(false);
                }}
                className="w-48 flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold text-white rounded-xl shadow-md bg-gradient-to-br from-green-500 to-green-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Save PDF
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-48 px-6 py-4 text-lg font-semibold text-white rounded-xl shadow-md bg-gradient-to-br from-red-500 to-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/register">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-48 px-6 py-4 text-lg font-semibold text-white rounded-xl shadow-md bg-gradient-to-br from-blue-500 to-blue-600"
              >
                Register
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Custom styles for elements that need complex effects */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .translate-z-0 {
          transform: translateZ(0);
        }
        .shadow-inner-md {
          box-shadow: inset 3px 3px 6px #d1d9e6, inset -3px -3px 6px #ffffff;
        }
        .hamburger-open span:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
        }
        .hamburger-open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger-open span:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
        }
      `}</style>
    </header>
  );
};

export default Navbar;