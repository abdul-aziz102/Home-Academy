import React from 'react';
import { motion } from 'framer-motion';
import Instructors from '../components/Instructors';

const About = () => {
  const features = [
    {
      title: "Interactive Lessons",
      description: "Engaging activities designed for all learning styles",
      icon: "🎯"
    },
    {
      title: "Expert Instructors",
      description: "Certified teachers with 5+ years of experience",
      icon: "👩‍🏫"
    },
    {
      title: "Personalized Learning",
      description: "Customized paths for each student's goals",
      icon: "📊"
    },
    {
      title: "Practical Materials",
      description: "Real-world conversation scenarios and exercises",
      icon: "💬"
    },
    {
      title: "Flexible Scheduling",
      description: "Learn anytime, anywhere at your own pace",
      icon: "⏱️"
    },
    {
      title: "Progress Tracking",
      description: "Regular assessments and feedback",
      icon: "📈"
    }
  ];

  const stats = [
    { value: "20000+", label: "Students Taught" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "15+", label: "Years Experience" },
    { value: "24/7", label: "Support Available" }
  ];

  return (
    <>
      <section className="bg-white text-gray-800">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-indigo-500 to-blue-600 py-20 px-6 text-white overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-center mb-6"
            >
              About Home Academy
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl text-center mb-8 max-w-3xl mx-auto"
            >
              Empowering learners to speak English confidently and unlock global opportunities
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center"
            >
              <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                Meet Our Team
              </button>
            </motion.div>
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat"></div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="lear.png"
                alt="Students learning English"
                className="w-full rounded-xl shadow-xl border-8 border-white"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-indigo-600 mb-6">Why Choose Home Academy?</h3>
              <p className="text-gray-700 mb-8 text-lg">
                We're not just another language school - we're a community dedicated to your success. 
                Our proven methodology combines the best of traditional teaching with innovative 
                technology to deliver exceptional results.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-indigo-50 p-4 rounded-lg border border-indigo-100"
                  >
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <h4 className="font-semibold text-indigo-700">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-indigo-50 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h3 className="text-3xl font-bold text-center text-indigo-600 mb-12">
              Our Impact in Numbers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
          >
            <h3 className="text-3xl font-bold text-indigo-600 mb-6">Our Mission & Vision</h3>
            <p className="text-gray-700 text-lg mb-6">
              At Home Academy, we believe language should never be a barrier to opportunity. 
              Our mission is to provide accessible, high-quality English education that empowers 
              individuals to connect, grow, and succeed in a globalized world.
            </p>
            <p className="text-gray-700 text-lg">
              We envision a world where everyone has the confidence and ability to communicate 
              effectively in English, opening doors to education, career advancement, and 
              cross-cultural understanding.
            </p>
          </motion.div>
        </div>

        {/* Principal Section */}
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h3 className="text-3xl font-bold text-center text-indigo-700 mb-12">
            Leadership
          </h3>
          
          <div className="flex flex-col md:flex-row items-center gap-12 bg-white p-8 rounded-xl shadow-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="/principel.jpg"
                alt="Principal"
                className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-indigo-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h4 className="text-2xl font-bold text-indigo-800 mb-2">Sir Naeem</h4>
              <p className="text-indigo-600 font-medium mb-4">Principal & Academic Director</p>
              
              <div className="prose text-gray-700 mb-6">
                <p>
                  With over 15 years of experience in English language education, Sir Naeem has 
                  dedicated his career to developing innovative teaching methodologies that make 
                  language learning accessible and effective for all students.
                </p>
                <p>
                  As the founder of Home Academy, he has created a learning environment that 
                  combines academic rigor with personalized attention, ensuring each student 
                  achieves their full potential.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {['Leadership', 'Innovation', 'Student Success', 'Educational Excellence'].map((tag, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Instructors />
    </>
  );
};

export default About;