import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './styles/App.css';
/*Landing Pages*/
import Header from './Components/Landing/Header/Header';
import Footer from './Components/Landing/Footer/Footer';
import Menu from './Components/Landing/Menu/Menu';
import Home from './Pages/Landing/Home/Home';
import About from './Pages/Landing/About/About';
import LearnMore from './Pages/Landing/Learn-More/Learn-More';
import Contact from './Pages/Landing/Contact/Contact';
import PrivacyPolicy from './Pages/Landing/Privacy-Policy/Privacy-Policy';
/*Product Pages*/
import ProductHeader from './Components/Product/ProductHeader/ProductHeader';
import ProductMenu from './Components/Product/ProductMenu/ProductMenu';
import Dashboard from './Pages/Product/Dashboard/Dashboard';


//Comment by Evan for EvansTwig!
//Comment by Ryan for RyansBranch!
function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const location = useLocation();
  let isProductRoute = location.pathname.startsWith('/app');
  
  return (
    <div className="app-wrapper">
      {isProductRoute ? (
          <> <ProductHeader /> </>
      ) : (
        <>
          <Header onMenuClick={() => setMenuOpen(!menuOpen)} />
          <Menu isOpen={menuOpen} onMenuClosed={() => setMenuOpen(!menuOpen)} />
        </>
      )}
      <main className="app-main">
        {isProductRoute ? (
              <div className='product-main'>
                <ProductMenu />
                <Routes>
                  {/* Product page routes */}
                  <Route path="/app/dashboard" element={<Dashboard />} />
                </Routes>
              </div>
        ) : (null)}
        <Routes>
          {/* Landing page routes */}
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      {isProductRoute ? null :<Footer />}
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
