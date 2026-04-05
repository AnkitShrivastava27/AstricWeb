import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { DownloadButton } from '../components/Navbar.jsx';
import './Landing.css';
import { api } from '../lib/api';
const FEATURES = [
  { icon: '🤖', title: 'AI Business Assistant', desc: 'Ask anything in plain English. Get instant answers about your tasks, leads, and revenue — powered by DeepSeek AI with live data.' },
  { icon: '👥', title: 'CRM & Lead Pipeline', desc: 'Track leads from first contact to closed deal. Hot prospects, win rates, and pipeline value — all in one view.' },
  { icon: '✅', title: 'Task Management', desc: 'Assign tasks, set deadlines, track overdue items. Know exactly what needs to get done today.' },
  { icon: '💰', title: 'Finance & Invoicing', desc: 'Monitor income, expenses, and net balance. Real-time financial snapshot always in your pocket.' },
  { icon: '🌐', title: 'AI Website Builder', desc: 'Generate a complete business website with a single prompt. Preview in-app, copy the HTML, and host anywhere.' },
  { icon: '📊', title: 'Live Business Insights', desc: 'Your AI sees your real Firestore data — not generic advice. Real numbers, real answers, every time.' },
];

const PLANS = [
  { name: 'Basic', price: 'Free', tokens: '10,000', highlight: false,
    perks: ['10,000 tokens/month', 'AI chat assistant', 'CRM & leads', 'Task management', 'Finance tracking'] },
  { name: 'Standard', price: '₹499', tokens: '50,000', highlight: true,
    perks: ['50,000 tokens/month', 'Everything in Basic', 'AI website generation', 'Add-on tokens available', 'Priority support'] },
  { name: 'Premium', price: '₹999', tokens: '1,00,000', highlight: false,
    perks: ['1,00,000 tokens/month', 'Everything in Standard', 'AI website editing', 'Annual billing discount', 'Dedicated support'] },
];

const STATS = [
  { value: '6+', label: 'Core Modules' },
  { value: '3',  label: 'Plan Tiers' },
  { value: '1',  label: 'App, all you need' },
  { value: '∞',  label: 'Possibilities' },
];

