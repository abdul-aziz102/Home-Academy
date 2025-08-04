import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [skillLevel, setSkillLevel] = useState(null);
  const [subSkills, setSubSkills] = useState({
    speaking: 0,
    listening: 0,
    grammar: 0,
    vocabulary: 0,
    writing: 0
  });

  const questions = [
    // Speaking Skills
    {
      id: 1,
      skill: 'speaking',
      question: "How comfortable are you with basic English conversations?",
      options: [
        "I don't understand any English",
        "I know a few words/phrases but can't form sentences",
        "I can have very simple conversations with pauses",
        "I can discuss familiar topics with some mistakes",
        "I'm fluent in conversations on various topics"
      ]
    },
    {
      id: 2,
      skill: 'speaking',
      question: "How well can you describe your daily routine in English?",
      options: [
        "I can't describe my routine at all",
        "I can say a few words about my day",
        "I can describe basic activities with simple sentences",
        "I can describe my routine well with some mistakes",
        "I can describe it fluently with details and examples"
      ]
    },

    // Listening Skills
    {
      id: 3,
      skill: 'listening',
      question: "How well do you understand spoken English in movies/TV shows?",
      options: [
        "I don't understand anything without subtitles",
        "I recognize some words but not full sentences",
        "I understand basic conversations with clear speech",
        "I understand most content but miss some details",
        "I understand native speakers easily"
      ]
    },
    {
      id: 4,
      skill: 'listening',
      question: "Can you follow phone conversations in English?",
      options: [
        "No, I can't understand phone conversations at all",
        "Only if the speaker talks very slowly and simply",
        "Basic conversations if the topic is familiar",
        "Most conversations but I might ask to repeat sometimes",
        "Yes, I can understand phone calls easily"
      ]
    },

    // Grammar Skills
    {
      id: 5,
      skill: 'grammar',
      question: "How would you rate your knowledge of English tenses?",
      options: [
        "I don't know any tenses",
        "I know only present simple tense",
        "I know present, past and future simple tenses",
        "I know most tenses but make some mistakes",
        "I have advanced knowledge of all tenses"
      ]
    },
    {
      id: 6,
      skill: 'grammar',
      question: "How comfortable are you with complex grammar structures?",
      options: [
        "I don't know any complex structures",
        "I know basic conjunctions (and, but, because)",
        "I can use relative clauses and some conditionals",
        "I can use most complex structures with some mistakes",
        "I'm comfortable with all advanced grammar"
      ]
    },

    // Vocabulary
    {
      id: 7,
      skill: 'vocabulary',
      question: "How extensive is your English vocabulary?",
      options: [
        "I know less than 100 words",
        "I know basic everyday words (200-500)",
        "I can talk about familiar topics (1000-1500 words)",
        "I can discuss various topics (2000-3000 words)",
        "I have an extensive vocabulary (4000+ words)"
      ]
    },
    {
      id: 8,
      skill: 'vocabulary',
      question: "How well can you express abstract ideas in English?",
      options: [
        "I can't express abstract ideas at all",
        "I can express very simple opinions",
        "I can discuss some abstract topics with limitations",
        "I can discuss most abstract topics with some difficulty",
        "I can discuss complex abstract ideas fluently"
      ]
    },

    // Writing Skills
    {
      id: 9,
      skill: 'writing',
      question: "How comfortable are you writing emails/letters in English?",
      options: [
        "I can't write anything in English",
        "I can write very short simple messages",
        "I can write basic emails with simple sentences",
        "I can write detailed emails with some mistakes",
        "I can write professional emails fluently"
      ]
    },
    {
      id: 10,
      skill: 'writing',
      question: "Can you write essays or reports in English?",
      options: [
        "No, I can't write essays at all",
        "Only very short texts with many mistakes",
        "Basic essays with simple structure",
        "Detailed essays with some grammatical errors",
        "Yes, I can write complex essays fluently"
      ]
    }
  ];

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    // Update sub-skill scores
    const currentSkill = questions[currentQuestion].skill;
    setSubSkills(prev => ({
      ...prev,
      [currentSkill]: prev[currentSkill] + answerIndex
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
      setShowResult(true);
    }
  };

  const calculateResult = (answers) => {
    const average = answers.reduce((a, b) => a + b, 0) / answers.length;
    let level;
    
    if (average < 1.5) level = "Pre-Beginner (A0)";
    else if (average < 2.5) level = "Beginner (A1)";
    else if (average < 3.5) level = "Pre-Intermediate (A2-B1)";
    else if (average < 4.5) level = "Intermediate (B1-B2)";
    else level = "Advanced (C1-C2)";
    
    setSkillLevel(level);
  };

  const restartAssessment = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setSkillLevel(null);
    setSubSkills({
      speaking: 0,
      listening: 0,
      grammar: 0,
      vocabulary: 0,
      writing: 0
    });
  };

  const getSkillLevel = (score, maxPossible) => {
    const percentage = (score / maxPossible) * 100;
    if (percentage < 20) return 'Very Basic';
    if (percentage < 40) return 'Basic';
    if (percentage < 60) return 'Intermediate';
    if (percentage < 80) return 'Advanced';
    return 'Fluent';
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
        English Skill Assessment
      </h2>
      
      <div className="relative min-h-[500px] overflow-hidden">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
              className="absolute inset-0 p-4"
            >
              <div className="h-full flex flex-col">
                <div className="mb-6">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      initial={{ width: "0%" }}
                      animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span className="capitalize">{questions[currentQuestion].skill}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {questions[currentQuestion].question}
                </h3>
                
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(index)}
                      className={`w-full p-4 text-left border rounded-lg transition-colors ${
                        answers[currentQuestion] === index 
                          ? 'border-indigo-500 bg-indigo-50' 
                          : 'border-gray-200 hover:bg-indigo-50 hover:border-indigo-200'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border mr-3 flex-shrink-0 ${
                          answers[currentQuestion] === index 
                            ? 'border-indigo-500 bg-indigo-500' 
                            : 'border-gray-300'
                        }`}></div>
                        {option}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <div className="w-full max-w-2xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto"
                >
                  <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                  Your English Level: {skillLevel}
                </h3>
                
                <p className="text-gray-600 mb-8 text-center">
                  Based on your answers, we recommend starting with our {skillLevel} level courses.
                </p>
                
                <div className="bg-indigo-50 rounded-xl p-6 mb-8">
                  <h4 className="font-semibold text-lg text-indigo-700 mb-4">Skill Breakdown</h4>
                  <div className="space-y-4">
                    {Object.entries(subSkills).map(([skill, score]) => {
                      const maxPossible = questions.filter(q => q.skill === skill).length * 4;
                      const level = getSkillLevel(score, maxPossible);
                      return (
                        <div key={skill} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="capitalize font-medium">{skill}</span>
                            <span className="text-gray-600">{level}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full bg-indigo-600" 
                              style={{ width: `${(score / maxPossible) * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={restartAssessment}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700"
                  >
                    Retake Assessment
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
                  >
                    View Recommended Courses
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillAssessment;