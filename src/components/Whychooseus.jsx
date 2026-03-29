import React from "react";
import { motion } from "framer-motion";

const features = [
  { icon: "🎓", title: "Certified Instructors",   desc: "All teachers are CEFR-certified with years of professional English coaching experience.",           accent: "#3b82f6", glow: "rgba(59,130,246,0.2)"  },
  { icon: "📅", title: "Flexible Timings",         desc: "Morning, evening and weekend batches available. Learn at your own pace and schedule.",               accent: "#10b981", glow: "rgba(16,185,129,0.2)"  },
  { icon: "🏆", title: "Proven Results",           desc: "98% of our students achieve their target English level. 500+ success stories and counting.",          accent: "#f59e0b", glow: "rgba(245,158,11,0.2)"  },
  { icon: "💬", title: "Daily Speaking Practice",  desc: "Real-life conversations, debates and group discussions every single class.",                          accent: "#8b5cf6", glow: "rgba(139,92,246,0.2)"  },
  { icon: "📖", title: "Structured Curriculum",    desc: "8 progressive levels from Pre-Beginner to Proficiency — a clear road to native-like fluency.",       accent: "#ec4899", glow: "rgba(236,72,153,0.2)"  },
  { icon: "🏠", title: "Home-like Environment",    desc: "Small batches ensure personal attention. Learn comfortably in a warm, friendly atmosphere.",          accent: "#06b6d4", glow: "rgba(6,182,212,0.2)"   },
];

