import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Landing   from './pages/Landing.jsx';
import Product   from './pages/Product.jsx';
import HowToUse  from './pages/HowToUse.jsx';
import Support   from './pages/Support.jsx';
import About     from './pages/About.jsx';
import Contact   from './pages/Contact.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"          element={<Landing />}  />
          <Route path="/features"    element={<Product />}  />
          <Route path="/how-to-use" element={<HowToUse />} />
          <Route path="/support"   element={<Support />}  />
          <Route path="/about"     element={<About />}    />
          <Route path="/contact"   element={<Contact />}  />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
