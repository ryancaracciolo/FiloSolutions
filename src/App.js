import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { BusinessContext } from './objects/UserContext/UserContext'; // Import the UserContext
import './styles/App.css';
/*Landing Pages*/
import LandingHeader from './Components/Landing/Header-Landing/Header-Landing';
import LandingFooter from './Components/Landing/Footer-Landing/Footer-Landing';
import LandingMenu from './Components/Landing/Menu-Landing/Menu-Landing';
//import Home from './Pages/Landing/Home/Home';
//import About from './Pages/Landing/About/About';
//import LearnMore from './Pages/Landing/HowItWorks/HowItWorks';
//import Contact from './Pages/Landing/Contact/Contact';
//import PrivacyPolicy from './Pages/Landing/Privacy-Policy/Privacy-Policy';
import LandingMain from './Pages/Landing/LandingMain/LandingMain'
/*Product Pages*/
import Header from './Components/Product/Header/Header';
import Menu from './Components/Product/Menu/Menu';
import Partnerships from './Pages/Product/Partnerships/Partnerships';
import Opportunities from './Pages/Product/Opportunities/Opportunities';
import Authentication from './Pages/Product/Authentication/Authentication';
// Amplify configuration
import { Amplify } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);


function App() {
  const [menuOpen, setMenuOpen] = useState(false); // menu state
  const { business, setBusiness } = useContext(BusinessContext); // Access user and setUser from context
  const location = useLocation();
  let isProductRoute = location.pathname.startsWith('/app');

  return (
    <div className="app-wrapper">
      {isProductRoute ? (
        <>
          {business?.id ? (
          <>
          {console.log(business)}
            <Header />
            <main className="product-main">
              <Menu />
              <Routes>
                <Route path="/app/partnerships" element={<Partnerships />} />
                <Route path="/app/opportunities" element={<Opportunities />} />
                <Route path="*" element={<Navigate to="/app/partnerships" />} />
              </Routes>
            </main>
          </>
          ) : (
            <Routes>
              <Route path="/app/login" element={<Authentication setBusiness={setBusiness} />} />
              <Route path="*" element={<Navigate to="/app/login" />} />
            </Routes>
          )}
        </>
      ) : (
        <>
          {/* Landing page logic */}
          <LandingHeader onMenuClick={() => setMenuOpen(!menuOpen)} />
          <LandingMenu isOpen={menuOpen} onMenuClosed={() => setMenuOpen(!menuOpen)} />
          <LandingMain />
          {/* <main className="landing-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/learn-more" element={<LearnMore />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main> */}
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