import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const contactInfo = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    label: "Email",
    value: "homeacademy.lyari@gmail.com",
    color: "#3b82f6",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.1a16 16 0 0 0 8 8l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 24 17v-.08z"/></svg>,
    label: "Phone",
    value: "0332-3769179 / 0332-2449008",
    color: "#10b981",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    label: "Address",
    value: "Abdullah Apartment, New Kumharwara, Near Spicy Corner, Lyari, Karachi",
    color: "#f59e0b",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    label: "Class Hours",
    value: "Mon – Fri: 7:00 PM – 10:00 PM",
    color: "#8b5cf6",
  },
];

const hours = [
  { day: "Monday – Friday", time: "7:00 PM – 10:00 PM", open: true },
  { day: "Saturday",        time: "Closed",              open: false },
  { day: "Sunday",          time: "Closed",              open: false },
];

const socials = [
  {
    name: "Instagram",
    color: "#e1306c",
    href: "https://www.instagram.com/homeacademy99/",
    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/></svg>,
  },
  {
    name: "TikTok",
    color: "#ffffff",
    href: "https://www.tiktok.com/@homeacademy91",
    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
  },
  {
    name: "YouTube",
    color: "#ff0000",
    href: "https://www.youtube.com/@homeacademy7712",
    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"/></svg>,
  },
  {
    name: "Facebook",
    color: "#1877f2",
    href: "https://www.facebook.com/EnglishLanguageProgram4Boys/",
    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/></svg>,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to send');
      }
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 3500);
    } catch (err) {
      alert(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        /* ── PAGE ── */
        .ha-contact {
          font-family: 'Outfit', sans-serif;
          background: #060d22;
          min-height: 100vh;
          padding: 100px 24px;
          position: relative;
          overflow: hidden;
        }
        .ha-contact::before {
          content: '';
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 600px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,.3), transparent);
        }
        .ha-contact::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(99,179,237,.05) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }
        .ha-contact-glow {
          position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 400px;
          background: radial-gradient(ellipse, rgba(37,99,235,.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .ha-contact-inner {
          max-width: 1160px; margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* ── HEADING ── */
        .ha-contact-eyebrow {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; margin-bottom: 14px;
        }
        .ha-c-eline { width: 44px; height: 1px; background: linear-gradient(90deg, transparent, #3b82f6); flex-shrink: 0; }
        .ha-c-eline.r { background: linear-gradient(90deg, #3b82f6, transparent); }
        .ha-c-elabel { font-size: .65rem; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: #3b82f6; }

        .ha-contact-h2 {
          font-size: clamp(2rem, 4vw, 3.1rem); font-weight: 900;
          letter-spacing: -.03em; color: #f1f5f9;
          text-align: center; margin: 0 0 12px; line-height: 1.1;
        }
        .ha-contact-h2 span {
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ha-contact-sub {
          text-align: center; color: rgba(148,163,184,.6);
          font-size: .96rem; margin: 0 auto 56px; max-width: 480px; line-height: 1.6;
        }

        /* ── TWO-COL GRID ── */
        .ha-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 900px) { .ha-contact-grid { grid-template-columns: 1fr; } }

        /* ── LEFT PANEL ── */
        .ha-contact-left { display: flex; flex-direction: column; gap: 16px; }

        /* info card */
        .ha-info-card {
          background: rgba(13,20,45,.9);
          border: 1px solid rgba(99,179,237,.1);
          border-radius: 14px;
          padding: 20px 20px;
          position: relative; overflow: hidden;
          transition: border-color .3s, box-shadow .3s;
        }
        .ha-info-card:hover {
          border-color: rgba(59,130,246,.3);
          box-shadow: 0 0 0 1px rgba(59,130,246,.1), 0 8px 28px rgba(0,0,0,.3);
        }
        .ha-info-card-title {
          font-size: .78rem; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; color: rgba(148,163,184,.5);
          margin: 0 0 14px;
        }

        /* contact info rows */
        .ha-cinfo-row {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(99,179,237,.06);
        }
        .ha-cinfo-row:last-child { border-bottom: none; padding-bottom: 0; }
        .ha-cinfo-icon {
          width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: color-mix(in srgb, var(--c) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--c) 22%, transparent);
          color: var(--c);
        }
        .ha-cinfo-label {
          font-size: .65rem; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; color: rgba(148,163,184,.4); margin-bottom: 2px;
        }
        .ha-cinfo-value {
          font-size: .82rem; font-weight: 600; color: #cbd5e1; line-height: 1.5;
        }

        /* hours */
        .ha-hours-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(99,179,237,.06);
          font-size: .82rem;
        }
        .ha-hours-row:last-child { border-bottom: none; }
        .ha-hours-day { color: rgba(148,163,184,.65); font-weight: 500; }
        .ha-hours-time { font-weight: 700; }
        .ha-hours-time.open { color: #10b981; }
        .ha-hours-time.closed { color: rgba(148,163,184,.35); }

        /* socials */
        .ha-socials { display: flex; gap: 10px; flex-wrap: wrap; }
        .ha-social-btn {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(99,179,237,.12);
          background: rgba(255,255,255,.03);
          color: rgba(148,163,184,.7);
          text-decoration: none;
          transition: all .25s ease;
        }
        .ha-social-btn:hover {
          color: var(--sc);
          border-color: var(--sc);
          background: color-mix(in srgb, var(--sc) 10%, transparent);
          box-shadow: 0 0 14px color-mix(in srgb, var(--sc) 25%, transparent);
          transform: translateY(-2px);
        }

        /* ── RIGHT — FORM PANEL ── */
        .ha-form-card {
          background: rgba(13,20,45,.92);
          border: 1px solid rgba(99,179,237,.1);
          border-radius: 18px;
          padding: 36px 32px;
          position: relative; overflow: hidden;
        }
        /* top accent */
        .ha-form-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #2563eb, #3b82f6, #06b6d4);
        }

        .ha-form-h3 {
          font-size: 1.2rem; font-weight: 800; color: #f1f5f9;
          letter-spacing: -.02em; margin: 0 0 6px;
        }
        .ha-form-sub {
          font-size: .8rem; color: rgba(148,163,184,.5);
          margin: 0 0 28px; line-height: 1.5;
        }

        /* form fields */
        .ha-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 560px) { .ha-form-row { grid-template-columns: 1fr; } }

        .ha-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .ha-field-label {
          font-size: .68rem; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; color: rgba(148,163,184,.5);
          transition: color .25s;
        }
        .ha-field.focused .ha-field-label { color: #60a5fa; }

        .ha-field-input, .ha-field-textarea {
          width: 100%; padding: 12px 14px;
          font-family: 'Outfit', sans-serif; font-size: .875rem; font-weight: 500;
          color: #e2e8f0;
          background: rgba(6,13,34,.7);
          border: 1px solid rgba(99,179,237,.12);
          border-radius: 10px;
          outline: none;
          transition: border-color .25s, box-shadow .25s;
          caret-color: #3b82f6;
        }
        .ha-field-input::placeholder, .ha-field-textarea::placeholder { color: rgba(148,163,184,.3); }
        .ha-field-input:focus, .ha-field-textarea:focus {
          border-color: rgba(59,130,246,.5);
          box-shadow: 0 0 0 3px rgba(59,130,246,.1);
        }
        .ha-field-textarea { resize: none; line-height: 1.6; }

        /* submit button */
        .ha-submit-btn {
          width: 100%; padding: 13px 24px;
          font-family: 'Outfit', sans-serif; font-size: .9rem; font-weight: 700;
          color: white; border: none; border-radius: 10px; cursor: pointer;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          box-shadow: 0 4px 20px rgba(37,99,235,.35);
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all .28s ease; letter-spacing: .02em;
          position: relative; overflow: hidden;
        }
        .ha-submit-btn::before {
          content: '';
          position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
          transition: left .5s;
        }
        .ha-submit-btn:hover::before { left: 100%; }
        .ha-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(37,99,235,.45); }
        .ha-submit-btn:active { transform: translateY(0); }

        /* success message */
        .ha-success {
          display: flex; align-items: center; gap: 12px;
          background: rgba(16,185,129,.1);
          border: 1px solid rgba(16,185,129,.3);
          border-radius: 10px; padding: 14px 16px;
          margin-bottom: 20px;
          color: #6ee7b7; font-size: .875rem; font-weight: 600;
        }
        .ha-success-icon {
          width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
          background: rgba(16,185,129,.2);
          display: flex; align-items: center; justify-content: center;
          color: #10b981;
        }

        /* languages badges */
        .ha-lang-badges { display: flex; gap: 8px; }
        .ha-lang-badge {
          font-size: .72rem; font-weight: 700; letter-spacing: .08em;
          padding: 4px 12px; border-radius: 100px;
          border: 1px solid rgba(59,130,246,.25);
          background: rgba(59,130,246,.08);
          color: #93c5fd;
        }

        @media (max-width: 640px) {
          .ha-contact { padding: 64px 16px; }
          .ha-form-card { padding: 24px 18px; }
        }
      `}</style>

      <section className="ha-contact">
        <div className="ha-contact-glow" />
        <div className="ha-contact-inner">

          {/* Heading */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="ha-contact-eyebrow">
              <span className="ha-c-eline" />
              <span className="ha-c-elabel">REACH OUT</span>
              <span className="ha-c-eline r" />
            </div>
            <h2 className="ha-contact-h2">Get In <span>Touch</span></h2>
            <p className="ha-contact-sub">
              Have questions or want to enroll? Reach out — we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div
            className="ha-contact-grid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >

            {/* ── LEFT ── */}
            <motion.div className="ha-contact-left" variants={fadeUp}>

              {/* Contact info */}
              <div className="ha-info-card">
                <p className="ha-info-card-title">Contact Information</p>
                {contactInfo.map((item, i) => (
                  <div key={i} className="ha-cinfo-row" style={{ "--c": item.color }}>
                    <div className="ha-cinfo-icon">{item.icon}</div>
                    <div>
                      <p className="ha-cinfo-label">{item.label}</p>
                      <p className="ha-cinfo-value">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hours */}
              <div className="ha-info-card">
                <p className="ha-info-card-title">Class Hours</p>
                {hours.map((h, i) => (
                  <div key={i} className="ha-hours-row">
                    <span className="ha-hours-day">{h.day}</span>
                    <span className={`ha-hours-time ${h.open ? "open" : "closed"}`}>{h.time}</span>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="ha-info-card">
                <p className="ha-info-card-title">Follow Us</p>
                <div className="ha-socials">
                  {socials.map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="ha-social-btn" style={{ "--sc": s.color }}
                      title={s.name}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="ha-info-card">
                <p className="ha-info-card-title">Languages We Teach In</p>
                <div className="ha-lang-badges">
                  <span className="ha-lang-badge">English</span>
                  <span className="ha-lang-badge">Urdu</span>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT — FORM ── */}
            <motion.div variants={fadeUp}>
              <div className="ha-form-card">
                <h3 className="ha-form-h3">Send Us a Message</h3>
                <p className="ha-form-sub">Fill out the form below and we'll respond within 24 hours.</p>

                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      className="ha-success"
                      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                    >
                      <div className="ha-success-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <span>Message sent! We'll get back to you soon.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit}>
                  {/* Name + Email row */}
                  <div className="ha-form-row">
                    <div className={`ha-field ${focused === 'name' ? 'focused' : ''}`}>
                      <label className="ha-field-label" htmlFor="name">Your Name</label>
                      <input
                        className="ha-field-input" id="name" name="name" type="text"
                        placeholder="Ali Khan" value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        required
                      />
                    </div>
                    <div className={`ha-field ${focused === 'email' ? 'focused' : ''}`}>
                      <label className="ha-field-label" htmlFor="email">Email Address</label>
                      <input
                        className="ha-field-input" id="email" name="email" type="email"
                        placeholder="ali@example.com" value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className={`ha-field ${focused === 'phone' ? 'focused' : ''}`}>
                    <label className="ha-field-label" htmlFor="phone">Phone Number</label>
                    <input
                      className="ha-field-input" id="phone" name="phone" type="tel"
                      placeholder="0300-1234567" value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className={`ha-field ${focused === 'message' ? 'focused' : ''}`}>
                    <label className="ha-field-label" htmlFor="message">Your Message</label>
                    <textarea
                      className="ha-field-textarea" id="message" name="message"
                      rows="6" placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="ha-submit-btn"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: .97 }}
                    disabled={sending}
                    style={{ opacity: sending ? 0.7 : 1 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    {sending ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;