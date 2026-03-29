import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";

const navLinks = [
  { name: "Home", path: "/", icon: "⌂" },
  { name: "About", path: "/about", icon: "◈" },
  { name: "Courses", path: "/courses", icon: "◎" },
  { name: "Contact", path: "/contact", icon: "◉" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const checkRegistration = () => {
      const hasToken = !!localStorage.getItem("studentToken");
      const registered = hasToken || localStorage.getItem("isRegistered") === "true";
      setIsRegistered(registered);
      const savedData = localStorage.getItem("registrationData");
      if (savedData) setFormData(JSON.parse(savedData));
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
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 10);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("isRegistered");
    localStorage.removeItem("registrationData");
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentData");
    setIsRegistered(false);
    setFormData(null);
    navigate("/");
  };

  const handleSavePDF = () => {
    if (!formData) return;
    const doc = new jsPDF();
    doc.save(`HomeAcademy_Registration_${formData.name || "Student"}.pdf`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600&display=swap');

        .ha-navbar {
          font-family: 'Outfit', sans-serif;
          position: sticky;
          top: 0;
          z-index: 9999;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* ── Glassmorphism bar ── */
        .ha-navbar-inner {
          background: rgba(5, 10, 30, 0.72);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid rgba(99, 179, 237, 0.12);
          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.4),
                      0 1px 0 rgba(255,255,255,0.05) inset;
          transition: all 0.4s ease;
        }
        .ha-navbar-inner.scrolled {
          background: rgba(3, 7, 22, 0.88);
          box-shadow: 0 8px 48px rgba(0,0,0,0.5),
                      0 0 0 1px rgba(99,179,237,0.08);
        }

        /* ── Scroll progress bar ── */
        .ha-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #06b6d4, #8b5cf6);
          transition: width 0.1s linear;
          border-radius: 0 2px 2px 0;
          box-shadow: 0 0 8px rgba(59,130,246,0.7);
        }

        /* ── Logo ── */
        .ha-logo-text {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.3rem;
          background: linear-gradient(135deg, #e2e8f0 0%, #93c5fd 50%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }
        .ha-logo-badge {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #60a5fa;
          background: rgba(59,130,246,0.12);
          border: 1px solid rgba(59,130,246,0.25);
          padding: 1px 6px;
          border-radius: 20px;
          margin-top: 2px;
        }

        /* ── Nav links ── */
        .ha-nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          font-size: 0.875rem;
          font-weight: 600;
          color: rgba(203,213,225,0.85);
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid transparent;
          letter-spacing: 0.01em;
          overflow: hidden;
        }
        .ha-nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.08));
          border-radius: 10px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .ha-nav-link:hover::before,
        .ha-nav-link.active::before {
          opacity: 1;
        }
        .ha-nav-link:hover {
          color: #e2e8f0;
          border-color: rgba(99,179,237,0.2);
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(59,130,246,0.2),
                      0 0 0 1px rgba(59,130,246,0.15) inset;
        }
        .ha-nav-link.active {
          color: #93c5fd;
          border-color: rgba(59,130,246,0.3);
          background: rgba(59,130,246,0.1);
        }

        /* Glowing underline for active */
        .ha-nav-link .ha-link-glow {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #3b82f6, #06b6d4, transparent);
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(59,130,246,0.8);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .ha-nav-link.active .ha-link-glow {
          opacity: 1;
        }

        /* Icon inside nav */
        .ha-nav-icon {
          font-size: 0.75rem;
          opacity: 0.6;
          transition: opacity 0.3s;
        }
        .ha-nav-link:hover .ha-nav-icon,
        .ha-nav-link.active .ha-nav-icon {
          opacity: 1;
        }

        /* ── Register button ── */
        .ha-btn-register {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 22px;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 0.875rem;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          overflow: hidden;
          text-decoration: none;
          letter-spacing: 0.02em;
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #1d4ed8 100%);
          box-shadow: 0 4px 20px rgba(37,99,235,0.4),
                      0 0 0 1px rgba(255,255,255,0.1) inset;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ha-btn-register::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .ha-btn-register:hover::before {
          left: 100%;
        }
        .ha-btn-register:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(37,99,235,0.5),
                      0 0 0 1px rgba(255,255,255,0.15) inset;
        }
        .ha-btn-register:active {
          transform: translateY(0);
        }

        /* ── PDF & Logout buttons ── */
        .ha-btn-pdf {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.8rem;
          color: #d1fae5;
          border: 1px solid rgba(16,185,129,0.3);
          border-radius: 10px;
          background: rgba(16,185,129,0.12);
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.01em;
        }
        .ha-btn-pdf:hover {
          background: rgba(16,185,129,0.22);
          border-color: rgba(16,185,129,0.5);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(16,185,129,0.25);
        }
        .ha-btn-logout {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.8rem;
          color: #fecaca;
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 10px;
          background: rgba(239,68,68,0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ha-btn-logout:hover {
          background: rgba(239,68,68,0.2);
          border-color: rgba(239,68,68,0.45);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(239,68,68,0.2);
        }

        /* ── Hamburger ── */
        .ha-hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer;
          gap: 5px;
          transition: all 0.3s ease;
        }
        .ha-hamburger:hover {
          background: rgba(59,130,246,0.15);
          border-color: rgba(59,130,246,0.3);
        }
        .ha-ham-line {
          width: 20px;
          height: 1.5px;
          background: rgba(203,213,225,0.9);
          border-radius: 2px;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }
        .ha-hamburger.open .ha-ham-line:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .ha-hamburger.open .ha-ham-line:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .ha-hamburger.open .ha-ham-line:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* ── Mobile overlay ── */
        .ha-mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(3, 7, 22, 0.96);
          backdrop-filter: blur(24px);
          z-index: 9998;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 24px;
        }
        .ha-mobile-link {
          width: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 24px;
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: rgba(203,213,225,0.9);
          text-decoration: none;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.04);
          transition: all 0.3s ease;
          letter-spacing: 0.02em;
        }
        .ha-mobile-link:hover,
        .ha-mobile-link.active {
          color: #93c5fd;
          border-color: rgba(59,130,246,0.35);
          background: rgba(59,130,246,0.1);
          transform: scale(1.02);
        }
        .ha-mobile-register {
          width: 220px;
          padding: 14px 24px;
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: white;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(37,99,235,0.4);
          transition: all 0.3s ease;
          text-decoration: none;
          text-align: center;
          display: block;
        }
        .ha-mobile-register:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 32px rgba(37,99,235,0.5);
        }

        /* Close btn in mobile */
        .ha-mobile-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(203,213,225,0.8);
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .ha-mobile-close:hover {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.3);
          color: #fca5a5;
        }

        /* Mobile logo in overlay */
        .ha-mobile-logo {
          position: absolute;
          top: 22px;
          left: 20px;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          background: linear-gradient(135deg, #e2e8f0, #93c5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Divider in mobile */
        .ha-mobile-divider {
          width: 220px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,179,237,0.2), transparent);
          margin: 4px 0;
        }

        /* ── Logo image glow ── */
        .ha-logo-img {
          width: 36px;
          height: 36px;
          filter: drop-shadow(0 0 8px rgba(59,130,246,0.5));
          transition: filter 0.3s ease;
        }
        .ha-logo-img:hover {
          filter: drop-shadow(0 0 14px rgba(59,130,246,0.8));
        }

        /* Dot separator */
        .ha-dot-sep {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(99,179,237,0.4);
          display: inline-block;
        }
      `}</style>

      <header className="ha-navbar">
        <div className={`ha-navbar-inner ${scrolled ? "scrolled" : ""}`} style={{ position: "relative" }}>
          {/* Scroll progress bar */}
          <div className="ha-progress" style={{ width: `${scrollProgress}%` }} />

          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
              <motion.img
                src="/homeicon.png"
                alt="Logo"
                className="ha-logo-img"
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 6 }}
              />
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                <span className="ha-logo-text">Home Academy</span>
                <span className="ha-logo-badge">English Coaching</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav style={{ display: "none", alignItems: "center", gap: "4px" }} className="ha-desktop-nav">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    onHoverStart={() => setHoveredItem(link.name)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <Link to={link.path} className={`ha-nav-link ${isActive ? "active" : ""}`}>
                      <span className="ha-nav-icon">{link.icon}</span>
                      {link.name}
                      <span className="ha-link-glow" />
                    </Link>
                  </motion.div>
                );
              })}

              <div style={{ width: "1px", height: "20px", background: "rgba(99,179,237,0.15)", margin: "0 8px" }} />

              {isRegistered ? (
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <button className="ha-btn-pdf">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                      </svg>
                      Dashboard
                    </button>
                  </Link>
                  <button onClick={handleLogout} className="ha-btn-logout">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                    </svg>
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <button className="ha-btn-register">
                    Enroll Now
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
              )}
            </nav>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen((p) => !p)}
              className={`ha-hamburger ${isMenuOpen ? "open" : ""} ha-mobile-only`}
              aria-label="Toggle menu"
            >
              <span className="ha-ham-line" />
              <span className="ha-ham-line" />
              <span className="ha-ham-line" />
            </button>
          </div>
        </div>

        {/* Mobile Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="ha-mobile-overlay"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span className="ha-mobile-logo">Home Academy</span>
              <button className="ha-mobile-close" onClick={() => setIsMenuOpen(false)}>✕</button>

              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`ha-mobile-link ${location.pathname === link.path ? "active" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span style={{ fontSize: "0.9rem", opacity: 0.7 }}>{link.icon}</span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <div className="ha-mobile-divider" />

              {isRegistered ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link to="/dashboard" className="ha-mobile-link" onClick={() => setIsMenuOpen(false)} style={{ width: 220, justifyContent: "center" }}>
                      Dashboard
                    </Link>
                  </motion.div>
                  <motion.button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="ha-btn-logout"
                    style={{ width: 220, justifyContent: "center", padding: "14px 24px" }}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.47 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                    </svg>
                    Logout
                  </motion.button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link to="/register" className="ha-mobile-register" onClick={() => setIsMenuOpen(false)}>
                    Enroll Now →
                  </Link>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Responsive styles injected */}
        <style>{`
          @media (min-width: 768px) {
            .ha-desktop-nav { display: flex !important; }
            .ha-mobile-only { display: none !important; }
          }
          @media (max-width: 767px) {
            .ha-desktop-nav { display: none !important; }
            .ha-mobile-only { display: flex !important; }
          }
        `}</style>
      </header>
    </>
  );
};

export default Navbar;