export default function Landing() {
  const [email,   setEmail]   = useState('');
  const [loading, setLoading] = useState(false);
  const heroRef = useRef(null);

  // Parallax orb on mouse move
  useEffect(() => {
    const fn = (e) => {
      const orb = document.querySelector('.hero-orb');
      if (!orb) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      orb.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  async function handleEarly(e) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res  = await api('/api/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, source: 'landing-hero' }),
      });
      const data = await res.json();
      if (data.success) { toast.success(data.message); setEmail(''); }
      else toast.error(data.message || 'Something went wrong.');
    } catch {
      toast.error('Connection error. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="landing">

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-orb" />
          <div className="hero-grid" />
        </div>

        <div className="container hero-content">
          <div className="badge hero-badge animate-fade-up">
            <span>✦</span> Now in Early Access · Android
          </div>

          <h1 className="hero-title animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Your Business,<br />
            <em className="gold-text">Intelligently</em> Managed.
          </h1>

          <p className="hero-sub animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Astric is the all-in-one business suite with an AI assistant built in —
            CRM, tasks, finance, and website generation, all from your Android phone.
          </p>

          {/* Early access email form */}
          <form className="hero-form animate-fade-up" style={{ animationDelay: '0.3s' }} onSubmit={handleEarly}>
            <input
              type="email"
              className="input hero-input"
              placeholder="Enter your email for early access"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-gold" disabled={loading}>
              {loading ? 'Joining…' : 'Notify Me'}
            </button>
          </form>

          {/* Download CTA — coming soon */}
          <div className="hero-download-row animate-fade-up" style={{ animationDelay: '0.38s' }}>
            <DownloadButton />
            <span className="hero-download-note">Android · Coming soon on Google Play</span>
          </div>

          <p className="hero-note animate-fade-up" style={{ animationDelay: '0.44s' }}>
            Free to start · No credit card required
          </p>
        </div>

        {/* Floating phone mockup */}
        <div className="hero-phone-wrap animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <div className="phone-frame animate-float">
            <div className="phone-screen">
              <div className="phone-header">
                <span className="phone-dot" />
                <span className="phone-title">Astric AI</span>
                <span className="phone-badge">Premium</span>
              </div>
              <div className="phone-chat">
                <div className="chat-bubble ai">What's my revenue this month?</div>
                <div className="chat-bubble user">₹2,45,000 income · ₹68,200 expenses · Net: <b>₹1,76,800</b> 📈</div>
                <div className="chat-bubble ai">Build me a landing page for my bakery</div>
                <div className="chat-bubble user generating">✅ Website generated! Tap "Preview" to view.</div>
              </div>
              <div className="phone-stat-row">
                <div className="phone-stat"><span>32</span><small>Leads</small></div>
                <div className="phone-stat"><span>18</span><small>Tasks</small></div>
                <div className="phone-stat"><span>94%</span><small>Win Rate</small></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ─────────────────────────────────────── */}
      <section className="stats-strip">
        <div className="divider" />
        <div className="container stats-inner">
          {STATS.map((s, i) => (
            <div key={i} className="stat-item reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="divider" />
      </section>

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section className="section features-section">
        <div className="container">
          <div className="section-head reveal">
            <p className="section-label">What's Inside</p>
            <h2>Everything your business needs,<br /><em>one app.</em></h2>
            <div className="gold-line" />
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card card reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="feature-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI SPOTLIGHT ────────────────────────────────────── */}
      <section className="section ai-section">
        <div className="container ai-inner">
          <div className="ai-visual reveal">
            <div className="ai-terminal">
              <div className="terminal-bar">
                <span className="t-dot red" /><span className="t-dot yellow" /><span className="t-dot green" />
                <span className="t-title">Astric AI</span>
              </div>
              <div className="terminal-body">
                <div className="t-line"><span className="t-prompt">›</span> How many overdue tasks do I have?</div>
                <div className="t-line t-response">You have <span className="t-hi">4 overdue tasks</span> — "Client proposal", "Invoice follow-up", "Team review", and "Q2 report". The oldest is 3 days overdue.</div>
                <div className="t-line t-gap"><span className="t-prompt">›</span> Generate a portfolio website for my agency</div>
                <div className="t-line t-response"><span className="t-hi">✅ Website generated!</span> Modern dark-themed portfolio with hero, services, and contact sections. Tap Preview to view.</div>
                <div className="t-cursor" />
              </div>
            </div>
          </div>
          <div className="ai-copy reveal reveal-delay-2">
            <p className="section-label">AI Assistant</p>
            <h2>Ask anything.<br /><em>Get real answers.</em></h2>
            <div className="gold-line" />
            <p>Astric AI has live access to your actual business data — your real tasks, leads, revenue, and more. Not generic tips. Not mock data. <strong>Your numbers.</strong></p>
            <ul className="ai-list">
              <li>💬 Natural language queries about your business</li>
              <li>🌐 Generate full websites from a single prompt</li>
              <li>📊 Real-time financial and pipeline summaries</li>
              <li>✏️ Edit and iterate websites (Premium)</li>
            </ul>
            <Link to="/features" className="btn btn-outline">Explore All Features →</Link>
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────── */}
      <section className="section pricing-section" id="pricing">
        <div className="container">
          <div className="section-head reveal">
            <p className="section-label">Pricing</p>
            <h2>Simple, transparent pricing.</h2>
            <div className="gold-line" />
            <p className="section-sub">Start free. Scale as you grow. Add tokens when you need them.</p>
          </div>
          <div className="pricing-grid">
            {PLANS.map((p, i) => (
              <div key={i} className={`pricing-card reveal${p.highlight ? ' pricing-highlight' : ''}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                {p.highlight && <div className="pricing-popular">Most Popular</div>}
                <div className="pricing-name">{p.name}</div>
                <div className="pricing-price">
                  {p.price}<small>{p.price !== 'Free' ? '/mo' : ''}</small>
                </div>
                <div className="pricing-tokens">{p.tokens} tokens/month</div>
                <ul className="pricing-perks">
                  {p.perks.map((pk, j) => <li key={j}><span className="check">✓</span>{pk}</li>)}
                </ul>
                <Link to="/contact" className={`btn ${p.highlight ? 'btn-gold' : 'btn-outline'} pricing-btn`}>
                  {p.price === 'Free' ? 'Get Started Free' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>
          <p className="pricing-note reveal">Add-on: 10,000 tokens for ₹10 · Tokens never expire · Annual billing saves up to 8%</p>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────── */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-card reveal">
            <div className="cta-orb" />
            <p className="section-label" style={{ color: 'var(--gold-light)' }}>Ready to start?</p>
            <h2 style={{ color: 'var(--white)' }}>Run your business smarter<br />with Astric.</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 480, margin: '0 auto 2rem' }}>
              Join businesses already using Astric to manage leads, track finances, and build websites — all from Android.
            </p>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-gold">Get Early Access</Link>
              <DownloadButton />
            </div>
            <p className="cta-coming-soon">📱 Android app — download coming soon on Google Play</p>
          </div>
        </div>
      </section>

    </div>
  );
}
