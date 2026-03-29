import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Cardsinfor from '../components/Cardsinfor';

/* ── DATA ─────────────────────────────────────────── */

const features = [
  { icon:"👨‍🏫", color:"#3b82f6", title:"Expert Instructors",   desc:"Certified teachers with years of experience in English language education." },
  { icon:"⏱️",  color:"#10b981", title:"Flexible Scheduling",  desc:"Morning, afternoon and evening classes to fit your schedule." },
  { icon:"🎓",  color:"#8b5cf6", title:"Certification",        desc:"Receive recognized certificates upon course completion." },
  { icon:"💬",  color:"#f59e0b", title:"Interactive Learning", desc:"Engaging activities and real-world practice scenarios." },
  { icon:"📈",  color:"#ec4899", title:"Progress Tracking",    desc:"Regular assessments to monitor your improvement." },
];

const testimonials = [
  { name:"Muddasir",        level:"Beginner Graduate",  img:"mudasir.png",  text:"The teachers at Home Academy are incredibly patient and knowledgeable. I went from knowing nothing to having basic conversations in just 3 months!" },
  { name:"Muhammad Talal",  level:"Intermediate Level", img:"talal.png",    text:"The interactive classes and practical exercises helped me improve my English for my job. I can now communicate confidently with international clients." },
  { name:"Muhammad Bilal",  level:"Advanced Level",     img:"bilala.png",   text:"Thanks to Home Academy, I scored band 7.5 in IELTS and got admission to my dream university abroad. The personalized attention made all the difference." },
];

const filters = ["All", "Beginner", "Elementary", "Intermediate", "Advanced"];

/* ── ANIMATIONS ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };

/* ── EYEBROW ── */
const Eyebrow = ({ color = "#3b82f6", label }) => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:14 }}>
    <span style={{ width:44, height:1, background:`linear-gradient(90deg,transparent,${color})`, flexShrink:0 }} />
    <span style={{ fontSize:".65rem", fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color, fontFamily:"'Outfit',sans-serif" }}>{label}</span>
    <span style={{ width:44, height:1, background:`linear-gradient(90deg,${color},transparent)`, flexShrink:0 }} />
  </div>
);

/* ── COURSE CARD ── */
const CourseCard = ({ level, index }) => {
  const isRegistered = localStorage.getItem('isRegistered') === 'true';
  const registrationData = isRegistered ? JSON.parse(localStorage.getItem('registrationData')) : null;
  const navigate = useNavigate();

  const handleEnroll = (e) => {
    e.preventDefault();
    if (isRegistered && registrationData) {
      navigate('/result', { state: registrationData });
    } else {
      navigate('/register');
    }
  };

  return (
  <motion.div
    className="ha-c-card"
    style={{ "--accent": level.accent, "--glow": `${level.accent}28` }}
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
    whileHover={{ y: -6, transition: { duration: 0.28 } }}
  >
    <div className="ha-c-card-line" />
    <span className="ha-c-roman">{level.roman}</span>

    <div className="ha-c-badge" style={{ color: level.badgeColor, borderColor:`${level.badgeColor}33`, background:`${level.badgeColor}12` }}>
      {level.badge}
    </div>

    <h3 className="ha-c-title">{level.title}</h3>
    <p className="ha-c-desc">{level.desc}</p>

    <div className="ha-c-skills-lbl">YOU'LL LEARN</div>
    <ul className="ha-c-skills">
      {level.skills.map((s, i) => (
        <li key={i} className="ha-c-skill">
          <span className="ha-c-check">✓</span>{s}
        </li>
      ))}
    </ul>

    <div className="ha-c-footer">
      <div className="ha-c-meta">
        <span className="ha-c-meta-item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {level.duration}
        </span>
        <span className="ha-c-meta-item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          {level.classes}
        </span>
      </div>
      <div className="ha-c-bottom">
        <span className="ha-c-price">{level.price}</span>
          <motion.button className="ha-c-btn" whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }} onClick={handleEnroll}>
            {isRegistered ? 'Download PDF' : 'Enroll'}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </motion.button>
      </div>
    </div>
    {level.isTop && <div className="ha-c-crown">👑 MOST ADVANCED</div>}
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
  const cat = categoryMap[levelLower] || Object.entries(categoryMap).find(([k]) => levelLower.includes(k))?.[1] || 'Beginner';

  return {
    title: c.title,
    badge: c.badge || c.level.toUpperCase(),
    badgeColor: accent,
    cat,
    roman: romans[index % romans.length],
    accent,
    desc: c.description,
    skills: c.skills || [],
    duration: c.duration || '12 weeks',
    classes: c.classes ? `${c.classes}/week` : '5/week',
    price: `Rs. ${c.price?.toLocaleString() || '0'}`,
  };
};

