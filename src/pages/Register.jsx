import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import studentApi from '../utils/studentApi';

const fields = [
  { name: 'name',          type: 'text',   label: 'Full Name',               placeholder: 'Ali Khan',              span: true,  icon: '👤' },
  { name: 'email',         type: 'email',  label: 'Email Address',           placeholder: 'ali@example.com',       span: true,  icon: '✉️' },
  { name: 'password',      type: 'password', label: 'Password (min 8 chars)', placeholder: 'Create a password',   span: true,  icon: '🔒' },
  { name: 'phone',         type: 'tel',    label: 'Phone Number',            placeholder: '0300-1234567',          span: false, icon: '📞' },
  { name: 'age',           type: 'number', label: 'Age',                     placeholder: '18',                    span: false, icon: '🎂' },
  { name: 'education',     type: 'text',   label: 'Education Level',         placeholder: 'e.g. Matric, Graduate', span: false, icon: '🎓' },
  { name: 'englishGoal',   type: 'text',   label: 'English Learning Goal',   placeholder: 'e.g. IELTS, Job, Daily',span: false, icon: '🎯' },
  { name: 'learningStyle', type: 'text',   label: 'Preferred Learning Style',placeholder: 'e.g. Visual, Practice', span: true,  icon: '💡' },
];

const levelOptions = ['Pre Beginning','Beginning','Level One','Level Two','Level Three','Level Four','Level Five','Advance'];

const steps = [
  { label: 'Personal', icon: '👤' },
  { label: 'Academic', icon: '🎓' },
  { label: 'Confirm',  icon: '✅' },
];

