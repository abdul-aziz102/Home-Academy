import React from 'react';
import { FaChalkboardTeacher, FaBookOpen, FaLanguage } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Testimonials = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const hoverEffect = {
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-20 overflow-hidden">
      <motion.div 
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        {/* Text Content */}
        <motion.div variants={item}>
          <motion.h2 
            className="text-4xl font-bold text-indigo-700 mb-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Unlock the Power of English
          </motion.h2>
          
          <motion.p 
            className="text-gray-700 text-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Learn to speak, read, and write English confidently with our expert-designed courses. Whether you're a beginner or want to improve your fluency — we've got the right level for you!
          </motion.p>

          <motion.ul className="space-y-4 mb-8" variants={container}>
            <motion.li 
              className="flex items-start gap-3"
              variants={item}
              whileHover="hover"
            >
              <motion.div variants={hoverEffect}>
                <FaChalkboardTeacher className="text-indigo-600 mt-1 text-xl" />
              </motion.div>
              <span>Experienced Instructors with real teaching experience</span>
            </motion.li>
            
            <motion.li 
              className="flex items-start gap-3"
              variants={item}
              whileHover="hover"
            >
              <motion.div variants={hoverEffect}>
                <FaBookOpen className="text-indigo-600 mt-1 text-xl" />
              </motion.div>
              <span>Structured syllabus for speaking, writing, and grammar</span>
            </motion.li>
            
            <motion.li 
              className="flex items-start gap-3"
              variants={item}
              whileHover="hover"
            >
              <motion.div variants={hoverEffect}>
                <FaLanguage className="text-indigo-600 mt-1 text-xl" />
              </motion.div>
              <span>Multiple levels: Pre-Beginner to Advanced English</span>
            </motion.li>
          </motion.ul>

          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link to='/courses'>
              <motion.button 
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold relative overflow-hidden"
                whileHover={{ 
                  backgroundColor: "#4338ca",
                  boxShadow: "0 5px 15px rgba(79, 70, 229, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Join Now</span>
                <motion.span 
                  className="absolute inset-0 bg-indigo-700 rounded-lg z-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: 1,
                    transition: { duration: 0.3 }
                  }}
                />
              </motion.button>
            </Link>
            
            <Link to='/about'>
              <motion.button 
                className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold relative overflow-hidden"
                whileHover={{ 
                  backgroundColor: "#eef2ff",
                  boxShadow: "0 5px 15px rgba(79, 70, 229, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Learn More</span>
                <motion.span 
                  className="absolute inset-0 bg-indigo-100 rounded-lg z-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: 1,
                    transition: { duration: 0.3 }
                  }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Image or Illustration */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.img
            src="/learn.jpg"
            alt="Learn English"
            className="w-full max-w-md rounded-xl shadow-lg"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;