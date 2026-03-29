import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const navLinks = [
  { label: "Home",    to: "/" },
  { label: "About",   to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Contact", to: "/contact" },
];

const courses = [
  "Pre-Beginner",
  "Beginner",
  "Elementary (Level 1)",
  "Pre-Intermediate (Level 2)",
  "Intermediate (Level 3)",
  "Upper-Intermediate (Level 4)",
];

const socials = [
  {
    name: "Instagram",
    color: "#e1306c",
    href: "https://www.instagram.com/homeacademy99/",
    icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/></svg>,
  },
  {
    name: "TikTok",
    color: "#69c9d0",
    href: "https://www.tiktok.com/@homeacademy91",
    icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
  },
  {
    name: "YouTube",
    color: "#ff0000",
    href: "https://www.youtube.com/@homeacademy7712",
    icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"/></svg>,
  },
  {
    name: "Facebook",
    color: "#1877f2",
    href: "https://www.facebook.com/EnglishLanguageProgram4Boys/",
    icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/></svg>,
  },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        .ha-footer {
          font-family: 'Outfit', sans-serif;
          background: #03081a;
          position: relative;
          overflow: hidden;
        }

        /* top glow line */
        .ha-footer::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,.5), rgba(139,92,246,.4), transparent);
        }

        /* dot grid */
        .ha-footer::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(99,179,237,.04) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        /* ambient glow */
        .ha-footer-glow {
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 800px; height: 300px;
          background: radial-gradient(ellipse, rgba(37,99,235,.06) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── MAIN BODY ── */
        .ha-footer-body {
          max-width: 1280px; margin: 0 auto;
          padding: 72px 32px 40px;
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.4fr;
          gap: 48px;
        }
        @media (max-width: 1024px) { .ha-footer-body { grid-template-columns: 1fr 1fr; gap: 36px; } }
        @media (max-width: 560px)  { .ha-footer-body { grid-template-columns: 1fr; padding: 48px 20px 32px; } }

        /* ── COL 1 — BRAND ── */
        .ha-footer-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; margin-bottom: 16px;
        }
        .ha-footer-logo img {
          width: 38px; height: 38px;
          filter: drop-shadow(0 0 8px rgba(59,130,246,.5));
        }
        .ha-footer-logo-text {
          display: flex; flex-direction: column; line-height: 1.1;
        }
        .ha-footer-logo-name {
          font-size: 1.1rem; font-weight: 800; letter-spacing: -.02em;
          background: linear-gradient(135deg, #e2e8f0, #93c5fd);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ha-footer-logo-sub {
          font-size: .58rem; font-weight: 700; letter-spacing: .15em;
          text-transform: uppercase; color: #3b82f6;
        }
        .ha-footer-desc {
          font-size: .82rem; color: rgba(148,163,184,.55);
          line-height: 1.75; margin-bottom: 22px; max-width: 280px;
        }

        /* socials */
        .ha-footer-socials { display: flex; gap: 9px; }
        .ha-footer-social {
          width: 36px; height: 36px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(99,179,237,.1);
          background: rgba(255,255,255,.03);
          color: rgba(148,163,184,.55);
          text-decoration: none;
          transition: all .25s ease;
        }
        .ha-footer-social:hover {
          color: var(--sc);
          border-color: var(--sc);
          background: color-mix(in srgb, var(--sc) 10%, transparent);
          box-shadow: 0 0 12px color-mix(in srgb, var(--sc) 22%, transparent);
          transform: translateY(-2px);
        }

        /* ── COL HEADING ── */
        .ha-footer-col-title {
          font-size: .7rem; font-weight: 700; letter-spacing: .18em;
          text-transform: uppercase; color: #3b82f6;
          margin: 0 0 20px;
          display: flex; align-items: center; gap: 8px;
        }
        .ha-footer-col-title::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(59,130,246,.3), transparent);
        }

        /* ── COL 2 — NAV LINKS ── */
        .ha-footer-links { display: flex; flex-direction: column; gap: 10px; }
        .ha-footer-link {
          display: flex; align-items: center; gap: 8px;
          font-size: .83rem; font-weight: 600;
          color: rgba(148,163,184,.55);
          text-decoration: none;
          transition: color .22s, gap .22s;
        }
        .ha-footer-link::before {
          content: '›';
          color: #3b82f6; font-size: 1rem; line-height: 1;
          opacity: 0; transition: opacity .22s;
        }
        .ha-footer-link:hover { color: #e2e8f0; gap: 12px; }
        .ha-footer-link:hover::before { opacity: 1; }

        /* ── COL 3 — COURSES ── */

        /* ── COL 4 — CONTACT + NEWSLETTER ── */
        .ha-footer-contact-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
        .ha-footer-contact-item {
          display: flex; align-items: flex-start; gap: 10px;
        }
        .ha-footer-contact-icon {
          width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(59,130,246,.1);
          border: 1px solid rgba(59,130,246,.2);
          color: #60a5fa;
        }
        .ha-footer-contact-txt {
          font-size: .79rem; color: rgba(148,163,184,.58);
          line-height: 1.55; font-weight: 500;
        }
        .ha-footer-contact-txt a {
          color: rgba(148,163,184,.58); text-decoration: none;
          transition: color .2s;
        }
        .ha-footer-contact-txt a:hover { color: #93c5fd; }

        /* newsletter */
        .ha-footer-nl-label {
          font-size: .75rem; font-weight: 600; color: rgba(148,163,184,.5);
          margin-bottom: 10px;
        }
        .ha-footer-nl-form {
          display: flex; gap: 8px;
        }
        .ha-footer-nl-input {
          flex: 1; padding: 9px 12px;
          font-family: 'Outfit', sans-serif; font-size: .8rem; font-weight: 500;
          color: #e2e8f0; background: rgba(6,13,34,.8);
          border: 1px solid rgba(99,179,237,.12); border-radius: 8px; outline: none;
          transition: border-color .25s, box-shadow .25s;
          caret-color: #3b82f6;
        }
        .ha-footer-nl-input::placeholder { color: rgba(148,163,184,.3); }
        .ha-footer-nl-input:focus {
          border-color: rgba(59,130,246,.4);
          box-shadow: 0 0 0 3px rgba(59,130,246,.08);
        }
        .ha-footer-nl-btn {
          padding: 9px 14px;
          font-family: 'Outfit', sans-serif; font-size: .78rem; font-weight: 700;
          color: white; background: linear-gradient(135deg, #2563eb, #3b82f6);
          border: none; border-radius: 8px; cursor: pointer;
          box-shadow: 0 4px 14px rgba(37,99,235,.3);
          transition: all .25s ease; white-space: nowrap;
        }
        .ha-footer-nl-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(37,99,235,.4);
        }
        .ha-footer-nl-success {
          font-size: .76rem; font-weight: 600;
          color: #10b981; margin-top: 8px;
          display: flex; align-items: center; gap: 6px;
        }

        /* ── BOTTOM BAR ── */
        .ha-footer-bottom {
          border-top: 1px solid rgba(255,255,255,.05);
          position: relative; z-index: 1;
        }
        .ha-footer-bottom-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 20px 32px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
        .ha-footer-copy {
          font-size: .75rem; color: rgba(148,163,184,.35); font-weight: 500;
        }
        .ha-footer-copy span { color: #3b82f6; }

        .ha-footer-bottom-links { display: flex; gap: 20px; }
        .ha-footer-bottom-link {
          font-size: .73rem; font-weight: 600;
          color: rgba(148,163,184,.35); text-decoration: none;
          transition: color .2s;
        }
        .ha-footer-bottom-link:hover { color: #93c5fd; }

        /* made with */
        .ha-footer-made {
          font-size: .7rem; color: rgba(148,163,184,.25);
          display: flex; align-items: center; gap: 4px;
        }
        .ha-footer-made span { color: #ec4899; }

        @media (max-width: 640px) {
          .ha-footer-bottom-inner { flex-direction: column; align-items: center; text-align: center; }
          .ha-footer-bottom-links { flex-wrap: wrap; justify-content: center; }
        }
      `}</style>

      <footer className="ha-footer">
        <div className="ha-footer-glow" />

        {/* ── MAIN BODY ── */}
        <div className="ha-footer-body">

          {/* COL 1 — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <Link to="/" className="ha-footer-logo">
              <motion.img
                src="/homeicon.png" alt="Logo"
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 6 }}
              />
              <div className="ha-footer-logo-text">
                <span className="ha-footer-logo-name">Home Academy</span>
                <span className="ha-footer-logo-sub">English Coaching</span>
              </div>
            </Link>
            <p className="ha-footer-desc">
              Premier English language center providing quality education since 1999.
              We help students achieve fluency and confidence in English communication.
            </p>
            <div className="ha-footer-socials">
              {socials.map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="ha-footer-social" style={{ "--sc": s.color }}
                  title={s.name} whileHover={{ y: -2 }} whileTap={{ scale: .95 }}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* COL 2 — Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="ha-footer-col-title">Quick Links</h4>
            <div className="ha-footer-links">
              {navLinks.map((l, i) => (
                <Link key={i} to={l.to} className="ha-footer-link">{l.label}</Link>
              ))}
              <Link to="/register" className="ha-footer-link">Enroll Now</Link>
            </div>
          </motion.div>

          {/* COL 3 — Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.18 }}
          >
            <h4 className="ha-footer-col-title">Our Courses</h4>
            <div className="ha-footer-links">
              {courses.map((c, i) => (
                <Link key={i} to="/courses" className="ha-footer-link">{c}</Link>
              ))}
            </div>
          </motion.div>

          {/* COL 4 — Contact + Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.26 }}
          >
            <h4 className="ha-footer-col-title">Contact Us</h4>
            <div className="ha-footer-contact-list">
              <div className="ha-footer-contact-item">
                <div className="ha-footer-contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <p className="ha-footer-contact-txt">Abdullah Apartment, New Kumharwara, Near Spicy Corner, Lyari, Karachi</p>
              </div>
              <div className="ha-footer-contact-item">
                <div className="ha-footer-contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.1a16 16 0 0 0 8 8l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 24 17v-.08z"/></svg>
                </div>
                <p className="ha-footer-contact-txt">
                  <a href="tel:+923323769179">0332-3769179</a> /&nbsp;
                  <a href="tel:+923322449008">0332-2449008</a>
                </p>
              </div>
              <div className="ha-footer-contact-item">
                <div className="ha-footer-contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <p className="ha-footer-contact-txt">
                  <a href="mailto:homeacademy.lyari@gmail.com">homeacademy.lyari@gmail.com</a>
                </p>
              </div>
            </div>

            {/* Newsletter */}
            <h4 className="ha-footer-col-title" style={{ marginTop: 8 }}>Newsletter</h4>
            <p className="ha-footer-nl-label">Get updates on new courses and offers</p>
            <form className="ha-footer-nl-form" onSubmit={handleSubscribe}>
              <input
                className="ha-footer-nl-input"
                type="email" placeholder="Your email"
                value={email} onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="ha-footer-nl-btn">Subscribe</button>
            </form>
            {subscribed && (
              <motion.p
                className="ha-footer-nl-success"
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                Subscribed successfully!
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="ha-footer-bottom">
          <div className="ha-footer-bottom-inner">
            <p className="ha-footer-copy">
              &copy; {new Date().getFullYear()} <span>Home Academy</span>. All rights reserved.
            </p>
            <div className="ha-footer-bottom-links">
              <Link to="/privacy"  className="ha-footer-bottom-link">Privacy Policy</Link>
              <Link to="/terms"    className="ha-footer-bottom-link">Terms of Service</Link>
              <Link to="/sitemap"  className="ha-footer-bottom-link">Sitemap</Link>
            </div>
            <p className="ha-footer-made">
              Made with <span>♥</span> in Karachi
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;