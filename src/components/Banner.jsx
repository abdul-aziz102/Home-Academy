import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCheckCircle, FaPlay, FaChalkboardTeacher,
  FaCertificate, FaUserTie, FaGlobeAmericas
} from 'react-icons/fa';
import { RiEnglishInput } from 'react-icons/ri';
import CountUp from 'react-countup';
import { motion, useInView } from 'framer-motion';

const marqueeItems = [
  "Spoken English", "Grammar Practice", "Business Communication",
  "IELTS Prep", "Vocabulary Booster", "Accent Training",
  "TOEFL Preparation", "Interview Skills", "Presentation Training",
  "Academic Writing", "Conversational Practice", "Pronunciation Mastery"
];

const benefits = [
  "Personalized learning plans",
  "Certified native-level instructors",
  "Flexible class schedules",
  "Progress tracking dashboard",
  "Job interview preparation"
];

const stats = [
  { label: "Students Trained", value: 20000, suffix: "+" },
  { label: "Success Rate", value: 97, suffix: "%" },
  { label: "Expert Teachers", value: 30, suffix: "+" },
  { label: "Average Rating", value: 4.9, suffix: "/5", decimals: 1 }
];

const floatingCards = [
  {
    pos: "bottom-[-20px] left-[-20px]",
    icon: <FaChalkboardTeacher className="text-blue-400" size={18} />,
    iconBg: "rgba(59,130,246,0.15)",
    title: "Certified Teachers",
    sub: "15+ Professionals",
  },
  {
    pos: "top-[-20px] right-[-20px]",
    icon: <FaCertificate className="text-emerald-400" size={18} />,
    iconBg: "rgba(16,185,129,0.15)",
    title: "Recognized",
    sub: "Certification",
  },
  {
    pos: "top-[25%] right-[-44px] hidden lg:flex",
    icon: <FaUserTie className="text-sky-400" size={18} />,
    iconBg: "rgba(14,165,233,0.15)",
    title: "Career",
    sub: "Preparation",
    extraClass: "hidden lg:flex",
  },
  {
    pos: "bottom-[25%] left-[-44px]",
    icon: <FaGlobeAmericas className="text-violet-400" size={18} />,
    iconBg: "rgba(139,92,246,0.15)",
    title: "Global",
    sub: "Standards",
    extraClass: "hidden lg:flex",
  },
];

