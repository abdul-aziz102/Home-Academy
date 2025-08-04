import React from 'react'
import Banner from '../components/Banner'
import LevelCards from '../components/LevelCards'
 import Cardsinfor from '../components/Cardsinfor' 
import Testimonials from '../components/testimonials'
import Contact from './Contact'
import VideoGrid from '../components/Video'
import InfiniteMarquee from '../components/Index'
import SkillAssessment from '../components/SkillAssessment'
import GrammarVisualizer from '../components/GrammarVisualizer'
import Teacher from './Teacher'
import Student from './Student'
const Home = () => {
    return (
        <div>
            <Banner/>
            <InfiniteMarquee />
            <LevelCards />
            <Teacher/>
            <Student />
            <SkillAssessment />
            <GrammarVisualizer />
             <Cardsinfor /> 
            <Testimonials />
            <VideoGrid />
            <Contact />
            
        </div>
    )
}

export default Home
