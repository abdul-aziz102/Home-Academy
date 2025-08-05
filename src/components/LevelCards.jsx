import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaArrowRight, FaRegClock, FaUserGraduate, FaChartLine } from 'react-icons/fa';

const LevelCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const levels = [
    {
      title: "Pre-Beginner",
      description: "Start from scratch with basic vocabulary, greetings, and simple sentences.",
      image: "/level pre.png",
      skills: ["Alphabet & sounds", "Basic greetings", "Simple questions", "Everyday words"],
      target: "Absolute beginners",
      duration: "12 weeks",
      intensity: "5 classes/week",
      price: "Rs. 3,200",
      category: "Beginner"
    },
    {
      title: "Beginner",
      description: "Build foundation with present tense, daily conversations, and essential grammar.",
      image: "/level bg.png",
      skills: ["Present tenses", "Daily routines", "Shopping vocabulary", "Simple directions"],
      target: "Basic understanding",
      duration: "12 weeks",
      intensity: "5 classes/week",
      price: "Rs. 3,800",
      category: "Beginner"
    },
    {
      title: "Elementary (Level 1)",
      description: "Handle basic social situations, read simple texts, and write short paragraphs.",
      image: "/level1.png",
      skills: ["Past tenses", "Describing people", "Writing emails", "Telling stories"],
      target: "CEFR A1",
      duration: "12 weeks",
      intensity: "5 classes/week",
      price: "Rs. 4,000",
      category: "Elementary"
    },
    {
      title: "Pre-Intermediate (Level 2)",
      description: "Express opinions, understand main points in conversations, and write cohesive texts.",
      image: "/level2.png",
      skills: ["Future tenses", "Comparing things", "News articles", "Phone conversations"],
      target: "CEFR A2",
      duration: "12 weeks",
      intensity: "5 classes/week",
      price: "Rs. 4,200",
      category: "Intermediate"
    },
    {
      title: "Intermediate (Level 3)",
      description: "Discuss various topics, understand native speakers, and write detailed texts.",
      image: "/level3.png",
      skills: ["Conditionals", "Debating skills", "Formal letters", "TV shows understanding"],
      target: "CEFR B1",
      duration: "12 weeks",
      intensity: "5 classes/week",
      price: "Rs. 4,500",
      category: "Intermediate"
    },
    {
      title: "Upper-Intermediate (Level 4)",
      description: "Communicate fluently in professional contexts with nuanced language use.",
      image: "/level4.png",
      skills: ["Complex grammar", "Academic writing", "Presentations", "Idiomatic expressions"],
      target: "CEFR B2",
      duration: "12 weeks",
      intensity: "5 classes/week",
      price: "Rs. 4,800",
      category: "Advanced"
    },
    {
      title: "Advanced (Level 5)",
      description: "Master English for academic excellence, business leadership, and cultural nuance.",
      image: "/level5.png",
      skills: ["Subtle meanings", "Professional reports", "Negotiations", "Literary analysis"],
      target: "CEFR C1",
      duration: "12 weeks",
      intensity: "5 classes/week",
      price: "Rs. 5,000",
      category: "Advanced"
    },
    {
      title: "Proficiency (Level 6)",
      description: "Achieve native-like fluency for specialized professional and academic contexts.",
      image: "/leceladv.png",
      skills: ["Advanced rhetoric", "Technical writing", "Media analysis", "Cultural nuance"],
      target: "CEFR C2",
      duration: "12 weeks",
      intensity: "5 classes/week",
      price: "Rs. 5,500",
      category: "Advanced"
    }
  ];

  const filters = ['All', 'Beginner', 'Elementary', 'Intermediate', 'Advanced'];

  const filteredLevels = activeFilter === 'All' 
    ? levels 
    : levels.filter(level => level.category === activeFilter);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardItem = {
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
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.15)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const hoverContent = {
    hover: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    initial: { opacity: 0, y: 20 }
  };

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-5">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">Our English Proficiency Levels</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600">
            Structured progression from absolute beginner to native-like fluency with certified instructors
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatePresence>
            {filteredLevels.map((level, index) => (
              <motion.div 
                key={level.title}
                variants={cardItem}
                layout
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <motion.div 
                  className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col border border-gray-100"
                  variants={hoverEffect}
                  whileHover="hover"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={level.image} 
                      alt={level.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/90 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full shadow">
                      {level.target}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-gray-800">{level.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm">{level.description}</p>
                    
                    <div className="mb-5 flex-1">
                      <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">YOU'LL LEARN</h4>
                      <ul className="space-y-2">
                        {level.skills.map((skill, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-center text-sm"
                            whileHover={{ x: 5 }}
                          >
                            <FaCheck className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{skill}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                      <div className="flex items-center text-gray-500">
                        <FaRegClock className="mr-1.5 text-indigo-500" />
                        {level.duration}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <FaUserGraduate className="mr-1.5 text-indigo-500" />
                        {level.intensity}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                      <span className="font-bold text-indigo-700">{level.price}</span>
                      <Link to="/courses">
                        <motion.button 
                          className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                          whileHover={{ x: 3 }}
                        >
                          Enroll Now <FaArrowRight className="ml-1.5" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>

                {/* Hover overlay */}
                <AnimatePresence>
                  {hoveredCard === index && (
                    <motion.div 
                      className="absolute inset-0 bg-indigo-600/90 rounded-xl p-5 flex flex-col justify-center items-center text-white"
                      initial="initial"
                      animate="hover"
                      exit="initial"
                      variants={hoverContent}
                    >
                      <h3 className="text-xl font-bold mb-3">{level.title}</h3>
                      <p className="text-center text-indigo-100 mb-5">{level.description}</p>
                      <div className="grid grid-cols-2 gap-4 w-full mb-5">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{level.duration}</div>
                          <div className="text-xs text-indigo-200">Duration</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{level.price}</div>
                          <div className="text-xs text-indigo-200">Investment</div>
                        </div>
                      </div>
                      <Link to="/courses" className="w-full">
                        <button className="w-full py-2.5 bg-white text-indigo-700 font-semibold rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
                          Start Learning <FaArrowRight className="ml-2" />
                        </button>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Not sure which level is right for you?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Take our free assessment test and get personalized recommendations
          </p>
          <Link to="/assessment">
            <motion.button 
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Take Free Assessment
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LevelCards;