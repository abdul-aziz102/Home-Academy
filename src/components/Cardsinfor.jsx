import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const levelsData = [
  {
    title: "Pre-Beginner Level",
    label: "START",
    accent: "#64748b",
    icon: "🔤",
    content: [
      "Alphabet and pronunciation fundamentals",
      "Essential greetings and introductions",
      "Numbers, dates, and telling time",
      "Basic classroom instructions",
      "Simple everyday vocabulary (family, colors, food)",
      "Asking and answering simple questions",
    ],
  },
  {
    title: "Beginner Level",
    label: "Level 1",
    accent: "#3b82f6",
    icon: "📖",
    content: [
      "Present simple and continuous tenses",
      "Daily routines and habits",
      "Shopping and ordering food",
      "Asking for and giving directions",
      "Describing people and places",
      "Basic writing (short messages, forms)",
    ],
  },
  {
    title: "Level 1 — Elementary",
    label: "Level 2",
    accent: "#10b981",
    icon: "✍️",
    content: [
      "Past simple and irregular verbs",
      "Making future plans",
      "Giving opinions and preferences",
      "Writing personal letters/emails",
      "Understanding simple news articles",
      "Social English (invitations, small talk)",
    ],
  },
  {
    title: "Level 2 — Pre-Intermediate",
    label: "Level 3",
    accent: "#8b5cf6",
    icon: "💬",
    content: [
      "Present perfect tense",
      "Comparing and contrasting",
      "Narrating stories and experiences",
      "Understanding phone conversations",
      "Writing cohesive paragraphs",
      "Expressing agreement/disagreement",
    ],
  },
  {
    title: "Level 3 — Intermediate",
    label: "Level 4",
    accent: "#f59e0b",
    icon: "🎯",
    content: [
      "All major verb tenses review",
      "Conditionals and hypotheticals",
      "Formal vs informal language",
      "Writing reports and summaries",
      "Understanding TV shows and movies",
      "Debating and presenting arguments",
    ],
  },
  {
    title: "Level 4 — Upper-Intermediate",
    label: "Level 5",
    accent: "#f97316",
    icon: "🏆",
    content: [
      "Advanced grammar structures",
      "Academic writing techniques",
      "Business English communication",
      "Understanding native speaker conversations",
      "Idioms and phrasal verbs",
      "Giving professional presentations",
    ],
  },
  {
    title: "Level 5 — Advanced",
    label: "Level 6",
    accent: "#ec4899",
    icon: "🌟",
    content: [
      "Nuanced language and subtle meanings",
      "Critical analysis of texts",
      "Negotiation and persuasion techniques",
      "Writing research papers/articles",
      "Cultural references in language",
      "Mastering all aspects of fluency",
    ],
  },
];

