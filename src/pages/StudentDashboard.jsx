import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import studentApi from '../utils/studentApi';

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('studentToken');
    if (!token) { navigate('/student-login'); return; }

    studentApi.getDashboard()
      .then(setData)
      .catch(() => navigate('/student-login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return (
    <div className="ha-dash" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#060d22', color: '#60a5fa', fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem' }}>
      Loading dashboard...
    </div>
  );

  if (!data) return null;

  const { student, course, attendance, progress, schedule } = data;
  const initials = student.name ? student.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const blue = [37, 99, 235];
    const dark = [30, 30, 30];
    const gray = [100, 100, 100];

    // Header bar
    doc.setFillColor(...blue);
    doc.rect(0, 0, 210, 36, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text('Home Academy', 20, 18);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Student Registration Form', 20, 28);

    let y = 50;
    const addField = (label, value) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...gray);
      doc.text(label, 20, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(...dark);
      doc.text(String(value || 'N/A'), 80, y);
      y += 12;
    };

    addField('Full Name:', student.name);
    addField('Email:', student.email);
    addField('Phone:', student.phone);
    addField('Age:', student.age);
    addField('Gender:', student.gender);
    addField('Education:', student.education);
    addField('English Goal:', student.englishGoal);
    addField('Learning Style:', student.learningStyle);
    addField('Level:', student.level);

    // Divider
    y += 4;
    doc.setDrawColor(...blue);
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);
    y += 12;

    // Dashboard stats
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...blue);
    doc.text('Dashboard Summary', 20, y);
    y += 12;

    addField('Progress:', `${progress}%`);
    addField('Attendance:', `${attendance.percentage}%`);
    addField('Course:', course ? course.title : 'Not enrolled');
    addField('Schedule:', `${schedule.day} | ${schedule.time}`);

    // Footer
    y += 8;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated on ${new Date().toLocaleDateString()} — Home Academy`, 20, y);

    doc.save(`HomeAcademy_${student.name || 'Student'}.pdf`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        .ha-dash {
          font-family: 'Outfit', sans-serif;
          background: #060d22;
          min-height: 100vh;
          padding: 100px 24px 60px;
          position: relative;
        }
        .ha-dash::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(99,179,237,.05) 1px, transparent 1px);
          background-size: 32px 32px; pointer-events: none;
        }
        .ha-dash-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }

        /* Welcome Header */
        .ha-dash-welcome {
          display: flex; align-items: center; gap: 20px;
          padding: 32px; margin-bottom: 28px;
          background: rgba(13,20,45,.95);
          border: 1px solid rgba(99,179,237,.12);
          border-radius: 18px;
          box-shadow: 0 8px 40px rgba(0,0,0,.4);
        }
        .ha-dash-avatar {
          width: 64px; height: 64px; border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem; font-weight: 800; color: white;
          flex-shrink: 0;
        }
        .ha-dash-name { font-size: 1.5rem; font-weight: 800; color: #f1f5f9; margin: 0; }
        .ha-dash-email { font-size: .82rem; color: rgba(148,163,184,.5); margin: 2px 0 0; }
        .ha-dash-level-badge {
          display: inline-block; margin-top: 6px;
          padding: 3px 12px; border-radius: 20px;
          font-size: .68rem; font-weight: 700; letter-spacing: .08em;
          color: #60a5fa; background: rgba(59,130,246,.12);
          border: 1px solid rgba(59,130,246,.25);
        }

        /* Quick Stats */
        .ha-dash-stats {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
          margin-bottom: 28px;
        }
        @media (max-width: 768px) { .ha-dash-stats { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .ha-dash-stats { grid-template-columns: 1fr; } }
        .ha-dash-stat {
          padding: 24px;
          background: rgba(13,20,45,.95);
          border: 1px solid rgba(99,179,237,.1);
          border-radius: 16px;
          text-align: center;
        }
        .ha-dash-stat-value {
          font-size: 2rem; font-weight: 900; color: #f1f5f9;
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ha-dash-stat-label { font-size: .72rem; font-weight: 600; color: rgba(148,163,184,.45); text-transform: uppercase; letter-spacing: .08em; margin-top: 4px; }

        /* Sections grid */
        .ha-dash-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
        }
        @media (max-width: 768px) { .ha-dash-grid { grid-template-columns: 1fr; } }

        .ha-dash-section {
          padding: 28px;
          background: rgba(13,20,45,.95);
          border: 1px solid rgba(99,179,237,.1);
          border-radius: 16px;
        }
        .ha-dash-section-title {
          font-size: .68rem; font-weight: 700; letter-spacing: .15em;
          text-transform: uppercase; color: #3b82f6; margin: 0 0 16px;
        }

        /* Progress bar */
        .ha-dash-progress-track {
          height: 12px; border-radius: 6px;
          background: rgba(99,179,237,.08);
          overflow: hidden; margin-top: 12px;
        }
        .ha-dash-progress-fill {
          height: 100%; border-radius: 6px;
          background: linear-gradient(90deg, #2563eb, #06b6d4);
          transition: width .6s ease;
        }
        .ha-dash-progress-text { font-size: .82rem; color: rgba(148,163,184,.6); margin-top: 8px; }

        /* Attendance */
        .ha-dash-att-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(99,179,237,.06);
          font-size: .82rem; color: rgba(148,163,184,.6);
        }
        .ha-dash-att-row:last-child { border-bottom: none; }
        .ha-dash-att-badge {
          padding: 2px 10px; border-radius: 12px;
          font-size: .7rem; font-weight: 700;
        }
        .ha-dash-att-present { color: #10b981; background: rgba(16,185,129,.12); }
        .ha-dash-att-absent { color: #ef4444; background: rgba(239,68,68,.12); }
        .ha-dash-att-late { color: #f59e0b; background: rgba(245,158,11,.12); }

        /* Course card */
        .ha-dash-course-title { font-size: 1.1rem; font-weight: 800; color: #f1f5f9; margin: 0 0 6px; }
        .ha-dash-course-desc { font-size: .82rem; color: rgba(148,163,184,.5); line-height: 1.6; margin: 0 0 14px; }
        .ha-dash-skills { display: flex; flex-wrap: wrap; gap: 6px; }
        .ha-dash-skill {
          padding: 3px 10px; border-radius: 8px;
          font-size: .7rem; font-weight: 600;
          color: #93c5fd; background: rgba(59,130,246,.08);
          border: 1px solid rgba(59,130,246,.15);
        }

        /* Schedule */
        .ha-dash-sched-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 0; font-size: .85rem; color: rgba(148,163,184,.6);
        }
        .ha-dash-sched-icon { font-size: 1.2rem; }
        .ha-dash-sched-label { font-weight: 700; color: #f1f5f9; }

        /* Download PDF button */
        .ha-dash-pdf-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 20px; margin-top: 10px;
          font-family: 'Outfit', sans-serif; font-size: .8rem; font-weight: 700;
          color: #d1fae5; background: rgba(16,185,129,.12);
          border: 1px solid rgba(16,185,129,.3); border-radius: 10px;
          cursor: pointer; transition: all .3s ease;
        }
        .ha-dash-pdf-btn:hover {
          background: rgba(16,185,129,.22); border-color: rgba(16,185,129,.5);
          transform: translateY(-1px); box-shadow: 0 4px 16px rgba(16,185,129,.25);
        }

        /* Responsive welcome */
        @media (max-width: 480px) {
          .ha-dash-welcome { flex-direction: column; text-align: center; }
        }
      `}</style>

      <div className="ha-dash">
        <div className="ha-dash-inner">
          {/* Welcome Header */}
          <motion.div className="ha-dash-welcome" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="ha-dash-avatar">{initials}</div>
            <div>
              <h1 className="ha-dash-name">Welcome, {student.name}</h1>
              <p className="ha-dash-email">{student.email}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span className="ha-dash-level-badge">{student.level}</span>
                <button className="ha-dash-pdf-btn" onClick={handleDownloadPDF}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  Download PDF
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div className="ha-dash-stats" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <div className="ha-dash-stat">
              <div className="ha-dash-stat-value">{progress}%</div>
              <div className="ha-dash-stat-label">Progress</div>
            </div>
            <div className="ha-dash-stat">
              <div className="ha-dash-stat-value">{attendance.percentage}%</div>
              <div className="ha-dash-stat-label">Attendance</div>
            </div>
            <div className="ha-dash-stat">
              <div className="ha-dash-stat-value">{student.level}</div>
              <div className="ha-dash-stat-label">Current Level</div>
            </div>
            <div className="ha-dash-stat">
              <div className="ha-dash-stat-value">{schedule.time}</div>
              <div className="ha-dash-stat-label">Next Class</div>
            </div>
          </motion.div>

          {/* Main Grid */}
          <motion.div className="ha-dash-grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>

            {/* Enrolled Course */}
            <div className="ha-dash-section">
              <div className="ha-dash-section-title">Enrolled Course</div>
              {course ? (
                <>
                  <h3 className="ha-dash-course-title">{course.title}</h3>
                  <p className="ha-dash-course-desc">{course.description}</p>
                  <div className="ha-dash-skills">
                    {(course.skills || []).map((s, i) => (
                      <span key={i} className="ha-dash-skill">{s}</span>
                    ))}
                  </div>
                </>
              ) : (
                <p style={{ color: 'rgba(148,163,184,.5)', fontSize: '.85rem' }}>No course matched to your level yet. Contact support.</p>
              )}
            </div>

            {/* Progress Tracker */}
            <div className="ha-dash-section">
              <div className="ha-dash-section-title">Progress Tracker</div>
              <div className="ha-dash-progress-track">
                <div className="ha-dash-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <p className="ha-dash-progress-text">
                Level {['Pre Beginning','Beginning','Level One','Level Two','Level Three','Level Four','Level Five','Advance'].indexOf(student.level) + 1} of 8 — {student.level}
              </p>
            </div>

            {/* Attendance Summary */}
            <div className="ha-dash-section">
              <div className="ha-dash-section-title">Attendance Summary</div>
              <div className="ha-dash-att-row">
                <span>Present</span><span className="ha-dash-att-badge ha-dash-att-present">{attendance.present}</span>
              </div>
              <div className="ha-dash-att-row">
                <span>Absent</span><span className="ha-dash-att-badge ha-dash-att-absent">{attendance.absent}</span>
              </div>
              <div className="ha-dash-att-row">
                <span>Late</span><span className="ha-dash-att-badge ha-dash-att-late">{attendance.late}</span>
              </div>
              {attendance.recent && attendance.recent.length > 0 && (
                <>
                  <div style={{ height: 1, background: 'rgba(99,179,237,.08)', margin: '12px 0' }} />
                  <div style={{ fontSize: '.7rem', fontWeight: 700, color: 'rgba(148,163,184,.35)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8 }}>Recent</div>
                  {attendance.recent.map((r, i) => (
                    <div key={i} className="ha-dash-att-row">
                      <span>{new Date(r.date).toLocaleDateString()}</span>
                      <span className={`ha-dash-att-badge ha-dash-att-${r.status}`}>{r.status}</span>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Schedule */}
            <div className="ha-dash-section">
              <div className="ha-dash-section-title">Next Class Schedule</div>
              <div className="ha-dash-sched-item">
                <span className="ha-dash-sched-icon">&#128197;</span>
                <div><span className="ha-dash-sched-label">Days:</span> {schedule.day}</div>
              </div>
              <div className="ha-dash-sched-item">
                <span className="ha-dash-sched-icon">&#128336;</span>
                <div><span className="ha-dash-sched-label">Time:</span> {schedule.time}</div>
              </div>
              <div className="ha-dash-sched-item">
                <span className="ha-dash-sched-icon">&#128218;</span>
                <div><span className="ha-dash-sched-label">Course:</span> {schedule.course}</div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
