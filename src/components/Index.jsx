import React from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

const InfiniteMarquee = () => {
 
  const marqueeItems = [
    "Spoken English",
    "Grammar Skills",
    "Business English",
    
    "Vocabulary Building",
    "Public Speaking"
  ];



  // Duplicate items for seamless looping
  const duplicatedItems = [...marqueeItems, ...marqueeItems];
  
  const x = React.useRef(0);
  const marqueeRef = React.useRef(null);
  
  useAnimationFrame(() => {
    if (marqueeRef.current) {
      x.current -= 1; // Adjust speed by changing this value
      if (x.current <= -marqueeRef.current.scrollWidth / 2) {
        x.current = 0;
      }
      marqueeRef.current.style.transform = `translateX(${x.current}px)`;
    }
  });

  return (
    <div className="relative overflow-hidden text-indigo-700 ">
      <div className="relative h-32 flex items-center">
        {/* Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-100 dark:from-gray-900 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-100 dark:from-gray-900 to-transparent z-10" />
        
        {/* Moving Marquee */}
        <motion.div 
          ref={marqueeRef}
          className="flex whitespace-nowrap absolute"
          style={{ x: 0 }} // Initialize position
        >
          {duplicatedItems.map((item, i) => (
            <motion.div
              key={i}
              className="inline-flex items-center mx-8"
              whileHover={{
                scale: 1.1,
                color: "#f59e0b",
                transition: { duration: 0.3 }
              }}
            >
              <span className="text-5xl md:text-7xl font-bold text-indigo-700">
                {item}
              </span>
              {i % 2 === 0 && (
                <div className="w-3 h-3 rounded-full bg-yellow-500 ml-8" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteMarquee;