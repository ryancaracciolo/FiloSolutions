import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './styles/App.css';
/*Landing Pages*/
import LandingHeader from './Components/Landing/Header-Landing/Header-Landing';
import LandingFooter from './Components/Landing/Footer-Landing/Footer-Landing';
import LandingMenu from './Components/Landing/Menu-Landing/Menu-Landing';
import Home from './Pages/Landing/Home/Home';
import About from './Pages/Landing/About/About';
import LearnMore from './Pages/Landing/Learn-More/Learn-More';
import Contact from './Pages/Landing/Contact/Contact';
import PrivacyPolicy from './Pages/Landing/Privacy-Policy/Privacy-Policy';
/*Product Pages*/
import Header from './Components/Product/Header/Header';
import Menu from './Components/Product/Menu/Menu';
import Dashboard from './Pages/Product/Dashboard/Dashboard';
import Partnerships from './Pages/Product/Partnerships/Partnerships';
import Opportunities from './Pages/Product/Opportunities/Opportunities';
import Authentication from './Pages/Product/Authentication/Authentication';
import Profile from './Pages/Product/Profile/Profile';
import QRCode from './Pages/Product/QRCode/QRCode';
// Amplify configuration
import { Amplify } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);


function App() {
  const [menuOpen, setMenuOpen] = useState(false); // menu state
  const [user, setUser] = useState(null); // user state
  const location = useLocation();
  let isProductRoute = location.pathname.startsWith('/app');
  
  return (
    <div className="app-wrapper">
      {isProductRoute ? (
        <>
          {user ? (
          <>
            <Header />
            <main className="product-main">
              <Menu />
              <Routes>
                <Route path="/app" element={<Dashboard />} />
                <Route path="/app/partnerships" element={<Partnerships />} />
                <Route path="/app/opportunities" element={<Opportunities />} />
                <Route path="/app/profile" element={<Profile />} />
                <Route path="/app/qrcode" element={<QRCode />} />
                <Route path="*" element={<Navigate to="/app" />} />
              </Routes>
            </main>
          </>
          ) : (
            <Routes>
              <Route path="*" element={<Authentication setUser={setUser} />} />
            </Routes>
          )}
        </>
      ) : (
        <>
          {/* Landing page logic */}
          <LandingHeader onMenuClick={() => setMenuOpen(!menuOpen)} />
          <LandingMenu isOpen={menuOpen} onMenuClosed={() => setMenuOpen(!menuOpen)} />
          <main className="landing-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/learn-more" element={<LearnMore />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </main>
          <LandingFooter />
        </>
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );    
}

export default AppWrapper;
