import React from 'react';
import { motion } from 'framer-motion';

const instructors = [
  {
    id: 1,
    name: "Sir Yasran Jan",
    specialization: "Corporate English",
    experience: "25+ years",
    bio: "Former corporate trainer specializing in presentations and negotiations",
    image: "/sir-yas.jpg"
  },
  {
    id: 2,
    name: "Sir Meboob",
    specialization: "Exam Preparation",
    experience: "25 years",
    bio: "Exam preparation expert with 95% student success rate",
    image: "/SIR-MEHBOB.jpeg"
  },
  {
    id: 3,
    name: "Sir Hafeez",
    specialization: "Pre-Beginning",
    experience: "25 years",
    bio: "Focuses on accent reduction and cultural fluency",
    image: "sir-hafeez.jpeg"
  },
  {
    id: 4,
    name: "Sir Ateeq-ur-Rehman",
    specialization: "Business English",
    experience: "25 years",
    bio: "Former corporate trainer specializing in presentations and negotiations",
    image: "SIRATEEQ2.jpeg"
  },
  {
    id: 5,
    name: "Sir Abid Nihal",
    specialization: "Explaining Grammer",
    experience: "25 years",
    bio: "Exam preparation expert with 95% student success rate",
    image: "/SIRABID.jpeg"
  },
  {
    id: 6,
    name: "Sir Shahjahan",
    specialization: "grammer",
    experience: "25 years",
    bio: "Specialist in research papers and academic publications",
    image: "SIR-SHAH.jpeg"
  },
  {
    id: 7,
    name: "Sir Abdul Rehman",
    specialization: "English Activities Games",
    experience: "25 years",
    bio: "Former corporate trainer specializing in presentations and negotiations",
    image: "SIRREHMAN (5).jpeg"
  },
];

const Instructors = () => {
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

  const item = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
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
      boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Expert Instructors</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Certified English language specialists with proven teaching methodologies
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {instructors.map(instructor => (
            <motion.div
              key={instructor.id}
              variants={item}
              whileHover="hover"
              className="group"
            >
              <motion.div
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all h-full flex flex-col items-center p-6"
                variants={hoverEffect}
              >
                <motion.div 
                  className="w-44 h-44 mb-6 relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 rounded-full border-4 border-white shadow-lg overflow-hidden">
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/instructor-placeholder.jpg";
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                <div className="text-center flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{instructor.name}</h3>
                  
                  <div className="flex justify-center flex-wrap items-center mb-3 gap-2">
                    {instructor.specialization && (
                      <motion.span 
                        className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        {instructor.specialization}
                      </motion.span>
                    )}
                    <span className="text-gray-500 text-sm">{instructor.experience} experience</span>
                  </div>

                  <p className="text-gray-600 mb-5 flex-1">{instructor.bio}</p>
                  
              
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Instructors;