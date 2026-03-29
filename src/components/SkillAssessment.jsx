import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const questions = [
  { id:1,  skill:'speaking',   color:'#3b82f6', question:"How comfortable are you with basic English conversations?",    options:["Don't understand any English","Know a few words/phrases but can't form sentences","Can have very simple conversations with pauses","Can discuss familiar topics with some mistakes","Fluent in conversations on various topics"] },
  { id:2,  skill:'speaking',   color:'#3b82f6', question:"How well can you describe your daily routine in English?",       options:["Can't describe my routine at all","Can say a few words about my day","Can describe basic activities with simple sentences","Can describe well with some mistakes","Describe it fluently with details and examples"] },
  { id:3,  skill:'listening',  color:'#8b5cf6', question:"How well do you understand spoken English in movies/TV shows?",  options:["Don't understand anything without subtitles","Recognize some words but not full sentences","Understand basic conversations with clear speech","Understand most content but miss some details","Understand native speakers easily"] },
  { id:4,  skill:'listening',  color:'#8b5cf6', question:"Can you follow phone conversations in English?",                  options:["Can't understand phone conversations at all","Only if the speaker talks very slowly","Basic conversations if the topic is familiar","Most conversations but might ask to repeat","Can understand phone calls easily"] },
  { id:5,  skill:'grammar',    color:'#10b981', question:"How would you rate your knowledge of English tenses?",           options:["Don't know any tenses","Know only present simple tense","Know present, past and future simple tenses","Know most tenses but make some mistakes","Advanced knowledge of all tenses"] },
  { id:6,  skill:'grammar',    color:'#10b981', question:"How comfortable are you with complex grammar structures?",        options:["Don't know any complex structures","Know basic conjunctions (and, but, because)","Can use relative clauses and some conditionals","Can use most structures with some mistakes","Comfortable with all advanced grammar"] },
  { id:7,  skill:'vocabulary', color:'#f59e0b', question:"How extensive is your English vocabulary?",                       options:["Know less than 100 words","Basic everyday words (200-500)","Can talk about familiar topics (1000-1500 words)","Can discuss various topics (2000-3000 words)","Extensive vocabulary (4000+ words)"] },
  { id:8,  skill:'vocabulary', color:'#f59e0b', question:"How well can you express abstract ideas in English?",             options:["Can't express abstract ideas at all","Can express very simple opinions","Can discuss some abstract topics with limitations","Can discuss most topics with some difficulty","Can discuss complex abstract ideas fluently"] },
  { id:9,  skill:'writing',    color:'#ec4899', question:"How comfortable are you writing emails/letters in English?",     options:["Can't write anything in English","Can write very short simple messages","Can write basic emails with simple sentences","Can write detailed emails with some mistakes","Can write professional emails fluently"] },
  { id:10, skill:'writing',    color:'#ec4899', question:"Can you write essays or reports in English?",                     options:["No, can't write essays at all","Only very short texts with many mistakes","Basic essays with simple structure","Detailed essays with some grammatical errors","Can write complex essays fluently"] },
];

const skillColors  = { speaking:'#3b82f6', listening:'#8b5cf6', grammar:'#10b981', vocabulary:'#f59e0b', writing:'#ec4899' };
const skillEmojis  = { speaking:'🗣️', listening:'👂', grammar:'📝', vocabulary:'📚', writing:'✍️' };
const levelMap = [
  { threshold:0,   label:'Pre-Beginner (A0)',        color:'#64748b', rec:'Pre-Beginner' },
  { threshold:1.5, label:'Beginner (A1)',             color:'#3b82f6', rec:'Beginner' },
  { threshold:2.5, label:'Pre-Intermediate (A2-B1)', color:'#10b981', rec:'Pre-Intermediate' },
  { threshold:3.5, label:'Intermediate (B1-B2)',      color:'#f59e0b', rec:'Intermediate' },
  { threshold:4.5, label:'Advanced (C1-C2)',          color:'#ec4899', rec:'Advanced' },
];

