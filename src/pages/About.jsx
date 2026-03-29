import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Instructors from '../components/Instructors';

const features = [
  { icon: "🎯", title: "Interactive Lessons",     desc: "Engaging activities designed for all learning styles" },
  { icon: "👩‍🏫", title: "Expert Instructors",      desc: "Certified teachers with 5+ years of experience" },
  { icon: "📊", title: "Personalized Learning",   desc: "Customized paths for each student's goals" },
  { icon: "💬", title: "Practical Materials",     desc: "Real-world conversation scenarios and exercises" },
  { icon: "⏱️", title: "Flexible Scheduling",     desc: "Learn at your own pace — online or in-person" },
  { icon: "📈", title: "Progress Tracking",       desc: "Regular assessments and detailed feedback" },
];

const stats = [
  { value: "20,000+", label: "Students Taught",    color: "#3b82f6" },
  { value: "98%",     label: "Satisfaction Rate",  color: "#10b981" },
  { value: "15+",     label: "Years Experience",   color: "#f59e0b" },
  { value: "24/7",    label: "Support Available",  color: "#8b5cf6" },
];

const tags = ["Leadership", "Innovation", "Student Success", "Educational Excellence"];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/* reusable eyebrow */
const Eyebrow = ({ color = "#3b82f6", label }) => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:14 }}>
    <span style={{ width:44, height:1, background:`linear-gradient(90deg,transparent,${color})`, flexShrink:0 }} />
    <span style={{ fontSize:".65rem", fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color }}>{label}</span>
    <span style={{ width:44, height:1, background:`linear-gradient(90deg,${color},transparent)`, flexShrink:0 }} />
  </div>
);

