import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cardsinfor = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const levelsData = [
    {
      title: "Pre-Beginner Level",
      content: [
        "Alphabet and pronunciation fundamentals",
        "Essential greetings and introductions",
        "Numbers, dates, and telling time",
        "Basic classroom instructions",
        "Simple everyday vocabulary (family, colors, food)",
        "Asking and answering simple questions"
      ]
    },
    {
      title: "Beginner Level",
      content: [
        "Present simple and continuous tenses",
        "Daily routines and habits",
        "Shopping and ordering food",
        "Asking for and giving directions",
        "Describing people and places",
        "Basic writing (short messages, forms)"
      ]
    },
    {
      title: "Level 1 (Elementary)",
      content: [
        "Past simple and irregular verbs",
        "Making future plans",
        "Giving opinions and preferences",
        "Writing personal letters/emails",
        "Understanding simple news articles",
        "Social English (invitations, small talk)"
      ]
    },
    {
      title: "Level 2 (Pre-Intermediate)",
      content: [
        "Present perfect tense",
        "Comparing and contrasting",
        "Narrating stories and experiences",
        "Understanding phone conversations",
        "Writing cohesive paragraphs",
        "Expressing agreement/disagreement"
      ]
    },
    {
      title: "Level 3 (Intermediate)",
      content: [
        "All major verb tenses review",
        "Conditionals and hypotheticals",
        "Formal vs informal language",
        "Writing reports and summaries",
        "Understanding TV shows and movies",
        "Debating and presenting arguments"
      ]
    },
    {
      title: "Level 4 (Upper-Intermediate)",
      content: [
        "Advanced grammar structures",
        "Academic writing techniques",
        "Business English communication",
        "Understanding native speaker conversations",
        "Idioms and phrasal verbs",
        "Giving professional presentations"
      ]
    },
    {
      title: "Level 5 (Advanced)",
      content: [
        "Nuanced language and subtle meanings",
        "Critical analysis of texts",
        "Negotiation and persuasion techniques",
        "Writing research papers/articles",
        "Cultural references in language",
        "Mastering all aspects of fluency"
      ]
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardItem = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-16 ">
      <motion.h1 
        className="text-4xl font-bold text-indigo-700 mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        English Level Curriculums
      </motion.h1>
      
      <motion.div 
        className="space-y-4 max-w-5xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {levelsData.map((item, index) => (
          <motion.div
            key={index}
            variants={cardItem}
            className="border border-blue-200 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.1)",
              y: -2
            }}
          >
            <motion.button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-8 py-6 text-left"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <motion.span 
                  className="mr-4 bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {index === 0 ? 'Start' : `Level ${index}`}
                </motion.span>
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h2>
              </div>
              <motion.span 
                className="text-blue-600 text-2xl"
                animate={{
                  rotate: openIndex === index ? 180 : 0,
                  color: openIndex === index ? "#4f46e5" : "#2563eb"
                }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={contentVariants}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-8 pt-2 border-t border-blue-50">
                    <ul className="space-y-3 mb-6">
                      {item.content.map((point, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start text-gray-700"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ 
                            opacity: 1, 
                            x: 0,
                            transition: { 
                              delay: i * 0.05,
                              duration: 0.3 
                            }
                          }}
                        >
                          <svg 
                            className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <motion.button 
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 5px 15px rgba(79, 70, 229, 0.3)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Join This Level
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Cardsinfor;