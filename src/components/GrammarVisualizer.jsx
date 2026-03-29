import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const grammarConcepts = {
  tenses: [
    { name:"Present Simple",      color:"#3b82f6", structure:"Subject + V1 (s/es for 3rd person)",        example:"She works at a bank. / They live in Paris.",               usage:"Habits, general truths, permanent situations",            rules:["Add 's/es' to verbs for he/she/it (3rd person singular)","Use for routines (I work every day)","Use for facts (Water boils at 100°C)"],                           mistakes:["Forgetting the 's' in 3rd person singular","Using for temporary situations"] },
    { name:"Present Continuous",  color:"#8b5cf6", structure:"Subject + am/is/are + V-ing",               example:"I am studying English now. / They are playing.",           usage:"Actions now, temporary situations, future arrangements",   rules:["Use 'am' for I, 'is' for he/she/it, 'are' for you/we/they","Some verbs not used in continuous (know, like, want)","Use for future arrangements (I'm meeting John tomorrow)"],  mistakes:["Using with state verbs (wrong: 'I am knowing')","Confusing with present simple"] },
    { name:"Past Simple",         color:"#10b981", structure:"Subject + V2 (regular: -ed / irregular)",   example:"I worked yesterday. / She went to London last week.",       usage:"Completed actions in the past, past habits",              rules:["Regular verbs add '-ed' (work → worked)","Irregular verbs have special forms (go → went)","Often used with past time expressions"],                              mistakes:["Using present form for past (wrong: 'I go yesterday')","Confusing irregular verb forms"] },
    { name:"Past Continuous",     color:"#f59e0b", structure:"Subject + was/were + V-ing",                example:"I was reading when you called.",                            usage:"Ongoing past actions, interrupted actions",               rules:["Use 'was' for I/he/she/it, 'were' for you/we/they","Often used with 'when' + simple past","Can describe atmosphere (It was raining)"],                              mistakes:["Confusing with past simple (wrong: 'I was go')","Using for completed actions"] },
    { name:"Present Perfect",     color:"#ec4899", structure:"Subject + have/has + V3",                   example:"I have visited London. / She has finished her work.",       usage:"Experiences, changes, unfinished time periods",           rules:["Use 'have' for I/you/we/they, 'has' for he/she/it","Often used with 'ever', 'never', 'since', 'for', 'just'","Focuses on result/experience"],                             mistakes:["Using with specific past time (wrong: 'I have seen him yesterday')","Confusing with past simple"] },
  ],
  conditionals: [
    { name:"Zero Conditional",   color:"#06b6d4", structure:"If + present simple, present simple",         example:"If you heat ice, it melts.",                               usage:"General truths, scientific facts",                        rules:["Both clauses use present simple","Shows cause and effect","Can use 'when' instead of 'if'"],                                                                           mistakes:["Using other tenses (wrong: 'If you will heat ice, it will melt')","Confusing with first conditional"] },
    { name:"First Conditional",  color:"#3b82f6", structure:"If + present simple, will + infinitive",      example:"If it rains, we will stay home.",                          usage:"Real future possibilities, promises, warnings",           rules:["'If' clause uses present simple (not future)","Main clause uses 'will' or modal verbs","Can reverse clauses"],                                                              mistakes:["Using 'will' in the 'if' clause (wrong: 'If it will rain')","Confusing with second conditional"] },
    { name:"Second Conditional", color:"#8b5cf6", structure:"If + past simple, would + infinitive",        example:"If I won the lottery, I would buy a house.",               usage:"Unreal/hypothetical present/future situations",           rules:["'If' clause uses past simple (refers to present/future)","Use 'were' instead of 'was' in formal English","Often for imaginary situations"],                               mistakes:["Using 'would' in the 'if' clause","Confusing with first conditional"] },
    { name:"Third Conditional",  color:"#f97316", structure:"If + past perfect, would have + V3",          example:"If I had studied harder, I would have passed.",            usage:"Unreal past situations, regrets, criticism",              rules:["Refers to impossible past situations","Often expresses regret or criticism","Can use 'could have' or 'might have'"],                                                   mistakes:["Mixing conditionals (wrong: 'If I had studied, I will pass')","Using wrong verb forms"] },
  ],
  modals: [
    { name:"Can / Could",        color:"#10b981", structure:"Subject + can/could + infinitive",             example:"I can swim. / She could speak French when young.",         usage:"Ability, possibility, permission, requests",              rules:["'Can' for present ability, 'could' for past","'Could' is more polite for requests","Negative is 'cannot' or 'can't'"],                                                  mistakes:["Using 'can' for future ability","Confusing 'could' with 'was able to'"] },
    { name:"Must / Have to",     color:"#f59e0b", structure:"Subject + must/have to + infinitive",          example:"You must stop at red lights. / I have to work tomorrow.",  usage:"Obligation, necessity, strong recommendations",           rules:["'Must' often indicates speaker's opinion","'Have to' indicates external obligation","Negative forms have different meanings"],                                           mistakes:["Confusing 'must' and 'have to' in negative","Using 'must' for past obligation"] },
  ],
};

