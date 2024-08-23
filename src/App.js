import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import styled from 'styled-components';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Menu from './Components/Menu/Menu';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import LearnMore from './Pages/Learn-More/Learn-More';
import Contact from './Pages/Contact/Contact';
import PrivacyPolicy from './Pages/Privacy-Policy/Privacy-Policy';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  
  return (
    <Router>
      <div className="app-wrapper">
        <Header onMenuClick={() => setMenuOpen(!menuOpen)} />
        <Menu isOpen={menuOpen} onMenuClosed={() => setMenuOpen(!menuOpen)} />
        <main className="app-content">
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
