import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });
      const data = await res.json();
      if (data.success) { toast.success(data.message); setEmail(''); }
      else toast.error(data.message || 'Something went wrong.');
    } catch { toast.error('Connection error. Try again.'); }
    finally { setLoading(false); }
  }

  return (
    <footer className="footer">
      <div className="divider" />
      <div className="container footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-mark">✦</span> Astric
          </Link>
          <p className="footer-tagline">
            All-in-one business suite with an AI assistant built in.
            Built for growing teams, ready for scale.
          </p>
          <div className="footer-social">
            {['twitter','linkedin','instagram'].map(s => (
              <a key={s} href={`https://${s}.com`} target="_blank" rel="noreferrer" className="social-icon" aria-label={s}>
                {s === 'twitter'   && <TwitterIcon />}
                {s === 'linkedin'  && <LinkedInIcon />}
                {s === 'instagram' && <InstagramIcon />}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="footer-col">
          <h5 className="footer-col-title">Product</h5>
          <Link to="/product">Features</Link>
          <Link to="/product#pricing">Pricing</Link>
          <Link to="/how-to-use">How It Works</Link>
          <Link to="/support">Changelog</Link>
        </div>

        <div className="footer-col">
          <h5 className="footer-col-title">Company</h5>
          <Link to="/about">About Us</Link>
          <Link to="/about#team">Team</Link>
          <Link to="/contact">Contact</Link>
          <a href="https://bussiness-3c966.web.app/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>
        </div>

        <div className="footer-col">
          <h5 className="footer-col-title">Support</h5>
          <Link to="/support">Help Center</Link>
          <Link to="/support#faq">FAQ</Link>
         
           <a href="https://bussiness-3c966.web.app/AstricHelp" target="_blank" rel="noopener noreferrer">
    Documentation
  </a>
          <Link to="/contact">Report a Bug</Link>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <h5 className="footer-col-title">Early Access</h5>
          <p>Be first to know when Astric launches on Android.</p>
          <form onSubmit={handleSubscribe} className="sub-form">
            <input
              type="email"
              className="input sub-input"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-gold sub-btn" disabled={loading}>
              {loading ? '...' : 'Notify Me'}
            </button>
          </form>
        </div>
      </div>

      <div className="divider" />
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Astric Technologies. All rights reserved.</p>
        <p className="footer-made">Made with ✦ in India</p>
      </div>
    </footer>
  );
}

const TwitterIcon   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const LinkedInIcon  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const InstagramIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>;