const tabColors = { tenses:'#3b82f6', conditionals:'#8b5cf6', modals:'#10b981' };

const GrammarVisualizer = () => {
  const [activeTab,       setActiveTab]       = useState('tenses');
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [showQuiz,        setShowQuiz]        = useState(false);
  const [userAnswer,      setUserAnswer]      = useState('');
  const [quizFeedback,    setQuizFeedback]    = useState(null);

  const quizMap = {
    "Present Simple":     { q:"Complete: She _____ (work) at a hospital.",      answer:"works",   exp:"We use 'works' because it's 3rd person singular (she) in present simple." },
    "Present Continuous": { q:"Which is correct?\n1. I am study English now.\n2. I studying English now.\n3. I am studying English now.", answer:"3", exp:"Present continuous requires 'am/is/are + verb-ing'." },
    "First Conditional":  { q:"If it _____ (rain) tomorrow, I _____ (stay) home. Type both answers with comma.", answer:"rains, will stay", exp:"First conditional: present simple in 'if' clause, 'will' in main clause." },
  };

  const getQuiz = (c) => quizMap[c.name] || { q:`Write an example sentence using ${c.name}`, answer:null, exp:`Example: ${c.example}` };

  const checkAnswer = () => {
    const q = getQuiz(selectedConcept);
    let ok;
    if (!q.answer) {
      ok = true;
    } else {
      ok = userAnswer.trim().toLowerCase() === q.answer.toLowerCase();
    }
    setQuizFeedback({ correct:ok, message: ok ? '✓ Correct! ' + q.exp : '✗ Incorrect. Correct answer: ' + q.answer + '. ' + q.exp });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');

        .ha-gv { font-family:'Outfit',sans-serif; background:#060d22; padding:90px 24px; position:relative; overflow:hidden; border-top:1px solid rgba(99,179,237,.07); }
        .ha-gv::after { content:''; position:absolute; inset:0; background-image:radial-gradient(rgba(99,179,237,.05) 1px,transparent 1px); background-size:32px 32px; pointer-events:none; }
        .ha-gv-glow { position:absolute; top:-60px; left:50%; transform:translateX(-50%); width:700px; height:300px; background:radial-gradient(ellipse,rgba(59,130,246,.07) 0%,transparent 70%); pointer-events:none; }
        .ha-gv-inner { max-width:1100px; margin:0 auto; position:relative; z-index:1; }

        .ha-gv-eyebrow { display:flex; align-items:center; justify-content:center; gap:12px; margin-bottom:14px; }
        .ha-gv-eline   { width:44px; height:1px; background:linear-gradient(90deg,transparent,#3b82f6); flex-shrink:0; }
        .ha-gv-eline.r { background:linear-gradient(90deg,#3b82f6,transparent); }
        .ha-gv-elabel  { font-size:.65rem; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:#3b82f6; }
        .ha-gv-h2      { font-size:clamp(1.9rem,3.8vw,3rem); font-weight:900; letter-spacing:-.03em; color:#f1f5f9; text-align:center; margin:0 0 12px; }
        .ha-gv-h2 span { background:linear-gradient(135deg,#60a5fa,#3b82f6); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .ha-gv-sub     { text-align:center; color:rgba(148,163,184,.6); font-size:.95rem; margin:0 auto 40px; max-width:460px; line-height:1.6; }

        /* tabs */
        .ha-gv-tabs { display:flex; gap:6px; margin-bottom:28px; border-bottom:1px solid rgba(99,179,237,.08); padding-bottom:0; }
        .ha-gv-tab  { padding:10px 20px; font-family:'Outfit',sans-serif; font-size:.82rem; font-weight:700; letter-spacing:.04em; text-transform:capitalize; background:transparent; border:none; cursor:pointer; color:rgba(148,163,184,.5); position:relative; transition:color .25s; }
        .ha-gv-tab.active { color:var(--tc); }
        .ha-gv-tab.active::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:2px; background:var(--tc); border-radius:2px 2px 0 0; box-shadow:0 0 8px var(--tc); }
        .ha-gv-tab:hover { color:#e2e8f0; }

        /* layout */
        .ha-gv-layout { display:grid; grid-template-columns:240px 1fr; gap:20px; }
        @media(max-width:760px){ .ha-gv-layout{grid-template-columns:1fr;} }

        /* concept list */
        .ha-gv-list { display:flex; flex-direction:column; gap:8px; }
        .ha-gv-concept-btn {
          background:rgba(13,20,45,.9); border:1px solid rgba(99,179,237,.09); border-radius:12px;
          padding:14px 16px; cursor:pointer; text-align:left;
          transition:border-color .25s, box-shadow .25s, transform .25s;
          position:relative; overflow:hidden;
        }
        .ha-gv-concept-btn::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:var(--c); opacity:0; border-radius:3px 0 0 3px; transition:opacity .25s; }
        .ha-gv-concept-btn:hover,.ha-gv-concept-btn.active { border-color:var(--c); transform:translateX(3px); }
        .ha-gv-concept-btn:hover::before,.ha-gv-concept-btn.active::before { opacity:1; }
        .ha-gv-concept-btn.active { box-shadow:0 0 0 1px var(--c),0 6px 20px color-mix(in srgb,var(--c) 14%,transparent); }
        .ha-gv-concept-name  { font-size:.85rem; font-weight:800; color:#e2e8f0; margin:0 0 3px; }
        .ha-gv-concept-struc { font-size:.68rem; color:rgba(148,163,184,.45); font-family:'DM Mono',monospace; }

        /* detail panel */
        .ha-gv-detail {
          background:rgba(13,20,45,.9); border:1px solid rgba(99,179,237,.1);
          border-radius:16px; padding:28px; min-height:420px;
          position:relative; overflow:hidden;
        }
        .ha-gv-detail::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--c,#3b82f6),transparent); opacity:.7; }

        .ha-gv-detail-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
        .ha-gv-detail-name { font-size:1.3rem; font-weight:900; color:#f1f5f9; letter-spacing:-.02em; }
        .ha-gv-detail-badge { font-size:.6rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; padding:4px 12px; border-radius:100px; border:1px solid color-mix(in srgb,var(--c) 35%,transparent); background:color-mix(in srgb,var(--c) 10%,transparent); color:var(--c); }

        .ha-gv-block { margin-bottom:18px; }
        .ha-gv-block-lbl { font-size:.62rem; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:rgba(99,179,237,.45); margin-bottom:7px; }
        .ha-gv-mono { font-family:'DM Mono',monospace; font-size:.82rem; color:var(--c); background:color-mix(in srgb,var(--c) 8%,transparent); border:1px solid color-mix(in srgb,var(--c) 18%,transparent); border-radius:9px; padding:10px 14px; }
        .ha-gv-italic { font-size:.85rem; color:rgba(148,163,184,.65); font-style:italic; background:rgba(99,179,237,.04); border:1px solid rgba(99,179,237,.07); border-radius:9px; padding:10px 14px; }
        .ha-gv-usage  { font-size:.83rem; color:rgba(148,163,184,.6); line-height:1.6; }

        .ha-gv-rules-list,.ha-gv-mistakes-list { display:flex; flex-direction:column; gap:7px; list-style:none; padding:0; margin:0; }
        .ha-gv-rule,.ha-gv-mistake { display:flex; align-items:flex-start; gap:9px; font-size:.8rem; line-height:1.55; }
        .ha-gv-rule   { color:rgba(203,213,225,.7); }
        .ha-gv-mistake{ color:rgba(252,165,165,.7); }
        .ha-gv-rule-num,.ha-gv-mistake-x {
          width:20px; height:20px; border-radius:50%; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          font-size:.65rem; font-weight:800; margin-top:1px;
        }
        .ha-gv-rule-num { background:color-mix(in srgb,var(--c) 15%,transparent); color:var(--c); }
        .ha-gv-mistake-x { background:rgba(239,68,68,.12); color:#f87171; }

        .ha-gv-actions { display:flex; gap:10px; flex-wrap:wrap; margin-top:22px; }
        .ha-gv-action-btn {
          display:inline-flex; align-items:center; gap:7px; padding:9px 18px;
          font-family:'Outfit',sans-serif; font-size:.78rem; font-weight:700;
          border-radius:9px; cursor:pointer; transition:all .25s; letter-spacing:.02em; border:1px solid;
        }
        .ha-gv-action-primary { color:white; background:linear-gradient(135deg,color-mix(in srgb,var(--c) 80%,#000),var(--c)); border-color:transparent; box-shadow:0 4px 16px color-mix(in srgb,var(--c) 28%,transparent); }
        .ha-gv-action-ghost   { color:var(--c); background:color-mix(in srgb,var(--c) 9%,transparent); border-color:color-mix(in srgb,var(--c) 26%,transparent); }
        .ha-gv-action-ghost:hover { background:color-mix(in srgb,var(--c) 16%,transparent); }

        /* quiz panel */
        .ha-gv-quiz-back { display:flex; align-items:center; gap:10px; margin-bottom:20px; background:transparent; border:none; cursor:pointer; color:rgba(148,163,184,.7); font-family:'Outfit',sans-serif; font-size:.82rem; font-weight:600; transition:color .2s; padding:0; }
        .ha-gv-quiz-back:hover { color:#93c5fd; }
        .ha-gv-quiz-q   { font-size:.95rem; font-weight:700; color:#e2e8f0; line-height:1.55; white-space:pre-line; margin:0 0 18px; }
        .ha-gv-quiz-input { width:100%; padding:11px 14px; font-family:'Outfit',sans-serif; font-size:.875rem; font-weight:500; color:#e2e8f0; background:rgba(6,13,34,.75); border:1px solid rgba(99,179,237,.12); border-radius:10px; outline:none; transition:border-color .25s,box-shadow .25s; caret-color:#3b82f6; }
        .ha-gv-quiz-input:focus { border-color:rgba(59,130,246,.5); box-shadow:0 0 0 3px rgba(59,130,246,.1); }
        .ha-gv-quiz-hint { font-size:.72rem; color:rgba(148,163,184,.4); margin-top:6px; }
        .ha-gv-quiz-fb { padding:14px 16px; border-radius:12px; border:1px solid; margin-top:16px; font-size:.82rem; font-weight:600; line-height:1.55; }
        .ha-gv-quiz-fb.ok  { background:rgba(16,185,129,.08); border-color:rgba(16,185,129,.25); color:#6ee7b7; }
        .ha-gv-quiz-fb.err { background:rgba(245,158,11,.08);  border-color:rgba(245,158,11,.25); color:#fcd34d; }
        .ha-gv-quiz-retry { font-size:.75rem; font-weight:600; color:var(--c); background:transparent; border:none; cursor:pointer; margin-top:10px; display:flex; align-items:center; gap:5px; }

        /* empty state */
        .ha-gv-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; padding:48px 24px; text-align:center; min-height:320px; }
        .ha-gv-empty-icon { width:72px; height:72px; border-radius:50%; background:rgba(59,130,246,.1); border:1px solid rgba(59,130,246,.2); display:flex; align-items:center; justify-content:center; font-size:2rem; margin-bottom:16px; }
        .ha-gv-empty-h { font-size:1.05rem; font-weight:800; color:#e2e8f0; margin:0 0 6px; }
        .ha-gv-empty-p { font-size:.82rem; color:rgba(148,163,184,.5); max-width:260px; line-height:1.6; }

        @media(max-width:640px){.ha-gv{padding:64px 16px;} .ha-gv-tabs{overflow-x:auto;}}
      `}</style>

      <section className="ha-gv">
        <div className="ha-gv-glow" />
        <div className="ha-gv-inner">

          <div className="ha-gv-eyebrow">
            <span className="ha-gv-eline" /><span className="ha-gv-elabel">LEARNING TOOL</span><span className="ha-gv-eline r" />
          </div>
          <h2 className="ha-gv-h2">Grammar <span>Visualizer</span></h2>
          <p className="ha-gv-sub">Select a grammar concept to explore structures, examples, rules and practice exercises.</p>

          {/* Tabs */}
          <div className="ha-gv-tabs">
            {Object.keys(grammarConcepts).map(tab => (
              <button key={tab} className={`ha-gv-tab${activeTab===tab?' active':''}`}
                style={{"--tc":tabColors[tab]}}
                onClick={()=>{setActiveTab(tab);setSelectedConcept(null);setShowQuiz(false);}}>
                {tab.charAt(0).toUpperCase()+tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="ha-gv-layout">
            {/* Concept list */}
            <div className="ha-gv-list">
              {grammarConcepts[activeTab].map((c,i)=>(
                <motion.button key={i} className={`ha-gv-concept-btn${selectedConcept?.name===c.name?' active':''}`}
                  style={{"--c":c.color}}
                  onClick={()=>{setSelectedConcept(c);setShowQuiz(false);setQuizFeedback(null);setUserAnswer('');}}
                  whileTap={{scale:.98}}>
                  <p className="ha-gv-concept-name">{c.name}</p>
                  <p className="ha-gv-concept-struc">{c.structure}</p>
                </motion.button>
              ))}
            </div>

            {/* Detail / Quiz panel */}
            <div className="ha-gv-detail" style={{"--c":selectedConcept?.color||"#3b82f6"}}>
              <AnimatePresence mode="wait">
                {selectedConcept && !showQuiz ? (
                  <motion.div key={selectedConcept.name}
                    initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
                    transition={{duration:.3}}>

                    <div className="ha-gv-detail-head">
                      <h3 className="ha-gv-detail-name">{selectedConcept.name}</h3>
                      <span className="ha-gv-detail-badge">{activeTab}</span>
                    </div>

                    <div className="ha-gv-block">
                      <p className="ha-gv-block-lbl">Structure</p>
                      <p className="ha-gv-mono">{selectedConcept.structure}</p>
                    </div>
                    <div className="ha-gv-block">
                      <p className="ha-gv-block-lbl">Example</p>
                      <p className="ha-gv-italic">"{selectedConcept.example}"</p>
                    </div>
                    <div className="ha-gv-block">
                      <p className="ha-gv-block-lbl">Usage</p>
                      <p className="ha-gv-usage">{selectedConcept.usage}</p>
                    </div>
                    <div className="ha-gv-block">
                      <p className="ha-gv-block-lbl">Key Rules</p>
                      <ul className="ha-gv-rules-list">
                        {selectedConcept.rules.map((r,i)=>(
                          <motion.li key={i} className="ha-gv-rule"
                            initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*.06}}>
                            <span className="ha-gv-rule-num">{i+1}</span>{r}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    {selectedConcept.mistakes?.length > 0 && (
                      <div className="ha-gv-block">
                        <p className="ha-gv-block-lbl">Common Mistakes</p>
                        <ul className="ha-gv-mistakes-list">
                          {selectedConcept.mistakes.map((m,i)=>(
                            <motion.li key={i} className="ha-gv-mistake"
                              initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*.06}}>
                              <span className="ha-gv-mistake-x">✗</span>{m}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="ha-gv-actions">
                      <motion.button className="ha-gv-action-btn ha-gv-action-primary" onClick={()=>setShowQuiz(true)} whileTap={{scale:.97}}>
                        Practice This Concept
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </motion.button>
                    </div>
                  </motion.div>

                ) : showQuiz ? (
                  <motion.div key="quiz"
                    initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
                    transition={{duration:.3}}>

                    <button className="ha-gv-quiz-back" onClick={()=>{setShowQuiz(false);setQuizFeedback(null);setUserAnswer('');}}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                      Back to {selectedConcept.name}
                    </button>

                    {(() => {
                      const q = getQuiz(selectedConcept);
                      return (
                        <div>
                          <p className="ha-gv-quiz-q">{q.q}</p>
                          <input
                            type="text"
                            className="ha-gv-quiz-input"
                            placeholder={q.answer ? "Type your answer here..." : "Write an example sentence..."}
                            value={userAnswer}
                            onChange={e=>setUserAnswer(e.target.value)}
                            onKeyDown={e=>e.key==='Enter'&&userAnswer&&!quizFeedback&&checkAnswer()}
                          />
                          {q.answer && <p className="ha-gv-quiz-hint">Press Enter or click Check Answer</p>}

                          {quizFeedback ? (
                            <div className={`ha-gv-quiz-fb${quizFeedback.correct?' ok':' err'}`}>
                              {quizFeedback.message}
                              <button className="ha-gv-quiz-retry" style={{"--c":selectedConcept.color}}
                                onClick={()=>{setQuizFeedback(null);setUserAnswer('');}}>
                                ↺ Try another question
                              </button>
                            </div>
                          ) : (
                            <motion.button
                              className="ha-gv-action-btn ha-gv-action-primary"
                              style={{marginTop:14}}
                              onClick={checkAnswer}
                              disabled={!userAnswer}
                              whileTap={{scale:.97}}>
                              Check Answer
                            </motion.button>
                          )}
                        </div>
                      );
                    })()}
                  </motion.div>

                ) : (
                  <motion.div key="empty" className="ha-gv-empty" initial={{opacity:0}} animate={{opacity:1}}>
                    <div className="ha-gv-empty-icon">📝</div>
                    <h3 className="ha-gv-empty-h">Select a concept</h3>
                    <p className="ha-gv-empty-p">Choose from the list to see detailed explanations, examples, and practice exercises.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GrammarVisualizer;