const About = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

      .ha-about { font-family:'Outfit',sans-serif; background:#060d22; }

      /* shared dot grid */
      .ha-about-dots {
        position:absolute; inset:0;
        background-image:radial-gradient(rgba(99,179,237,.05) 1px,transparent 1px);
        background-size:32px 32px; pointer-events:none;
      }

      /* ── HERO ── */
      .ha-about-hero {
        position:relative; overflow:hidden;
        padding:130px 24px 100px; text-align:center;
        background:#060d22;
      }
      .ha-hero-mesh {
        position:absolute; inset:0; pointer-events:none;
        background:
          radial-gradient(ellipse 70% 60% at 50% -10%, rgba(37,99,235,.18) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 80% 80%, rgba(139,92,246,.1) 0%, transparent 60%);
      }
      .ha-hero-grid {
        position:absolute; inset:0; pointer-events:none;
        background-image:
          linear-gradient(rgba(99,179,237,.04) 1px,transparent 1px),
          linear-gradient(90deg,rgba(99,179,237,.04) 1px,transparent 1px);
        background-size:48px 48px;
      }
      .ha-hero-h1 {
        font-size:clamp(2.4rem,5vw,4rem); font-weight:900;
        letter-spacing:-.04em; color:#f1f5f9; line-height:1.08;
        margin:0 0 20px;
      }
      .ha-hero-h1 span {
        background:linear-gradient(135deg,#60a5fa,#3b82f6,#06b6d4);
        -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      }
      .ha-hero-p {
        font-size:clamp(1rem,2vw,1.2rem); color:rgba(148,163,184,.7);
        max-width:560px; margin:0 auto 36px; line-height:1.7;
      }
      .ha-hero-btn {
        display:inline-flex; align-items:center; gap:8px;
        padding:13px 28px;
        font-family:'Outfit',sans-serif; font-size:.9rem; font-weight:700;
        color:white; background:linear-gradient(135deg,#2563eb,#3b82f6);
        border:none; border-radius:12px; cursor:pointer; text-decoration:none;
        box-shadow:0 4px 20px rgba(37,99,235,.35);
        transition:all .28s ease; letter-spacing:.02em; position:relative; overflow:hidden;
      }
      .ha-hero-btn::before {
        content:''; position:absolute; top:0; left:-100%; width:100%; height:100%;
        background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);
        transition:left .5s;
      }
      .ha-hero-btn:hover::before{left:100%;}
      .ha-hero-btn:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(37,99,235,.45);}

      /* floating badges */
      .ha-hero-badges {
        display:flex; justify-content:center; gap:12px;
        flex-wrap:wrap; margin-top:40px;
      }
      .ha-hero-badge {
        display:flex; align-items:center; gap:7px;
        padding:7px 14px; border-radius:100px;
        border:1px solid rgba(99,179,237,.15);
        background:rgba(255,255,255,.04);
        font-size:.75rem; font-weight:600; color:rgba(148,163,184,.7);
        backdrop-filter:blur(8px);
      }
      .ha-hero-badge-dot {
        width:7px; height:7px; border-radius:50%; background:var(--dc);
        box-shadow:0 0 6px var(--dc);
      }

      /* ── WHY CHOOSE US ── */
      .ha-wcu-section {
        padding:100px 24px; position:relative; overflow:hidden;
        background:#060d22;
      }
      .ha-wcu-section::before {
        content:''; position:absolute; top:0; left:50%; transform:translateX(-50%);
        width:600px; height:1px;
        background:linear-gradient(90deg,transparent,rgba(59,130,246,.25),transparent);
      }
      .ha-wcu-s-inner { max-width:1200px; margin:0 auto; position:relative; z-index:1; }
      .ha-wcu-s-grid {
        display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center;
      }
      @media(max-width:900px){.ha-wcu-s-grid{grid-template-columns:1fr;gap:40px;}}

      .ha-wcu-img-wrap {
        position:relative; border-radius:20px; overflow:hidden;
        border:1px solid rgba(99,179,237,.12);
        box-shadow:0 24px 64px rgba(0,0,0,.5);
      }
      .ha-wcu-img { width:100%; display:block; object-fit:cover; filter:brightness(.85) saturate(1.1); transition:transform .5s,filter .4s; }
      .ha-wcu-img-wrap:hover .ha-wcu-img{transform:scale(1.03);filter:brightness(.95) saturate(1.2);}
      .ha-wcu-img-overlay {
        position:absolute; bottom:0; left:0; right:0; height:50%;
        background:linear-gradient(to top,rgba(6,13,34,.85),transparent);
      }
      .ha-since-badge {
        position:absolute; top:16px; right:16px;
        background:rgba(6,13,34,.8); border:1px solid rgba(99,179,237,.2);
        border-radius:10px; padding:8px 14px; backdrop-filter:blur(12px);
        font-size:.7rem; font-weight:700; letter-spacing:.1em;
        text-transform:uppercase; color:#93c5fd;
      }

      .ha-wcu-s-h3 {
        font-size:clamp(1.7rem,3.5vw,2.6rem); font-weight:900;
        letter-spacing:-.03em; color:#f1f5f9; margin:0 0 16px; line-height:1.15;
      }
      .ha-wcu-s-h3 span {
        background:linear-gradient(135deg,#60a5fa,#3b82f6);
        -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      }
      .ha-wcu-s-p { font-size:.95rem; color:rgba(148,163,184,.65); line-height:1.75; margin:0 0 28px; }

      .ha-feat-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
      @media(max-width:480px){.ha-feat-grid{grid-template-columns:1fr;}}

      .ha-feat-card {
        background:rgba(13,20,45,.9); border:1px solid rgba(99,179,237,.09);
        border-radius:13px; padding:16px 14px; position:relative; overflow:hidden;
        transition:border-color .3s,box-shadow .3s,transform .3s;
      }
      .ha-feat-card:hover {
        border-color:rgba(59,130,246,.3);
        box-shadow:0 0 0 1px rgba(59,130,246,.1),0 10px 28px rgba(0,0,0,.3);
        transform:translateY(-4px);
      }
      .ha-feat-card::before {
        content:''; position:absolute; top:0; left:0; right:0; height:2px;
        background:linear-gradient(90deg,#3b82f6,transparent); opacity:.5; transition:opacity .3s;
      }
      .ha-feat-card:hover::before{opacity:1;}
      .ha-feat-icon { font-size:1.6rem; margin-bottom:8px; }
      .ha-feat-title { font-size:.84rem; font-weight:800; color:#e2e8f0; margin:0 0 4px; }
      .ha-feat-desc  { font-size:.72rem; color:rgba(148,163,184,.52); line-height:1.55; margin:0; }

      /* ── STATS ── */
      .ha-stats-section {
        padding:80px 24px; position:relative; overflow:hidden;
        background:rgba(5,10,26,1);
        border-top:1px solid rgba(99,179,237,.07);
        border-bottom:1px solid rgba(99,179,237,.07);
      }
      .ha-stats-inner { max-width:1000px; margin:0 auto; position:relative; z-index:1; }
      .ha-stats-h3 {
        font-size:clamp(1.7rem,3.5vw,2.5rem); font-weight:900;
        letter-spacing:-.03em; color:#f1f5f9; text-align:center; margin:0 0 52px;
      }
      .ha-stats-h3 span {
        background:linear-gradient(135deg,#60a5fa,#06b6d4);
        -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      }
      .ha-stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }
      @media(max-width:700px){.ha-stats-grid{grid-template-columns:1fr 1fr;}}

      .ha-stat-card {
        background:rgba(13,20,45,.8); border:1px solid rgba(99,179,237,.09);
        border-radius:16px; padding:28px 20px; text-align:center;
        position:relative; overflow:hidden;
        transition:border-color .3s,box-shadow .3s,transform .3s;
      }
      .ha-stat-card:hover {
        border-color:var(--sc);
        box-shadow:0 0 0 1px var(--sc),0 12px 40px color-mix(in srgb,var(--sc) 18%,transparent);
        transform:translateY(-4px);
      }
      .ha-stat-card::before {
        content:''; position:absolute; top:0; left:0; right:0; height:3px;
        background:var(--sc); opacity:.6; transition:opacity .3s;
      }
      .ha-stat-card:hover::before{opacity:1;}
      .ha-stat-num {
        font-size:2.4rem; font-weight:900; letter-spacing:-.04em;
        color:var(--sc); line-height:1; margin-bottom:8px;
        text-shadow:0 0 20px color-mix(in srgb,var(--sc) 40%,transparent);
      }
      .ha-stat-lbl { font-size:.75rem; color:rgba(148,163,184,.5); font-weight:600; letter-spacing:.08em; text-transform:uppercase; }

      /* ── MISSION ── */
      .ha-mission-section { padding:100px 24px; position:relative; overflow:hidden; background:#060d22; }
      .ha-mission-inner { max-width:800px; margin:0 auto; position:relative; z-index:1; }
      .ha-mission-card {
        background:rgba(13,20,45,.9); border:1px solid rgba(99,179,237,.12);
        border-radius:20px; padding:48px 40px;
        position:relative; overflow:hidden;
      }
      .ha-mission-card::before {
        content:''; position:absolute; top:0; left:0; right:0; height:3px;
        background:linear-gradient(90deg,#2563eb,#3b82f6,#06b6d4);
      }
      @media(max-width:560px){.ha-mission-card{padding:28px 20px;}}

      .ha-mission-h3 {
        font-size:clamp(1.6rem,3vw,2.2rem); font-weight:900;
        letter-spacing:-.03em; color:#f1f5f9; text-align:center; margin:0 0 20px;
      }
      .ha-mission-h3 span {
        background:linear-gradient(135deg,#60a5fa,#06b6d4);
        -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      }
      .ha-mission-p { font-size:.92rem; color:rgba(148,163,184,.65); line-height:1.8; margin:0 0 16px; }
      .ha-mission-p:last-child { margin:0; }

      /* quote icon */
      .ha-mission-quote {
        font-size:5rem; line-height:1; color:rgba(59,130,246,.08);
        font-family:Georgia,serif; text-align:center; margin-bottom:-20px;
      }

      /* ── PRINCIPAL ── */
      .ha-principal-section { padding:100px 24px; position:relative; overflow:hidden; background:#060d22; }
      .ha-principal-section::before {
        content:''; position:absolute; top:0; left:50%; transform:translateX(-50%);
        width:600px; height:1px;
        background:linear-gradient(90deg,transparent,rgba(245,158,11,.25),transparent);
      }
      .ha-principal-inner { max-width:960px; margin:0 auto; position:relative; z-index:1; }

      .ha-principal-card {
        background:rgba(13,20,45,.9); border:1px solid rgba(99,179,237,.1);
        border-radius:20px; padding:40px;
        display:flex; gap:40px; align-items:flex-start;
        position:relative; overflow:hidden;
      }
      .ha-principal-card::before {
        content:''; position:absolute; top:0; left:0; right:0; height:3px;
        background:linear-gradient(90deg,#f59e0b,#fbbf24,transparent);
      }
      @media(max-width:700px){.ha-principal-card{flex-direction:column;align-items:center;text-align:center;padding:28px 20px;}}

      .ha-principal-img-wrap {
        position:relative; flex-shrink:0;
      }
      .ha-principal-ring {
        position:absolute; inset:-6px; border-radius:50%;
        border:2px solid rgba(245,158,11,.3);
        transition:border-color .3s,transform .3s;
      }
      .ha-principal-card:hover .ha-principal-ring{border-color:rgba(245,158,11,.6);transform:scale(1.05);}
      .ha-principal-img {
        width:160px; height:160px; border-radius:50%; object-fit:cover;
        border:3px solid rgba(245,158,11,.4);
        box-shadow:0 0 28px rgba(245,158,11,.2);
        position:relative; z-index:1;
        display:block;
      }
      .ha-principal-badge-img {
        position:absolute; bottom:4px; right:4px; z-index:2;
        width:36px; height:36px; border-radius:50%;
        background:linear-gradient(135deg,#f59e0b,#fbbf24);
        display:flex; align-items:center; justify-content:center;
        font-size:1rem; border:2px solid #060d22;
        box-shadow:0 0 10px rgba(245,158,11,.4);
      }

      .ha-principal-name {
        font-size:1.5rem; font-weight:900; letter-spacing:-.02em; color:#f1f5f9; margin:0 0 4px;
      }
      .ha-principal-role {
        font-size:.78rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
        color:#f59e0b; margin:0 0 16px;
      }
      .ha-principal-bio {
        font-size:.85rem; color:rgba(148,163,184,.62); line-height:1.75; margin:0 0 20px;
      }
      .ha-principal-tags { display:flex; flex-wrap:wrap; gap:8px; }
      @media(max-width:700px){.ha-principal-tags{justify-content:center;}}
      .ha-principal-tag {
        font-size:.65rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
        padding:4px 12px; border-radius:100px;
        border:1px solid rgba(245,158,11,.25);
        background:rgba(245,158,11,.08);
        color:#fbbf24;
        transition:all .25s;
      }
      .ha-principal-tag:hover{background:rgba(245,158,11,.15);border-color:rgba(245,158,11,.45);}
    `}</style>

    <div className="ha-about">

      {/* ── HERO ── */}
      <section className="ha-about-hero">
        <div className="ha-hero-mesh" />
        <div className="ha-hero-grid" />
        <div className="ha-about-dots" />

        <motion.div
          variants={stagger} initial="hidden" animate="show"
          style={{ position:"relative", zIndex:1 }}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow color="#3b82f6" label="WHO WE ARE" />
          </motion.div>

          <motion.h1 className="ha-hero-h1" variants={fadeUp}>
            About <span>Home Academy</span>
          </motion.h1>

          <motion.p className="ha-hero-p" variants={fadeUp}>
            Empowering learners to speak English confidently and unlock global opportunities — since 1999.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link to="/courses" className="ha-hero-btn">
              Explore Our Courses
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </motion.div>

          <motion.div className="ha-hero-badges" variants={fadeUp}>
            {[
              { label:"Est. 1999",        color:"#3b82f6" },
              { label:"500+ Students",    color:"#10b981" },
              { label:"8 Levels",         color:"#f59e0b" },
              { label:"CEFR Aligned",     color:"#8b5cf6" },
            ].map((b, i) => (
              <span key={i} className="ha-hero-badge">
                <span className="ha-hero-badge-dot" style={{ "--dc": b.color }} />
                {b.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="ha-wcu-section">
        <div className="ha-about-dots" />
        <div className="ha-wcu-s-inner">
          <motion.div className="ha-wcu-s-grid"
            variants={stagger} initial="hidden"
            whileInView="show" viewport={{ once:true, margin:"-80px" }}>

            {/* Image */}
            <motion.div variants={fadeUp}>
              <div className="ha-wcu-img-wrap">
                <img src="lear.png" alt="Students learning" className="ha-wcu-img" style={{ maxHeight:400 }} />
                <div className="ha-wcu-img-overlay" />
                <div className="ha-since-badge">Est. 1999 · Karachi</div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div variants={fadeUp}>
              <Eyebrow color="#3b82f6" label="WHY CHOOSE US" />
              <h3 className="ha-wcu-s-h3">
                Why Choose <span>Home Academy?</span>
              </h3>
              <p className="ha-wcu-s-p">
                We're not just another language school — we're a community dedicated to your success.
                Our proven methodology combines the best of traditional teaching with modern techniques
                to deliver exceptional, lasting results.
              </p>

              <div className="ha-feat-grid">
                {features.map((f, i) => (
                  <motion.div key={i} className="ha-feat-card"
                    initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true, margin:"-30px" }}
                    transition={{ delay: i*0.08+0.15, duration:0.45 }}>
                    <div className="ha-feat-icon">{f.icon}</div>
                    <h4 className="ha-feat-title">{f.title}</h4>
                    <p className="ha-feat-desc">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="ha-stats-section">
        <div className="ha-about-dots" />
        <div className="ha-stats-inner">
          <motion.div initial={{ opacity:0, y:-16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5 }}>
            <Eyebrow color="#06b6d4" label="BY THE NUMBERS" />
            <h3 className="ha-stats-h3">Our <span>Impact in Numbers</span></h3>
          </motion.div>

          <div className="ha-stats-grid">
            {stats.map((s, i) => (
              <motion.div key={i} className="ha-stat-card" style={{ "--sc": s.color }}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay: i*0.1, duration:0.5 }}>
                <div className="ha-stat-num">{s.value}</div>
                <div className="ha-stat-lbl">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="ha-mission-section">
        <div className="ha-about-dots" />
        <div className="ha-mission-inner">
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.6 }}>
            <Eyebrow color="#8b5cf6" label="OUR PURPOSE" />
            <div className="ha-mission-card">
              <div className="ha-mission-quote">"</div>
              <h3 className="ha-mission-h3">Our Mission <span>& Vision</span></h3>
              <p className="ha-mission-p">
                At Home Academy, we believe language should never be a barrier to opportunity.
                Our mission is to provide accessible, high-quality English education that empowers
                individuals to connect, grow, and succeed in a globalized world.
              </p>
              <p className="ha-mission-p">
                We envision a world where everyone has the confidence and ability to communicate
                effectively in English — opening doors to education, career advancement, and
                cross-cultural understanding.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRINCIPAL ── */}
      <section className="ha-principal-section">
        <div className="ha-about-dots" />
        <div className="ha-principal-inner">
          <motion.div initial={{ opacity:0, y:-16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5 }}
            style={{ marginBottom:36 }}>
            <Eyebrow color="#f59e0b" label="LEADERSHIP" />
            <h2 style={{
              fontFamily:"'Outfit',sans-serif", fontSize:"clamp(1.8rem,3.5vw,2.6rem)",
              fontWeight:900, letterSpacing:"-.03em", color:"#f1f5f9",
              textAlign:"center", margin:"0 0 4px"
            }}>
              Meet the <span style={{
                background:"linear-gradient(135deg,#fbbf24,#f59e0b)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"
              }}>Principal</span>
            </h2>
          </motion.div>

          <motion.div className="ha-principal-card"
            initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.6 }}>

            {/* Photo */}
            <div className="ha-principal-img-wrap">
              <div className="ha-principal-ring" />
              <img src="/principel.jpg" alt="Sir Naeem" className="ha-principal-img" />
              <div className="ha-principal-badge-img">⭐</div>
            </div>

            {/* Info */}
            <div style={{ flex:1 }}>
              <h4 className="ha-principal-name">Sir Naeem</h4>
              <p className="ha-principal-role">Principal & Academic Director</p>
              <p className="ha-principal-bio">
                With over 15 years of experience in English language education, Sir Naeem has
                dedicated his career to developing innovative teaching methodologies that make
                language learning accessible and effective for all students.
              </p>
              <p className="ha-principal-bio" style={{ marginBottom:20 }}>
                As the founder of Home Academy, he has created a learning environment that
                combines academic rigor with personalized attention — ensuring each student
                achieves their full potential.
              </p>
              <div className="ha-principal-tags">
                {tags.map((t, i) => (
                  <motion.span key={i} className="ha-principal-tag"
                    whileHover={{ scale:1.05 }} whileTap={{ scale:.97 }}>
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Instructors />
    </div>
  </>
);

export default About;