const Banner = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [startCount, setStartCount] = useState(false);
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true });

  useEffect(() => {
    if (isInView) setStartCount(true);
  }, [isInView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % benefits.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,600;1,500&display=swap');

        .banner-root {
          font-family: 'Outfit', sans-serif;
          min-height: 100vh;
          background: #050a1e;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 80px 0 48px;
        }

        /* ── Layered background ── */
        .banner-bg-mesh {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 70% 30%, rgba(37,99,235,0.13) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 20% 80%, rgba(139,92,246,0.1) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 50% 0%, rgba(6,182,212,0.07) 0%, transparent 50%);
          pointer-events: none;
        }
        .banner-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,179,237,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
        .banner-noise {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        /* ── Badge ── */
        .ha-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 100px;
          background: rgba(37,99,235,0.12);
          border: 1px solid rgba(59,130,246,0.25);
          font-size: 0.8rem;
          font-weight: 600;
          color: #93c5fd;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .ha-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #3b82f6;
          box-shadow: 0 0 8px #3b82f6;
          animation: pulse-dot 2s ease infinite;
        }
        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.5; transform:scale(1.4); }
        }

        /* ── Heading ── */
        .ha-h1 {
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #f1f5f9;
          margin-bottom: 20px;
        }
        .ha-h1-accent {
          background: linear-gradient(135deg, #60a5fa 0%, #06b6d4 50%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ha-h1-est {
          display: inline-block;
          font-size: 0.45em;
          font-weight: 600;
          color: rgba(148,163,184,0.7);
          border: 1px solid rgba(148,163,184,0.2);
          padding: 2px 10px;
          border-radius: 6px;
          vertical-align: middle;
          margin-left: 10px;
          letter-spacing: 0.06em;
          font-family: 'Outfit', sans-serif;
        }

        /* ── Desc ── */
        .ha-desc {
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          color: rgba(148,163,184,0.85);
          line-height: 1.7;
          max-width: 500px;
          margin-bottom: 28px;
        }

        /* ── Benefits list ── */
        .ha-benefit-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(148,163,184,0.7);
          transition: all 0.35s ease;
          border-left: 2px solid transparent;
          padding-left: 12px;
        }
        .ha-benefit-item.active {
          color: #93c5fd;
          border-left-color: #3b82f6;
          padding-left: 16px;
        }
        .ha-benefit-icon {
          font-size: 0.8rem;
          opacity: 0.4;
          transition: opacity 0.35s;
        }
        .ha-benefit-item.active .ha-benefit-icon {
          opacity: 1;
          color: #3b82f6;
          filter: drop-shadow(0 0 4px rgba(59,130,246,0.6));
        }

        /* ── CTA Buttons ── */
        .ha-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 28px;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          color: white;
          background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 40%, #3b82f6 100%);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(37,99,235,0.45), 0 0 0 1px rgba(255,255,255,0.08) inset;
          transition: all 0.3s ease;
          letter-spacing: 0.01em;
        }
        .ha-btn-primary::before {
          content:'';
          position:absolute;
          top:0; left:-100%;
          width:100%; height:100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transition: left 0.5s ease;
        }
        .ha-btn-primary:hover::before { left:100%; }
        .ha-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(37,99,235,0.55), 0 0 0 1px rgba(255,255,255,0.12) inset;
        }

        .ha-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          color: #93c5fd;
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(59,130,246,0.25);
          border-radius: 12px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .ha-btn-secondary:hover {
          background: rgba(59,130,246,0.16);
          border-color: rgba(59,130,246,0.45);
          transform: translateY(-2px);
        }
        .ha-btn-play {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(59,130,246,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem;
          transition: background 0.3s;
        }
        .ha-btn-secondary:hover .ha-btn-play {
          background: rgba(59,130,246,0.4);
        }

        /* ── Stats grid ── */
        .ha-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-top: 28px;
        }
        @media (max-width: 640px) {
          .ha-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .ha-stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 14px 10px;
          text-align: center;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }
        .ha-stat-card:hover {
          background: rgba(59,130,246,0.08);
          border-color: rgba(59,130,246,0.2);
          transform: translateY(-2px);
        }
        .ha-stat-value {
          font-size: 1.6rem;
          font-weight: 800;
          background: linear-gradient(135deg, #93c5fd, #67e8f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
        }
        .ha-stat-label {
          font-size: 0.7rem;
          font-weight: 500;
          color: rgba(148,163,184,0.6);
          margin-top: 4px;
          letter-spacing: 0.02em;
        }

        /* ── Image card ── */
        .ha-img-wrapper {
          position: relative;
          border-radius: 20px;
          overflow: visible;
        }
        .ha-img-frame {
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,179,237,0.08);
          position: relative;
        }
        .ha-img-frame img {
          width: 100%;
          height: 460px;
          object-fit: cover;
          display: block;
          filter: brightness(0.88) saturate(1.1);
        }
        /* Gradient overlay on image */
        .ha-img-frame::after {
          content:'';
          position:absolute;
          inset:0;
          background: linear-gradient(180deg, transparent 55%, rgba(5,10,30,0.55) 100%);
          pointer-events:none;
        }

        /* ── Floating info cards ── */
        .ha-float-card {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(13,20,45,0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          white-space: nowrap;
          animation: float-gentle 4s ease-in-out infinite;
        }
        .ha-float-card:nth-child(2) { animation-delay: 1s; }
        .ha-float-card:nth-child(3) { animation-delay: 2s; }
        .ha-float-card:nth-child(4) { animation-delay: 0.5s; }
        @keyframes float-gentle {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .ha-float-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ha-float-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: #e2e8f0;
        }
        .ha-float-sub {
          font-size: 0.7rem;
          color: rgba(148,163,184,0.7);
        }

        /* ── Student social proof ── */
        .ha-proof-card {
          background: rgba(13,20,45,0.9);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
        .ha-avatar-stack {
          display: flex;
        }
        .ha-avatar-stack img,
        .ha-avatar-more {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 2px solid rgba(13,20,45,0.9);
          object-fit: cover;
        }
        .ha-avatar-stack img:not(:first-child),
        .ha-avatar-more { margin-left: -10px; }
        .ha-avatar-more {
          background: rgba(37,99,235,0.25);
          border-color: rgba(59,130,246,0.4);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.6rem; font-weight: 700;
          color: #93c5fd;
        }
        .ha-stars {
          color: #fbbf24;
          font-size: 0.75rem;
          letter-spacing: 1px;
        }
        .ha-proof-text {
          font-size: 0.78rem;
          color: rgba(148,163,184,0.85);
        }
        .ha-proof-rating {
          font-weight: 700;
          color: #e2e8f0;
          font-size: 0.85rem;
        }

        /* ── Marquee ── */
        .ha-marquee-wrapper {
          overflow: hidden;
          position: relative;
          padding: 16px 0;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          margin-top: 64px;
        }
        .ha-marquee-wrapper::before,
        .ha-marquee-wrapper::after {
          content:'';
          position:absolute;
          top:0; bottom:0;
          width:80px;
          z-index:2;
        }
        .ha-marquee-wrapper::before {
          left:0;
          background: linear-gradient(90deg, #050a1e, transparent);
        }
        .ha-marquee-wrapper::after {
          right:0;
          background: linear-gradient(-90deg, #050a1e, transparent);
        }
        .ha-marquee-track {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee-scroll 30s linear infinite;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ha-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0 24px;
          font-size: 0.82rem;
          font-weight: 600;
          color: rgba(148,163,184,0.6);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: color 0.3s;
        }
        .ha-marquee-item:hover {
          color: #93c5fd;
        }
        .ha-marquee-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          box-shadow: 0 0 6px rgba(59,130,246,0.6);
          flex-shrink: 0;
        }

        /* ── Bottom fade ── */
        .banner-bottom-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 120px;
          background: linear-gradient(to top, #050a1e, transparent);
          pointer-events: none;
        }

        @media (max-width: 1024px) {
          .ha-img-frame img { height: 380px; }
        }
        @media (max-width: 768px) {
          .banner-root { padding: 60px 0 40px; }
          .ha-img-frame img { height: 300px; }
          .ha-float-card { display: none; }
        }
      `}</style>

      <div className="banner-root">
        {/* Backgrounds */}
        <div className="banner-bg-mesh" />
        <div className="banner-grid" />
        <div className="banner-noise" />

        <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap' }}>

            {/* ── LEFT COLUMN ── */}
            <motion.div
              style={{ flex: '1 1 460px', minWidth: 0 }}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {/* Badge */}
              <div className="ha-badge">
                <span className="ha-badge-dot" />
                <RiEnglishInput size={14} />
                English Language Program
              </div>

              {/* Heading */}
              <h1 className="ha-h1">
                Giving Your{' '}
                <span className="ha-h1-accent">Potential<br />A Language</span>
                <span className="ha-h1-est">Est. 1999</span>
              </h1>

              {/* Description */}
              <p className="ha-desc">
                Expert-led coaching for all levels. Achieve fluency for daily life,
                exams, or global careers — start your journey today with our proven methodology.
              </p>

              {/* Benefits */}
              <div style={{ marginBottom: 28, borderLeft: '1px solid rgba(255,255,255,0.06)', paddingLeft: 0 }}>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className={`ha-benefit-item ${activeTab === index ? 'active' : ''}`}
                    animate={{ opacity: activeTab === index ? 1 : 0.55 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaCheckCircle className="ha-benefit-icon" size={13} />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                <Link to="/courses" style={{ textDecoration: 'none' }}>
                  <motion.button
                    className="ha-btn-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Learning Now
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                </Link>
                <Link to="/demo" style={{ textDecoration: 'none' }}>
                  <motion.button
                    className="ha-btn-secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="ha-btn-play"><FaPlay size={8} /></span>
                    Watch Demo
                  </motion.button>
                </Link>
              </div>

              {/* Stats */}
              <div className="ha-stats-grid" ref={statsRef}>
                {stats.map((item, index) => (
                  <motion.div
                    key={index}
                    className="ha-stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={startCount ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  >
                    <div className="ha-stat-value">
                      {startCount && (
                        <CountUp end={item.value} duration={2.2} decimals={item.decimals || 0} />
                      )}
                      {item.suffix}
                    </div>
                    <div className="ha-stat-label">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── RIGHT COLUMN ── */}
            <motion.div
              style={{ flex: '1 1 420px', minWidth: 0, position: 'relative' }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            >
              <div className="ha-img-wrapper">
                <div className="ha-img-frame">
                  <img src="/home member.jpg" alt="English learning session at Home Academy" />
                </div>

                {/* Floating cards */}
                <div className="ha-float-card" style={{ bottom: -20, left: -20 }}>
                  <div className="ha-float-icon" style={{ background: 'rgba(59,130,246,0.15)' }}>
                    <FaChalkboardTeacher className="text-blue-400" size={16} />
                  </div>
                  <div>
                    <div className="ha-float-title">Certified Teachers</div>
                    <div className="ha-float-sub">15+ Professionals</div>
                  </div>
                </div>

                <div className="ha-float-card" style={{ top: -20, right: -20 }}>
                  <div className="ha-float-icon" style={{ background: 'rgba(16,185,129,0.15)' }}>
                    <FaCertificate className="text-emerald-400" size={16} />
                  </div>
                  <div>
                    <div className="ha-float-title">Recognized</div>
                    <div className="ha-float-sub">Certification</div>
                  </div>
                </div>

                <div className="ha-float-card" style={{ top: '25%', right: -44 }}>
                  <div className="ha-float-icon" style={{ background: 'rgba(14,165,233,0.15)' }}>
                    <FaUserTie className="text-sky-400" size={16} />
                  </div>
                  <div>
                    <div className="ha-float-title">Career</div>
                    <div className="ha-float-sub">Preparation</div>
                  </div>
                </div>

                <div className="ha-float-card" style={{ bottom: '25%', left: -44 }}>
                  <div className="ha-float-icon" style={{ background: 'rgba(139,92,246,0.15)' }}>
                    <FaGlobeAmericas className="text-violet-400" size={16} />
                  </div>
                  <div>
                    <div className="ha-float-title">Global</div>
                    <div className="ha-float-sub">Standards</div>
                  </div>
                </div>

                {/* Social proof below image */}
                <div style={{ marginTop: 20 }}>
                  <div className="ha-proof-card">
                    <div className="ha-avatar-stack">
                      <img src="/stu4.jpg" alt="Student" />
                      <img src="/stu5.jpg" alt="Student" />
                      <img src="/stu6.jpg" alt="Student" />
                      <div className="ha-avatar-more">1.2K+</div>
                    </div>
                    <div>
                      <div className="ha-proof-text">Trusted by learners worldwide</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                        <span className="ha-stars">★★★★★</span>
                        <span className="ha-proof-rating">4.9/5</span>
                        <span className="ha-proof-text">rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Marquee ── */}
          <div className="ha-marquee-wrapper">
            <div className="ha-marquee-track">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span key={index} className="ha-marquee-item">
                  <span className="ha-marquee-dot" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="banner-bottom-fade" />
      </div>
    </>
  );
};

export default Banner;