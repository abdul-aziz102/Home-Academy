import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import studentApi from '../utils/studentApi';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await studentApi.login(email, password);
      localStorage.setItem('studentToken', data.token);
      localStorage.setItem('studentData', JSON.stringify(data.student));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        .ha-login {
          font-family: 'Outfit', sans-serif;
          background: #060d22;
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 100px 24px 60px;
          position: relative; overflow: hidden;
        }
        .ha-login::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(99,179,237,.05) 1px, transparent 1px);
          background-size: 32px 32px; pointer-events: none;
        }
        .ha-login-glow {
          position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 400px;
          background: radial-gradient(ellipse, rgba(37,99,235,.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .ha-login-card {
          width: 100%; max-width: 460px;
          background: rgba(13,20,45,.95);
          border: 1px solid rgba(99,179,237,.12);
          border-radius: 22px;
          overflow: hidden;
          position: relative; z-index: 1;
          box-shadow: 0 24px 80px rgba(0,0,0,.6);
        }
        .ha-login-topbar {
          height: 4px;
          background: linear-gradient(90deg, #2563eb, #3b82f6, #06b6d4, #8b5cf6);
        }
        .ha-login-body { padding: 40px; }
        .ha-login-h2 {
          font-size: 1.8rem; font-weight: 900;
          color: #f1f5f9; margin: 0 0 6px; letter-spacing: -.03em;
        }
        .ha-login-h2 span {
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ha-login-sub { font-size: .85rem; color: rgba(148,163,184,.55); margin: 0 0 32px; }
        .ha-login-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
        .ha-login-label {
          font-size: .66rem; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; color: rgba(148,163,184,.48);
        }
        .ha-login-input {
          width: 100%; padding: 12px 14px;
          font-family: 'Outfit', sans-serif; font-size: .875rem; font-weight: 500;
          color: #e2e8f0; background: rgba(6,13,34,.75);
          border: 1px solid rgba(99,179,237,.12); border-radius: 10px;
          outline: none; transition: border-color .25s, box-shadow .25s;
          caret-color: #3b82f6; box-sizing: border-box;
        }
        .ha-login-input:focus {
          border-color: rgba(59,130,246,.5);
          box-shadow: 0 0 0 3px rgba(59,130,246,.1);
        }
        .ha-login-error {
          background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.25);
          border-radius: 10px; padding: 10px 14px;
          font-size: .8rem; color: #fca5a5; margin-bottom: 18px;
        }
        .ha-login-btn {
          width: 100%; padding: 13px;
          font-family: 'Outfit', sans-serif; font-size: .9rem; font-weight: 700;
          color: white; background: linear-gradient(135deg, #2563eb, #3b82f6);
          border: none; border-radius: 10px; cursor: pointer;
          box-shadow: 0 4px 20px rgba(37,99,235,.35);
          transition: all .28s ease;
        }
        .ha-login-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(37,99,235,.45); }
        .ha-login-btn:disabled { opacity: .6; cursor: not-allowed; transform: none; }
        .ha-login-footer {
          text-align: center; margin-top: 24px;
          font-size: .82rem; color: rgba(148,163,184,.5);
        }
        .ha-login-footer a { color: #60a5fa; text-decoration: none; font-weight: 600; }
        .ha-login-footer a:hover { text-decoration: underline; }
      `}</style>

      <div className="ha-login">
        <div className="ha-login-glow" />
        <motion.div
          className="ha-login-card"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="ha-login-topbar" />
          <div className="ha-login-body">
            <h2 className="ha-login-h2">Welcome <span>Back</span></h2>
            <p className="ha-login-sub">Log in to access your student dashboard</p>

            {error && <div className="ha-login-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="ha-login-field">
                <label className="ha-login-label">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ali@example.com"
                  required
                  className="ha-login-input"
                />
              </div>
              <div className="ha-login-field">
                <label className="ha-login-label">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="ha-login-input"
                />
              </div>
              <motion.button
                type="submit"
                className="ha-login-btn"
                disabled={loading}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </motion.button>
            </form>

            <div className="ha-login-footer">
              Don't have an account? <Link to="/register">Register here</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default StudentLogin;
