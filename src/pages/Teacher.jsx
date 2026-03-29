import React from "react";
import TeacherCarousel from "../components/TeacherCarousel";

const teachers = [
  { id: "1",  image: "sir1.jpg"   },
  { id: "2",  image: "sir2.jpg"   },
  { id: "3",  image: "sir3.jpg"   },
  { id: "4",  image: "sir4.jpg"   },
  { id: "5",  image: "s1.jpg"   },
  { id: "6",  image: "s2.jpg"    },
  { id: "7",  image: "s3.jpg"    },
  { id: "8",  image: "s4.jpg"    },
  { id: "9",  image: "s5.jpg"    },
  { id: "10", image: "s6.jpg"    },
  { id: "10", image: "s7.jpg"    },
  { id: "10", image: "s8.jpg"    },
  { id: "10", image: "s9.jpg"    },
  { id: "10", image: "s10.jpg"    },
  { id: "10", image: "s11.jpg"    },
  { id: "10", image: "s12.jpg"    },
  { id: "11", image: "silver.jpg" },
];

const Teacher = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&display=swap');

        .ha-teacher-page {
          background: #060d22 !important;
          width: 100%;
          padding: 80px 0;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }

        /* ambient glow top-center */
        .ha-teacher-page::before {
          content: '';
          position: absolute;
          top: -80px; left: 50%;
          transform: translateX(-50%);
          width: 700px; height: 300px;
          background: radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* dot grid texture */
        .ha-teacher-page::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(99,179,237,0.05) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          z-index: 0;
        }

        .ha-teacher-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* eyebrow */
        .ha-teacher-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .ha-eyebrow-line {
          width: 44px; height: 1px;
          background: linear-gradient(90deg, transparent, #3b82f6);
          flex-shrink: 0;
        }
        .ha-eyebrow-line.r {
          background: linear-gradient(90deg, #3b82f6, transparent);
        }
        .ha-eyebrow-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #3b82f6;
        }

        /* heading */
        .ha-teacher-title {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #f1f5f9;
          text-align: center;
          margin: 0 0 10px;
          line-height: 1.1;
        }
        .ha-teacher-title span {
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* subtitle */
        .ha-teacher-sub {
          font-size: 0.92rem;
          color: rgba(148,163,184,0.58);
          text-align: center;
          margin: 0 auto 48px;
          max-width: 400px;
          line-height: 1.6;
        }

        /* bottom divider */
        .ha-teacher-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,179,237,0.12), transparent);
          margin-top: 56px;
        }

        @media (max-width: 640px) {
          .ha-teacher-page { padding: 56px 0; }
        }
      `}</style>

      <div className="ha-teacher-page">
        <div className="ha-teacher-inner">

          {/* Eyebrow */}
          <div className="ha-teacher-eyebrow">
            <span className="ha-eyebrow-line" />
            <span className="ha-eyebrow-label">OUR TEAM</span>
            <span className="ha-eyebrow-line r" />
          </div>

          {/* Heading */}
          <h2 className="ha-teacher-title">
            Meet Our <span>Dedicated Teachers</span>
          </h2>
          <p className="ha-teacher-sub">
            Passionate instructors committed to your English success
          </p>

          {/* Carousel — sirf images */}
          <TeacherCarousel
            teachers={teachers}
            cardsPerView={5}
            imageHeight="250px"
          />

          <div className="ha-teacher-divider" />
        </div>
      </div>
    </>
  );
};

export default Teacher;