const WhyChooseUs = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

      .ha-why {
        font-family: 'Outfit', sans-serif;
        background: #060d22;
        padding: 96px 24px;
        position: relative;
        overflow: hidden;
      }
      .ha-why::before {
        content: '';
        position: absolute;
        top: 0; left: 50%; transform: translateX(-50%);
        width: 600px; height: 1px;
        background: linear-gradient(90deg, transparent, rgba(245,158,11,0.35), transparent);
      }
      .ha-why::after {
        content: '';
        position: absolute; inset: 0;
        background-image: radial-gradient(rgba(99,179,237,0.05) 1px, transparent 1px);
        background-size: 32px 32px;
        pointer-events: none;
      }
      .ha-why-inner { max-width: 1280px; margin: 0 auto; position: relative; z-index: 1; }

      /* eyebrow */
      .ha-why-brow { display:flex; align-items:center; justify-content:center; gap:12px; margin-bottom:14px; }
      .ha-why-bl { width:44px; height:1px; background:linear-gradient(90deg,transparent,#f59e0b); flex-shrink:0; }
      .ha-why-bl.r { background:linear-gradient(90deg,#f59e0b,transparent); }
      .ha-why-bt { font-size:.65rem; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:#f59e0b; }

      .ha-why-h2 { font-size:clamp(1.9rem,3.8vw,3rem); font-weight:900; letter-spacing:-.03em; color:#f1f5f9; text-align:center; margin:0 0 12px; line-height:1.1; }
      .ha-why-h2 span { background:linear-gradient(135deg,#fbbf24,#f59e0b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      .ha-why-p { text-align:center; color:rgba(148,163,184,.6); font-size:.96rem; margin:0 auto 64px; max-width:480px; line-height:1.65; }

      /* grid */
      .ha-why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
      @media(max-width:1024px){ .ha-why-grid{ grid-template-columns:repeat(2,1fr); } }
      @media(max-width:640px) { .ha-why-grid{ grid-template-columns:1fr; } }

      /* card */
      .ha-why-card {
        background:rgba(13,20,45,.9);
        border:1px solid rgba(99,179,237,.09);
        border-radius:20px; padding:32px 28px;
        position:relative; overflow:hidden;
        transition:border-color .35s,box-shadow .35s,transform .35s;
        cursor:default;
      }
      .ha-why-card:hover {
        transform:translateY(-6px);
        border-color:var(--accent);
        box-shadow:0 0 0 1px var(--accent),0 24px 56px var(--glow),0 4px 20px rgba(0,0,0,.5);
      }
      .ha-why-card::before {
        content:''; position:absolute; top:0; left:0;
        width:60px; height:3px; background:var(--accent);
        opacity:.6; border-radius:0 0 4px 0;
        transition:width .4s,opacity .3s;
      }
      .ha-why-card:hover::before { width:100%; opacity:1; }

      .ha-why-icon {
        width:56px; height:56px; border-radius:14px;
        display:flex; align-items:center; justify-content:center;
        font-size:1.6rem; margin-bottom:20px;
        background:color-mix(in srgb,var(--accent) 12%,transparent);
        border:1px solid color-mix(in srgb,var(--accent) 22%,transparent);
        transition:box-shadow .35s,transform .35s;
        position:relative; z-index:1;
      }
      .ha-why-card:hover .ha-why-icon { box-shadow:0 0 20px var(--glow); transform:scale(1.08) rotate(-4deg); }

      .ha-why-ct { font-size:1.05rem; font-weight:800; color:#f1f5f9; letter-spacing:-.02em; margin:0 0 10px; position:relative; z-index:1; }
      .ha-why-cd { font-size:.84rem; color:rgba(148,163,184,.62); line-height:1.7; margin:0; position:relative; z-index:1; }

      /* banner */
      .ha-why-banner {
        margin-top:64px; border-radius:20px;
        border:1px solid rgba(59,130,246,.18);
        background:linear-gradient(135deg,rgba(37,99,235,.1),rgba(139,92,246,.07),rgba(6,182,212,.06));
        padding:40px 48px;
        display:flex; align-items:center; justify-content:space-between; gap:24px;
        position:relative; overflow:hidden;
      }
      .ha-why-banner::before { content:''; position:absolute; top:0;left:0;right:0;height:2px; background:linear-gradient(90deg,#3b82f6,#8b5cf6,#06b6d4); opacity:.6; }
      .ha-why-banner h3 { font-size:1.4rem; font-weight:800; color:#f1f5f9; letter-spacing:-.02em; margin:0 0 6px; }
      .ha-why-banner p  { font-size:.88rem; color:rgba(148,163,184,.6); margin:0; }
      .ha-why-bstats { display:flex; gap:40px; flex-shrink:0; }
      .ha-why-bs { text-align:center; }
      .ha-why-bs-n { display:block; font-size:1.8rem; font-weight:900; letter-spacing:-.04em; background:linear-gradient(135deg,#f1f5f9,#93c5fd); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; line-height:1; }
      .ha-why-bs-l { font-size:.62rem; color:rgba(148,163,184,.45); font-weight:600; letter-spacing:.1em; text-transform:uppercase; margin-top:3px; display:block; }

      @media(max-width:768px){ .ha-why-banner{ flex-direction:column; padding:28px 24px; text-align:center; } .ha-why-bstats{ gap:20px; } }
    `}</style>

    <section className="ha-why">
      <div className="ha-why-inner">
        <div className="ha-why-brow">
          <span className="ha-why-bl" /><span className="ha-why-bt">WHY CHOOSE US</span><span className="ha-why-bl r" />
        </div>
        <h2 className="ha-why-h2">The Home Academy <span>Difference</span></h2>
        <p className="ha-why-p">We don't just teach English — we build confidence, fluency, and a lifelong love for the language.</p>

        <div className="ha-why-grid">
          {features.map((f, i) => (
            <motion.div key={i} className="ha-why-card" style={{ "--accent": f.accent, "--glow": f.glow }}
              initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.09, duration: 0.5, ease: [0.25,0.1,0.25,1] }}>
              <div className="ha-why-icon">{f.icon}</div>
              <h3 className="ha-why-ct">{f.title}</h3>
              <p className="ha-why-cd">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div className="ha-why-banner"
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}>
          <div>
            <h3>Ready to Transform Your English?</h3>
            <p>Join hundreds of students who already achieved fluency with Home Academy</p>
          </div>
          <div className="ha-why-bstats">
            {[["500+","Students"],["8","Levels"],["98%","Success"],["5★","Rating"]].map(([n,l],i) => (
              <div key={i} className="ha-why-bs">
                <span className="ha-why-bs-n">{n}</span>
                <span className="ha-why-bs-l">{l}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  </>
);

export default WhyChooseUs;