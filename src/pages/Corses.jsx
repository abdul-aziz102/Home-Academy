import React from 'react';
import Cardsinfor from '../components/Cardsinfor';
import GrammarVisualizer from '../components/GrammarVisualizer';
import PronunciationTrainer from '../components/PronunciationTrainer';
import SkillAssessment from '../components/SkillAssessment';
import { Link } from 'react-router-dom';
import { FaCheck, FaChalkboardTeacher, FaRegClock, FaCertificate, FaLanguage, FaUserGraduate } from 'react-icons/fa';

const Corses = () => {
  const levels = [
    {
      title: "Pre-Beginner",
      description: "Start from scratch with basic vocabulary, greetings, and simple sentences.",
      image: "/level pre.png",
      skills: ["Alphabet & sounds", "Basic greetings", "Simple questions", "Everyday words"],
      target: "Absolute beginners",
      price: "Rs. 3200 (3 months)",
      duration: "12 weeks",
      classes: "3 classes/week"
    },
    {
      title: "Beginner",
      description: "Build foundation with present tense, daily conversations, and essential grammar.",
      image: "/level bg.png",
      skills: ["Present tenses", "Daily routines", "Shopping vocabulary", "Simple directions"],
      target: "Basic understanding",
      price: "Rs. 3800 (3 months)",
      duration: "12 weeks",
      classes: "3 classes/week"
    },
    {
      title: "Level 1 (Elementary)",
      description: "Handle basic social situations, read simple texts, and write short paragraphs.",
      image: "/level1.png",
      skills: ["Past tenses", "Describing people", "Writing emails", "Telling stories"],
      target: "CEFR A1",
      price: "Rs. 4000 (3 months)",
      duration: "12 weeks",
      classes: "3 classes/week"
    },
    {
      title: "Level 2 (Pre-Intermediate)",
      description: "Express opinions, understand main points in conversations, and write cohesive texts.",
      image: "/level2.png",
      skills: ["Future tenses", "Comparing things", "News articles", "Phone conversations"],
      target: "CEFR A2",
      price: "Rs. 4200 (3 months)",
      duration: "12 weeks",
      classes: "3 classes/week"
    },
    {
      title: "Level 3 (Intermediate)",
      description: "Discuss various topics, understand native speakers, and write detailed texts.",
      image: "/level3.png",
      skills: ["Conditionals", "Debating skills", "Formal letters", "TV shows understanding"],
      target: "CEFR B1",
      price: "Rs. 4500 (3 months)",
      duration: "12 weeks",
      classes: "3 classes/week"
    },
    {
      title: "Level 4 (Upper-Intermediate)",
      description: "Communicate fluently in professional contexts with nuanced language use.",
      image: "/level4.png",
      skills: ["Complex grammar", "Academic writing", "Presentations", "Idiomatic expressions"],
      target: "CEFR B2",
      price: "Rs. 4800 (3 months)",
      duration: "12 weeks",
      classes: "3 classes/week"
    },
    {
      title: "Level 5",
      description: "Master English for academic excellence, business leadership, and cultural nuance.",
      image: "/level5.png",
      skills: ["Subtle meanings", "Professional reports", "Negotiations", "Literary analysis"],
      target: "CEFR C1/C2",
      price: "Rs. 5000 (3 months)",
      duration: "12 weeks",
      classes: "3 classes/week"
    },
    {
      title: "Level (Advanced)",
      description: "Master English for academic excellence, business leadership, and cultural nuance.",
      image: "/leceladv.png",
      skills: ["Subtle meanings", "Professional reports", "Negotiations", "Literary analysis"],
      target: "CEFR C1/C2",
      price: "Rs. 5500 (3 months)",
      duration: "12 weeks",
      classes: "3 classes/week"
    }
  ];

  const features = [
    {
      icon: <FaChalkboardTeacher className="text-3xl mb-3 text-indigo-600" />,
      title: "Expert Instructors",
      description: "Certified teachers with years of experience in English language education"
    },
    {
      icon: <FaRegClock className="text-3xl mb-3 text-indigo-600" />,
      title: "Flexible Scheduling",
      description: "Morning, afternoon, and evening classes to fit your schedule"
    },
    {
      icon: <FaCertificate className="text-3xl mb-3 text-indigo-600" />,
      title: "Certification",
      description: "Receive recognized certificates upon course completion"
    },
    {
      icon: <FaLanguage className="text-3xl mb-3 text-indigo-600" />,
      title: "Interactive Learning",
      description: "Engaging activities and real-world practice scenarios"
    },
    {
      icon: <FaUserGraduate className="text-3xl mb-3 text-indigo-600" />,
      title: "Progress Tracking",
      description: "Regular assessments to monitor your improvement"
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white py-16">
        <div className="container mx-auto px-5 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">English Language Courses</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Transform your communication skills with our comprehensive English programs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register"> 
            <button className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
              Enroll Now
            </button>
            </Link>
         
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Why Choose Our Courses</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our proven methodology combines traditional teaching with modern techniques
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Levels Section */}
      <section className="py-16">
        <div className="container mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-indigo-700 mb-3">Our English Levels</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Structured progression from absolute beginner to advanced mastery
            </p>
          </div>

          {/* Level Selector */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button type="button" className="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-l-lg hover:bg-indigo-200">
                All Levels
              </button>
              <button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100">
                Beginner
              </button>
              <button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100">
                Intermediate
              </button>
              <button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 rounded-r-lg">
                Advanced
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {levels.map((level, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 transform hover:-translate-y-1 transition-transform"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={level.image}
                    alt={level.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-16"></div>
                  <span className="absolute bottom-4 left-4 text-white font-bold text-lg">
                    {level.title}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                      {level.target}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <FaRegClock className="mr-1" /> {level.duration}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{level.description}</p>

                  <div className="mb-5">
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">YOU'LL LEARN:</h4>
                    <ul className="space-y-2">
                      {level.skills.map((skill, i) => (
                        <li key={i} className="flex items-start">
                          <FaCheck className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-semibold text-green-600">
                        {level.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {level.classes}
                      </span>
                    </div>
                    <Link to='/register'>
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition duration-300">
                      Enroll Now
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-indigo-700 mb-3">What Our Students Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Success stories from our English language learners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img src="mudasir.png" alt="Student" className="w-12 h-12 rounded-full  mr-4" />
                <div>
                  <h4 className="font-semibold">Muddasir</h4>
                  <p className="text-sm text-gray-500">Beginner Level Graduate</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"The teachers at Home Academy are incredibly patient and knowledgeable. I went from knowing nothing to having basic conversations in just 3 months!"</p>
              <div className="flex mt-3 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img src="talal.png" alt="Student" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Muhummad Talal</h4>
                  <p className="text-sm text-gray-500">Intermediate Level</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"The interactive classes and practical exercises helped me improve my English for my job. I can now communicate confidently with international clients."</p>
              <div className="flex mt-3 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img src="bilala.png" alt="Student" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Muhummad Bilal</h4>
                  <p className="text-sm text-gray-500">Advanced Level</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"Thanks to Home Academy, I scored band 7.5 in IELTS and got admission to my dream university abroad. The personalized attention made all the difference."</p>
              <div className="flex mt-3 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-700 to-blue-600 text-white">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your English?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of successful students who achieved their language goals with us
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to='/register'>
            <button className="bg-white text-indigo-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 text-lg">
              Enroll Now
            </button>
            </Link>
            <Link to="/contact">
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-700 transition duration-300 text-lg">
              Contact Us
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Components */}
      <Cardsinfor />
      <SkillAssessment />
      <GrammarVisualizer />
      <PronunciationTrainer />
    </div>
  );
};

export default Corses;