const Register = () => {
  const [formData, setFormData] = useState({
    name:'', email:'', password:'', age:'', gender:'', phone:'',
    education:'', englishGoal:'', learningStyle:'', level:'Pre Beginning',
  });
  const [focused,   setFocused]   = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitted(true);
    try {
      const data = await studentApi.signup(formData);
      localStorage.setItem('studentToken', data.token);
      localStorage.setItem('studentData', JSON.stringify(data.student));
      localStorage.setItem('registrationData', JSON.stringify(formData));
      localStorage.setItem('isRegistered', 'true');
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('userRegistered'));
      setTimeout(() => navigate('/dashboard'), 1400);
    } catch (err) {
      setError(err.message || 'Registration failed');
      setSubmitted(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        /* ── PAGE ── */
        .ha-reg {
          font-family: 'Outfit', sans-serif;
          background: #060d22;
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 100px 24px 60px;
          position: relative; overflow: hidden;
        }
        .ha-reg::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(99,179,237,.05) 1px, transparent 1px);
          background-size: 32px 32px; pointer-events: none;
        }
        .ha-reg-glow {
          position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 400px;
          background: radial-gradient(ellipse, rgba(37,99,235,.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .ha-reg-glow2 {
          position: absolute; bottom: -80px; right: 10%;
          width: 500px; height: 300px;
          background: radial-gradient(ellipse, rgba(139,92,246,.07) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── CARD ── */
        .ha-reg-card {
          width: 100%; max-width: 780px;
          background: rgba(13,20,45,.95);
          border: 1px solid rgba(99,179,237,.12);
          border-radius: 22px;
          overflow: hidden;
          position: relative; z-index: 1;
          box-shadow: 0 24px 80px rgba(0,0,0,.6);
        }

        /* top gradient bar */
        .ha-reg-topbar {
          height: 4px;
          background: linear-gradient(90deg, #2563eb, #3b82f6, #06b6d4, #8b5cf6);
        }

        /* ── HEADER ── */
        .ha-reg-header {
          padding: 36px 40px 28px;
          border-bottom: 1px solid rgba(99,179,237,.08);
        }
        .ha-reg-eyebrow {
          display: flex; align-items: center; gap: 12px; margin-bottom: 12px;
        }
        .ha-reg-eline { width: 40px; height: 1px; background: linear-gradient(90deg, transparent, #3b82f6); }
        .ha-reg-elabel { font-size: .62rem; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: #3b82f6; }
        .ha-reg-h2 {
          font-size: clamp(1.5rem, 3vw, 2.1rem); font-weight: 900;
          letter-spacing: -.03em; color: #f1f5f9; margin: 0 0 6px; line-height: 1.15;
        }
        .ha-reg-h2 span {
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ha-reg-sub { font-size: .83rem; color: rgba(148,163,184,.55); margin: 0; line-height: 1.6; }

        /* ── STEP INDICATOR ── */
        .ha-reg-steps {
          display: flex; align-items: center; gap: 0;
          padding: 20px 40px; border-bottom: 1px solid rgba(99,179,237,.07);
        }
        .ha-reg-step { display: flex; align-items: center; gap: 8px; }
        .ha-reg-step-dot {
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: .8rem; font-weight: 700; flex-shrink: 0;
          border: 1px solid rgba(99,179,237,.2);
          background: rgba(99,179,237,.05);
          color: rgba(148,163,184,.5);
          transition: all .3s;
        }
        .ha-reg-step.done .ha-reg-step-dot {
          background: rgba(16,185,129,.15); border-color: rgba(16,185,129,.4); color: #10b981;
        }
        .ha-reg-step.active .ha-reg-step-dot {
          background: rgba(59,130,246,.15); border-color: rgba(59,130,246,.5); color: #60a5fa;
          box-shadow: 0 0 12px rgba(59,130,246,.25);
        }
        .ha-reg-step-label { font-size: .72rem; font-weight: 600; color: rgba(148,163,184,.45); transition: color .3s; }
        .ha-reg-step.active .ha-reg-step-label { color: #93c5fd; }
        .ha-reg-step.done  .ha-reg-step-label { color: #6ee7b7; }
        .ha-reg-step-line { flex: 1; height: 1px; background: rgba(99,179,237,.12); margin: 0 12px; }

        /* ── FORM ── */
        .ha-reg-body { padding: 32px 40px 36px; }
        .ha-reg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        @media (max-width: 580px) {
          .ha-reg-grid { grid-template-columns: 1fr; }
          .ha-reg-header, .ha-reg-steps, .ha-reg-body { padding-left: 20px; padding-right: 20px; }
        }
        .ha-reg-span { grid-column: 1 / -1; }

        /* field */
        .ha-reg-field { display: flex; flex-direction: column; gap: 6px; }
        .ha-reg-label {
          font-size: .66rem; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; color: rgba(148,163,184,.48);
          transition: color .25s;
          display: flex; align-items: center; gap: 6px;
        }
        .ha-reg-field.focused .ha-reg-label { color: #60a5fa; }

        .ha-reg-input-wrap { position: relative; }
        .ha-reg-field-icon {
          position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
          font-size: .9rem; pointer-events: none;
          opacity: .5; transition: opacity .25s;
        }
        .ha-reg-field.focused .ha-reg-field-icon { opacity: .9; }

        .ha-reg-input, .ha-reg-select {
          width: 100%; padding: 11px 14px 11px 38px;
          font-family: 'Outfit', sans-serif; font-size: .875rem; font-weight: 500;
          color: #e2e8f0; background: rgba(6,13,34,.75);
          border: 1px solid rgba(99,179,237,.12); border-radius: 10px;
          outline: none; transition: border-color .25s, box-shadow .25s;
          caret-color: #3b82f6; appearance: none;
        }
        .ha-reg-input::placeholder { color: rgba(148,163,184,.28); }
        .ha-reg-input:focus, .ha-reg-select:focus {
          border-color: rgba(59,130,246,.5);
          box-shadow: 0 0 0 3px rgba(59,130,246,.1);
        }
        .ha-reg-select option { background: #0f172a; color: #e2e8f0; }

        /* select arrow */
        .ha-reg-select-wrap { position: relative; }
        .ha-reg-select-wrap::after {
          content: '▾'; position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
          color: rgba(148,163,184,.4); font-size: .8rem; pointer-events: none;
        }
        .ha-reg-select-wrap .ha-reg-select { padding-right: 32px; }

        /* section divider */
        .ha-reg-divider {
          grid-column: 1 / -1;
          display: flex; align-items: center; gap: 12px;
          font-size: .62rem; font-weight: 700; letter-spacing: .15em;
          text-transform: uppercase; color: rgba(148,163,184,.3);
          margin: 4px 0;
        }
        .ha-reg-divider::before, .ha-reg-divider::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,179,237,.1));
        }
        .ha-reg-divider::after { background: linear-gradient(90deg, rgba(99,179,237,.1), transparent); }

        /* ── BUTTONS ── */
        .ha-reg-actions {
          grid-column: 1 / -1;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; margin-top: 6px;
        }
        .ha-reg-submit {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 12px 28px;
          font-family: 'Outfit', sans-serif; font-size: .875rem; font-weight: 700;
          color: white; background: linear-gradient(135deg, #2563eb, #3b82f6);
          border: none; border-radius: 10px; cursor: pointer;
          box-shadow: 0 4px 20px rgba(37,99,235,.35);
          transition: all .28s ease; letter-spacing: .02em;
          position: relative; overflow: hidden;
        }
        .ha-reg-submit::before {
          content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
          transition: left .5s;
        }
        .ha-reg-submit:hover::before { left: 100%; }
        .ha-reg-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(37,99,235,.45); }
        .ha-reg-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }

        .ha-reg-cancel {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 12px 20px;
          font-family: 'Outfit', sans-serif; font-size: .875rem; font-weight: 700;
          color: rgba(148,163,184,.7); background: transparent;
          border: 1px solid rgba(99,179,237,.15); border-radius: 10px;
          cursor: pointer; text-decoration: none; transition: all .28s;
        }
        .ha-reg-cancel:hover { border-color: rgba(239,68,68,.3); color: #fca5a5; background: rgba(239,68,68,.07); }

        /* ── SUCCESS OVERLAY ── */
        .ha-reg-success {
          position: absolute; inset: 0; z-index: 10;
          background: rgba(6,13,34,.92); backdrop-filter: blur(16px);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 16px; border-radius: 22px;
        }
        .ha-reg-success-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: rgba(16,185,129,.15); border: 2px solid rgba(16,185,129,.4);
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem;
          box-shadow: 0 0 32px rgba(16,185,129,.25);
        }
        .ha-reg-success-txt {
          font-size: 1.1rem; font-weight: 800; color: #f1f5f9;
          letter-spacing: -.02em;
        }
        .ha-reg-success-sub { font-size: .82rem; color: rgba(148,163,184,.6); }

        /* info note */
        .ha-reg-note {
          grid-column: 1 / -1;
          display: flex; align-items: flex-start; gap: 10px;
          padding: 12px 14px; border-radius: 10px;
          background: rgba(59,130,246,.06);
          border: 1px solid rgba(59,130,246,.14);
          font-size: .76rem; color: rgba(148,163,184,.6); line-height: 1.55;
        }
        .ha-reg-note-icon { color: #60a5fa; font-size: .9rem; flex-shrink: 0; margin-top: 1px; }
      `}</style>

      <div className="ha-reg">
        <div className="ha-reg-glow" />
        <div className="ha-reg-glow2" />

        <motion.div
          className="ha-reg-card"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="ha-reg-topbar" />

          {/* Success overlay */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                className="ha-reg-success"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="ha-reg-success-icon"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
                >
                  ✅
                </motion.div>
                <p className="ha-reg-success-txt">Registration Successful!</p>
                <p className="ha-reg-success-sub">Redirecting to your result...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="ha-reg-header">
            <div className="ha-reg-eyebrow">
              <span className="ha-reg-eline" />
              <span className="ha-reg-elabel">JOIN HOME ACADEMY</span>
            </div>
            <h2 className="ha-reg-h2">
              Register for <span>English Learning</span>
            </h2>
            <p className="ha-reg-sub">Fill in your details below — we'll place you in the right level and get you started.</p>
          </div>

          {/* Steps */}
          <div className="ha-reg-steps">
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <div className={`ha-reg-step ${i === 0 ? 'active' : ''}`}>
                  <div className="ha-reg-step-dot">{s.icon}</div>
                  <span className="ha-reg-step-label">{s.label}</span>
                </div>
                {i < steps.length - 1 && <div className="ha-reg-step-line" />}
              </React.Fragment>
            ))}
          </div>

          {/* Form */}
          <div className="ha-reg-body">
            <form onSubmit={handleSubmit}>
              <div className="ha-reg-grid">

                {/* Personal info fields */}
                {fields.map(({ name, type, label, placeholder, span, icon }) => (
                  <div
                    key={name}
                    className={`ha-reg-field${focused === name ? " focused" : ""}${span ? " ha-reg-span" : ""}`}
                  >
                    <label className="ha-reg-label">{label}</label>
                    <div className="ha-reg-input-wrap">
                      <span className="ha-reg-field-icon">{icon}</span>
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required
                        className="ha-reg-input"
                        onFocus={() => setFocused(name)}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  </div>
                ))}

                <div className="ha-reg-divider">Course Preferences</div>

                {/* Gender */}
                <div className={`ha-reg-field${focused === 'gender' ? " focused" : ""}`}>
                  <label className="ha-reg-label">Gender</label>
                  <div className="ha-reg-select-wrap">
                    <span className="ha-reg-field-icon">🧑</span>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="ha-reg-select"
                      onFocus={() => setFocused('gender')}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                {/* Level */}
                <div className={`ha-reg-field${focused === 'level' ? " focused" : ""}`}>
                  <label className="ha-reg-label">Current English Level</label>
                  <div className="ha-reg-select-wrap">
                    <span className="ha-reg-field-icon">📊</span>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      required
                      className="ha-reg-select"
                      onFocus={() => setFocused('level')}
                      onBlur={() => setFocused(null)}
                    >
                      {levelOptions.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="ha-reg-span" style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.25)', borderRadius: 10, padding: '10px 14px', fontSize: '.8rem', color: '#fca5a5' }}>
                    {error}
                  </div>
                )}

                {/* Info note */}
                <div className="ha-reg-note">
                  <span className="ha-reg-note-icon">ℹ️</span>
                  <span>Your information is secure and will only be used for course placement. We'll reach out within 24 hours to confirm your enrollment.</span>
                </div>

                {/* Actions */}
                <div className="ha-reg-actions">
                  <Link to="/" className="ha-reg-cancel">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                    Cancel
                  </Link>
                  <motion.button
                    type="submit"
                    className="ha-reg-submit"
                    disabled={submitted}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: .97 }}
                  >
                    {submitted ? (
                      <>Processing...</>
                    ) : (
                      <>
                        Complete Registration
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Login link */}
                <div className="ha-reg-span" style={{ textAlign: 'center', fontSize: '.82rem', color: 'rgba(148,163,184,.5)' }}>
                  Already have an account? <Link to="/student-login" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>Login here</Link>
                </div>

              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;