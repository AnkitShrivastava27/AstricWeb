import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV = [
  { to: '/',            label: 'Home' },
  { to: '/features',    label: 'Features' },
  { to: '/how-to-use',  label: 'How to Use' },
  { to: '/support',     label: 'Support' },
  { to: '/about',       label: 'About' },
  { to: '/contact',     label: 'Contact' },
];

/* ─── Shared Download Button ─────────────────────────────────────────────────
   When the APK / Play Store URL is ready:
     1. Replace href="#" with the real URL
     2. Remove onClick={e => e.preventDefault()} and aria-disabled
     3. Remove className "coming-soon"
   ─────────────────────────────────────────────────────────────────────────── */
export function DownloadButton({ className = '' }) {
  return (
    <a
      href="#"
      className={`btn-download coming-soon ${className}`}
      onClick={e => e.preventDefault()}
      aria-disabled="true"
      title="Android app — coming soon on Google Play"
    >
      <AndroidIcon />
      <span>Download App</span>
      <span className="cs-pill">Soon</span>
    </a>
  );
}

export function AndroidIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.523 15.341A5 5 0 0 0 19 12a5 5 0 0 0-1.477-3.341l1.393-1.394a.75.75 0 0 0-1.06-1.06l-1.394 1.393A5 5 0 0 0 13 6.082V4.75a.75.75 0 0 0-1.5 0v1.332A5 5 0 0 0 8.538 7.598L7.144 6.205a.75.75 0 1 0-1.06 1.06l1.393 1.394A5 5 0 0 0 6 12a5 5 0 0 0 1.477 3.341L6.083 16.74a.75.75 0 1 0 1.061 1.06l1.394-1.393A5 5 0 0 0 11.5 17.918V19.25a.75.75 0 0 0 1.5 0v-1.332a5 5 0 0 0 2.962-1.511l1.394 1.393a.75.75 0 1 0 1.06-1.06l-1.393-1.399zM12 16.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { pathname }            = useLocation();

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
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="nav-cta">
          <DownloadButton />
          <Link to="/contact" className="btn btn-gold nav-btn">Early Access</Link>
          <button
            className={`hamburger${open ? ' open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {NAV.map(n => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.to === '/'}
            className={({ isActive }) => isActive ? 'mob-link active' : 'mob-link'}
          >
            {n.label}
          </NavLink>
        ))}
        <div className="mob-actions">
          <DownloadButton className="mob-download-btn" />
          <Link to="/contact" className="btn btn-gold mob-cta">Get Early Access</Link>
        </div>
      </div>
    </header>
  );
}