const getLevel = (avg) => [...levelMap].reverse().find(l => avg >= l.threshold) || levelMap[0];
const getSkillLabel = (pct) => pct<20?'Very Basic':pct<40?'Basic':pct<60?'Intermediate':pct<80?'Advanced':'Fluent';

const SkillAssessment = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers,  setAnswers]  = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result,     setResult]     = useState(null);
  const [subSkills,  setSubSkills]  = useState({ speaking:0, listening:0, grammar:0, vocabulary:0, writing:0 });

  const handleAnswer = (idx) => {
    const newAns  = [...answers, idx];
    const newSubs = { ...subSkills, [questions[currentQ].skill]: subSkills[questions[currentQ].skill] + idx };

    setAnswers(newAns);
    setSubSkills(newSubs);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const avg = newAns.reduce((a,b)=>a+b,0) / newAns.length;
      setResult(getLevel(avg));
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrentQ(0); setAnswers([]); setShowResult(false); setResult(null);
    setSubSkills({ speaking:0, listening:0, grammar:0, vocabulary:0, writing:0 });
  };

  const progress = ((currentQ + (showResult ? 1 : 0)) / questions.length) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        .ha-sa { font-family:'Outfit',sans-serif; background:#060d22; padding:90px 24px; position:relative; overflow:hidden; border-top:1px solid rgba(99,179,237,.07); }
        .ha-sa::after { content:''; position:absolute; inset:0; background-image:radial-gradient(rgba(99,179,237,.05) 1px,transparent 1px); background-size:32px 32px; pointer-events:none; }
        .ha-sa-glow { position:absolute; top:-60px; left:50%; transform:translateX(-50%); width:700px; height:320px; background:radial-gradient(ellipse,rgba(16,185,129,.07) 0%,transparent 70%); pointer-events:none; }
        .ha-sa-inner { max-width:700px; margin:0 auto; position:relative; z-index:1; }

        .ha-sa-eyebrow { display:flex; align-items:center; justify-content:center; gap:12px; margin-bottom:14px; }
        .ha-sa-eline   { width:44px; height:1px; background:linear-gradient(90deg,transparent,#10b981); flex-shrink:0; }
        .ha-sa-eline.r { background:linear-gradient(90deg,#10b981,transparent); }
        .ha-sa-elabel  { font-size:.65rem; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:#10b981; }
        .ha-sa-h2      { font-size:clamp(1.9rem,3.8vw,3rem); font-weight:900; letter-spacing:-.03em; color:#f1f5f9; text-align:center; margin:0 0 12px; line-height:1.1; }
        .ha-sa-h2 span { background:linear-gradient(135deg,#6ee7b7,#10b981); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .ha-sa-sub     { text-align:center; color:rgba(148,163,184,.6); font-size:.95rem; margin:0 auto 40px; max-width:460px; line-height:1.6; }

        /* card */
        .ha-sa-card { background:rgba(13,20,45,.92); border:1px solid rgba(99,179,237,.1); border-radius:20px; overflow:hidden; }
        .ha-sa-card-top { height:3px; background:linear-gradient(90deg,#10b981,#3b82f6,#8b5cf6); }

        /* progress */
        .ha-sa-prog-wrap { padding:20px 28px 0; }
        .ha-sa-prog-bar-bg { width:100%; height:5px; border-radius:5px; background:rgba(99,179,237,.1); overflow:hidden; margin-bottom:8px; }
        .ha-sa-prog-bar-fill { height:100%; border-radius:5px; background:linear-gradient(90deg,#10b981,#3b82f6); box-shadow:0 0 8px rgba(16,185,129,.4); transition:width .5s ease; }
        .ha-sa-prog-meta { display:flex; justify-content:space-between; font-size:.7rem; font-weight:600; color:rgba(148,163,184,.45); }
        .ha-sa-prog-skill { color:var(--sc); font-size:.7rem; font-weight:700; letter-spacing:.06em; text-transform:uppercase; }

        /* question area */
        .ha-sa-q-area { padding:28px 28px 0; min-height:360px; position:relative; }
        .ha-sa-q-text { font-size:1rem; font-weight:700; color:#e2e8f0; line-height:1.55; margin:0 0 22px; }
        .ha-sa-options { display:flex; flex-direction:column; gap:10px; }
        .ha-sa-option {
          background:rgba(6,13,34,.7); border:1px solid rgba(99,179,237,.1); border-radius:12px;
          padding:13px 16px; cursor:pointer; display:flex; align-items:center; gap:12px;
          font-size:.85rem; font-weight:600; color:rgba(148,163,184,.75); line-height:1.4;
          transition:border-color .25s, background .25s, transform .2s; text-align:left;
        }
        .ha-sa-option:hover { border-color:var(--sc); background:color-mix(in srgb,var(--sc) 8%,transparent); color:#e2e8f0; transform:translateX(4px); }
        .ha-sa-option-circle { width:20px; height:20px; border-radius:50%; border:1px solid rgba(99,179,237,.25); background:transparent; flex-shrink:0; transition:all .25s; }
        .ha-sa-option:hover .ha-sa-option-circle { border-color:var(--sc); background:color-mix(in srgb,var(--sc) 20%,transparent); }

        /* result */
        .ha-sa-result { padding:36px 28px; }
        .ha-sa-result-top { display:flex; flex-direction:column; align-items:center; text-align:center; margin-bottom:32px; }
        .ha-sa-result-badge {
          width:88px; height:88px; border-radius:50%; flex-shrink:0;
          background:color-mix(in srgb,var(--lc) 12%,rgba(6,13,34,.9));
          border:2px solid color-mix(in srgb,var(--lc) 40%,transparent);
          box-shadow:0 0 32px color-mix(in srgb,var(--lc) 22%,transparent);
          display:flex; align-items:center; justify-content:center; font-size:2.2rem;
          margin-bottom:16px;
        }
        .ha-sa-result-level { font-size:1.5rem; font-weight:900; letter-spacing:-.03em; color:var(--lc); margin:0 0 6px; }
        .ha-sa-result-sub   { font-size:.85rem; color:rgba(148,163,184,.6); line-height:1.6; max-width:380px; }

        /* skill bars */
        .ha-sa-skills-h { font-size:.65rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:rgba(99,179,237,.4); margin-bottom:16px; }
        .ha-sa-skill-rows { display:flex; flex-direction:column; gap:14px; margin-bottom:28px; }
        .ha-sa-skill-row  {}
        .ha-sa-skill-row-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
        .ha-sa-skill-name  { font-size:.8rem; font-weight:700; color:#e2e8f0; display:flex; align-items:center; gap:6px; }
        .ha-sa-skill-label { font-size:.7rem; font-weight:700; color:var(--sc); }
        .ha-sa-bar-bg   { width:100%; height:6px; border-radius:6px; background:rgba(99,179,237,.08); overflow:hidden; }
        .ha-sa-bar-fill { height:100%; border-radius:6px; background:var(--sc); box-shadow:0 0 8px var(--sc); }

        /* result actions */
        .ha-sa-actions { display:flex; gap:12px; flex-wrap:wrap; justify-content:center; }
        .ha-sa-btn-retry {
          display:inline-flex; align-items:center; gap:7px; padding:11px 22px;
          font-family:'Outfit',sans-serif; font-size:.85rem; font-weight:700;
          color:rgba(148,163,184,.75); background:transparent;
          border:1px solid rgba(99,179,237,.18); border-radius:10px; cursor:pointer; transition:all .25s;
        }
        .ha-sa-btn-retry:hover { border-color:rgba(99,179,237,.35); color:#93c5fd; }
        .ha-sa-btn-enroll {
          display:inline-flex; align-items:center; gap:7px; padding:11px 22px;
          font-family:'Outfit',sans-serif; font-size:.85rem; font-weight:700;
          color:white; background:linear-gradient(135deg,#059669,#10b981);
          border:none; border-radius:10px; cursor:pointer; text-decoration:none;
          box-shadow:0 4px 16px rgba(16,185,129,.3); transition:all .25s;
        }
        .ha-sa-btn-enroll:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(16,185,129,.4); }

        @media(max-width:640px){.ha-sa{padding:64px 16px;} .ha-sa-q-area,.ha-sa-prog-wrap,.ha-sa-result{padding-left:18px;padding-right:18px;}}
      `}</style>

      <section className="ha-sa">
        <div className="ha-sa-glow" />
        <div className="ha-sa-inner">

          <div className="ha-sa-eyebrow">
            <span className="ha-sa-eline" /><span className="ha-sa-elabel">FREE ASSESSMENT</span><span className="ha-sa-eline r" />
          </div>
          <h2 className="ha-sa-h2">English Skill <span>Assessment</span></h2>
          <p className="ha-sa-sub">Answer 10 quick questions to discover your current English level and get personalized course recommendations.</p>

          <div className="ha-sa-card">
            <div className="ha-sa-card-top" />

            {/* Progress */}
            {!showResult && (
              <div className="ha-sa-prog-wrap">
                <div className="ha-sa-prog-bar-bg">
                  <motion.div className="ha-sa-prog-bar-fill" animate={{width:`${progress}%`}} transition={{duration:.5}} />
                </div>
                <div className="ha-sa-prog-meta">
                  <span>Question {currentQ+1} of {questions.length}</span>
                  <span className="ha-sa-prog-skill" style={{"--sc":questions[currentQ].color}}>
                    {skillEmojis[questions[currentQ].skill]} {questions[currentQ].skill}
                  </span>
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div key={`q-${currentQ}`} className="ha-sa-q-area"
                  style={{"--sc":questions[currentQ].color}}
                  initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}}
                  transition={{type:"spring",damping:18,stiffness:160}}>
                  <p className="ha-sa-q-text">{questions[currentQ].question}</p>
                  <div className="ha-sa-options" style={{paddingBottom:28}}>
                    {questions[currentQ].options.map((opt,i)=>(
                      <motion.button key={i} className="ha-sa-option"
                        onClick={()=>handleAnswer(i)} whileTap={{scale:.98}}>
                        <div className="ha-sa-option-circle" />
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="result" className="ha-sa-result"
                  initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:.4}}>

                  <div className="ha-sa-result-top" style={{"--lc":result.color}}>
                    <motion.div className="ha-sa-result-badge"
                      initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",stiffness:260,damping:16,delay:.15}}>
                      🎓
                    </motion.div>
                    <p className="ha-sa-result-level">{result.label}</p>
                    <p className="ha-sa-result-sub">Based on your answers, we recommend starting with our <strong style={{color:result.color}}>{result.rec}</strong> level courses.</p>
                  </div>

                  <p className="ha-sa-skills-h">Skill Breakdown</p>
                  <div className="ha-sa-skill-rows">
                    {Object.entries(subSkills).map(([skill, score]) => {
                      const maxPossible = questions.filter(q=>q.skill===skill).length * 4;
                      const pct = Math.round((score/maxPossible)*100);
                      const lbl = getSkillLabel(pct);
                      return (
                        <div key={skill} className="ha-sa-skill-row" style={{"--sc":skillColors[skill]}}>
                          <div className="ha-sa-skill-row-top">
                            <span className="ha-sa-skill-name">{skillEmojis[skill]} {skill.charAt(0).toUpperCase()+skill.slice(1)}</span>
                            <span className="ha-sa-skill-label">{lbl}</span>
                          </div>
                          <div className="ha-sa-bar-bg">
                            <motion.div className="ha-sa-bar-fill"
                              initial={{width:0}} animate={{width:`${pct}%`}}
                              transition={{duration:.7,ease:"easeOut",delay:.2}} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="ha-sa-actions">
                    <button className="ha-sa-btn-retry" onClick={restart}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>
                      Retake Assessment
                    </button>
                    <Link to="/courses" className="ha-sa-btn-enroll">
                      View Recommended Courses
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
};

export default SkillAssessment; 
