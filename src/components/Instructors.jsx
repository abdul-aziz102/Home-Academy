import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const getInitials = (name) =>
  name.replace("Sir ", "").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.25, 0.1, 0.25, 1] } },
};

const defaultColors = ['#3b82f6','#8b5cf6','#10b981','#f59e0b','#ec4899','#06b6d4','#f97316','#a78bfa','#34d399','#60a5fa','#fb7185','#fbbf24'];

const Instructors = () => {
  const [hovered, setHovered] = useState(null);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/admin/teachers')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        const mapped = data.filter(t => t.isActive !== false).map((t, i) => ({
          id: t._id,
          name: t.name,
          specialization: t.specialization || '',
          experience: String(t.experience || 0),
          bio: t.bio || '',
          image: t.image ? (t.image.startsWith('/uploads') ? `http://localhost:3000${t.image}` : t.image) : '',
          color: defaultColors[i % defaultColors.length],
        }));
        setInstructors(mapped);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        /* ── SECTION ── */
        .ha-inst {
          font-family: 'Outfit', sans-serif;
          background: #060d22;
          padding: 100px 24px;
          position: relative;
          overflow: hidden;
        }
        .ha-inst::before {
          content: '';
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 600px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,92,246,.3), transparent);
        }
        .ha-inst::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(99,179,237,.05) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }
        .ha-inst-glow {
          position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 360px;
          background: radial-gradient(ellipse, rgba(139,92,246,.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .ha-inst-inner {
          max-width: 1280px; margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* ── HEADING ── */
        .ha-inst-eyebrow {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; margin-bottom: 14px;
        }
        .ha-inst-eline { width: 44px; height: 1px; background: linear-gradient(90deg, transparent, #8b5cf6); flex-shrink: 0; }
        .ha-inst-eline.r { background: linear-gradient(90deg, #8b5cf6, transparent); }
        .ha-inst-elabel { font-size: .65rem; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: #8b5cf6; }

        .ha-inst-h2 {
          font-size: clamp(1.9rem, 3.8vw, 3rem); font-weight: 900;
          letter-spacing: -.03em; color: #f1f5f9;
          text-align: center; margin: 0 0 12px; line-height: 1.1;
        }
        .ha-inst-h2 span {
          background: linear-gradient(135deg, #a78bfa, #8b5cf6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ha-inst-sub {
          text-align: center; color: rgba(148,163,184,.6);
          font-size: .95rem; margin: 0 auto 56px; max-width: 460px; line-height: 1.6;
        }

        /* ── GRID ── */
        .ha-inst-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1024px) { .ha-inst-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 720px)  { .ha-inst-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .ha-inst-grid { grid-template-columns: 1fr; } }

        /* ── CARD ── */
        .ha-inst-card {
          background: rgba(13, 20, 45, 0.92);
          border: 1px solid rgba(99,179,237,.1);
          border-radius: 18px;
          padding: 28px 20px 22px;
          display: flex; flex-direction: column; align-items: center;
          text-align: center;
          position: relative; overflow: hidden;
          transition: border-color .32s, box-shadow .32s;
          cursor: default;
        }
        .ha-inst-card:hover {
          border-color: var(--accent);
          box-shadow:
            0 0 0 1px var(--accent),
            0 20px 50px var(--glow);
        }

        /* top accent line */
        .ha-inst-topline {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--accent), transparent);
          opacity: .6; transition: opacity .3s;
        }
        .ha-inst-card:hover .ha-inst-topline { opacity: 1; }

        /* number watermark */
        .ha-inst-num {
          position: absolute; top: 10px; right: 14px;
          font-size: 3.5rem; font-weight: 900; line-height: 1;
          color: rgba(99,179,237,.04); pointer-events: none;
          transition: color .3s;
          font-variant-numeric: tabular-nums;
        }
        .ha-inst-card:hover .ha-inst-num {
          color: color-mix(in srgb, var(--accent) 7%, transparent);
        }

        /* ── AVATAR ── */
        .ha-inst-avatar-wrap {
          position: relative; margin-bottom: 16px;
        }
        .ha-inst-avatar-ring {
          position: absolute; inset: -6px; border-radius: 50%;
          border: 2px solid var(--accent);
          opacity: .2; transition: opacity .3s, transform .3s;
        }
        .ha-inst-card:hover .ha-inst-avatar-ring {
          opacity: .55; transform: scale(1.08);
        }
        .ha-inst-avatar {
          width: 88px; height: 88px; border-radius: 50%;
          position: relative; z-index: 1;
          overflow: hidden;
          border: 2px solid color-mix(in srgb, var(--accent) 38%, transparent);
          box-shadow: 0 0 20px var(--glow), 0 0 0 4px rgba(6,13,34,.8);
          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--accent) 28%, #0a1228),
            color-mix(in srgb, var(--accent) 12%, #060d22)
          );
          display: flex; align-items: center; justify-content: center;
        }
        .ha-inst-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ha-inst-initials {
          font-size: 1.4rem; font-weight: 800;
          color: var(--accent);
          text-shadow: 0 0 14px var(--glow);
        }

        /* online dot */
        .ha-inst-online {
          position: absolute; bottom: 2px; right: 2px; z-index: 2;
          width: 14px; height: 14px; border-radius: 50%;
          background: #10b981;
          border: 2px solid #060d22;
          box-shadow: 0 0 8px rgba(16,185,129,.65);
          animation: ha-pulse 2.2s ease-in-out infinite;
        }
        @keyframes ha-pulse {
          0%,100% { box-shadow: 0 0 5px rgba(16,185,129,.5); }
          50%      { box-shadow: 0 0 14px rgba(16,185,129,.85); }
        }

        /* ── CARD BODY ── */
        .ha-inst-name {
          font-size: .98rem; font-weight: 800; color: #f1f5f9;
          letter-spacing: -.02em; margin: 0 0 6px; line-height: 1.2;
        }
        .ha-inst-spec {
          font-size: .6rem; font-weight: 700; letter-spacing: .13em;
          text-transform: uppercase;
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 11%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 26%, transparent);
          border-radius: 100px;
          padding: 3px 11px;
          margin-bottom: 10px;
          display: inline-block;
        }

        .ha-inst-bio {
          font-size: .76rem; color: rgba(148,163,184,.55);
          line-height: 1.65; margin: 0 0 14px; flex: 1;
        }

        /* exp badge */
        .ha-inst-exp {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: .68rem; font-weight: 700; letter-spacing: .06em;
          color: rgba(148,163,184,.45);
          background: rgba(99,179,237,.05);
          border: 1px solid rgba(99,179,237,.08);
          border-radius: 100px;
          padding: 4px 12px;
        }
        .ha-inst-exp svg { opacity: .6; }

        /* stats mini row */
        .ha-inst-stats {
          display: flex; align-items: center; gap: 10px;
          margin-top: 12px;
          padding: 9px 12px;
          background: rgba(99,179,237,.035);
          border: 1px solid rgba(99,179,237,.07);
          border-radius: 10px;
          width: 100%;
        }
        .ha-inst-stat { flex: 1; text-align: center; }
        .ha-inst-stat-num {
          display: block; font-size: .9rem; font-weight: 800;
          color: var(--accent); line-height: 1.1;
        }
        .ha-inst-stat-lbl {
          font-size: .52rem; color: rgba(148,163,184,.38);
          font-weight: 600; letter-spacing: .07em; text-transform: uppercase;
        }
        .ha-inst-stat-sep { width: 1px; height: 24px; background: rgba(99,179,237,.1); flex-shrink: 0; }

        /* stars */
        .ha-inst-stars { font-size: .7rem; letter-spacing: 2px; margin-top: 8px; }

        @media (max-width: 640px) { .ha-inst { padding: 64px 16px; } }
      `}</style>

      <section className="ha-inst">
        <div className="ha-inst-glow" />
        <div className="ha-inst-inner">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="ha-inst-eyebrow">
              <span className="ha-inst-eline" />
              <span className="ha-inst-elabel">THE TEAM</span>
              <span className="ha-inst-eline r" />
            </div>
            <h2 className="ha-inst-h2">
              Meet Our <span>Expert Instructors</span>
            </h2>
            <p className="ha-inst-sub">
              Certified English language specialists with proven teaching methodologies and decades of combined experience
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="ha-inst-grid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {instructors.map((inst, i) => (
              <motion.div
                key={inst.id}
                className="ha-inst-card"
                style={{ "--accent": inst.color, "--glow": `${inst.color}28` }}
                variants={cardAnim}
                whileHover={{ y: -8, transition: { duration: 0.28 } }}
                onMouseEnter={() => setHovered(inst.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="ha-inst-topline" />
                <span className="ha-inst-num">{String(i + 1).padStart(2, "0")}</span>

                {/* Avatar */}
                <div className="ha-inst-avatar-wrap">
                  <div className="ha-inst-avatar-ring" />
                  <div className="ha-inst-avatar">
                    <img
                      src={inst.image}
                      alt={inst.name}
                      className="ha-inst-img"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                    <span className="ha-inst-initials" style={{ position:"absolute" }}>
                      {getInitials(inst.name)}
                    </span>
                  </div>
                  <span className="ha-inst-online" />
                </div>

                {/* Name */}
                <h3 className="ha-inst-name">{inst.name}</h3>

                {/* Specialization badge */}
                <span className="ha-inst-spec">{inst.specialization}</span>

                {/* Bio */}
                <p className="ha-inst-bio">{inst.bio}</p>

                {/* Stats mini */}
                <div className="ha-inst-stats">
                  <div className="ha-inst-stat">
                    <span className="ha-inst-stat-num">{inst.experience}yr</span>
                    <span className="ha-inst-stat-lbl">Exp</span>
                  </div>
                  <div className="ha-inst-stat-sep" />
                  <div className="ha-inst-stat">
                    <span className="ha-inst-stat-num">4.9</span>
                    <span className="ha-inst-stat-lbl">Rating</span>
                  </div>
                  <div className="ha-inst-stat-sep" />
                  <div className="ha-inst-stat">
                    <span className="ha-inst-stat-num">100+</span>
                    <span className="ha-inst-stat-lbl">Students</span>
                  </div>
                </div>

                {/* Stars */}
                <div className="ha-inst-stars">
                  {"★★★★★".split("").map((s, si) => (
                    <span key={si} style={{ color: inst.color }}>{s}</span>
                  ))}
                </div>

              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default Instructors;