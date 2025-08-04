import React from 'react'
import GrammarVisualizer from '../components/GrammarVisualizer'
import PronunciationTrainer from '../components/PronunciationTrainer'
import SkillAssessment from '../components/SkillAssessment'

const Demo = () => {
  return (
    <div className='mt-10'>
         <SkillAssessment />
        <GrammarVisualizer />
        <PronunciationTrainer />
       
    </div>
  )
}

export default Demo