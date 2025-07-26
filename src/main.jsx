import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './UI/Navbar.jsx'
import Hero from './UI/Hero.jsx'
import Services from './UI/Services.jsx'
import About from './UI/About.jsx'
import Footer from './UI/Footer.jsx'
import Contact from './UI/Contact.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <Hero/>
    <Services/>
    <About/>
    <Contact/>
    <Footer/>
  </StrictMode>,
)
