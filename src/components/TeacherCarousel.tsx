"use client";

import React, { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

type Teacher = {
  id: string;
  name: string;
  image: string;
  subject?: string;
  experience?: string;
};

interface TeacherCarouselProps {
  teachers: Teacher[];
  cardsPerView?: number;
  className?: string;
  imageHeight?: string; // New prop for controlling image height
}

const TeacherCarousel = ({
  teachers,
  cardsPerView = 4,
  className = "",
  imageHeight = "200px", // Default image height
}: TeacherCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(250);
  const [showArrows, setShowArrows] = useState(false);

  // Handle responsive card width and arrow visibility
  useEffect(() => {
    const updateCardWidth = () => {
      if (scrollRef.current) {
        const containerWidth = scrollRef.current.offsetWidth;
        const calculatedWidth = Math.min(
          280,
          Math.max(220, containerWidth / cardsPerView - 24)
        );
        setCardWidth(calculatedWidth);
        
        const needsArrows = scrollRef.current.scrollWidth > containerWidth;
        setShowArrows(needsArrows);
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, [cardsPerView, teachers.length]);

  // Drag to scroll functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Navigation functions
  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const newScrollLeft = index * (cardWidth + 24);
    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.offsetWidth;
    const cardsToScroll = Math.floor(containerWidth / (cardWidth + 24)) || 1;
    const nextIndex = Math.min(
      currentIndex + cardsToScroll,
      teachers.length - 1
    );
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.offsetWidth;
    const cardsToScroll = Math.floor(containerWidth / (cardWidth + 24)) || 1;
    const prevIndex = Math.max(currentIndex - cardsToScroll, 0);
    scrollToIndex(prevIndex);
  };

  // Auto-update current index on scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollLeft;
      const newIndex = Math.round(scrollPos / (cardWidth + 24));
      setCurrentIndex(Math.max(0, newIndex));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [cardWidth]);

  // Disable arrow buttons when at extremes
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= teachers.length - Math.floor((scrollRef.current?.offsetWidth || 0) / (cardWidth + 24));

  return (
    <div className={`w-full relative ${className}`}>
      {showArrows && (
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handlePrev}
            disabled={isAtStart}
            className={`p-2 rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100 transition-all ${
              isAtStart ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
            }`}
            aria-label="Previous teachers"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            disabled={isAtEnd}
            className={`p-2 rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100 transition-all ${
              isAtEnd ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
            }`}
            aria-label="Next teachers"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      )}

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-6 cursor-grab active:cursor-grabbing no-scrollbar"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ scrollbarWidth: "none" }}
      >
        {teachers.map((teacher) => (
          <motion.div
            key={teacher.id}
            className="flex-shrink-0 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            style={{ width: `${cardWidth}px` }}
            whileHover={{ y: -5 }}
          >
            <div 
              className="w-full overflow-hidden"
              style={{ 
                height: imageHeight,
                position: 'relative'
              }}
            >
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-full object-cover"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/default-teacher.jpg";
                }}
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold text-lg text-gray-800">
                {teacher.name}
              </h3>
              {teacher.subject && (
                <p className="text-sm text-gray-600 mt-1">{teacher.subject}</p>
              )}
              {teacher.experience && (
                <p className="text-xs text-gray-500 mt-2">
                  {teacher.experience} years experience
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {showArrows && teachers.length > cardsPerView && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({
            length: Math.ceil(teachers.length / Math.max(1, cardsPerView)),
          }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx * cardsPerView)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex >= idx * cardsPerView &&
                currentIndex < (idx + 1) * cardsPerView
                  ? "bg-blue-600 w-4"
                  : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherCarousel;