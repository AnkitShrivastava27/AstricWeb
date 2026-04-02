import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const VALUES = [
  { icon: '⚡', title: 'Speed first', desc: 'Every feature ships fast and works faster. We believe powerful tools shouldn\'t slow you down.' },
  { icon: '🔍', title: 'Radical transparency', desc: 'Simple pricing, clear token usage, no hidden fees. You always know exactly what you\'re paying for and why.' },
  { icon: '🤝', title: 'Built for trust', desc: 'Your business data is yours. We use industry-standard encryption and never sell or share your information.' },
  { icon: '♾️', title: 'Always improving', desc: 'Astric ships updates constantly. Every piece of feedback we receive shapes what we build next.' },
];

const TEAM = [
  { name: '[Founder Name]', role: 'Founder & CEO', bio: 'Placeholder — add your name, photo, and a short bio here. Passionate about building tools that make business easier for everyone.', initials: 'FN' },
  { name: '[Co-Founder Name]', role: 'CTO', bio: 'Placeholder — add your co-founder\'s details. Leads engineering and product architecture at Astric Technologies.', initials: 'CF' },
  { name: '[Team Member]', role: 'Product Designer', bio: 'Placeholder — add your designer\'s name and bio. Crafts every interaction to feel simple, fast, and beautiful.', initials: 'TM' },
];

const TIMELINE = [
  { year: '2024', event: 'Idea born — frustrated with fragmented business tools, the founder sets out to build one unified app.' },
  { year: 'Q1 2025', event: 'First prototype of Astric built with Flutter & Firebase. CRM, tasks, and finance modules shipped.' },
  { year: 'Q2 2025', event: 'AI assistant integrated using DeepSeek API. Live business data context added — the "real answers" moment.' },
  { year: 'Q3 2025', event: 'AI website generation launched. Token billing system built with Razorpay integration.' },
  { year: 'Q4 2025', event: 'WebView preview, select-and-copy text, and monthly token system shipped.' },
  { year: '2026', event: 'Early access opens. Astric Technologies marketing website launched. iOS & web versions in planning.' },
];

export default function About() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="about-page">

      {/* Hero */}
      <section className="page-hero about-hero">
        <div className="container">
          <div className="badge animate-fade-up"><span>✦</span> About Astric</div>
          <h1 className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            We're building the<br /><em className="gold-text">business OS</em> for India.
          </h1>
          <p className="page-hero-sub animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Astric Technologies is a product-first company obsessed with making powerful business tools accessible to every entrepreneur, freelancer, and growing team.
          </p>
        </div>
        <div className="hero-shimmer-line" />
      </section>

      {/* Mission */}
      <section className="section mission-section">
        <div className="container mission-inner">
          <div className="mission-copy reveal">
            <p className="section-label">Our Mission</p>
            <h2>Business software<br />shouldn't need a manual.</h2>
            <div className="gold-line" />
            <p>
              Most business software is built for enterprises — complex, expensive, and requiring days of onboarding. We built Astric for <strong>everyone else.</strong>
            </p>
            <p>
              One Android app. Six integrated modules. An AI that knows your business as well as you do. No subscriptions to ten different tools. No switching between apps. No monthly reports you have to manually compile — just ask.
            </p>
            <p>
              Our goal is simple: give every business owner — from a solo freelancer to a 50-person team — the same operational clarity that Fortune 500 companies pay millions for.
            </p>
            <Link to="/product" className="btn btn-outline" style={{ marginTop: '1rem', width: 'fit-content' }}>See What We Built →</Link>
          </div>
          <div className="mission-visual reveal reveal-delay-2">
            <div className="mission-card">
              <div className="mission-quote">
                <div className="quote-mark">"</div>
                <p>We built the tool we always wished existed — one app that knows your business and can answer any question about it in plain English.</p>
                <div className="quote-attr">— Astric Technologies Team</div>
              </div>
              <div className="mission-stats">
                <div className="m-stat"><span>6</span><small>Modules</small></div>
                <div className="m-stat"><span>1</span><small>App</small></div>
                <div className="m-stat"><span>∞</span><small>Potential</small></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section values-section">
        <div className="container">
          <div className="section-head reveal">
            <p className="section-label">What We Stand For</p>
            <h2>Our core values.</h2>
            <div className="gold-line" style={{ margin: '1rem auto 0' }} />
          </div>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className="value-card card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <span className="value-icon">{v.icon}</span>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section timeline-section">
        <div className="container">
          <div className="section-head reveal">
            <p className="section-label">Our Journey</p>
            <h2>How Astric came to be.</h2>
            <div className="gold-line" style={{ margin: '1rem auto 0' }} />
          </div>
          <div className="timeline">
            {TIMELINE.map((t, i) => (
              <div key={i} className={`tl-item reveal${i % 2 === 0 ? '' : ' tl-right'}`} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="tl-dot" />
                <div className="tl-card">
                  <div className="tl-year">{t.year}</div>
                  <p className="tl-event">{t.event}</p>
                </div>
              </div>
            ))}
            <div className="tl-line" />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section team-section" id="team">
        <div className="container">
          <div className="section-head reveal">
            <p className="section-label">The Team</p>
            <h2>The people behind Astric.</h2>
            <div className="gold-line" style={{ margin: '1rem auto 0' }} />
            <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem', fontSize: '0.875rem' }}>
              Replace the placeholders below with your actual team details.
            </p>
          </div>
          <div className="team-grid">
            {TEAM.map((m, i) => (
              <div key={i} className="team-card card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="team-avatar">{m.initials}</div>
                <h4 className="team-name">{m.name}</h4>
                <div className="team-role">{m.role}</div>
                <p className="team-bio">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--black)', textAlign: 'center' }}>
        <div className="container reveal">
          <p className="section-label" style={{ color: 'var(--gold)' }}>Join Us</p>
          <h2 style={{ color: 'var(--white)' }}>We're just getting started.</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 480, margin: '1rem auto 2rem', fontSize: '0.95rem' }}>
            Astric is in early access. Be part of the journey — join our waitlist, share feedback, and help us build the business suite you've always wanted.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-gold">Get Early Access</Link>
            <Link to="/contact" className="btn" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--white)', border: '1px solid rgba(255,255,255,0.15)' }}>Contact the Team</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