/* ── MAIN COMPONENT ── */
const Corses = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [allLevels, setAllLevels] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/admin/courses')
      .then(res => res.ok ? res.json() : [])
      .then(dbCourses => {
        const mapped = dbCourses.filter(c => c.isActive !== false).map((c, i) => mapDbCourse(c, i));
        setAllLevels(mapped);
      })
      .catch(() => {});
  }, []);

  const filtered = activeFilter === "All" ? allLevels : allLevels.filter(l => l.cat === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        /* global */
        .ha-courses-page { font-family:'Outfit',sans-serif; background:#060d22; }
        .ha-dots { position:absolute; inset:0; background-image:radial-gradient(rgba(99,179,237,.05) 1px,transparent 1px); background-size:32px 32px; pointer-events:none; }

        /* ── HERO ── */
        .ha-cp-hero {
          position:relative; overflow:hidden; padding:130px 24px 100px; text-align:center;
          background:#060d22;
        }
        .ha-cp-hero-mesh {
          position:absolute; inset:0; pointer-events:none;
          background:
            radial-gradient(ellipse 70% 55% at 50% -10%, rgba(37,99,235,.18) 0%,transparent 70%),
            radial-gradient(ellipse 45% 35% at 85% 85%, rgba(139,92,246,.1) 0%,transparent 60%);
        }
        .ha-cp-hero-grid {
          position:absolute; inset:0; pointer-events:none;
          background-image:linear-gradient(rgba(99,179,237,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,179,237,.04) 1px,transparent 1px);
          background-size:48px 48px;
        }
        .ha-cp-h1 { font-size:clamp(2.2rem,5vw,3.8rem); font-weight:900; letter-spacing:-.04em; color:#f1f5f9; margin:0 0 18px; line-height:1.08; }
        .ha-cp-h1 span { background:linear-gradient(135deg,#60a5fa,#3b82f6,#06b6d4); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .ha-cp-hero-p { font-size:clamp(1rem,2vw,1.18rem); color:rgba(148,163,184,.68); max-width:540px; margin:0 auto 36px; line-height:1.7; }
        .ha-cp-hero-btns { display:flex; justify-content:center; gap:14px; flex-wrap:wrap; }
        .ha-cp-btn-primary {
          display:inline-flex; align-items:center; gap:8px; padding:13px 28px;
          font-family:'Outfit',sans-serif; font-size:.9rem; font-weight:700; color:white;
          background:linear-gradient(135deg,#2563eb,#3b82f6); border:none; border-radius:12px;
          cursor:pointer; text-decoration:none; box-shadow:0 4px 20px rgba(37,99,235,.35);
          transition:all .28s; position:relative; overflow:hidden;
        }
        .ha-cp-btn-primary::before { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent); transition:left .5s; }
        .ha-cp-btn-primary:hover::before{left:100%;}
        .ha-cp-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(37,99,235,.45);}
        .ha-cp-btn-outline {
          display:inline-flex; align-items:center; gap:8px; padding:13px 28px;
          font-family:'Outfit',sans-serif; font-size:.9rem; font-weight:700;
          color:rgba(148,163,184,.85); background:transparent;
          border:1px solid rgba(99,179,237,.2); border-radius:12px; cursor:pointer; text-decoration:none;
          transition:all .28s;
        }
        .ha-cp-btn-outline:hover{border-color:rgba(59,130,246,.45);color:#93c5fd;background:rgba(59,130,246,.07);transform:translateY(-2px);}

        /* hero badges */
        .ha-cp-hero-badges { display:flex; justify-content:center; gap:12px; flex-wrap:wrap; margin-top:40px; }
        .ha-cp-hero-badge {
          display:flex; align-items:center; gap:7px; padding:7px 14px;
          border-radius:100px; border:1px solid rgba(99,179,237,.15);
          background:rgba(255,255,255,.04); font-size:.74rem; font-weight:600;
          color:rgba(148,163,184,.7); backdrop-filter:blur(8px);
          font-family:'Outfit',sans-serif;
        }
        .ha-cp-bdot { width:7px; height:7px; border-radius:50%; background:var(--dc); box-shadow:0 0 6px var(--dc); }

        /* ── FEATURES ── */
        .ha-cp-feat { padding:90px 24px; background:#060d22; position:relative; overflow:hidden; }
        .ha-cp-feat::before { content:''; position:absolute; top:0; left:50%; transform:translateX(-50%); width:600px; height:1px; background:linear-gradient(90deg,transparent,rgba(59,130,246,.25),transparent); }
        .ha-cp-feat-inner { max-width:1200px; margin:0 auto; position:relative; z-index:1; }
        .ha-cp-feat-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; }
        @media(max-width:900px){.ha-cp-feat-grid{grid-template-columns:repeat(3,1fr);}}
        @media(max-width:560px){.ha-cp-feat-grid{grid-template-columns:1fr 1fr;}}

        .ha-cp-feat-card {
          background:rgba(13,20,45,.9); border:1px solid rgba(99,179,237,.09);
          border-radius:14px; padding:22px 16px; text-align:center;
          position:relative; overflow:hidden;
          transition:border-color .3s,box-shadow .3s,transform .3s;
        }
        .ha-cp-feat-card:hover { border-color:var(--c); box-shadow:0 0 0 1px var(--c),0 12px 32px color-mix(in srgb,var(--c) 16%,transparent); transform:translateY(-4px); }
        .ha-cp-feat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:var(--c); opacity:.5; transition:opacity .3s; }
        .ha-cp-feat-card:hover::before{opacity:1;}
        .ha-cp-feat-icon { font-size:2rem; margin-bottom:12px; display:block; }
        .ha-cp-feat-title { font-size:.88rem; font-weight:800; color:#e2e8f0; margin:0 0 6px; letter-spacing:-.01em; }
        .ha-cp-feat-desc  { font-size:.72rem; color:rgba(148,163,184,.52); line-height:1.6; margin:0; }

        /* ── LEVELS ── */
        .ha-cp-levels { padding:90px 24px; background:#060d22; position:relative; overflow:hidden; }
        .ha-cp-levels-inner { max-width:1280px; margin:0 auto; position:relative; z-index:1; }

        /* filters */
        .ha-cp-filters { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-bottom:48px; }
        .ha-cp-filter {
          padding:8px 20px; font-family:'Outfit',sans-serif; font-size:.82rem; font-weight:600;
          border-radius:100px; border:1px solid rgba(99,179,237,.15);
          background:rgba(255,255,255,.03); color:rgba(148,163,184,.8); cursor:pointer;
          transition:all .25s;
        }
        .ha-cp-filter:hover{border-color:rgba(59,130,246,.4);color:#93c5fd;background:rgba(59,130,246,.08);}
        .ha-cp-filter.active{background:linear-gradient(135deg,#2563eb,#3b82f6);border-color:transparent;color:white;box-shadow:0 4px 16px rgba(37,99,235,.35);}

        /* path label */
        .ha-cp-path { display:flex; align-items:center; justify-content:center; gap:12px; color:rgba(148,163,184,.3); font-size:.72rem; font-weight:600; letter-spacing:.08em; margin-bottom:28px; font-family:'Outfit',sans-serif; }
        .ha-cp-path-line { height:1px; width:60px; background:linear-gradient(90deg,transparent,rgba(99,179,237,.2),transparent); }

        .ha-cp-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(278px,1fr)); gap:22px; }

        /* card */
        .ha-c-card {
          background:rgba(15,23,42,.9); border:1px solid rgba(99,179,237,.1);
          border-radius:16px; padding:26px 22px 20px; overflow:hidden; position:relative;
          transition:border-color .32s,box-shadow .32s; cursor:pointer;
          display:flex; flex-direction:column;
        }
        .ha-c-card:hover { border-color:var(--accent); box-shadow:0 0 0 1px var(--accent),0 20px 56px var(--glow),0 4px 16px rgba(0,0,0,.5); }
        .ha-c-card-line { position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--accent),transparent); opacity:.65; transition:opacity .3s; }
        .ha-c-card:hover .ha-c-card-line{opacity:1;}
        .ha-c-roman { position:absolute; top:10px; right:14px; font-size:3.5rem; font-weight:900; color:rgba(99,179,237,.04); line-height:1; pointer-events:none; transition:color .3s; }
        .ha-c-card:hover .ha-c-roman{color:color-mix(in srgb,var(--accent) 7%,transparent);}
        .ha-c-badge { display:inline-block; font-size:.57rem; font-weight:700; letter-spacing:.15em; padding:3px 10px; border-radius:100px; border:1px solid; margin-bottom:12px; }
        .ha-c-title { font-size:1.05rem; font-weight:800; color:#f1f5f9; letter-spacing:-.02em; margin:0 0 8px; line-height:1.25; }
        .ha-c-desc  { font-size:.78rem; color:rgba(148,163,184,.6); line-height:1.65; margin:0 0 14px; flex:1; }
        .ha-c-skills-lbl { font-size:.57rem; font-weight:700; letter-spacing:.15em; color:rgba(99,179,237,.4); margin-bottom:7px; }
        .ha-c-skills { list-style:none; margin:0 0 16px; padding:0; display:grid; grid-template-columns:1fr 1fr; gap:4px 8px; }
        .ha-c-skill  { display:flex; align-items:center; gap:5px; font-size:.74rem; color:rgba(203,213,225,.65); font-weight:500; }
        .ha-c-check  { color:var(--accent); font-size:.66rem; font-weight:700; flex-shrink:0; }
        .ha-c-footer { border-top:1px solid rgba(99,179,237,.07); padding-top:13px; margin-top:auto; }
        .ha-c-meta   { display:flex; gap:14px; margin-bottom:11px; }
        .ha-c-meta-item { display:flex; align-items:center; gap:5px; font-size:.7rem; color:rgba(148,163,184,.42); font-weight:500; font-family:'Outfit',sans-serif; }
        .ha-c-bottom { display:flex; align-items:center; justify-content:space-between; }
        .ha-c-price  { font-size:1.1rem; font-weight:800; color:var(--accent); letter-spacing:-.02em; }
        .ha-c-btn {
          display:inline-flex; align-items:center; gap:5px; padding:7px 13px;
          font-family:'Outfit',sans-serif; font-size:.74rem; font-weight:700;
          color:var(--accent); background:color-mix(in srgb,var(--accent) 10%,transparent);
          border:1px solid color-mix(in srgb,var(--accent) 27%,transparent);
          border-radius:8px; cursor:pointer; transition:all .25s; letter-spacing:.02em; text-decoration:none;
        }
        .ha-c-btn:hover{background:color-mix(in srgb,var(--accent) 18%,transparent);box-shadow:0 4px 14px var(--glow);}
        .ha-c-crown { position:absolute; bottom:0; left:0; right:0; text-align:center; font-size:.55rem; font-weight:700; letter-spacing:.15em; color:#fde68a; background:rgba(234,179,8,.07); border-top:1px solid rgba(234,179,8,.14); padding:4px; font-family:'Outfit',sans-serif; }

        /* ── TESTIMONIALS ── */
        .ha-cp-testi { padding:90px 24px; background:rgba(5,10,26,1); position:relative; overflow:hidden; border-top:1px solid rgba(99,179,237,.07); }
        .ha-cp-testi-inner { max-width:1100px; margin:0 auto; position:relative; z-index:1; }
        .ha-cp-testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
        @media(max-width:800px){.ha-cp-testi-grid{grid-template-columns:1fr 1fr;}}
        @media(max-width:520px){.ha-cp-testi-grid{grid-template-columns:1fr;}}

        .ha-cp-testi-card {
          background:rgba(13,20,45,.9); border:1px solid rgba(99,179,237,.1);
          border-radius:16px; padding:24px 22px; position:relative; overflow:hidden;
          transition:border-color .3s,box-shadow .3s,transform .3s;
        }
        .ha-cp-testi-card:hover{border-color:rgba(59,130,246,.3);box-shadow:0 0 0 1px rgba(59,130,246,.1),0 12px 36px rgba(0,0,0,.35);transform:translateY(-4px);}
        .ha-cp-testi-card::before{content:'"';position:absolute;top:12px;right:16px;font-size:5rem;color:rgba(59,130,246,.06);font-family:Georgia,serif;line-height:1;pointer-events:none;}

        .ha-cp-testi-head { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
        .ha-cp-testi-avatar {
          width:44px; height:44px; border-radius:50%; object-fit:cover; flex-shrink:0;
          border:2px solid rgba(59,130,246,.3);
          box-shadow:0 0 12px rgba(59,130,246,.15);
        }
        .ha-cp-testi-name  { font-size:.9rem; font-weight:800; color:#f1f5f9; margin:0; }
        .ha-cp-testi-level { font-size:.68rem; color:rgba(148,163,184,.5); font-weight:500; margin:0; }
        .ha-cp-testi-text  { font-size:.8rem; color:rgba(148,163,184,.65); line-height:1.75; font-style:italic; margin:0 0 14px; }
        .ha-cp-testi-stars { display:flex; gap:2px; }
        .ha-cp-testi-star  { color:#f59e0b; font-size:.85rem; }

        /* ── CTA ── */
        .ha-cp-cta {
          padding:100px 24px; position:relative; overflow:hidden; text-align:center;
          background:#060d22;
        }
        .ha-cp-cta-mesh {
          position:absolute; inset:0; pointer-events:none;
          background:radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,.12) 0%,transparent 70%);
        }
        .ha-cp-cta-inner{max-width:700px;margin:0 auto;position:relative;z-index:1;}
        .ha-cp-cta-h2{font-size:clamp(1.9rem,4vw,3rem);font-weight:900;letter-spacing:-.03em;color:#f1f5f9;margin:0 0 14px;line-height:1.1;}
        .ha-cp-cta-h2 span{background:linear-gradient(135deg,#60a5fa,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .ha-cp-cta-p{font-size:.97rem;color:rgba(148,163,184,.65);line-height:1.7;margin:0 auto 36px;max-width:480px;}
        .ha-cp-cta-btns{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;}

        @media(max-width:640px){.ha-cp-hero,.ha-cp-feat,.ha-cp-levels,.ha-cp-testi,.ha-cp-cta{padding-left:16px;padding-right:16px;} .ha-c-skills{grid-template-columns:1fr;}}
      `}</style>

      <div className="ha-courses-page">

        {/* ── HERO ── */}
        <section className="ha-cp-hero">
          <div className="ha-cp-hero-mesh" />
          <div className="ha-cp-hero-grid" />
          <div className="ha-dots" />
          <motion.div variants={stagger} initial="hidden" animate="show" style={{ position:"relative", zIndex:1 }}>
            <motion.div variants={fadeUp}><Eyebrow color="#3b82f6" label="OUR PROGRAMS" /></motion.div>
            <motion.h1 className="ha-cp-h1" variants={fadeUp}>
              English Language <span>Courses</span>
            </motion.h1>
            <motion.p className="ha-cp-hero-p" variants={fadeUp}>
              Transform your communication skills with our comprehensive English programs — structured, certified, and results-driven.
            </motion.p>
            <motion.div className="ha-cp-hero-btns" variants={fadeUp}>
              <Link to="/register" className="ha-cp-btn-primary">
                Enroll Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link to="/contact" className="ha-cp-btn-outline">Contact Us</Link>
            </motion.div>
            <motion.div className="ha-cp-hero-badges" variants={fadeUp}>
              {[{label:`${allLevels.length} Levels`,color:"#3b82f6"},{label:"CEFR Aligned",color:"#10b981"},{label:"Certified",color:"#8b5cf6"},{label:"Online & In-Person",color:"#f59e0b"}].map((b,i)=>(
                <span key={i} className="ha-cp-hero-badge">
                  <span className="ha-cp-bdot" style={{"--dc":b.color}} />{b.label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── FEATURES ── */}
        <section className="ha-cp-feat">
          <div className="ha-dots" />
          <div className="ha-cp-feat-inner">
            <Eyebrow color="#10b981" label="WHY CHOOSE US" />
            <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:900, letterSpacing:"-.03em", color:"#f1f5f9", textAlign:"center", margin:"0 0 12px" }}>
              Why Choose Our <span style={{ background:"linear-gradient(135deg,#6ee7b7,#10b981)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Courses</span>
            </h2>
            <p style={{ textAlign:"center", color:"rgba(148,163,184,.6)", fontSize:".95rem", margin:"0 auto 48px", maxWidth:460, lineHeight:1.6, fontFamily:"'Outfit',sans-serif" }}>
              Our proven methodology combines traditional teaching with modern techniques
            </p>
            <motion.div className="ha-cp-feat-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once:true, margin:"-60px" }}>
              {features.map((f,i)=>(
                <motion.div key={i} className="ha-cp-feat-card" style={{"--c":f.color}} variants={fadeUp}>
                  <span className="ha-cp-feat-icon">{f.icon}</span>
                  <h3 className="ha-cp-feat-title">{f.title}</h3>
                  <p className="ha-cp-feat-desc">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── LEVELS ── */}
        <section className="ha-cp-levels">
          <div className="ha-dots" />
          <div className="ha-cp-levels-inner">
            <Eyebrow color="#3b82f6" label="STRUCTURED CURRICULUM" />
            <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:900, letterSpacing:"-.03em", color:"#f1f5f9", textAlign:"center", margin:"0 0 12px" }}>
              Our English <span style={{ background:"linear-gradient(135deg,#60a5fa,#3b82f6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Proficiency Levels</span>
            </h2>
            <p style={{ textAlign:"center", color:"rgba(148,163,184,.6)", fontSize:".95rem", margin:"0 auto 40px", maxWidth:500, lineHeight:1.6, fontFamily:"'Outfit',sans-serif" }}>
              Structured progression from absolute beginner to native-like fluency
            </p>

            <div className="ha-cp-filters">
              {filters.map(f=>(
                <motion.button key={f} className={`ha-cp-filter${activeFilter===f?" active":""}`}
                  onClick={()=>setActiveFilter(f)} whileTap={{ scale:.96 }}>
                  {f}
                </motion.button>
              ))}
            </div>

            <div className="ha-cp-path">
              <span className="ha-cp-path-line" />
              {filtered.length} course{filtered.length!==1?"s":""} — progress left to right
              <span className="ha-cp-path-line" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeFilter} className="ha-cp-grid"
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.2 }}>
                {filtered.map((l,i)=><CourseCard key={l.title} level={l} index={i}/>)}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="ha-cp-testi">
          <div className="ha-dots" />
          <div className="ha-cp-testi-inner">
            <Eyebrow color="#f59e0b" label="STUDENT STORIES" />
            <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:900, letterSpacing:"-.03em", color:"#f1f5f9", textAlign:"center", margin:"0 0 12px" }}>
              What Our <span style={{ background:"linear-gradient(135deg,#fbbf24,#f59e0b)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Students Say</span>
            </h2>
            <p style={{ textAlign:"center", color:"rgba(148,163,184,.6)", fontSize:".95rem", margin:"0 auto 48px", maxWidth:460, lineHeight:1.6, fontFamily:"'Outfit',sans-serif" }}>
              Success stories from our English language learners
            </p>
            <motion.div className="ha-cp-testi-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once:true, margin:"-60px" }}>
              {testimonials.map((t,i)=>(
                <motion.div key={i} className="ha-cp-testi-card" variants={fadeUp}>
                  <div className="ha-cp-testi-head">
                    <img src={t.img} alt={t.name} className="ha-cp-testi-avatar"
                      onError={e=>{e.target.style.display="none";}} />
                    <div>
                      <p className="ha-cp-testi-name">{t.name}</p>
                      <p className="ha-cp-testi-level">{t.level}</p>
                    </div>
                  </div>
                  <p className="ha-cp-testi-text">"{t.text}"</p>
                  <div className="ha-cp-testi-stars">
                    {"★★★★★".split("").map((s,si)=><span key={si} className="ha-cp-testi-star">{s}</span>)}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="ha-cp-cta">
          <div className="ha-cp-cta-mesh" />
          <div className="ha-dots" />
          <div className="ha-cp-cta-inner">
            <Eyebrow color="#3b82f6" label="GET STARTED" />
            <h2 className="ha-cp-cta-h2">
              Ready to <span>Transform</span> Your English?
            </h2>
            <p className="ha-cp-cta-p">
              Join hundreds of successful students who achieved their language goals with Home Academy.
            </p>
            <div className="ha-cp-cta-btns">
              <Link to="/register" className="ha-cp-btn-primary">
                Enroll Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link to="/contact" className="ha-cp-btn-outline">Contact Us</Link>
            </div>
          </div>
        </section>

        {/* Additional Components */}
        <Cardsinfor />
      </div>
    </>
  );
};

export default Corses;