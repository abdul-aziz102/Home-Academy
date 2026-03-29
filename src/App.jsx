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
import Explore from './pages/Explore'
import ResultPage from './pages/ResultPage'
import Demo from './pages/Demo'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Sitemap from './pages/Sitemap'
import AdminLogin from './pages/AdminLogin'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminStudents from './components/admin/AdminStudents'
import AdminCourses from './components/admin/AdminCourses'
import AdminTeachers from './components/admin/AdminTeachers'
import AdminContacts from './components/admin/AdminContacts'
import StudentLogin from './pages/StudentLogin'
import StudentDashboard from './pages/StudentDashboard'
import WhatsAppButton from './components/WhatsAppButton'

const App = () => {
  console.log('hello');

  return (
  <div className='body'>
      <Router>
     <Routes>
      {/* Admin routes - no Navbar/Footer */}
      <Route path='/adminlogin' element={<AdminLogin />} />
      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path='students' element={<AdminStudents />} />
        <Route path='courses' element={<AdminCourses />} />
        <Route path='teachers' element={<AdminTeachers />} />
        <Route path='contacts' element={<AdminContacts />} />
      </Route>

      {/* Public routes with Navbar/Footer */}
      <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
      <Route path='/about' element={<><Navbar /><About /><Footer /></>} />
      <Route path='/contact' element={<><Navbar /><Contact /><Footer /></>} />
      <Route path='/Courses' element={<><Navbar /><Corses /><Footer /></>} />
      <Route path='register' element={<><Navbar /><Register /><Footer /></>} />
      <Route path='/explore' element={<><Navbar /><Explore /><Footer /></>} />
      <Route path='/result' element={<><Navbar /><ResultPage /><Footer /></>} />
      <Route path='/demo' element={<><Navbar /><Demo /><Footer /></>} />
      <Route path='/privacy' element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
      <Route path='/terms' element={<><Navbar /><TermsOfService /><Footer /></>} />
      <Route path='/sitemap' element={<><Navbar /><Sitemap /><Footer /></>} />
      <Route path='/student-login' element={<><Navbar /><StudentLogin /><Footer /></>} />
      <Route path='/dashboard' element={<><Navbar /><StudentDashboard /><Footer /></>} />

     </Routes>
      <WhatsAppButton />
      </Router>
  </div>
  )
}

export default App
