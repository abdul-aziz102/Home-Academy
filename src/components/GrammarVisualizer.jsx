import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GrammarVisualizer = () => {
  const [activeTab, setActiveTab] = useState('tenses');
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState(null);

  const grammarConcepts = {
    tenses: [
      { 
        name: "Present Simple", 
        structure: "Subject + V1 (s/es for third person)",
        example: "She works at a bank. / They live in Paris.",
        usage: "Habits, general truths, permanent situations",
        rules: [
          "Add 's' or 'es' to verbs for he/she/it (3rd person singular)",
          "Use for routines (I work every day)",
          "Use for facts (Water boils at 100°C)"
        ],
        commonMistakes: [
          "Forgetting the 's' in 3rd person singular",
          "Using with temporary situations (wrong: 'I am working here since 2010')"
        ]
      },
      { 
        name: "Present Continuous", 
        structure: "Subject + am/is/are + V-ing",
        example: "I am studying English now. / They are playing football.",
        usage: "Actions happening now, temporary situations, future arrangements",
        rules: [
          "Use 'am' for I, 'is' for he/she/it, 'are' for you/we/they",
          "Some verbs are not normally used in continuous (know, like, want)",
          "Use for future arrangements (I'm meeting John tomorrow)"
        ],
        commonMistakes: [
          "Using with state verbs (wrong: 'I am knowing the answer')",
          "Confusing with present simple for routines"
        ]
      },
      { 
        name: "Past Simple", 
        structure: "Subject + V2 (regular: -ed / irregular: specific form)",
        example: "I worked yesterday. / She went to London last week.",
        usage: "Completed actions in the past, past habits",
        rules: [
          "Regular verbs add '-ed' (work → worked)",
          "Irregular verbs have special forms (go → went)",
          "Often used with past time expressions (yesterday, last week)"
        ],
        commonMistakes: [
          "Using present form for past (wrong: 'I go to school yesterday')",
          "Confusing irregular verb forms"
        ]
      },
      { 
        name: "Past Continuous", 
        structure: "Subject + was/were + V-ing",
        example: "I was reading when you called. / They were eating dinner at 8pm.",
        usage: "Ongoing past actions, interrupted actions, parallel actions",
        rules: [
          "Use 'was' for I/he/she/it, 'were' for you/we/they",
          "Often used with 'when' + simple past for interruptions",
          "Can describe atmosphere (It was raining, people were rushing)"
        ],
        commonMistakes: [
          "Confusing with past simple (wrong: 'I was go to school')",
          "Using for completed actions"
        ]
      },
      { 
        name: "Present Perfect", 
        structure: "Subject + have/has + V3",
        example: "I have visited London. / She has finished her work.",
        usage: "Experiences, changes, unfinished time periods, recent actions",
        rules: [
          "Use 'have' for I/you/we/they, 'has' for he/she/it",
          "Often used with 'ever', 'never', 'since', 'for', 'just'",
          "Focuses on result/experience rather than when it happened"
        ],
        commonMistakes: [
          "Using with specific past time (wrong: 'I have seen him yesterday')",
          "Confusing with past simple"
        ]
      }
    ],
    conditionals: [
      {
        name: "Zero Conditional",
        structure: "If + present simple, present simple",
        example: "If you heat ice, it melts.",
        usage: "General truths, scientific facts",
        rules: [
          "Both clauses use present simple",
          "Shows cause and effect relationships",
          "Can use 'when' instead of 'if' with no change in meaning"
        ],
        commonMistakes: [
          "Using other tenses (wrong: 'If you will heat ice, it will melt')",
          "Confusing with first conditional"
        ]
      },
      {
        name: "First Conditional",
        structure: "If + present simple, will + infinitive",
        example: "If it rains, we will stay home.",
        usage: "Real future possibilities, promises, warnings",
        rules: [
          "'If' clause uses present simple (not future)",
          "Main clause uses 'will' or other modal verbs",
          "Can reverse clauses (We will stay home if it rains)"
        ],
        commonMistakes: [
          "Using 'will' in the 'if' clause (wrong: 'If it will rain')",
          "Confusing with second conditional"
        ]
      },
      {
        name: "Second Conditional",
        structure: "If + past simple, would + infinitive",
        example: "If I won the lottery, I would buy a house.",
        usage: "Unreal/hypothetical present/future situations, advice",
        rules: [
          "'If' clause uses past simple (but refers to present/future)",
          "Use 'were' instead of 'was' for all subjects in formal English",
          "Often used for imaginary situations"
        ],
        commonMistakes: [
          "Using 'would' in the 'if' clause (wrong: 'If I would win')",
          "Confusing with first conditional"
        ]
      },
      {
        name: "Third Conditional",
        structure: "If + past perfect, would have + V3",
        example: "If I had studied harder, I would have passed the exam.",
        usage: "Unreal past situations, regrets, criticism",
        rules: [
          "Refers to impossible past situations",
          "Often expresses regret or criticism",
          "Can use 'could have' or 'might have' instead of 'would have'"
        ],
        commonMistakes: [
          "Mixing conditionals (wrong: 'If I had studied, I will pass')",
          "Using wrong verb forms"
        ]
      }
    ],
    modals: [
      {
        name: "Can/Could",
        structure: "Subject + can/could + infinitive",
        example: "I can swim. / She could speak French when she was young.",
        usage: "Ability, possibility, permission, requests",
        rules: [
          "'Can' for present ability, 'could' for past",
          "'Could' is more polite than 'can' for requests",
          "Negative is 'cannot' or 'can't'"
        ],
        commonMistakes: [
          "Using 'can' for future ability (wrong: 'I can do it tomorrow')",
          "Confusing 'could' with 'was able to' for single past achievements"
        ]
      },
      {
        name: "Must/Have to",
        structure: "Subject + must/have to + infinitive",
        example: "You must stop at red lights. / I have to work tomorrow.",
        usage: "Obligation, necessity, strong recommendations",
        rules: [
          "'Must' often indicates speaker's opinion",
          "'Have to' often indicates external obligation",
          "Negative forms have different meanings (mustn't vs don't have to)"
        ],
        commonMistakes: [
          "Confusing 'must' and 'have to' in negative",
          "Using 'must' for past obligation (wrong: 'I must go yesterday')"
        ]
      }
    ]
  };

  const generateQuizQuestion = (concept) => {
    const questions = {
      "Present Simple": {
        question: "Complete the sentence: She _____ (work) at a hospital.",
        answer: "works",
        explanation: "We use 'works' because it's third person singular (she) in present simple."
      },
      "Present Continuous": {
        question: "Which sentence is correct?",
        options: [
          "I am study English now.",
          "I studying English now.",
          "I am studying English now."
        ],
        answer: 2,
        explanation: "Present continuous requires 'am/is/are + verb-ing' form."
      },
      "First Conditional": {
        question: "Complete the sentence: If it _____ (rain), we _____ (stay) home.",
        answers: ["rains", "will stay"],
        explanation: "First conditional uses present simple in 'if' clause and 'will' in main clause."
      }
    };

    return questions[concept.name] || {
      question: `Write an example sentence using ${concept.name}`,
      type: 'free-response'
    };
  };

  const startQuiz = () => {
    setQuizQuestion(generateQuizQuestion(selectedConcept));
    setShowQuiz(true);
    setUserAnswer('');
    setQuizFeedback(null);
  };

  const checkAnswer = () => {
    if (!quizQuestion) return;
    
    let isCorrect = false;
    let feedbackMsg = '';
    
    if (quizQuestion.options) {
      isCorrect = userAnswer == quizQuestion.answer;
      feedbackMsg = isCorrect 
        ? 'Correct! ' + quizQuestion.explanation
        : 'Incorrect. The correct answer is: ' + quizQuestion.options[quizQuestion.answer];
    } else if (quizQuestion.answers) {
      const userAnswers = userAnswer.split(',').map(a => a.trim());
      isCorrect = userAnswers.length === quizQuestion.answers.length && 
                  userAnswers.every((a, i) => a === quizQuestion.answers[i]);
      feedbackMsg = isCorrect
        ? 'Perfect! ' + quizQuestion.explanation
        : `Almost! Correct answers are: ${quizQuestion.answers.join(' and ')}. ${quizQuestion.explanation}`;
    } else {
      // For free response, just show explanation
      isCorrect = true;
      feedbackMsg = 'Good attempt! Here are some correct examples: ' + 
                   selectedConcept.example;
    }
    
    setQuizFeedback({
      correct: isCorrect,
      message: feedbackMsg
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
    <div className="max-w-5xl  mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
        Grammar Visualizer
      </h2>
      
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {Object.keys(grammarConcepts).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSelectedConcept(null);
              setShowQuiz(false);
            }}
            className={`px-4 py-2 font-medium relative whitespace-nowrap ${
              activeTab === tab ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                layoutId="underline"
              />
            )}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-3">
          {grammarConcepts[activeTab].map((concept, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedConcept(concept);
                setShowQuiz(false);
              }}
              className={`p-4 rounded-lg cursor-pointer ${
                selectedConcept?.name === concept.name 
                  ? 'bg-indigo-100 border border-indigo-300' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <h3 className="font-semibold">{concept.name}</h3>
              <p className="text-sm text-gray-600">{concept.structure}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {selectedConcept && !showQuiz ? (
              <motion.div
                key={selectedConcept.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-indigo-50 rounded-xl p-6 h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-indigo-700">
                    {selectedConcept.name}
                  </h3>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </span>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Structure:</h4>
                    <motion.p 
                      className="bg-white p-3 rounded-lg font-mono"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {selectedConcept.structure}
                    </motion.p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Example:</h4>
                    <motion.p 
                      className="bg-white p-3 rounded-lg italic"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      "{selectedConcept.example}"
                    </motion.p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Usage:</h4>
                    <motion.p 
                      className="bg-white p-3 rounded-lg"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {selectedConcept.usage}
                    </motion.p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Key Rules:</h4>
                    <ul className="space-y-2">
                      {selectedConcept.rules.map((rule, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-start bg-white p-3 rounded-lg"
                        >
                          <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-2 mt-0.5">
                            {i + 1}
                          </span>
                          {rule}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  {selectedConcept.commonMistakes && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Common Mistakes:</h4>
                      <ul className="space-y-2">
                        {selectedConcept.commonMistakes.map((mistake, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="flex items-start bg-red-50 p-3 rounded-lg"
                          >
                            <span className="flex-shrink-0 w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-2 mt-0.5">
                              ✗
                            </span>
                            {mistake}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <motion.div 
                  className="mt-6 flex justify-end gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <button 
                    onClick={() => setShowQuiz(true)}
                    className="px-4 py-2 bg-white border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
                  >
                    View Examples
                  </button>
                  <button 
                    onClick={startQuiz}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Practice This Concept
                  </button>
                </motion.div>
              </motion.div>
            ) : showQuiz ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-indigo-50 rounded-xl p-6 h-full"
              >
                <div className="flex items-center mb-6">
                  <button 
                    onClick={() => setShowQuiz(false)}
                    className="mr-4 p-2 rounded-full hover:bg-indigo-100"
                  >
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                  <h3 className="text-xl font-bold text-indigo-700">
                    Practice: {selectedConcept.name}
                  </h3>
                </div>
                
                {quizQuestion ? (
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-lg mb-3">{quizQuestion.question}</h4>
                      
                      {quizQuestion.options ? (
                        <div className="space-y-3">
                          {quizQuestion.options.map((option, i) => (
                            <div 
                              key={i}
                              className={`p-3 border rounded-lg cursor-pointer ${
                                userAnswer == i 
                                  ? 'border-indigo-500 bg-indigo-50' 
                                  : 'border-gray-200 hover:bg-gray-50'
                              }`}
                              onClick={() => setUserAnswer(i)}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      ) : quizQuestion.answers ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder="Enter your answers separated by commas"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />
                          <p className="text-sm text-gray-500">
                            Example format: "plays, will go"
                          </p>
                        </div>
                      ) : (
                        <textarea
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          placeholder="Write your example sentence here"
                          className="w-full p-3 border border-gray-300 rounded-lg h-24"
                        />
                      )}
                    </div>
                    
                    {quizFeedback ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg ${
                          quizFeedback.correct 
                            ? 'bg-green-100 border border-green-200' 
                            : 'bg-yellow-100 border border-yellow-200'
                        }`}
                      >
                        <p className={`font-medium ${
                          quizFeedback.correct ? 'text-green-800' : 'text-yellow-800'
                        }`}>
                          {quizFeedback.message}
                        </p>
                        <button 
                          onClick={() => {
                            setQuizFeedback(null);
                            setUserAnswer('');
                            setQuizQuestion(generateQuizQuestion(selectedConcept));
                          }}
                          className="mt-3 text-sm text-indigo-600 hover:text-indigo-500"
                        >
                          Try another question
                        </button>
                      </motion.div>
                    ) : (
                      <button
                        onClick={checkAnswer}
                        disabled={!userAnswer}
                        className={`px-4 py-2 rounded-lg ${
                          userAnswer 
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Check Answer
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-lg text-center">
                    <p className="text-gray-500">Loading quiz questions...</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-indigo-50 rounded-xl p-6 h-full flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Select a grammar concept</h3>
                <p className="text-gray-600 text-center max-w-md">
                  Choose from the list to see detailed explanations, examples, and practice exercises.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
    </div>
  );
};

export default GrammarVisualizer;