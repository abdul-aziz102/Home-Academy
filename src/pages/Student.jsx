import React from "react";
import TeacherCarousel from "../components/TeacherCarousel";

const students = [
  { id: "1",  image: "st1.jpg"  },
  { id: "2",  image: "st2.jpg"  },
  { id: "3",  image: "st4.jpg"  },
  { id: "4",  image: "st5.jpg"  },
  { id: "5",  image: "st6.jpg"  },
  { id: "6",  image: "st7.jpg"  },
  { id: "7",  image: "st8.jpg"  },
  { id: "8",  image: "st9.jpg"  },
  { id: "9",  image: "st10.jpg" },
  { id: "10", image: "st11.jpg" },
  { id: "11", image: "st12.jpg" },
  { id: "12", image: "st13.jpg" },
  { id: "13", image: "st14.jpg" },
  { id: "14", image: "st15.jpg" },
  { id: "15", image: "st16.jpg" },
];

const Student = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&display=swap');

        .ha-student-page {
          background: #060d22 !important;
          width: 100%;
          padding: 80px 0;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }

        /* ambient glow — green tint for students section */
        .ha-student-page::before {
          content: '';
          position: absolute;
          top: -80px; left: 50%;
          transform: translateX(-50%);
          width: 700px; height: 300px;
          background: radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* dot grid texture */
        .ha-student-page::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(99,179,237,0.05) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          z-index: 0;
        }

        .ha-student-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* eyebrow */
        .ha-student-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .ha-st-line {
          width: 44px; height: 1px;
          background: linear-gradient(90deg, transparent, #10b981);
          flex-shrink: 0;
        }
        .ha-st-line.r {
          background: linear-gradient(90deg, #10b981, transparent);
        }
        .ha-st-eyebrow-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #10b981;
        }

        /* heading */
        .ha-student-title {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #f1f5f9;
          text-align: center;
          margin: 0 0 10px;
          line-height: 1.1;
        }
        .ha-student-title span {
          background: linear-gradient(135deg, #6ee7b7, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* subtitle */
        .ha-student-sub {
          font-size: 0.92rem;
          color: rgba(148,163,184,0.58);
          text-align: center;
          margin: 0 auto 48px;
          max-width: 400px;
          line-height: 1.6;
        }

        /* bottom divider */
        .ha-student-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.12), transparent);
          margin-top: 56px;
        }

        @media (max-width: 640px) {
          .ha-student-page { padding: 56px 0; }
        }
      `}</style>

      <div className="ha-student-page">
        <div className="ha-student-inner">

          {/* Eyebrow */}
          <div className="ha-student-eyebrow">
            <span className="ha-st-line" />
            <span className="ha-st-eyebrow-label">OUR COMMUNITY</span>
            <span className="ha-st-line r" />
          </div>

          {/* Heading */}
          <h2 className="ha-student-title">
            Meet Our <span>Students</span>
          </h2>
          <p className="ha-student-sub">
            Proud learners on their journey to English fluency
          </p>

          {/* Carousel — sirf images */}
          <TeacherCarousel
            teachers={students}
            cardsPerView={5}
            imageHeight="250px"
          />

          <div className="ha-student-divider" />
        </div>
      </div>
    </>
  );
};

export default Student;