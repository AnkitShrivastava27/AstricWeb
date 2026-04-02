import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV = [
  { to: '/',            label: 'Home' },
  { to: '/product',     label: 'Features' },
  { to: '/how-to-use',  label: 'How to Use' },
  { to: '/support',     label: 'Support' },
  { to: '/about',       label: 'About' },
  { to: '/contact',     label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-mark">✦</span>
          <span className="logo-text">Astric</span>
        </Link>

        {/* Desktop nav */}
        <nav className="nav-links">
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="nav-cta">
          <Link to="/contact" className="btn btn-gold nav-btn">Get Early Access</Link>
          {/* Hamburger */}
          <button className={`hamburger${open ? ' open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {NAV.map(n => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => isActive ? 'mob-link active' : 'mob-link'}>
            {n.label}
          </NavLink>
        ))}
        <Link to="/contact" className="btn btn-gold mob-cta">Get Early Access</Link>
      </div>
    </header>
  );
}
