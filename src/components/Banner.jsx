import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCheckCircle, FaPlay, FaChalkboardTeacher,
  FaCertificate, FaUserTie, FaGlobeAmericas
} from 'react-icons/fa';
import { RiEnglishInput } from 'react-icons/ri';
import CountUp from 'react-countup';

const marqueeItems = [
  "Spoken English", "Grammar Practice", "Business Communication",
  "IELTS Prep", "Vocabulary Booster", "Accent Training",
  "TOEFL Preparation", "Interview Skills", "Presentation Training",
  "Academic Writing", "Conversational Practice", "Pronunciation Mastery"
];

const Banner = () => {
  const [activeTab, setActiveTab] = useState(0);
  const benefits = [
    "Personalized learning plans",
    "Certified native-level instructors",
    "Flexible class schedules",
    "Progress tracking dashboard",
    "Job interview preparation"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % benefits.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative pt-14 pb-32 lg:py-20 flex items-center min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Content */}
          <div className="lg:w-1/2 w-full">
            <div className="mb-4 flex items-center bg-white/80 rounded-full py-1 px-4 w-fit shadow-sm">
              <RiEnglishInput className="text-indigo-600 mr-2" />
              <span className="font-medium text-indigo-700 text-sm sm:text-base">
                Lyari's Premier English Academy
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 leading-tight">
              Unlock Your <span className="text-indigo-700">English Potential</span> in{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Karachi</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-300/60 z-0"></span>
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-full sm:max-w-lg">
              Expert-led coaching for all levels. Achieve fluency for daily life,
              exams, or global careers — start your journey today with our proven methodology.
            </p>

            <div className="mb-8 space-y-3">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`flex items-center transition-all duration-300 ${activeTab === index ? 'text-indigo-700 scale-[1.02]' : 'text-gray-600'}`}
                >
                  <FaCheckCircle className={`mr-3 ${activeTab === index ? 'opacity-100' : 'opacity-60'}`} />
                  <span className="font-medium text-sm sm:text-base">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link to="/courses">
                <button className="px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-lg transition-all flex items-center shadow-lg hover:shadow-indigo-300/50 text-sm sm:text-base">
                  Start Learning Now
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </Link>
              <Link to="/demo">
                <button className="px-6 py-3 border-2 border-indigo-700 text-indigo-700 hover:bg-indigo-50 font-semibold rounded-lg transition-all flex items-center text-sm sm:text-base">
                  <FaPlay className="mr-2" />
                  Watch Demo
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Students Trained", value: 20000, suffix: "+" },
                { label: "Success Rate", value: 97, suffix: "%" },
                { label: "Expert Teachers", value: 30, suffix: "+" },
                { label: "Average Rating", value: 4.9, suffix: "/5", decimals: 1 }
              ].map((item, index) => (
                <div key={index} className="bg-white/80 p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                  <div className="text-2xl font-bold text-indigo-700">
                    <CountUp
                      end={item.value}
                      duration={2.5}
                      decimals={item.decimals || 0}
                    />
                    {item.suffix}
                  </div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 w-full relative mt-10 lg:mt-0">
            <div className="relative max-w-3xl mx-auto">
              <img
                src="/home member.jpg"
                alt="English learning session at Home Academy"
                className="rounded-2xl shadow-2xl w-full border-4 border-white object-cover h-[450px] sm:h-[500px]"
              />

              {/* Floating Labels */}
              <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3">
                    <FaChalkboardTeacher className="text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-sm">Certified Teachers</div>
                    <div className="text-xs text-gray-500">15+ Professionals</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-5 -right-5 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <FaCertificate className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-sm">Recognized</div>
                    <div className="text-xs text-gray-500">Certification</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/4 -right-10 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden lg:block">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <FaUserTie className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-sm">Career</div>
                    <div className="text-xs text-gray-500">Preparation</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-1/4 -left-10 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden lg:block">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <FaGlobeAmericas className="text-purple-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-sm">Global</div>
                    <div className="text-xs text-gray-500">Standards</div>
                  </div>
                </div>
              </div>

              {/* Student Avatars */}
              <div className="absolute -bottom-20 left-0 right-0 flex flex-col items-center">
                <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 w-max">
                  <div className="flex items-center space-x-6">
                    <div className="flex -space-x-2">
                      <img src="/stu4.jpg" alt="Student" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                      <img src="/stu5.jpg" alt="Student" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                      <img src="/stu6.jpg" alt="Student" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 shadow-sm">
                        1.2K+
                      </div>
                    </div>
                    <div className="text-gray-600">
                      <p className="font-medium text-sm">Trusted by learners from</p>
                      <div className="flex items-center">
                        <div className="flex text-yellow-500 mr-2">
                          {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                        </div>
                        <span className="text-gray-700 font-medium text-sm">4.9/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-24 overflow-hidden whitespace-nowrap relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-20 before:bg-gradient-to-r before:from-white before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-20 after:bg-gradient-to-l after:from-white after:to-transparent after:z-10">
          <div className="animate-marquee text-indigo-600 font-medium text-sm sm:text-base space-x-10 inline-block">
            {marqueeItems.concat(marqueeItems).map((item, index) => (
              <span key={index} className="inline-flex items-center mx-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative bottom strip */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-sm z-0"></div>
    </div>
  );
};

export default Banner;
