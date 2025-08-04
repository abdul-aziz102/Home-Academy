import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PronunciationTrainer = () => {
  const [activeSound, setActiveSound] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({ correct: false, message: '' });
  const [userAudioUrl, setUserAudioUrl] = useState(null);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  
  // More comprehensive phonetic sounds
  const sounds = [
    { 
      symbol: 'θ', 
      ipa: '/θ/', 
      word: 'think', 
      example: 'I think about this often.', 
      audio: '/sounds/th.mp3',
      tip: 'Place tongue between teeth and blow air (unvoiced)',
      difficulty: 'medium'
    },
    { 
      symbol: 'ð', 
      ipa: '/ð/', 
      word: 'this', 
      example: 'This is the right way.', 
      audio: '/sounds/th-voiced.mp3',
      tip: 'Like θ but with vocal cord vibration (voiced)',
      difficulty: 'medium'
    },
    { 
      symbol: 'ʃ', 
      ipa: '/ʃ/', 
      word: 'shoe', 
      example: 'She sells sea shells.', 
      audio: '/sounds/sh.mp3',
      tip: 'Like "sh", lips rounded slightly forward',
      difficulty: 'easy'
    },
    { 
      symbol: 'ŋ', 
      ipa: '/ŋ/', 
      word: 'sing', 
      example: 'I love to sing songs.', 
      audio: '/sounds/ng.mp3',
      tip: 'Nasal sound at back of mouth like "n" in "song"',
      difficulty: 'hard'
    },
  ];

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const playSound = (sound) => {
    if (audioRef.current) {
      audioRef.current.src = sound.audio;
      audioRef.current.play();
    }
    setActiveSound(sound);
    setShowFeedback(false);
    setUserAudioUrl(null);
    setShowVisualizer(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setUserAudioUrl(audioUrl);
        analyzePronunciation();
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      // Auto-stop after 5 seconds
      setTimeout(() => {
        stopRecording();
      }, 5000);
      
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setFeedback({
        correct: false,
        message: 'Microphone access denied. Please allow microphone permissions.'
      });
      setShowFeedback(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      clearInterval(timerRef.current);
      setIsRecording(false);
    }
  };

  const analyzePronunciation = () => {
    // In a real app, this would call a backend API for speech analysis
    // For demo, we'll simulate analysis with some conditions
    
    // Simulate different feedback based on sound difficulty
    let isCorrect;
    let message;
    
    if (activeSound.difficulty === 'easy') {
      isCorrect = Math.random() > 0.3;
      message = isCorrect 
        ? 'Perfect! You mastered this sound.' 
        : 'Close! Try rounding your lips more.';
    } else if (activeSound.difficulty === 'medium') {
      isCorrect = Math.random() > 0.5;
      message = isCorrect 
        ? 'Great job! Your pronunciation is clear.' 
        : 'Almost! Focus on tongue position.';
    } else {
      isCorrect = Math.random() > 0.7;
      message = isCorrect 
        ? 'Excellent! This is a difficult sound.' 
        : 'Keep practicing! This sound takes time.';
    }
    
    setFeedback({ correct: isCorrect, message });
    setShowFeedback(true);
  };

  const toggleVisualizer = () => {
    setShowVisualizer(!showVisualizer);
  };

  return (
    <div className="max-w-3xl w-full  mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
        Pronunciation Trainer
      </h2>
      
      <audio ref={audioRef} />
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Select a sound to practice:
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {sounds.map((sound, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => playSound(sound)}
              className={`p-4 rounded-lg flex flex-col items-center transition-colors ${
                activeSound?.symbol === sound.symbol 
                  ? 'bg-indigo-100 border-2 border-indigo-300' 
                  : 'bg-gray-50 hover:bg-gray-100'
              } ${
                sound.difficulty === 'easy' ? 'border-b-4 border-green-400' :
                sound.difficulty === 'medium' ? 'border-b-4 border-yellow-400' :
                'border-b-4 border-red-400'
              }`}
            >
              <span className="text-4xl font-bold mb-1">{sound.symbol}</span>
              <span className="text-xs text-gray-500 mb-1">{sound.ipa}</span>
              <span className="text-sm font-medium">{sound.word}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {activeSound && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-indigo-50 rounded-xl p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <motion.div 
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md relative">
                    <span className="text-5xl font-bold">{activeSound.symbol}</span>
                    <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      activeSound.difficulty === 'easy' ? 'bg-green-500' :
                      activeSound.difficulty === 'medium' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}>
                      {activeSound.difficulty === 'easy' ? 'E' :
                       activeSound.difficulty === 'medium' ? 'M' : 'H'}
                    </div>
                  </div>
                </motion.div>
                
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{activeSound.word} <span className="text-indigo-600">{activeSound.ipa}</span></h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      activeSound.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      activeSound.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {activeSound.difficulty} difficulty
                    </span>
                  </div>
                  
                  <p className="text-gray-700 italic mb-3">"{activeSound.example}"</p>
                  <p className="text-sm text-gray-600 mb-4">{activeSound.tip}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => playSound(activeSound)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
                      </svg>
                      Hear Sound
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startRecording}
                      disabled={isRecording}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                        isRecording 
                          ? 'bg-gray-400 text-white' 
                          : 'bg-white border border-indigo-600 text-indigo-600'
                      }`}
                    >
                      {isRecording ? (
                        <>
                          <motion.span 
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-2 h-2 bg-red-500 rounded-full"
                          />
                          Recording ({5 - recordingTime}s)
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                          Record Yourself
                        </>
                      )}
                    </motion.button>
                    
                    {userAudioUrl && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => new Audio(userAudioUrl).play()}
                          className="px-4 py-2 bg-green-100 text-green-800 rounded-lg flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Playback
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={toggleVisualizer}
                          className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                          </svg>
                          {showVisualizer ? 'Hide' : 'Show'} Waveform
                        </motion.button>
                      </>
                    )}
                  </div>
                  
                  {showVisualizer && userAudioUrl && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="bg-white p-4 rounded-lg mb-4"
                    >
                      <div className="h-20 bg-gray-100 rounded flex items-center justify-center">
                        <p className="text-gray-500">Audio waveform visualization would appear here</p>
                      </div>
                    </motion.div>
                  )}
                  
                  <AnimatePresence>
                    {showFeedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`mt-4 p-4 rounded-lg ${
                          feedback.correct 
                            ? 'bg-green-100 border border-green-200' 
                            : 'bg-yellow-100 border border-yellow-200'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 p-1 rounded-full ${
                            feedback.correct ? 'bg-green-200' : 'bg-yellow-200'
                          }`}>
                            {feedback.correct ? (
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                          </div>
                          <div className="ml-3">
                            <p className={`text-sm font-medium ${
                              feedback.correct ? 'text-green-800' : 'text-yellow-800'
                            }`}>
                              {feedback.message}
                            </p>
                            {!feedback.correct && (
                              <div className="mt-3 space-y-2">
                                <button 
                                  onClick={() => playSound(activeSound)}
                                  className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Hear example again
                                </button>
                                <button 
                                  onClick={startRecording}
                                  className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                  </svg>
                                  Try recording again
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!activeSound && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-indigo-50 rounded-xl p-6 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Select a sound to practice</h3>
          <p className="text-gray-600">Choose from the phonetic sounds above to begin pronunciation training</p>
        </motion.div>
      )}
    </div>
   
  );
};

export default PronunciationTrainer;