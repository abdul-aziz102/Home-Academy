import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    color: "#3b82f6",
    title: "Expert Instructors",
    desc: "Certified teachers with real classroom & professional experience.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    color: "#8b5cf6",
    title: "Structured Syllabus",
    desc: "Speaking, writing, grammar and vocabulary — all covered systematically.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    color: "#10b981",
    title: "8 Proficiency Levels",
    desc: "Pre-Beginner to CEFR C2 — a clear learning path for every student.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    color: "#f59e0b",
    title: "Online & In-Person",
    desc: "Attend at our center or join live classes via Zoom — your choice.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    color: "#ec4899",
    title: "Certified on Completion",
    desc: "Earn a recognized Home Academy Certificate + CEFR prep for advanced levels.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    color: "#06b6d4",
    title: "Small Batches",
    desc: "Max 8–10 students per batch — personal attention guaranteed.",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.25, 0.1, 0.25, 1] } },
};

const Testimonials = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

      .ha-wcu {
        font-family: 'Outfit', sans-serif;
        background: #060d22;
        padding: 100px 24px;
        position: relative;
        overflow: hidden;
      }
      .ha-wcu::before {
        content: '';
        position: absolute;
        top: 0; left: 50%; transform: translateX(-50%);
        width: 600px; height: 1px;
        background: linear-gradient(90deg, transparent, rgba(59,130,246,.3), transparent);
      }
      .ha-wcu::after {
        content: '';
        position: absolute; inset: 0;
        background-image: radial-gradient(rgba(99,179,237,.05) 1px, transparent 1px);
        background-size: 32px 32px;
        pointer-events: none;
      }
      /* ambient glow */
      .ha-wcu-glow {
        position: absolute;
        top: -60px; left: 30%;
        width: 600px; height: 400px;
        background: radial-gradient(ellipse, rgba(37,99,235,.08) 0%, transparent 70%);
        pointer-events: none;
      }
      .ha-wcu-inner {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
      }

      /* two-col layout */
      .ha-wcu-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 72px;
        align-items: start;
      }
      @media (max-width: 900px) {
        .ha-wcu-grid { grid-template-columns: 1fr; gap: 48px; }
      }

      /* ── LEFT ── */
      .ha-wcu-eyebrow {
        display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
      }
      .ha-wcu-eline { width: 40px; height: 1px; background: linear-gradient(90deg, transparent, #3b82f6); }
      .ha-wcu-elabel {
        font-size: .65rem; font-weight: 700; letter-spacing: .22em;
        text-transform: uppercase; color: #3b82f6;
      }
      .ha-wcu-h2 {
        font-size: clamp(2rem, 4vw, 3.1rem);
        font-weight: 900; letter-spacing: -.03em;
        color: #f1f5f9; line-height: 1.1; margin: 0 0 18px;
      }
      .ha-wcu-h2 span {
        background: linear-gradient(135deg, #60a5fa, #3b82f6);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      }
      .ha-wcu-desc {
        font-size: .97rem; color: rgba(148,163,184,.65);
        line-height: 1.75; margin: 0 0 36px; max-width: 440px;
      }

      /* stats */
      .ha-wcu-stats { display: flex; gap: 24px; margin-bottom: 40px; flex-wrap: wrap; align-items: center; }
      .ha-wcu-stat { display: flex; flex-direction: column; gap: 2px; }
      .ha-wcu-stat-num {
        font-size: 1.75rem; font-weight: 900; letter-spacing: -.04em;
        background: linear-gradient(135deg, #f1f5f9, #93c5fd);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        line-height: 1;
      }
      .ha-wcu-stat-lbl {
        font-size: .65rem; font-weight: 600; letter-spacing: .1em;
        text-transform: uppercase; color: rgba(148,163,184,.4);
      }
      .ha-wcu-stat-sep { width: 1px; height: 36px; background: rgba(99,179,237,.12); }

      /* buttons */
      .ha-wcu-btns { display: flex; gap: 14px; flex-wrap: wrap; }
      .ha-wcu-btn-primary {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 12px 26px;
        font-family: 'Outfit', sans-serif; font-size: .875rem; font-weight: 700;
        color: white; background: linear-gradient(135deg, #2563eb, #3b82f6);
        border: none; border-radius: 10px; cursor: pointer; text-decoration: none;
        box-shadow: 0 4px 20px rgba(37,99,235,.35);
        transition: all .28s ease; letter-spacing: .02em;
        position: relative; overflow: hidden;
      }
      .ha-wcu-btn-primary::before {
        content: ''; position: absolute;
        top: 0; left: -100%; width: 100%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
        transition: left .5s ease;
      }
      .ha-wcu-btn-primary:hover::before { left: 100%; }
      .ha-wcu-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(37,99,235,.45); }
      .ha-wcu-btn-outline {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 12px 26px;
        font-family: 'Outfit', sans-serif; font-size: .875rem; font-weight: 700;
        color: rgba(148,163,184,.85); background: transparent;
        border: 1px solid rgba(99,179,237,.2); border-radius: 10px;
        cursor: pointer; text-decoration: none; transition: all .28s ease; letter-spacing: .02em;
      }
      .ha-wcu-btn-outline:hover {
        border-color: rgba(59,130,246,.45); color: #93c5fd;
        background: rgba(59,130,246,.07); transform: translateY(-2px);
      }

      /* ── RIGHT ── */
      /* image */
      .ha-wcu-img-wrap {
        position: relative; border-radius: 16px; overflow: hidden;
        border: 1px solid rgba(99,179,237,.12);
        box-shadow: 0 20px 56px rgba(0,0,0,.5);
        margin-bottom: 16px;
      }
      .ha-wcu-img {
        width: 100%; height: 220px; object-fit: cover; display: block;
        filter: brightness(.85) saturate(1.1);
        transition: transform .5s ease, filter .4s;
      }
      .ha-wcu-img-wrap:hover .ha-wcu-img { transform: scale(1.04); filter: brightness(.95) saturate(1.2); }
      .ha-wcu-img-overlay {
        position: absolute; bottom: 0; left: 0; right: 0; height: 55%;
        background: linear-gradient(to top, rgba(6,13,34,.88) 0%, transparent 100%);
        pointer-events: none;
      }
      .ha-wcu-img-badge {
        position: absolute; bottom: 14px; left: 14px;
        display: flex; align-items: center; gap: 8px;
        background: rgba(6,13,34,.75); border: 1px solid rgba(99,179,237,.18);
        border-radius: 9px; padding: 7px 13px; backdrop-filter: blur(12px);
      }
      .ha-wcu-badge-dot {
        width: 8px; height: 8px; border-radius: 50%; background: #10b981;
        box-shadow: 0 0 8px rgba(16,185,129,.7); animation: ha-wcu-blink 2s infinite;
      }
      @keyframes ha-wcu-blink { 0%,100%{opacity:1}50%{opacity:.4} }
      .ha-wcu-badge-txt { font-size: .7rem; font-weight: 700; color: #e2e8f0; letter-spacing: .04em; }

      /* feature cards grid */
      .ha-wcu-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      @media (max-width: 480px) { .ha-wcu-cards { grid-template-columns: 1fr; } }

      .ha-wcu-card {
        background: rgba(13,20,45,.9);
        border: 1px solid rgba(99,179,237,.09);
        border-radius: 13px; padding: 18px 16px;
        position: relative; overflow: hidden;
        transition: border-color .3s, box-shadow .3s, transform .3s;
      }
      .ha-wcu-card:hover {
        border-color: var(--c);
        box-shadow: 0 0 0 1px var(--c), 0 10px 30px color-mix(in srgb, var(--c) 18%, transparent);
        transform: translateY(-4px);
      }
      .ha-wcu-card::before {
        content: ''; position: absolute;
        top: 0; left: 0; right: 0; height: 2px;
        background: linear-gradient(90deg, var(--c), transparent);
        opacity: .5; transition: opacity .3s;
      }
      .ha-wcu-card:hover::before { opacity: 1; }

      .ha-wcu-card-icon {
        width: 38px; height: 38px; border-radius: 9px;
        display: flex; align-items: center; justify-content: center;
        margin-bottom: 10px;
        background: color-mix(in srgb, var(--c) 12%, transparent);
        border: 1px solid color-mix(in srgb, var(--c) 22%, transparent);
        color: var(--c); transition: background .3s;
      }
      .ha-wcu-card:hover .ha-wcu-card-icon { background: color-mix(in srgb, var(--c) 20%, transparent); }

      .ha-wcu-card-title {
        font-size: .84rem; font-weight: 800; color: #e2e8f0;
        letter-spacing: -.01em; margin: 0 0 5px;
      }
      .ha-wcu-card-desc {
        font-size: .72rem; color: rgba(148,163,184,.52); line-height: 1.6; margin: 0;
      }

      @media (max-width: 640px) { .ha-wcu { padding: 64px 16px; } }
    `}</style>

    <section className="ha-wcu">
      <div className="ha-wcu-glow" />
      <div className="ha-wcu-inner">
        <motion.div
          className="ha-wcu-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* LEFT */}
          <motion.div variants={fadeUp}>
            <div className="ha-wcu-eyebrow">
              <span className="ha-wcu-eline" />
              <span className="ha-wcu-elabel">WHY CHOOSE US</span>
            </div>
            <h2 className="ha-wcu-h2">
              Unlock the <span>Power of English</span>
            </h2>
            <p className="ha-wcu-desc">
              Learn to speak, read, and write English confidently with our expert-designed courses.
              Whether you're a complete beginner or want to sharpen your fluency — we have the right level for you.
            </p>

            {/* Stats */}
            <div className="ha-wcu-stats">
              {[
                { num: "500+", lbl: "Students" }, null,
                { num: "8",    lbl: "Levels"   }, null,
                { num: "98%",  lbl: "Success"  }, null,
                { num: "5★",   lbl: "Rated"    },
              ].map((s, i) =>
                s === null
                  ? <div key={i} className="ha-wcu-stat-sep" />
                  : (
                    <motion.div key={i} className="ha-wcu-stat"
                      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.07 + 0.3 }}>
                      <span className="ha-wcu-stat-num">{s.num}</span>
                      <span className="ha-wcu-stat-lbl">{s.lbl}</span>
                    </motion.div>
                  )
              )}
            </div>

            {/* Buttons */}
            <div className="ha-wcu-btns">
              <Link to="/courses">
                <motion.div className="ha-wcu-btn-primary" whileHover={{ y: -2 }} whileTap={{ scale: .97 }}>
                  Join Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </motion.div>
              </Link>
              <Link to="/about">
                <motion.div className="ha-wcu-btn-outline" whileHover={{ y: -2 }} whileTap={{ scale: .97 }}>
                  Learn More
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div variants={fadeUp}>
            {/* Image */}
            <div className="ha-wcu-img-wrap">
              <img src="/learn.jpg" alt="Students learning English" className="ha-wcu-img" />
              <div className="ha-wcu-img-overlay" />
              <div className="ha-wcu-img-badge">
                <span className="ha-wcu-badge-dot" />
                <span className="ha-wcu-badge-txt">Enrollments Open</span>
              </div>
            </div>

            {/* 6 feature cards */}
            <div className="ha-wcu-cards">
              {features.map((f, i) => (
                <motion.div key={i} className="ha-wcu-card" style={{ "--c": f.color }}
                  initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.07 + 0.2, duration: 0.45 }}>
                  <div className="ha-wcu-card-icon">{f.icon}</div>
                  <h4 className="ha-wcu-card-title">{f.title}</h4>
                  <p className="ha-wcu-card-desc">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  </>
);

export default Testimonials;