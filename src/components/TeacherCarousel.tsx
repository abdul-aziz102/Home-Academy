import React, { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

const TeacherCarousel = ({
  teachers,
  cardsPerView = 4,
  className = "",
  imageHeight = "260px",
}) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(250);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const updateCardWidth = () => {
      if (scrollRef.current) {
        const containerWidth = scrollRef.current.offsetWidth;
        const calculatedWidth = Math.min(280, Math.max(220, containerWidth / cardsPerView - 24));
        setCardWidth(calculatedWidth);
        setShowArrows(scrollRef.current.scrollWidth > containerWidth);
      }
    };
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, [cardsPerView, teachers.length]);

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    document.body.style.cursor = "grabbing";
  };
  const handleMouseLeave = () => { setIsDragging(false); document.body.style.cursor = ""; };
  const handleMouseUp = () => { setIsDragging(false); document.body.style.cursor = ""; };
  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };

  const scrollToIndex = (index) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ left: index * (cardWidth + 24), behavior: "smooth" });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const cards = Math.floor((scrollRef.current?.offsetWidth || 0) / (cardWidth + 24)) || 1;
    scrollToIndex(Math.min(currentIndex + cards, teachers.length - 1));
  };
  const handlePrev = () => {
    const cards = Math.floor((scrollRef.current?.offsetWidth || 0) / (cardWidth + 24)) || 1;
    scrollToIndex(Math.max(currentIndex - cards, 0));
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      setCurrentIndex(Math.max(0, Math.round(container.scrollLeft / (cardWidth + 24))));
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [cardWidth]);

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= teachers.length - Math.floor((scrollRef.current?.offsetWidth || 0) / (cardWidth + 24));

  return (
    <>
      <style>{`
        .ha-img-carousel { width: 100%; position: relative; }

        .ha-img-arrows {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .ha-img-arrow-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(99,179,237,0.2);
          background: rgba(99,179,237,0.07);
          color: rgba(148,163,184,0.8);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .ha-img-arrow-btn:hover:not(:disabled) {
          background: rgba(59,130,246,0.18);
          border-color: rgba(59,130,246,0.45);
          color: #93c5fd;
          box-shadow: 0 0 16px rgba(59,130,246,0.2);
        }
        .ha-img-arrow-btn:disabled { opacity: 0.2; cursor: not-allowed; }

        .ha-img-track {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding-bottom: 8px;
          cursor: grab;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .ha-img-track::-webkit-scrollbar { display: none; }
        .ha-img-track:active { cursor: grabbing; }

        /* ── IMAGE CARD ── */
        .ha-img-card {
          flex-shrink: 0;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(99,179,237,0.1);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .ha-img-card:hover {
          border-color: rgba(99,179,237,0.35);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,179,237,0.2);
        }

        .ha-img-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s ease;
        }
        .ha-img-card:hover .ha-img-photo {
          transform: scale(1.04);
        }

        /* name overlay on hover */
        .ha-img-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 32px 14px 14px;
          background: linear-gradient(to top, rgba(6,13,34,0.92) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .ha-img-card:hover .ha-img-overlay { opacity: 1; }
        .ha-img-name {
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #f1f5f9;
          letter-spacing: -0.01em;
          margin: 0;
        }
        .ha-img-role {
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          color: rgba(148,163,184,0.75);
          font-weight: 500;
          margin: 2px 0 0;
        }

        /* dots */
        .ha-img-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
        }
        .ha-img-dot {
          height: 4px;
          border-radius: 100px;
          border: none;
          background: rgba(99,179,237,0.15);
          cursor: pointer;
          transition: width 0.3s ease, background 0.3s ease;
          padding: 0;
        }
        .ha-img-dot.active {
          background: #3b82f6;
          box-shadow: 0 0 8px rgba(59,130,246,0.5);
        }
      `}</style>

      <div className={`ha-img-carousel ${className}`}>
        {showArrows && (
          <div className="ha-img-arrows">
            <button className="ha-img-arrow-btn" onClick={handlePrev} disabled={isAtStart} aria-label="Previous">
              <FiChevronLeft size={18} />
            </button>
            <button className="ha-img-arrow-btn" onClick={handleNext} disabled={isAtEnd} aria-label="Next">
              <FiChevronRight size={18} />
            </button>
          </div>
        )}

        <div
          ref={scrollRef}
          className="ha-img-track"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {teachers.map((teacher, i) => (
            <motion.div
              key={teacher.id}
              className="ha-img-card"
              style={{ width: `${cardWidth}px`, height: imageHeight }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <img
                src={teacher.image}
                alt={teacher.name}
                className="ha-img-photo"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-teacher.jpg";
                }}
              />
              {/* subtle name on hover */}
              <div className="ha-img-overlay">
                <p className="ha-img-name">{teacher.name}</p>
                {teacher.subject && <p className="ha-img-role">{teacher.subject}</p>}
              </div>
            </motion.div>
          ))}
        </div>

        {showArrows && teachers.length > cardsPerView && (
          <div className="ha-img-dots">
            {Array.from({ length: Math.ceil(teachers.length / Math.max(1, cardsPerView)) }).map((_, idx) => {
              const isActive = currentIndex >= idx * cardsPerView && currentIndex < (idx + 1) * cardsPerView;
              return (
                <button
                  key={idx}
                  className={`ha-img-dot ${isActive ? "active" : ""}`}
                  style={{ width: isActive ? 24 : 8 }}
                  onClick={() => scrollToIndex(idx * cardsPerView)}
                  aria-label={`Slide ${idx + 1}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default TeacherCarousel;