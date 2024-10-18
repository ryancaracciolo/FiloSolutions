import React, { useContext, useState,useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { BusinessContext } from './objects/UserContext/UserContext'; // Import the UserContext
import './styles/App.css';
import LoadingScreen from './Components/Product/LoadingScreen/LoadingScreen';
/*Landing Pages*/
import LandingHeader from './Components/Landing/Header-Landing/Header-Landing';
import LandingFooter from './Components/Landing/Footer-Landing/Footer-Landing';
import LandingMenu from './Components/Landing/Menu-Landing/Menu-Landing';
import LandingMain from './Pages/Landing/LandingMain/LandingMain';
import Demo from './Pages/Landing/Demo/Demo';
/*Product Pages*/
import Header from './Components/Product/Header/Header';
import Menu from './Components/Product/Menu/Menu';
import Partnerships from './Pages/Product/Partnerships/Partnerships';
import Opportunities from './Pages/Product/Opportunities/Opportunities';
import Authentication from './Pages/Product/Authentication/Authentication';
/*Referral Page*/
import ReferralProfile from './Pages/Product/ReferralProfile/ReferralProfile'
// Amplify configuration
import { Amplify } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);


function App() {
  const [menuOpen, setMenuOpen] = useState(false); // landing menu state
  const [activeMenuIndex, setActiveMenuIndex] = useState(0); // Menu active index

  const { business, setBusiness } = useContext(BusinessContext); // Access user and setUser from context
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Loading state for business check
  let isProductRoute = location.pathname.startsWith('/app');
  let isReferral = location.pathname.startsWith('/referral');
  let isDemo = location.pathname.startsWith('/demo');


  useEffect(() => {
    if (location.pathname === '/app/partnerships') {
      setActiveMenuIndex(0); // Partnerships corresponds to menu index 0
    } else if (location.pathname === '/app/opportunities') {
      setActiveMenuIndex(1); // Opportunities corresponds to menu index 1
    }
  }, [location.pathname]); // Re-run whenever the location changes

  useEffect(() => {
    const storedBusiness = localStorage.getItem('business');
    if (storedBusiness) {
      setBusiness(JSON.parse(storedBusiness));
    }
    setLoading(false); // Mark loading as complete once data is retrieved
    console.log(storedBusiness);
  }, [setBusiness]);

  if (loading) {
    console.log('Loading...');
    return <LoadingScreen isLoading={loading}/>;
  }

  return (
    <div className="app-wrapper">
      {isProductRoute ? (
        <>
         {console.log(business)}

          {business?.id ? (
          <>
            <Header />
            <main className="product-main">
              <Menu activeMenuIndex={activeMenuIndex}/>
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
        isReferral ? (
          <Routes>
            <Route path="/referral/:businessId" element={<ReferralProfile />} />
          </Routes>
        ) : (
          isDemo ? (
            <Routes>
              <Route path="/demo" element={<Demo />} />
            </Routes>
          ) : (
            <>
              <LandingHeader onMenuClick={() => setMenuOpen(!menuOpen)} />
              <LandingMenu isOpen={menuOpen} onMenuClosed={() => setMenuOpen(!menuOpen)} />
              <LandingMain />
              <LandingFooter />
            </>
          )
        )
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
