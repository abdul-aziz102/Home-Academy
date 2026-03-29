import React from 'react'
import Banner from '../components/Banner'
import LevelCards from '../components/LevelCards'
import Testimonials from '../components/testimonials'
import Contact from './Contact'
import VideoGrid from '../components/Video'
import InfiniteMarquee from '../components/Index'
import Teacher from './Teacher'
import Student from './Student'
import WhyChooseUs from '../components/Whychooseus'
import FAQ from '../components/Faq'
import CTABanner from '../components/Ctabanner'
const Home = () => {
    return (
        <div>
            <Banner/>
            <InfiniteMarquee />
            <LevelCards />
            <Teacher/>
            <Student />
            <WhyChooseUs/>
            <FAQ/>
            <CTABanner/>
            
            <Testimonials />
            <VideoGrid />
            <Contact />
            
        </div>
    )
}

export default Home
