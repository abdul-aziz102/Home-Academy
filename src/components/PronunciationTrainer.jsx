import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sounds = [
  { symbol:'θ', ipa:'/θ/', word:'think',  example:'I think about this often.',    audio:'/sounds/th.mp3',       tip:'Place tongue between teeth and blow air (unvoiced)', difficulty:'medium', color:'#f59e0b' },
  { symbol:'ð', ipa:'/ð/', word:'this',   example:'This is the right way.',        audio:'/sounds/th-voiced.mp3', tip:'Like θ but with vocal cord vibration (voiced)',     difficulty:'medium', color:'#8b5cf6' },
  { symbol:'ʃ', ipa:'/ʃ/', word:'shoe',   example:'She sells sea shells.',         audio:'/sounds/sh.mp3',       tip:'Lips rounded slightly forward, like "sh"',           difficulty:'easy',   color:'#10b981' },
  { symbol:'ŋ', ipa:'/ŋ/', word:'sing',   example:'I love to sing songs.',         audio:'/sounds/ng.mp3',       tip:'Nasal sound at back of mouth like "n" in "song"',    difficulty:'hard',   color:'#ec4899' },
];

const diffBadge = { easy:'#10b981', medium:'#f59e0b', hard:'#ef4444' };

const PronunciationTrainer = () => {
  const [activeSound,    setActiveSound]    = useState(null);
  const [isRecording,    setIsRecording]    = useState(false);
  const [showFeedback,   setShowFeedback]   = useState(false);
  const [feedback,       setFeedback]       = useState({ correct:false, message:'' });
  const [userAudioUrl,   setUserAudioUrl]   = useState(null);
  const [recordingTime,  setRecordingTime]  = useState(0);
  const audioRef         = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef        = useRef([]);
  const timerRef         = useRef(null);

  useEffect(() => () => {
    clearInterval(timerRef.current);
    if (mediaRecorderRef.current?.state !== 'inactive') mediaRecorderRef.current?.stop();
  }, []);

  const playSound = (sound) => {
    if (audioRef.current) { audioRef.current.src = sound.audio; audioRef.current.play(); }
    setActiveSound(sound); setShowFeedback(false); setUserAudioUrl(null);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type:'audio/wav' });
        setUserAudioUrl(URL.createObjectURL(blob));
        analyzePronunciation();
        stream.getTracks().forEach(t => t.stop());
      };
      mediaRecorderRef.current.start();
      setIsRecording(true); setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime(p => p+1), 1000);
      setTimeout(stopRecording, 5000);
    } catch {
      setFeedback({ correct:false, message:'Microphone access denied. Please allow microphone permissions.' });
      setShowFeedback(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state !== 'inactive') {
      mediaRecorderRef.current.stop(); clearInterval(timerRef.current); setIsRecording(false);
    }
  };

  const analyzePronunciation = () => {
    const d = activeSound?.difficulty;
    const threshold = d==='easy' ? 0.3 : d==='medium' ? 0.5 : 0.7;
    const ok = Math.random() > threshold;
    setFeedback({
      correct: ok,
      message: ok
        ? d==='easy' ? 'Perfect! You mastered this sound.' : d==='medium' ? 'Great job! Your pronunciation is clear.' : 'Excellent! This is a difficult sound.'
        : d==='easy' ? 'Close! Try rounding your lips more.' : d==='medium' ? 'Almost! Focus on tongue position.' : 'Keep practicing! This sound takes time.',
    });
    setShowFeedback(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        .ha-pt { font-family:'Outfit',sans-serif; background:#060d22; padding:90px 24px; position:relative; overflow:hidden; }
        .ha-pt::before { content:''; position:absolute; top:0; left:50%; transform:translateX(-50%); width:600px; height:1px; background:linear-gradient(90deg,transparent,rgba(139,92,246,.3),transparent); }
        .ha-pt::after  { content:''; position:absolute; inset:0; background-image:radial-gradient(rgba(99,179,237,.05) 1px,transparent 1px); background-size:32px 32px; pointer-events:none; }
        .ha-pt-glow { position:absolute; top:-60px; left:50%; transform:translateX(-50%); width:700px; height:320px; background:radial-gradient(ellipse,rgba(139,92,246,.08) 0%,transparent 70%); pointer-events:none; }
        .ha-pt-inner { max-width:780px; margin:0 auto; position:relative; z-index:1; }

        .ha-pt-eyebrow { display:flex; align-items:center; justify-content:center; gap:12px; margin-bottom:14px; }
        .ha-pt-eline   { width:44px; height:1px; background:linear-gradient(90deg,transparent,#8b5cf6); flex-shrink:0; }
        .ha-pt-eline.r { background:linear-gradient(90deg,#8b5cf6,transparent); }
        .ha-pt-elabel  { font-size:.65rem; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:#8b5cf6; }

        .ha-pt-h2  { font-size:clamp(1.9rem,3.8vw,3rem); font-weight:900; letter-spacing:-.03em; color:#f1f5f9; text-align:center; margin:0 0 12px; line-height:1.1; }
        .ha-pt-h2 span { background:linear-gradient(135deg,#a78bfa,#8b5cf6); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .ha-pt-sub { text-align:center; color:rgba(148,163,184,.6); font-size:.95rem; margin:0 auto 40px; max-width:460px; line-height:1.6; }

        .ha-pt-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:28px; }
        @media(max-width:560px){ .ha-pt-grid{grid-template-columns:1fr 1fr;} }

        .ha-pt-sound-btn {
          background:rgba(13,20,45,.9); border:1px solid rgba(99,179,237,.1); border-radius:14px;
          padding:18px 10px; display:flex; flex-direction:column; align-items:center; gap:4px;
          cursor:pointer; position:relative; overflow:hidden;
          transition:border-color .3s,box-shadow .3s,transform .3s;
        }
        .ha-pt-sound-btn:hover { border-color:var(--c); box-shadow:0 0 0 1px var(--c),0 10px 28px color-mix(in srgb,var(--c) 18%,transparent); transform:translateY(-3px); }
        .ha-pt-sound-btn.active { border-color:var(--c); box-shadow:0 0 0 1px var(--c),0 12px 32px color-mix(in srgb,var(--c) 22%,transparent); }
        .ha-pt-sound-btn::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:var(--c); opacity:.6; transition:opacity .3s; }
        .ha-pt-sound-btn:hover::before,.ha-pt-sound-btn.active::before { opacity:1; }

        .ha-pt-symbol { font-size:2.8rem; font-weight:900; color:var(--c); line-height:1; text-shadow:0 0 16px color-mix(in srgb,var(--c) 40%,transparent); }
        .ha-pt-ipa    { font-size:.7rem; color:rgba(148,163,184,.5); font-weight:600; }
        .ha-pt-word   { font-size:.82rem; font-weight:700; color:#e2e8f0; }
        .ha-pt-diff   { font-size:.55rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; padding:2px 8px; border-radius:100px; border:1px solid; margin-top:2px; }

        /* active panel */
        .ha-pt-panel {
          background:rgba(13,20,45,.9); border:1px solid rgba(99,179,237,.1);
          border-radius:18px; padding:28px; overflow:hidden;
        }
        .ha-pt-panel-top { display:flex; gap:24px; align-items:flex-start; }
        @media(max-width:560px){ .ha-pt-panel-top{flex-direction:column;align-items:center;text-align:center;} }

        .ha-pt-big-symbol {
          width:90px; height:90px; border-radius:50%; flex-shrink:0;
          background:linear-gradient(135deg,color-mix(in srgb,var(--c) 20%,#0a1228),color-mix(in srgb,var(--c) 8%,#060d22));
          border:2px solid color-mix(in srgb,var(--c) 35%,transparent);
          box-shadow:0 0 28px color-mix(in srgb,var(--c) 22%,transparent);
          display:flex; align-items:center; justify-content:center;
          font-size:2.8rem; font-weight:900; color:var(--c); position:relative;
        }
        .ha-pt-big-diff {
          position:absolute; bottom:2px; right:2px;
          width:26px; height:26px; border-radius:50%; background:var(--dc);
          border:2px solid #060d22; display:flex; align-items:center; justify-content:center;
          font-size:.65rem; font-weight:900; color:white;
        }

        .ha-pt-info-name { font-size:1.3rem; font-weight:900; color:#f1f5f9; letter-spacing:-.02em; margin:0 0 4px; }
        .ha-pt-info-name span { color:var(--c); }
        .ha-pt-info-ex { font-size:.85rem; color:rgba(148,163,184,.6); font-style:italic; margin:0 0 8px; }
        .ha-pt-info-tip { font-size:.8rem; color:rgba(148,163,184,.55); line-height:1.6; margin:0 0 18px; }

        .ha-pt-btns { display:flex; gap:10px; flex-wrap:wrap; }
        .ha-pt-btn {
          display:inline-flex; align-items:center; gap:7px; padding:9px 16px;
          font-family:'Outfit',sans-serif; font-size:.78rem; font-weight:700;
          border-radius:9px; cursor:pointer; transition:all .25s; letter-spacing:.02em; border:1px solid;
        }
        .ha-pt-btn-primary { color:white; background:linear-gradient(135deg,#7c3aed,#8b5cf6); border-color:transparent; box-shadow:0 4px 16px rgba(139,92,246,.3); }
        .ha-pt-btn-primary:hover { transform:translateY(-1px); box-shadow:0 6px 22px rgba(139,92,246,.4); }
        .ha-pt-btn-ghost   { color:var(--c); background:color-mix(in srgb,var(--c) 10%,transparent); border-color:color-mix(in srgb,var(--c) 28%,transparent); }
        .ha-pt-btn-ghost:hover { background:color-mix(in srgb,var(--c) 18%,transparent); }
        .ha-pt-btn-ghost:disabled { opacity:.35; cursor:not-allowed; }

        .ha-pt-rec-dot { width:8px; height:8px; border-radius:50%; background:#ef4444; animation:ha-rec-blink 0.8s infinite; }
        @keyframes ha-rec-blink { 0%,100%{opacity:1}50%{opacity:.3} }

        .ha-pt-feedback {
          margin-top:18px; padding:14px 16px; border-radius:12px; border:1px solid;
          display:flex; gap:12px; align-items:flex-start;
        }
        .ha-pt-feedback.ok  { background:rgba(16,185,129,.08); border-color:rgba(16,185,129,.25); }
        .ha-pt-feedback.err { background:rgba(245,158,11,.08);  border-color:rgba(245,158,11,.25); }
        .ha-pt-feedback-icon { width:28px; height:28px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:.9rem; }
        .ha-pt-feedback.ok  .ha-pt-feedback-icon { background:rgba(16,185,129,.15); }
        .ha-pt-feedback.err .ha-pt-feedback-icon { background:rgba(245,158,11,.15); }
        .ha-pt-feedback-msg { font-size:.82rem; font-weight:600; line-height:1.55; }
        .ha-pt-feedback.ok  .ha-pt-feedback-msg { color:#6ee7b7; }
        .ha-pt-feedback.err .ha-pt-feedback-msg { color:#fcd34d; }
        .ha-pt-retry-links { display:flex; flex-direction:column; gap:6px; margin-top:10px; }
        .ha-pt-retry-link { font-size:.76rem; font-weight:600; color:var(--c); background:transparent; border:none; cursor:pointer; display:flex; align-items:center; gap:5px; padding:0; transition:opacity .2s; }
        .ha-pt-retry-link:hover { opacity:.75; }

        /* idle placeholder */
        .ha-pt-idle { background:rgba(13,20,45,.9); border:1px solid rgba(99,179,237,.08); border-radius:18px; padding:48px 24px; text-align:center; }
        .ha-pt-idle-icon { width:72px; height:72px; border-radius:50%; background:rgba(139,92,246,.1); border:1px solid rgba(139,92,246,.25); display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 16px; }
        .ha-pt-idle-h { font-size:1.05rem; font-weight:800; color:#e2e8f0; margin:0 0 6px; }
        .ha-pt-idle-p { font-size:.82rem; color:rgba(148,163,184,.5); max-width:280px; margin:0 auto; line-height:1.6; }

        @media(max-width:640px){.ha-pt{padding:64px 16px;}}
      `}</style>

      <section className="ha-pt">
        <div className="ha-pt-glow" />
        <audio ref={audioRef} />
        <div className="ha-pt-inner">

          <div className="ha-pt-eyebrow">
            <span className="ha-pt-eline" /><span className="ha-pt-elabel">PRACTICE TOOL</span><span className="ha-pt-eline r" />
          </div>
          <h2 className="ha-pt-h2">Pronunciation <span>Trainer</span></h2>
          <p className="ha-pt-sub">Select a phonetic sound, listen carefully, then record yourself and get instant feedback.</p>

          {/* Sound grid */}
          <div className="ha-pt-grid">
            {sounds.map((s,i) => (
              <motion.button key={i} className={`ha-pt-sound-btn${activeSound?.symbol===s.symbol?' active':''}`}
                style={{"--c":s.color}} onClick={()=>playSound(s)}
                whileHover={{y:-3}} whileTap={{scale:.97}}>
                <span className="ha-pt-symbol">{s.symbol}</span>
                <span className="ha-pt-ipa">{s.ipa}</span>
                <span className="ha-pt-word">{s.word}</span>
                <span className="ha-pt-diff" style={{color:diffBadge[s.difficulty],borderColor:`${diffBadge[s.difficulty]}40`,background:`${diffBadge[s.difficulty]}12`}}>
                  {s.difficulty}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Panel */}
          <AnimatePresence mode="wait">
            {activeSound ? (
              <motion.div key={activeSound.symbol} className="ha-pt-panel"
                style={{"--c":activeSound.color,"--dc":diffBadge[activeSound.difficulty]}}
                initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
                transition={{duration:.35}}>

                <div className="ha-pt-panel-top">
                  <div className="ha-pt-big-symbol">
                    {activeSound.symbol}
                    <div className="ha-pt-big-diff">{activeSound.difficulty[0].toUpperCase()}</div>
                  </div>
                  <div style={{flex:1}}>
                    <h3 className="ha-pt-info-name">{activeSound.word} <span>{activeSound.ipa}</span></h3>
                    <p className="ha-pt-info-ex">"{activeSound.example}"</p>
                    <p className="ha-pt-info-tip">{activeSound.tip}</p>

                    <div className="ha-pt-btns">
                      <motion.button className="ha-pt-btn ha-pt-btn-primary" onClick={()=>playSound(activeSound)} whileTap={{scale:.97}}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728"/></svg>
                        Hear Sound
                      </motion.button>

                      <motion.button
                        className="ha-pt-btn ha-pt-btn-ghost"
                        style={{"--c":activeSound.color}}
                        onClick={isRecording ? stopRecording : startRecording}
                        disabled={false}
                        whileTap={{scale:.97}}
                      >
                        {isRecording
                          ? <><span className="ha-pt-rec-dot"/> Recording ({5-recordingTime}s)</>
                          : <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>Record Yourself</>
                        }
                      </motion.button>

                      {userAudioUrl && (
                        <motion.button className="ha-pt-btn ha-pt-btn-ghost" style={{"--c":"#10b981"}}
                          onClick={()=>new Audio(userAudioUrl).play()} whileTap={{scale:.97}}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          Playback
                        </motion.button>
                      )}
                    </div>

                    {/* Feedback */}
                    <AnimatePresence>
                      {showFeedback && (
                        <motion.div className={`ha-pt-feedback ${feedback.correct?'ok':'err'}`}
                          initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.3}}>
                          <div className="ha-pt-feedback-icon">{feedback.correct?'✓':'⚠'}</div>
                          <div>
                            <p className="ha-pt-feedback-msg">{feedback.message}</p>
                            {!feedback.correct && (
                              <div className="ha-pt-retry-links">
                                <button className="ha-pt-retry-link" style={{"--c":activeSound.color}} onClick={()=>playSound(activeSound)}>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>
                                  Hear example again
                                </button>
                                <button className="ha-pt-retry-link" style={{"--c":activeSound.color}} onClick={startRecording}>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m-4 0h8M12 9a3 3 0 000 6V9z"/></svg>
                                  Try recording again
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="idle" className="ha-pt-idle" initial={{opacity:0}} animate={{opacity:1}}>
                <div className="ha-pt-idle-icon">🎤</div>
                <h3 className="ha-pt-idle-h">Select a sound to practice</h3>
                <p className="ha-pt-idle-p">Choose from the phonetic sounds above to begin pronunciation training</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default PronunciationTrainer;