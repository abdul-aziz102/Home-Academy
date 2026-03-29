import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTABanner = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

      .ha-cta { font-family:'Outfit',sans-serif; background:#060d22; padding:80px 24px; position:relative; overflow:hidden; }
      .ha-cta::after { content:''; position:absolute;inset:0; background-image:radial-gradient(rgba(99,179,237,.05) 1px,transparent 1px); background-size:32px 32px; pointer-events:none; }

      .ha-cta-box {
        max-width:1100px; margin:0 auto; position:relative; z-index:1;
        background:linear-gradient(135deg,rgba(37,99,235,.15),rgba(139,92,246,.1),rgba(6,182,212,.08));
        border:1px solid rgba(59,130,246,.25); border-radius:28px; padding:64px 56px;
        overflow:hidden; text-align:center;
        box-shadow:0 0 0 1px rgba(59,130,246,.1),0 40px 100px rgba(0,0,0,.5);
      }
      .ha-cta-box::before { content:''; position:absolute; top:0;left:0;right:0;height:3px; background:linear-gradient(90deg,#3b82f6,#8b5cf6,#06b6d4,#3b82f6); background-size:200%; animation:ha-cta-s 4s linear infinite; }
      @keyframes ha-cta-s { 0%{background-position:0%} 100%{background-position:200%} }

      .ha-cta-b1 { position:absolute; top:-80px;left:-80px; width:320px;height:320px; background:radial-gradient(circle,rgba(37,99,235,.15),transparent 70%); pointer-events:none; }
      .ha-cta-b2 { position:absolute; bottom:-80px;right:-80px; width:320px;height:320px; background:radial-gradient(circle,rgba(139,92,246,.12),transparent 70%); pointer-events:none; }

      .ha-cta-eye { font-size:.65rem; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:#60a5fa; margin-bottom:20px; display:block; }
      .ha-cta-h2 { font-size:clamp(2rem,4vw,3.4rem); font-weight:900; letter-spacing:-.03em; color:#f1f5f9; margin:0 0 16px; line-height:1.1; }
      .ha-cta-h2 span { background:linear-gradient(135deg,#60a5fa,#818cf8,#06b6d4); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      .ha-cta-p { font-size:1.05rem; color:rgba(148,163,184,.7); margin:0 auto 40px; max-width:520px; line-height:1.7; }

      .ha-cta-btns { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:44px; }

      .ha-cta-p1 {
        display:inline-flex; align-items:center; gap:8px; padding:14px 32px;
        font-family:'Outfit',sans-serif; font-size:.95rem; font-weight:700; color:#fff; text-decoration:none;
        background:linear-gradient(135deg,#2563eb,#3b82f6); border:none; border-radius:12px; cursor:pointer;
        box-shadow:0 4px 24px rgba(37,99,235,.45); transition:all .3s ease; position:relative; overflow:hidden; letter-spacing:.02em;
      }
      .ha-cta-p1::before { content:''; position:absolute; top:0;left:-100%;width:100%;height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent); transition:left .5s; }
      .ha-cta-p1:hover::before { left:100%; }
      .ha-cta-p1:hover { transform:translateY(-3px); box-shadow:0 8px 36px rgba(37,99,235,.55); }

      .ha-cta-p2 {
        display:inline-flex; align-items:center; gap:8px; padding:14px 32px;
        font-family:'Outfit',sans-serif; font-size:.95rem; font-weight:700; color:rgba(148,163,184,.9); text-decoration:none;
        background:rgba(255,255,255,.04); border:1px solid rgba(99,179,237,.2); border-radius:12px; cursor:pointer;
        transition:all .3s ease; letter-spacing:.02em;
      }
      .ha-cta-p2:hover { background:rgba(255,255,255,.08); border-color:rgba(99,179,237,.4); color:#e2e8f0; transform:translateY(-2px); }

      .ha-cta-trust { display:flex; gap:28px; justify-content:center; flex-wrap:wrap; }
      .ha-cta-ti { display:flex; align-items:center; gap:7px; font-size:.78rem; color:rgba(148,163,184,.5); font-weight:600; }
      .ha-cta-td { width:6px;height:6px; border-radius:50%; background:#10b981; box-shadow:0 0 8px rgba(16,185,129,.6); flex-shrink:0; }

      @media(max-width:640px){ .ha-cta-box{padding:40px 20px;} .ha-cta-btns{flex-direction:column;align-items:center;} }
    `}</style>

    <section className="ha-cta">
      <div className="ha-cta-box">
        <div className="ha-cta-b1" /><div className="ha-cta-b2" />

        <motion.span className="ha-cta-eye" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5}}>
          START YOUR JOURNEY TODAY
        </motion.span>

        <motion.h2 className="ha-cta-h2" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.1,duration:.55}}>
          Speak English With <span>Confidence</span>
        </motion.h2>

        <motion.p className="ha-cta-p" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.2,duration:.55}}>
          Enroll in Home Academy today aur 500+ students ki tarah apni English transform karo. Pehli class bilkul free — koi risk nahi!
        </motion.p>

        <motion.div className="ha-cta-btns" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.3,duration:.55}}>
          <Link to="/register" className="ha-cta-p1">
            Enroll Now — Free First Class
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link to="/courses" className="ha-cta-p2">
            View All Courses
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </motion.div>

        <motion.div className="ha-cta-trust" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:.45,duration:.55}}>
          {["No hidden fees","Certified teachers","Small batches","Flexible timing","Free assessment test"].map((t,i)=>(
            <span key={i} className="ha-cta-ti"><span className="ha-cta-td"/>{t}</span>
          ))}
        </motion.div>
      </div>
    </section>
  </>
);

export default CTABanner;