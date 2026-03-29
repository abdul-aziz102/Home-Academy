import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const filters = ["All", "Beginner", "Elementary", "Intermediate", "Advanced"];


const CourseCard = ({ course, index }) => {
  const isRegistered = localStorage.getItem('isRegistered') === 'true';
  const registrationData = isRegistered ? JSON.parse(localStorage.getItem('registrationData')) : null;
  const navigate = useNavigate();

  const handleEnroll = () => {
    if (isRegistered && registrationData) {
      navigate('/result', { state: registrationData });
    } else {
      navigate('/register');
    }
  };

  return (
    <motion.div
      className="ha-card"
      style={{ "--accent": course.accent, "--glow": course.accentGlow }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
    >
      <div className="ha-card-line" />
      <span className="ha-card-roman">{course.roman}</span>

      <div className="ha-card-badge" style={{ color: course.badgeColor, borderColor: `${course.badgeColor}33`, background: `${course.badgeColor}12` }}>
        {course.badge}
      </div>

      <div className="ha-card-head">
        <h3 className="ha-card-title">{course.level}</h3>
        <p className="ha-card-sub">{course.subtitle}</p>
      </div>

      <p className="ha-card-desc">{course.description}</p>

      <div className="ha-card-skills-label">YOU'LL LEARN</div>
      <ul className="ha-card-skills">
        {course.skills.map((s, i) => (
          <li key={i} className="ha-card-skill-item">
            <span className="ha-skill-check">✓</span>
            {s}
          </li>
        ))}
      </ul>

      <div className="ha-card-footer">
        <div className="ha-card-meta">
          <span className="ha-meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {course.duration}
          </span>
          <span className="ha-meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            {course.classes}
          </span>
        </div>
        <div className="ha-card-bottom">
          <span className="ha-card-price">{course.price}</span>
          <motion.button
            className="ha-card-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleEnroll}
          >
            {isRegistered ? 'Download PDF' : 'Enroll Now'}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </motion.button>
        </div>
      </div>

      {course.isTop && <div className="ha-card-crown">👑 MOST ADVANCED</div>}
    </motion.div>
  );
};

const mapDbCourse = (c, index) => {
  const accents = ['#64748b', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#f97316', '#ec4899', '#eab308'];
  const accent = c.accent || accents[index % accents.length];
  const romans = ['Ⅰ','Ⅱ','Ⅲ','Ⅳ','Ⅴ','Ⅵ','Ⅶ','Ⅷ','Ⅸ','Ⅹ'];

  const categoryMap = {
    'beginner': 'Beginner', 'pre-beginner': 'Beginner',
    'elementary': 'Elementary', 'a1': 'Elementary', 'a2': 'Elementary',
    'intermediate': 'Intermediate', 'b1': 'Intermediate', 'b2': 'Intermediate',
    'advanced': 'Advanced', 'c1': 'Advanced', 'c2': 'Advanced',
  };
  const levelLower = (c.level || '').toLowerCase();
  const category = categoryMap[levelLower] || Object.entries(categoryMap).find(([k]) => levelLower.includes(k))?.[1] || 'Beginner';

  return {
    id: c._id,
    level: c.title,
    subtitle: c.level,
    badge: c.badge || c.level.toUpperCase(),
    badgeColor: accent,
    category,
    roman: romans[index % romans.length],
    description: c.description,
    skills: c.skills || [],
    duration: c.duration || '12 weeks',
    classes: c.classes ? `${c.classes} classes/week` : '5 classes/week',
    price: `Rs. ${c.price?.toLocaleString() || '0'}`,
    accent,
    accentGlow: `${accent}40`,
  };
};

const CoursesSection = () => {
  const [active, setActive] = useState("All");
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/admin/courses')
      .then(res => res.ok ? res.json() : [])
      .then(dbCourses => {
        const mapped = dbCourses.filter(c => c.isActive !== false).map((c, i) => mapDbCourse(c, i));
        setAllCourses(mapped);
      })
      .catch(() => {});
  }, []);

  const filtered = active === "All" ? allCourses : allCourses.filter(c => c.category === active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');

        .ha-courses-section {
          font-family: 'Outfit', sans-serif;
          background: #060d22;
          padding: 96px 24px;
          position: relative;
          overflow: hidden;
        }
        .ha-courses-section::before {
          content: '';
          position: absolute;
          top: -120px; left: 50%;
          transform: translateX(-50%);
          width: 700px; height: 400px;
          background: radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .ha-courses-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(99,179,237,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }
        .ha-courses-inner {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Heading */
        .ha-section-eyebrow {
          text-align: center;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #3b82f6;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .ha-eyebrow-line { width: 40px; height: 1px; background: linear-gradient(90deg, transparent, #3b82f6); }
        .ha-eyebrow-line.right { background: linear-gradient(90deg, #3b82f6, transparent); }

        .ha-section-title {
          text-align: center;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #f1f5f9;
          margin: 0 0 12px;
        }
        .ha-section-title span {
          background: linear-gradient(135deg, #60a5fa, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ha-section-sub {
          text-align: center;
          color: rgba(148,163,184,0.7);
          font-size: 1rem;
          margin-bottom: 48px;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Filters */
        .ha-filters {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }
        .ha-filter-btn {
          padding: 8px 20px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          border-radius: 100px;
          border: 1px solid rgba(99,179,237,0.15);
          background: rgba(255,255,255,0.03);
          color: rgba(148,163,184,0.8);
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.03em;
        }
        .ha-filter-btn:hover {
          border-color: rgba(59,130,246,0.4);
          color: #93c5fd;
          background: rgba(59,130,246,0.08);
        }
        .ha-filter-btn.active {
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          border-color: transparent;
          color: white;
          box-shadow: 0 4px 16px rgba(37,99,235,0.35);
        }

        /* path label */
        .ha-path-label {
          text-align: center;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: rgba(148,163,184,0.3);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
        }
        .ha-path-line { height: 1px; width: 60px; background: linear-gradient(90deg, transparent, rgba(99,179,237,0.2), transparent); }

        /* Grid */
        .ha-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        /* Card */
        .ha-card {
          position: relative;
          background: rgba(15,23,42,0.9);
          border: 1px solid rgba(99,179,237,0.1);
          border-radius: 16px;
          padding: 28px 24px 22px;
          overflow: hidden;
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
          cursor: pointer;
        }
        .ha-card:hover {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent),
                      0 20px 60px var(--glow),
                      0 4px 20px rgba(0,0,0,0.5);
        }
        .ha-card-line {
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--accent), transparent);
          opacity: 0.6;
          transition: opacity 0.3s;
        }
        .ha-card:hover .ha-card-line { opacity: 1; }

        .ha-card-roman {
          position: absolute;
          top: 10px; right: 14px;
          font-family: 'DM Mono', monospace;
          font-size: 3.8rem;
          font-weight: 500;
          color: rgba(99,179,237,0.04);
          line-height: 1;
          pointer-events: none;
          transition: color 0.3s;
        }
        .ha-card:hover .ha-card-roman { color: rgba(99,179,237,0.07); }

        .ha-card-badge {
          display: inline-block;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid;
          margin-bottom: 14px;
        }

        .ha-card-head { margin-bottom: 10px; }
        .ha-card-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -0.02em;
          line-height: 1.25;
          margin: 0 0 3px;
        }
        .ha-card-sub {
          font-size: 0.72rem;
          color: rgba(148,163,184,0.45);
          font-weight: 500;
          letter-spacing: 0.04em;
          margin: 0;
        }
        .ha-card-desc {
          font-size: 0.8rem;
          color: rgba(148,163,184,0.6);
          line-height: 1.6;
          margin: 0 0 16px;
        }

        .ha-card-skills-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: rgba(99,179,237,0.4);
          margin-bottom: 8px;
        }
        .ha-card-skills {
          list-style: none;
          margin: 0 0 18px;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px 8px;
        }
        .ha-card-skill-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          color: rgba(203,213,225,0.65);
          font-weight: 500;
        }
        .ha-skill-check {
          color: var(--accent);
          font-size: 0.68rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .ha-card-footer {
          border-top: 1px solid rgba(99,179,237,0.07);
          padding-top: 14px;
        }
        .ha-card-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
        }
        .ha-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.73rem;
          color: rgba(148,163,184,0.45);
          font-weight: 500;
        }
        .ha-card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ha-card-price {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--accent);
          letter-spacing: -0.02em;
        }
        .ha-card-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.02em;
        }
        .ha-card-btn:hover {
          background: color-mix(in srgb, var(--accent) 18%, transparent);
          box-shadow: 0 4px 14px var(--glow);
        }

        .ha-card-crown {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          text-align: center;
          font-size: 0.56rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #fde68a;
          background: rgba(234,179,8,0.07);
          border-top: 1px solid rgba(234,179,8,0.14);
          padding: 5px;
        }

        /* Stats */
        .ha-stats {
          display: flex;
          justify-content: center;
          gap: 48px;
          margin-top: 64px;
          padding-top: 48px;
          border-top: 1px solid rgba(99,179,237,0.08);
          flex-wrap: wrap;
        }
        .ha-stat { text-align: center; }
        .ha-stat-num {
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, #f1f5f9, #93c5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 4px;
        }
        .ha-stat-label {
          font-size: 0.72rem;
          color: rgba(148,163,184,0.45);
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        @media (max-width: 640px) {
          .ha-grid { grid-template-columns: 1fr; }
          .ha-stats { gap: 28px; }
          .ha-card-skills { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="ha-courses-section">
        <div className="ha-courses-inner">

          <div className="ha-section-eyebrow">
            <span className="ha-eyebrow-line" />
            STRUCTURED CURRICULUM
            <span className="ha-eyebrow-line right" />
          </div>

          <h2 className="ha-section-title">
            Our English <span>Proficiency Levels</span>
          </h2>
          <p className="ha-section-sub">
            Structured progression from absolute beginner to native-like fluency with certified instructors
          </p>

          <div className="ha-filters">
            {filters.map(f => (
              <motion.button
                key={f}
                className={`ha-filter-btn ${active === f ? "active" : ""}`}
                onClick={() => setActive(f)}
                whileTap={{ scale: 0.96 }}
              >
                {f}
              </motion.button>
            ))}
          </div>

          <div className="ha-path-label">
            <span className="ha-path-line" />
            {filtered.length} course{filtered.length !== 1 ? "s" : ""} — progress from left to right
            <span className="ha-path-line" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="ha-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="ha-stats">
            {[
              { num: String(allCourses.length), label: "Course Levels" },
              { num: "500+", label: "Students Enrolled" },
              { num: "12", label: "Weeks Per Level" },
              { num: "98%", label: "Success Rate" },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="ha-stat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                <div className="ha-stat-num">{s.num}</div>
                <div className="ha-stat-label">{s.label}</div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default CoursesSection;