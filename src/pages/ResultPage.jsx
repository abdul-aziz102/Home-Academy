import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { motion } from 'framer-motion';

const ResultPage = () => {
  const { state: locationState } = useLocation();
  const state = locationState || (() => {
    const saved = localStorage.getItem('registrationData');
    return saved ? JSON.parse(saved) : null;
  })();

  const getInitials = (name = '') =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Watermark
    doc.setFontSize(60);
    doc.setTextColor(240, 240, 240);
    doc.setFont('helvetica', 'bold');
    doc.text('HOME ACADEMY', 40, 140, { angle: 45 });

    doc.setTextColor(0, 0, 0);
    doc.addImage('/home.png', 'PNG', 15, 10, 30, 30);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 53, 147);
    doc.text('Home Academy', 50, 25);
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text('Student Registration Certificate', 50, 35);

    doc.setDrawColor(40, 53, 147);
    doc.setLineWidth(0.5);
    doc.line(15, 40, 195, 40);

    let y = 60;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('This is to certify that', 105, y, { align: 'center' });
    y += 10;
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 53, 147);
    doc.text(state.name || 'Student', 105, y, { align: 'center' });
    y += 15;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('has successfully registered for our English language program.', 105, y, { align: 'center' });
    y += 20;

    const render = (x, yp, label, value) => {
      doc.setFont('helvetica', 'bold'); doc.text(`${label}:`, x, yp);
      doc.setFont('helvetica', 'normal'); doc.text(value || '—', x + 42, yp);
    };

    doc.setFontSize(14); doc.setFont('helvetica', 'bold');
    doc.text('Personal Information', 30, y); y += 10;
    doc.setFontSize(12);
    [['Email',state.email],['Age',state.age],['Gender',state.gender],['Phone',state.phone]].forEach(([l,v])=>{ render(30,y,l,v); y+=8; });

    y += 5;
    doc.setFontSize(14); doc.setFont('helvetica', 'bold');
    doc.text('Education Information', 30, y); y += 10;
    doc.setFontSize(12);
    [['Education',state.education],['English Goal',state.englishGoal],['Learning Style',state.learningStyle],['Level',state.level]].forEach(([l,v])=>{ render(30,y,l,v); y+=8; });

    doc.setFontSize(10); doc.setTextColor(100,100,100);
    doc.text('Thank you for choosing Home Academy for your English learning journey.', 105, 260, { align:'center' });
    doc.text('homeacademy.lyari@gmail.com | 0332-3769179 / 0332-2449008', 105, 265, { align:'center' });

    doc.save(`HomeAcademy_Certificate_${state.name || 'Student'}.pdf`);
  };

  /* ── NO DATA ── */
  if (!state) return (
    <>
      <style>{`.ha-nd{font-family:'Outfit',sans-serif;background:#060d22;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;}.ha-nd-box{background:rgba(13,20,45,.9);border:1px solid rgba(99,179,237,.12);border-radius:20px;padding:48px 36px;text-align:center;max-width:420px;}.ha-nd-icon{font-size:3rem;margin-bottom:16px;}.ha-nd-h{font-size:1.4rem;font-weight:900;color:#f1f5f9;margin:0 0 8px;letter-spacing:-.02em;}.ha-nd-p{font-size:.85rem;color:rgba(148,163,184,.6);margin:0 0 24px;line-height:1.6;}.ha-nd-btn{display:inline-flex;align-items:center;gap:8px;padding:11px 24px;font-family:'Outfit',sans-serif;font-size:.875rem;font-weight:700;color:white;background:linear-gradient(135deg,#2563eb,#3b82f6);border:none;border-radius:10px;cursor:pointer;text-decoration:none;box-shadow:0 4px 20px rgba(37,99,235,.35);transition:all .28s;}@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&display=swap');`}</style>
      <div className="ha-nd">
        <div className="ha-nd-box">
          <div className="ha-nd-icon">⚠️</div>
          <h2 className="ha-nd-h">No Registration Data Found</h2>
          <p className="ha-nd-p">Please complete the registration form first.</p>
          <Link to="/register" className="ha-nd-btn">Go to Registration →</Link>
        </div>
      </div>
    </>
  );

  const infoRows = [
    { label: 'Age',            value: state.age,          icon: '🎂' },
    { label: 'Gender',         value: state.gender,        icon: '🧑' },
    { label: 'Phone',          value: state.phone,         icon: '📞' },
    { label: 'Education',      value: state.education,     icon: '🎓' },
    { label: 'English Goal',   value: state.englishGoal,   icon: '🎯' },
    { label: 'Learning Style', value: state.learningStyle, icon: '💡' },
  ].filter(r => r.value);

  const fadeUp = { hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.55,ease:[.25,.1,.25,1]}} };
  const stagger = { hidden:{}, show:{transition:{staggerChildren:.09,delayChildren:.1}} };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        .ha-result {
          font-family: 'Outfit', sans-serif;
          background: #060d22;
          min-height: 100vh;
          padding: 100px 24px 60px;
          position: relative; overflow: hidden;
          display: flex; align-items: flex-start; justify-content: center;
        }
        .ha-result::after {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(rgba(99,179,237,.05) 1px, transparent 1px);
          background-size: 32px 32px; pointer-events: none;
        }
        .ha-result-glow {
          position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 380px;
          background: radial-gradient(ellipse, rgba(16,185,129,.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .ha-result-glow2 {
          position: absolute; bottom: -60px; right: 8%;
          width: 500px; height: 300px;
          background: radial-gradient(ellipse, rgba(37,99,235,.07) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── CARD ── */
        .ha-result-card {
          width: 100%; max-width: 900px;
          background: rgba(13,20,45,.95);
          border: 1px solid rgba(99,179,237,.12);
          border-radius: 22px; overflow: hidden;
          position: relative; z-index: 1;
          box-shadow: 0 24px 80px rgba(0,0,0,.55);
        }

        /* rainbow top bar */
        .ha-result-topbar {
          height: 4px;
          background: linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6, #06b6d4);
        }

        /* ── HERO HEADER ── */
        .ha-result-hero {
          padding: 40px 44px 32px;
          display: flex; align-items: center; gap: 28px;
          border-bottom: 1px solid rgba(99,179,237,.08);
          position: relative; overflow: hidden;
        }
        .ha-result-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 100% at 90% 50%, rgba(16,185,129,.06) 0%, transparent 70%);
          pointer-events: none;
        }

        /* avatar */
        .ha-result-avatar-wrap { position: relative; flex-shrink: 0; }
        .ha-result-avatar-ring {
          position: absolute; inset: -6px; border-radius: 50%;
          border: 2px solid rgba(16,185,129,.35);
          animation: ha-ring-spin 8s linear infinite;
        }
        @keyframes ha-ring-spin { to { transform: rotate(360deg); } }
        .ha-result-avatar {
          width: 88px; height: 88px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(16,185,129,.25), rgba(6,13,34,.9));
          border: 2px solid rgba(16,185,129,.4);
          box-shadow: 0 0 28px rgba(16,185,129,.2);
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 1;
          font-size: 1.8rem; font-weight: 900; color: #10b981;
          letter-spacing: -.02em;
        }
        .ha-result-check {
          position: absolute; bottom: 2px; right: 2px; z-index: 2;
          width: 26px; height: 26px; border-radius: 50%;
          background: #10b981; border: 2px solid #060d22;
          display: flex; align-items: center; justify-content: center;
          font-size: .75rem;
          box-shadow: 0 0 10px rgba(16,185,129,.5);
        }

        .ha-result-hero-text { flex: 1; }
        .ha-result-hero-eyebrow {
          font-size: .62rem; font-weight: 700; letter-spacing: .2em;
          text-transform: uppercase; color: #10b981; margin-bottom: 6px;
          display: flex; align-items: center; gap: 8px;
        }
        .ha-result-hero-eyebrow::before {
          content: ''; width: 28px; height: 1px;
          background: linear-gradient(90deg, transparent, #10b981);
        }
        .ha-result-name {
          font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 900;
          letter-spacing: -.03em; color: #f1f5f9; margin: 0 0 4px; line-height: 1.15;
        }
        .ha-result-email { font-size: .82rem; color: rgba(148,163,184,.55); font-weight: 500; }

        /* level + learning style badges */
        .ha-result-badges { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px; }
        .ha-result-badge {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 13px; border-radius: 100px; font-size: .7rem; font-weight: 700;
          border: 1px solid; letter-spacing: .04em;
        }
        .ha-result-badge.level    { color: #60a5fa; border-color: rgba(59,130,246,.3); background: rgba(59,130,246,.1); }
        .ha-result-badge.style    { color: #a78bfa; border-color: rgba(139,92,246,.3); background: rgba(139,92,246,.1); }

        /* home logo */
        .ha-result-logo {
          display: flex; align-items: center; gap: 10px; margin-left: auto; flex-shrink: 0;
        }
        .ha-result-logo img { width: 40px; height: 40px; filter: drop-shadow(0 0 8px rgba(59,130,246,.4)); }
        .ha-result-logo-name { font-size: .9rem; font-weight: 800; color: rgba(148,163,184,.5); letter-spacing: -.01em; }

        /* ── BODY ── */
        .ha-result-body { padding: 32px 44px 36px; }
        .ha-result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 680px) {
          .ha-result-grid { grid-template-columns: 1fr; }
          .ha-result-hero { flex-direction: column; text-align: center; padding: 28px 20px; }
          .ha-result-hero-eyebrow { justify-content: center; }
          .ha-result-badges { justify-content: center; }
          .ha-result-logo { margin-left: 0; }
          .ha-result-body { padding: 24px 20px 28px; }
        }

        .ha-result-info-card {
          background: rgba(6,13,34,.7);
          border: 1px solid rgba(99,179,237,.08);
          border-radius: 12px; padding: 14px 16px;
          display: flex; align-items: center; gap: 12px;
          transition: border-color .3s, box-shadow .3s;
        }
        .ha-result-info-card:hover {
          border-color: rgba(99,179,237,.2);
          box-shadow: 0 4px 20px rgba(0,0,0,.25);
        }
        .ha-result-info-icon {
          width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
          background: rgba(59,130,246,.1); border: 1px solid rgba(59,130,246,.18);
          display: flex; align-items: center; justify-content: center; font-size: .95rem;
        }
        .ha-result-info-lbl { font-size: .62rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(148,163,184,.4); margin-bottom: 2px; }
        .ha-result-info-val { font-size: .85rem; font-weight: 700; color: #e2e8f0; }

        /* ── BUTTONS ── */
        .ha-result-actions { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin-top: 32px; }
        .ha-result-btn-pdf {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 28px;
          font-family: 'Outfit', sans-serif; font-size: .875rem; font-weight: 700;
          color: white; background: linear-gradient(135deg, #059669, #10b981);
          border: none; border-radius: 11px; cursor: pointer;
          box-shadow: 0 4px 20px rgba(16,185,129,.3); transition: all .28s;
          position: relative; overflow: hidden;
        }
        .ha-result-btn-pdf::before { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent); transition:left .5s; }
        .ha-result-btn-pdf:hover::before { left:100%; }
        .ha-result-btn-pdf:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(16,185,129,.4); }

        .ha-result-btn-home {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 28px;
          font-family: 'Outfit', sans-serif; font-size: .875rem; font-weight: 700;
          color: white; background: linear-gradient(135deg, #2563eb, #3b82f6);
          border: none; border-radius: 11px; cursor: pointer; text-decoration: none;
          box-shadow: 0 4px 20px rgba(37,99,235,.3); transition: all .28s;
          position: relative; overflow: hidden;
        }
        .ha-result-btn-home::before { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent); transition:left .5s; }
        .ha-result-btn-home:hover::before { left:100%; }
        .ha-result-btn-home:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(37,99,235,.4); }

        /* ── FOOTER ── */
        .ha-result-footer {
          border-top: 1px solid rgba(99,179,237,.07);
          padding: 16px 44px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: rgba(6,13,34,.5);
        }
        .ha-result-footer-txt { font-size: .72rem; color: rgba(148,163,184,.38); font-weight: 500; text-align: center; line-height: 1.6; }
        .ha-result-footer-txt a { color: #60a5fa; text-decoration: none; }
        .ha-result-footer-txt a:hover { text-decoration: underline; }

        /* success bar */
        .ha-result-success-bar {
          background: rgba(16,185,129,.08); border-bottom: 1px solid rgba(16,185,129,.15);
          padding: 12px 44px;
          display: flex; align-items: center; gap: 10px;
        }
        .ha-result-success-dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px rgba(16,185,129,.7); animation: ha-blink 2s infinite; }
        @keyframes ha-blink { 0%,100%{opacity:1} 50%{opacity:.4} }
        .ha-result-success-txt { font-size: .78rem; font-weight: 700; color: #6ee7b7; letter-spacing: .04em; }

        @media (max-width: 560px) {
          .ha-result-footer { padding: 14px 20px; }
          .ha-result-success-bar { padding: 12px 20px; }
        }
      `}</style>

      <div className="ha-result">
        <div className="ha-result-glow" />
        <div className="ha-result-glow2" />

        <motion.div
          className="ha-result-card"
          initial={{ opacity:0, y:32 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:.55, ease:[.25,.1,.25,1] }}
        >
          <div className="ha-result-topbar" />

          {/* Success bar */}
          <div className="ha-result-success-bar">
            <span className="ha-result-success-dot" />
            <span className="ha-result-success-txt">Registration Successful — Welcome to Home Academy!</span>
          </div>

          {/* Hero header */}
          <div className="ha-result-hero">
            <div className="ha-result-avatar-wrap">
              <div className="ha-result-avatar-ring" />
              <div className="ha-result-avatar">{getInitials(state.name)}</div>
              <div className="ha-result-check">✓</div>
            </div>

            <div className="ha-result-hero-text">
              <p className="ha-result-hero-eyebrow">REGISTRATION CONFIRMED</p>
              <h2 className="ha-result-name">{state.name}</h2>
              <p className="ha-result-email">{state.email}</p>
              <div className="ha-result-badges">
                <span className="ha-result-badge level">📊 {state.level}</span>
                {state.learningStyle && (
                  <span className="ha-result-badge style">💡 {state.learningStyle}</span>
                )}
              </div>
            </div>

            <div className="ha-result-logo">
              <img src="/home.png" alt="Home Academy" onError={e => e.target.style.display='none'} />
              <span className="ha-result-logo-name">Home Academy</span>
            </div>
          </div>

          {/* Info grid */}
          <div className="ha-result-body">
            <motion.div
              className="ha-result-grid"
              variants={stagger} initial="hidden" animate="show"
            >
              {infoRows.map((row, i) => (
                <motion.div key={i} className="ha-result-info-card" variants={fadeUp}>
                  <div className="ha-result-info-icon">{row.icon}</div>
                  <div>
                    <p className="ha-result-info-lbl">{row.label}</p>
                    <p className="ha-result-info-val">{row.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Action buttons */}
            <div className="ha-result-actions">
              <motion.button
                className="ha-result-btn-pdf"
                onClick={generatePDF}
                whileHover={{ y:-2 }} whileTap={{ scale:.97 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
                Download Certificate
              </motion.button>
              <Link to="/">
                <motion.div
                  className="ha-result-btn-home"
                  whileHover={{ y:-2 }} whileTap={{ scale:.97 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  Return to Home
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="ha-result-footer">
            <p className="ha-result-footer-txt">
              Need help? Contact us at&nbsp;
              <a href="mailto:homeacademy.lyari@gmail.com">homeacademy.lyari@gmail.com</a>
              &nbsp;or call&nbsp;
              <a href="tel:+923323769179">0332-3769179</a>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ResultPage;