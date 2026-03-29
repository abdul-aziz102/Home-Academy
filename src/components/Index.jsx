import React, { useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

const marqueeItems = [
  { text: "Spoken English",     icon: "🎙️", color: "#60a5fa" },
  { text: "Grammar Skills",     icon: "✍️", color: "#a78bfa" },
  { text: "Business English",   icon: "💼", color: "#34d399" },
  { text: "Vocabulary Building",icon: "📖", color: "#f472b6" },
  { text: "Public Speaking",    icon: "🎤", color: "#fbbf24" },
  { text: "IELTS Preparation",  icon: "🏆", color: "#fb923c" },
];

// Three rows at different speeds & directions
const rows = [
  { items: marqueeItems,                        speed: 0.55, dir: -1, size: "clamp(1.8rem, 4vw, 3.2rem)" },
  { items: [...marqueeItems].reverse(),          speed: 0.38, dir:  1, size: "clamp(2.4rem, 5.5vw, 4.5rem)" },
  { items: marqueeItems,                        speed: 0.48, dir: -1, size: "clamp(1.5rem, 3vw, 2.4rem)" },
];

const MarqueeRow = ({ items, speed, dir, size }) => {
  const x = useRef(0);
  const ref = useRef(null);
  const doubled = [...items, ...items, ...items]; // triple for smooth loop

  useAnimationFrame(() => {
    if (!ref.current) return;
    x.current += speed * dir;
    const half = ref.current.scrollWidth / 3;
    if (dir < 0 && x.current <= -half) x.current = 0;
    if (dir > 0 && x.current >= 0)    x.current = -half;
    ref.current.style.transform = `translateX(${x.current}px)`;
  });

  return (
    <div ref={ref} className="ha-mq-row" style={{ "--fs": size }}>
      {doubled.map((item, i) => (
        <motion.span
          key={i}
          className="ha-mq-item"
          style={{ "--accent": item.color }}
          whileHover={{ scale: 1.08, transition: { duration: 0.25 } }}
        >
          <span className="ha-mq-icon">{item.icon}</span>
          <span className="ha-mq-text">{item.text}</span>
          <span className="ha-mq-dot" />
        </motion.span>
      ))}
    </div>
  );
};

const InfiniteMarquee = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&display=swap');

      /* ── wrapper ── */
      .ha-mq-wrap {
        position: relative;
        overflow: hidden;
        padding: 0;
        background: linear-gradient(
          180deg,
          rgba(5,10,30,0) 0%,
          rgba(5,10,30,0.04) 30%,
          rgba(5,10,30,0.04) 70%,
          rgba(5,10,30,0) 100%
        );
        border-top: 1px solid rgba(99,179,237,0.08);
        border-bottom: 1px solid rgba(99,179,237,0.08);
      }

      /* subtle grid texture */
      .ha-mq-wrap::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,179,237,0.04) 1px, transparent 1px);
        background-size: 48px 48px;
        pointer-events: none;
      }

      /* left/right fade masks */
      .ha-mq-wrap::after {
        content: '';
        position: absolute;
        inset: 0;
        background:
          linear-gradient(90deg, #060d22 0%, transparent 14%, transparent 86%, #060d22 100%);
        pointer-events: none;
        z-index: 2;
      }

      /* ── each row ── */
      .ha-mq-track {
        overflow: hidden;
        padding: 6px 0;
        position: relative;
        z-index: 1;
      }
      .ha-mq-track:nth-child(2) { padding: 10px 0; }

      .ha-mq-row {
        display: flex;
        white-space: nowrap;
        will-change: transform;
        gap: 0;
      }

      /* ── each item ── */
      .ha-mq-item {
        display: inline-flex;
        align-items: center;
        gap: 14px;
        padding: 0 24px;
        cursor: default;
        user-select: none;
        transition: color 0.25s ease;
      }

      .ha-mq-text {
        font-family: 'Outfit', sans-serif;
        font-weight: 800;
        font-size: var(--fs, 3rem);
        letter-spacing: -0.02em;
        line-height: 1;

        /* gradient text that shifts to accent on hover */
        background: linear-gradient(
          135deg,
          rgba(148,163,184,0.55) 0%,
          rgba(100,116,139,0.45) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        transition: all 0.3s ease;
      }

      .ha-mq-item:hover .ha-mq-text {
        background: linear-gradient(
          135deg,
          var(--accent) 0%,
          color-mix(in srgb, var(--accent) 60%, white) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 0 12px color-mix(in srgb, var(--accent) 60%, transparent));
      }

      /* icon */
      .ha-mq-icon {
        font-size: calc(var(--fs, 3rem) * 0.55);
        opacity: 0;
        transform: scale(0.6);
        transition: opacity 0.3s ease, transform 0.3s ease;
        filter: grayscale(0.3);
      }
      .ha-mq-item:hover .ha-mq-icon {
        opacity: 1;
        transform: scale(1);
      }

      /* separator dot */
      .ha-mq-dot {
        width: calc(var(--fs, 3rem) * 0.13);
        height: calc(var(--fs, 3rem) * 0.13);
        border-radius: 50%;
        background: var(--accent, rgba(99,179,237,0.3));
        opacity: 0.25;
        flex-shrink: 0;
        transition: opacity 0.3s, box-shadow 0.3s;
      }
      .ha-mq-item:hover .ha-mq-dot {
        opacity: 0.85;
        box-shadow: 0 0 10px var(--accent);
      }

      /* middle row — slightly brighter base */
      .ha-mq-track:nth-child(2) .ha-mq-text {
        background: linear-gradient(
          135deg,
          rgba(148,163,184,0.75) 0%,
          rgba(100,116,139,0.6) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    `}</style>

    <div className="ha-mq-wrap">
      {rows.map((row, i) => (
        <div key={i} className="ha-mq-track">
          <MarqueeRow {...row} />
        </div>
      ))}
    </div>
  </>
);

export default InfiniteMarquee;