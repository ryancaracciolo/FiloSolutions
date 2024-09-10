import React from 'react';
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



function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const location = useLocation();
  let isProductRoute = location.pathname.startsWith('/app');
  
  return (
    <div className="app-wrapper">
      {isProductRoute ? (
        <>
          <Header />
          <main className='product-main'>
            <Menu />
            <Routes>
              {/* Product page routes */}
              <Route path="/app/dashboard" element={<Dashboard />} />
              <Route path="/app/partnerships" element={<Partnerships />} />
              <Route path="/app/opportunities" element={<Opportunities />} />
            </Routes>
          </main>
        </>
      ) : (
        <>
          <LandingHeader onMenuClick={() => setMenuOpen(!menuOpen)} />
          <LandingMenu isOpen={menuOpen} onMenuClosed={() => setMenuOpen(!menuOpen)} />
          <main className="landing-main">
            <Routes>
              {/* Landing page routes */}
              <Route exact path="/" element={<Home />} />
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
