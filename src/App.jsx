import React from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'

import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Corses from './pages/Corses'
import Register from './pages/Register'
import Chat from './components/Chat'
import ChatbotWidget from './components/Message'
import Explore from './pages/Explore'
import ResultPage from './pages/ResultPage'
import Demo from './pages/Demo'
import AI from './pages/AI'

const App = () => {
  console.log('hello');
  
  return (
  <div className='body'>
      <Router>
      <Navbar />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/Courses' element={<Corses />} />
      <Route path='register' element={<Register />} />
      <Route path='/chat' element={<Chat />} />
      <Route path='/explore' element={<Explore />} />
      <Route path='/result' element={<ResultPage />} />
      <Route path='/Demo' element={<Demo />} />
      <Route path='/ai' element={<AI />} />

     </Routes>
     <ChatbotWidget />
      <Footer />
      </Router>
  </div>
  )
}

export default App