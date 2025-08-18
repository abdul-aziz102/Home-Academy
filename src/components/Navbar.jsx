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

  useEffect(() => {
    const checkRegistration = () => {
      const registered = localStorage.getItem("isRegistered") === "true";
      setIsRegistered(registered);
      
      // Load saved form data
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
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(40, 53, 147);
    doc.setFont('helvetica', 'bold');
    doc.text('Home Academy', 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Student Registration Details', 105, 30, { align: 'center' });
    
    // Divider line
    doc.setDrawColor(40, 53, 147);
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);
    
    // Student details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    let yPosition = 50;
    const leftColumnX = 20;
    const rightColumnX = 110;
    let currentX = leftColumnX;
    
    // Personal Information
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Personal Information', leftColumnX, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const personalFields = ['name', 'email', 'age', 'gender', 'phone'];
    personalFields.forEach(field => {
      if (formData[field]) {
        const label = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
        doc.text(`${label}:`, currentX, yPosition);
        doc.text(formData[field].toString(), currentX + 40, yPosition);
        yPosition += 8;
        
        if (yPosition > 260) {
          doc.addPage();
          yPosition = 20;
          currentX = leftColumnX;
        }
        
        if (field === 'age' && currentX === leftColumnX) {
          currentX = rightColumnX;
          yPosition = 60;
        }
      }
    });
    
    // Education Information
    yPosition += 10;
    currentX = leftColumnX;
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Education Information', leftColumnX, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const educationFields = ['education', 'englishGoal', 'learningStyle', 'level'];
    educationFields.forEach(field => {
      if (formData[field]) {
        const label = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
        doc.text(`${label}:`, currentX, yPosition);
        doc.text(formData[field].toString(), currentX + 40, yPosition);
        yPosition += 8;
        
        if (yPosition > 260) {
          doc.addPage();
          yPosition = 20;
          currentX = leftColumnX;
        }
      }
    });
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for registering with Home Academy', 105, 280, { align: 'center' });
    doc.text('Contact: info@homeacademy.com | Phone: +1234567890', 105, 285, { align: 'center' });
    
    doc.save(`HomeAcademy_Registration_${formData.name || 'Student'}.pdf`);
  };

  return (
    <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.img
            src="/homeicon.png"
            alt="Logo"
            className="w-10 h-10"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
          />
          <span className="text-xl font-bold text-blue-600">Home Academy</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 relative">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-medium transition-colors px-3 py-2 ${
                  isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-500"
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

          {isRegistered ? (
            <>
              <button
                onClick={handleSavePDF}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Save PDF
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold"
              >
                Register
              </motion.button>
            </Link>
          )}
        </nav>

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden text-2xl text-gray-800"
        >
          ☰
        </button>
      </div>

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
            <>
              <button
                onClick={() => {
                  handleSavePDF();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full font-semibold flex items-center justify-center gap-2"
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
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold"
              >
                Logout
              </button>
            </>
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