const Cardsinfor = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        /* ── SECTION ── */
        .ha-ci {
          font-family: 'Outfit', sans-serif;
          background: #060d22;
          padding: 96px 24px;
          position: relative;
          overflow: hidden;
        }
        .ha-ci::before {
          content: '';
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 600px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,.28), transparent);
        }
        .ha-ci::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(99,179,237,.05) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }
        .ha-ci-glow {
          position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
          width: 700px; height: 320px;
          background: radial-gradient(ellipse, rgba(59,130,246,.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .ha-ci-inner {
          max-width: 860px; margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* ── HEADING ── */
        .ha-ci-eyebrow {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; margin-bottom: 14px;
        }
        .ha-ci-eline { width: 44px; height: 1px; background: linear-gradient(90deg, transparent, #3b82f6); flex-shrink: 0; }
        .ha-ci-eline.r { background: linear-gradient(90deg, #3b82f6, transparent); }
        .ha-ci-elabel { font-size: .65rem; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: #3b82f6; }

        .ha-ci-h2 {
          font-size: clamp(1.9rem, 3.8vw, 3rem); font-weight: 900;
          letter-spacing: -.03em; color: #f1f5f9;
          text-align: center; margin: 0 0 12px; line-height: 1.1;
        }
        .ha-ci-h2 span {
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ha-ci-sub {
          text-align: center; color: rgba(148,163,184,.6);
          font-size: .95rem; margin: 0 auto 52px; max-width: 460px; line-height: 1.6;
        }

        /* ── ACCORDION LIST ── */
        .ha-ci-list { display: flex; flex-direction: column; gap: 12px; }

        /* ── ITEM ── */
        .ha-ci-item {
          background: rgba(13,20,45,.92);
          border: 1px solid rgba(99,179,237,.1);
          border-radius: 14px; overflow: hidden;
          transition: border-color .3s, box-shadow .3s;
          position: relative;
        }
        .ha-ci-item.open {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent), 0 12px 40px color-mix(in srgb,var(--accent) 14%,transparent);
        }

        /* top accent line */
        .ha-ci-item-line {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: var(--accent); opacity: 0; transition: opacity .3s;
        }
        .ha-ci-item.open .ha-ci-item-line { opacity: 1; }

        /* ── TRIGGER BUTTON ── */
        .ha-ci-trigger {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          gap: 16px; padding: 20px 24px;
          background: transparent; border: none; cursor: pointer;
          font-family: 'Outfit', sans-serif; text-align: left;
          transition: background .25s;
        }
        .ha-ci-trigger:hover { background: rgba(255,255,255,.02); }

        .ha-ci-trigger-left { display: flex; align-items: center; gap: 14px; }

        /* level pill */
        .ha-ci-level-pill {
          font-size: .58rem; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; padding: 4px 12px; border-radius: 100px;
          border: 1px solid; flex-shrink: 0;
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          border-color: color-mix(in srgb, var(--accent) 25%, transparent);
          white-space: nowrap;
        }

        /* icon */
        .ha-ci-icon {
          width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
          transition: background .3s;
        }
        .ha-ci-item.open .ha-ci-icon {
          background: color-mix(in srgb, var(--accent) 18%, transparent);
        }

        .ha-ci-title {
          font-size: .96rem; font-weight: 700; color: #e2e8f0;
          letter-spacing: -.01em; line-height: 1.25; margin: 0;
          transition: color .25s;
        }
        .ha-ci-item.open .ha-ci-title { color: #f1f5f9; }

        /* chevron */
        .ha-ci-chevron {
          width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(99,179,237,.15);
          background: rgba(99,179,237,.05);
          color: rgba(148,163,184,.55);
          font-size: .75rem;
          transition: all .3s ease;
        }
        .ha-ci-item.open .ha-ci-chevron {
          background: color-mix(in srgb, var(--accent) 15%, transparent);
          border-color: color-mix(in srgb, var(--accent) 35%, transparent);
          color: var(--accent);
          transform: rotate(180deg);
        }

        /* ── CONTENT PANEL ── */
        .ha-ci-panel {
          overflow: hidden;
          border-top: 1px solid rgba(99,179,237,.07);
        }
        .ha-ci-panel-inner { padding: 20px 24px 24px; }

        /* skill list */
        .ha-ci-skills { list-style: none; margin: 0 0 20px; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .ha-ci-skill {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: .83rem; color: rgba(203,213,225,.72); line-height: 1.55; font-weight: 500;
        }
        .ha-ci-skill-icon {
          width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: color-mix(in srgb, var(--accent) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
          color: var(--accent); font-size: .62rem; font-weight: 700;
          margin-top: 1px;
        }

        /* skills in 2 cols on wider screens */
        @media (min-width: 600px) {
          .ha-ci-skills { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 20px; }
        }

        /* join button */
        .ha-ci-join-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 22px;
          font-family: 'Outfit', sans-serif; font-size: .82rem; font-weight: 700;
          color: white; background: linear-gradient(135deg, var(--accent), color-mix(in srgb,var(--accent) 70%,#1e40af));
          border: none; border-radius: 9px; cursor: pointer; text-decoration: none;
          box-shadow: 0 4px 16px color-mix(in srgb, var(--accent) 30%, transparent);
          transition: all .28s ease; letter-spacing: .02em;
          position: relative; overflow: hidden;
        }
        .ha-ci-join-btn::before {
          content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
          transition: left .5s;
        }
        .ha-ci-join-btn:hover::before { left: 100%; }
        .ha-ci-join-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px color-mix(in srgb,var(--accent) 40%,transparent); }

        /* progress indicator */
        .ha-ci-progress {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 16px;
          padding: 10px 14px;
          background: rgba(99,179,237,.035);
          border: 1px solid rgba(99,179,237,.07);
          border-radius: 10px;
        }
        .ha-ci-progress-bar-bg {
          flex: 1; height: 4px; border-radius: 4px;
          background: rgba(99,179,237,.1); overflow: hidden;
        }
        .ha-ci-progress-bar-fill {
          height: 100%; border-radius: 4px;
          background: var(--accent);
          box-shadow: 0 0 6px var(--accent);
        }
        .ha-ci-progress-lbl {
          font-size: .65rem; font-weight: 700; color: var(--accent);
          letter-spacing: .08em; white-space: nowrap;
        }

        @media (max-width: 640px) { .ha-ci { padding: 64px 16px; } }
      `}</style>

      <section className="ha-ci">
        <div className="ha-ci-glow" />
        <div className="ha-ci-inner">

          {/* Heading */}
          <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
            <div className="ha-ci-eyebrow">
              <span className="ha-ci-eline" />
              <span className="ha-ci-elabel">DETAILED CURRICULUM</span>
              <span className="ha-ci-eline r" />
            </div>
            <h2 className="ha-ci-h2">
              English Level <span>Curriculums</span>
            </h2>
            <p className="ha-ci-sub">
              Expand each level to see exactly what you'll master — click to explore the full syllabus.
            </p>
          </motion.div>

          {/* Accordion */}
          <motion.div
            className="ha-ci-list"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.15, duration:0.5 }}
          >
            {levelsData.map((item, index) => {
              const isOpen = openIndex === index;
              const progressPct = Math.round(((index + 1) / levelsData.length) * 100);

              return (
                <motion.div
                  key={index}
                  className={`ha-ci-item${isOpen ? " open" : ""}`}
                  style={{ "--accent": item.accent }}
                  initial={{ opacity:0, y:18 }}
                  whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true, margin:"-40px" }}
                  transition={{ delay: index*0.06, duration:0.45 }}
                >
                  <div className="ha-ci-item-line" />

                  {/* Trigger */}
                  <motion.button
                    className="ha-ci-trigger"
                    onClick={() => toggle(index)}
                    whileTap={{ scale:.99 }}
                  >
                    <div className="ha-ci-trigger-left">
                      <div className="ha-ci-icon">{item.icon}</div>
                      <span className="ha-ci-level-pill">{item.label}</span>
                      <h3 className="ha-ci-title">{item.title}</h3>
                    </div>
                    <div className="ha-ci-chevron">▼</div>
                  </motion.button>

                  {/* Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="ha-ci-panel"
                        initial={{ height:0, opacity:0 }}
                        animate={{ height:"auto", opacity:1 }}
                        exit={{ height:0, opacity:0 }}
                        transition={{ duration:0.35, ease:[0.25,0.1,0.25,1] }}
                      >
                        <div className="ha-ci-panel-inner">

                          {/* Progress indicator */}
                          <div className="ha-ci-progress">
                            <span className="ha-ci-progress-lbl">Course Progress Path</span>
                            <div className="ha-ci-progress-bar-bg">
                              <motion.div
                                className="ha-ci-progress-bar-fill"
                                initial={{ width:0 }}
                                animate={{ width:`${progressPct}%` }}
                                transition={{ duration:0.6, ease:"easeOut" }}
                              />
                            </div>
                            <span className="ha-ci-progress-lbl">{progressPct}%</span>
                          </div>

                          {/* Skills */}
                          <ul className="ha-ci-skills">
                            {item.content.map((point, i) => (
                              <motion.li
                                key={i}
                                className="ha-ci-skill"
                                initial={{ opacity:0, x:-10 }}
                                animate={{ opacity:1, x:0 }}
                                transition={{ delay: i*0.05, duration:0.3 }}
                              >
                                <div className="ha-ci-skill-icon">✓</div>
                                <span>{point}</span>
                              </motion.li>
                            ))}
                          </ul>

                          {/* CTA */}
                          <Link to="/register">
                            <motion.div
                              className="ha-ci-join-btn"
                              whileHover={{ y:-2 }}
                              whileTap={{ scale:.97 }}
                            >
                              Join This Level
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                              </svg>
                            </motion.div>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Cardsinfor;