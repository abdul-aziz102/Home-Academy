import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How do I enroll at Home Academy?",
    a: "Simply click the 'Enroll Now' button on our website and fill out the registration form. You can also leave your number on the Contact page and we will call you back to explain everything in detail.",
  },
  {
    q: "Which level is right for me?",
    a: "We conduct a free English Assessment Test to determine your current level. Based on the results, we recommend the most suitable course for you to start with. No need to worry — we guide you every step of the way!",
  },
  {
    q: "Are classes online or in-person?",
    a: "We offer both options. In-person classes are held at our center, while online classes are conducted via Zoom or Google Meet. You can choose whichever option suits your schedule and convenience.",
  },
  {
    q: "How many students are in each batch?",
    a: "We intentionally keep our batches small — a maximum of 8 to 10 students per batch. This ensures every student receives personal attention and plenty of speaking practice opportunities.",
  },
  {
    q: "What if I miss a class?",
    a: "No problem at all! A recorded session of the missed class is made available to you. We also arrange makeup classes so you never fall behind on any topic or lesson.",
  },
  {
    q: "What do I receive after completing the course?",
    a: "Upon completion, you receive a professionally designed Home Academy Certificate. For advanced levels, we also prepare students for the internationally recognized CEFR certification.",
  },
  {
    q: "What are the fees and is installment available?",
    a: "Fees range from Rs. 3,200 to Rs. 5,500 depending on the level. Yes, easy monthly installment plans are available — contact us once and we will create the best payment plan tailored for you.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        .ha-faq {
          font-family: 'Outfit', sans-serif;
          background: #060d22;
          padding: 96px 24px;
          position: relative;
          overflow: hidden;
        }
        .ha-faq::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(6,182,212,.35), transparent);
        }
        .ha-faq::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(99,179,237,.05) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }
        .ha-faq-glow {
          position: absolute;
          top: -60px; left: 50%;
          transform: translateX(-50%);
          width: 700px; height: 300px;
          background: radial-gradient(ellipse, rgba(6,182,212,.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .ha-faq-inner {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* eyebrow */
        .ha-faq-brow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 14px;
        }
        .ha-faq-bl {
          width: 44px; height: 1px;
          background: linear-gradient(90deg, transparent, #06b6d4);
          flex-shrink: 0;
        }
        .ha-faq-bl.r { background: linear-gradient(90deg, #06b6d4, transparent); }
        .ha-faq-bt {
          font-size: .65rem;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: #06b6d4;
        }

        /* heading */
        .ha-faq-h2 {
          font-size: clamp(1.9rem, 3.8vw, 3rem);
          font-weight: 900;
          letter-spacing: -.03em;
          color: #f1f5f9;
          text-align: center;
          margin: 0 0 12px;
          line-height: 1.1;
        }
        .ha-faq-h2 span {
          background: linear-gradient(135deg, #67e8f9, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ha-faq-sub {
          text-align: center;
          color: rgba(148,163,184,.6);
          font-size: .96rem;
          margin: 0 auto 52px;
          max-width: 460px;
          line-height: 1.6;
        }

        /* list */
        .ha-faq-list { display: flex; flex-direction: column; gap: 12px; }

        /* item */
        .ha-faq-item {
          background: rgba(13,20,45,.9);
          border: 1px solid rgba(99,179,237,.1);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color .3s, box-shadow .3s;
        }
        .ha-faq-item.open {
          border-color: rgba(6,182,212,.35);
          box-shadow: 0 0 0 1px rgba(6,182,212,.15), 0 8px 32px rgba(6,182,212,.1);
        }

        /* question button */
        .ha-faq-q {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 24px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-size: .95rem;
          font-weight: 700;
          color: #e2e8f0;
          text-align: left;
          transition: color .25s;
        }
        .ha-faq-item.open .ha-faq-q { color: #67e8f9; }

        /* + icon */
        .ha-faq-icon {
          width: 28px; height: 28px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 700;
          border: 1px solid rgba(99,179,237,.2);
          background: rgba(99,179,237,.06);
          color: rgba(148,163,184,.7);
          transition: all .3s ease;
        }
        .ha-faq-item.open .ha-faq-icon {
          background: rgba(6,182,212,.15);
          border-color: rgba(6,182,212,.4);
          color: #67e8f9;
          transform: rotate(45deg);
        }

        /* answer */
        .ha-faq-a {
          font-size: .875rem;
          color: rgba(148,163,184,.72);
          line-height: 1.75;
          border-top: 1px solid rgba(99,179,237,.06);
          padding: 16px 24px 20px;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .ha-faq { padding: 64px 16px; }
          .ha-faq-q { font-size: .88rem; padding: 16px 18px; }
          .ha-faq-a { padding: 14px 18px 16px; }
        }
      `}</style>

      <section className="ha-faq">
        <div className="ha-faq-glow" />
        <div className="ha-faq-inner">

          <div className="ha-faq-brow">
            <span className="ha-faq-bl" />
            <span className="ha-faq-bt">COMMON QUESTIONS</span>
            <span className="ha-faq-bl r" />
          </div>

          <h2 className="ha-faq-h2">Frequently Asked <span>Questions</span></h2>
          <p className="ha-faq-sub">
            Everything you need to know before getting started — no confusion, just clarity.
          </p>

          <div className="ha-faq-list">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={i}
                  className={`ha-faq-item ${isOpen ? "open" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                >
                  <button className="ha-faq-q" onClick={() => setOpen(isOpen ? null : i)}>
                    <span>{faq.q}</span>
                    <span className="ha-faq-icon">+</span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="ha-faq-a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};

export default FAQ;