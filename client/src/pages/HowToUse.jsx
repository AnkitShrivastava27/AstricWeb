import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HowToUse.css';

const STEPS = [
  {
    num: '01', title: 'Download & Sign Up',
    desc: 'Get Astric from the Google Play Store (early access — join the waitlist). Create your account in under 60 seconds using your email.',
    tips: ['No credit card needed to start', 'Basic plan is completely free', 'Your data is secured with Firebase'],
    icon: '📲',
  },
  {
    num: '02', title: 'Set Up Your Organization',
    desc: 'Add your company details, invite team members, and configure your billing plan. Astric syncs across your whole team in real time.',
    tips: ['Invite unlimited team members', 'Role-based access (coming soon)', 'Switch plans anytime from in-app billing'],
    icon: '🏢',
  },
  {
    num: '03', title: 'Add Your Leads & Customers',
    desc: 'Import or manually add your leads into the CRM. Set priority, assign stages, and track estimated deal values from day one.',
    tips: ['Stages: New → Contacted → Qualified → Proposal → Won/Lost', 'Tag leads as Hot for quick access', 'Track open pipeline value automatically'],
    icon: '👥',
  },
  {
    num: '04', title: 'Create Tasks & Set Deadlines',
    desc: 'Break your projects into tasks. Assign owners, set deadlines, and let Astric track what\'s overdue — so nothing slips through.',
    tips: ['Three-column board: To Do, In Progress, Done', 'Get notified about overdue items', 'Ask the AI: "What tasks are due today?"'],
    icon: '✅',
  },
  {
    num: '05', title: 'Log Income & Expenses',
    desc: 'Record every transaction — income from clients, operational expenses, and everything in between. See your net balance at a glance.',
    tips: ['Categorize transactions for better insights', 'AI can summarize your month in seconds', 'Net balance always shown on dashboard'],
    icon: '💰',
  },
  {
    num: '06', title: 'Talk to Your AI Assistant',
    desc: 'Open the AI chat and ask anything — about your tasks, leads, revenue, or anything business-related. It answers using your real live data.',
    tips: ['"How many overdue tasks do I have?"', '"What\'s my revenue this month?"', '"Which leads are hot right now?"'],
    icon: '🤖',
  },
  {
    num: '07', title: 'Generate a Website with AI',
    desc: 'Type "Build me a landing page for my bakery" and watch Astric AI generate a complete HTML website. Preview it in-app, then copy and host it anywhere.',
    tips: ['Available on Standard & Premium plans', 'Preview live in WebView before copying', 'Edit with follow-up prompts on Premium'],
    icon: '🌐',
  },
  {
    num: '08', title: 'Scale with Add-on Tokens',
    desc: 'Running low on tokens? Buy 10,000 more for just ₹10 — they never expire and carry over month to month. Pay only for what you need.',
    tips: ['₹10 = 10,000 tokens, any time', 'Tokens stack on top of monthly allocation', 'Pay via UPI, Razorpay, or wallet'],
    icon: '⚡',
  },
];

const TIPS = [
  { title: 'Use natural language', body: 'The AI understands plain English — "what\'s my best lead?" works just as well as precise queries.', icon: '💡' },
  { title: 'Check the token bar', body: 'A slim progress bar at the top of the AI chat shows your monthly token usage at a glance.', icon: '📊' },
  { title: 'Long-press messages', body: 'Long-press any AI message to copy the full text or select specific words — perfect for sharing.', icon: '📋' },
  { title: 'Premium for edits', body: 'Upgrade to Premium to use follow-up prompts like "change the color scheme" on generated websites.', icon: '✨' },
];

export default function HowToUse() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="how-page">

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="badge animate-fade-up"><span>✦</span> Getting Started</div>
          <h1 className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Up and running<br /><em className="gold-text">in minutes.</em>
          </h1>
          <p className="page-hero-sub animate-fade-up" style={{ animationDelay: '0.2s' }}>
            From download to generating your first AI website — here's every step you need to get the most out of Astric.
          </p>
        </div>
        <div className="hero-shimmer-line" />
      </section>

      {/* Steps */}
      <section className="section steps-section">
        <div className="container">
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div key={i} className="step-card reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
                <div className="step-top">
                  <div className="step-num">{s.num}</div>
                  <div className="step-icon">{s.icon}</div>
                </div>
                <h4 className="step-title">{s.title}</h4>
                <p className="step-desc">{s.desc}</p>
                <ul className="step-tips">
                  {s.tips.map((t, j) => (
                    <li key={j}><span className="tip-dot" />"{t}"</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro tips */}
      <section className="section tips-section">
        <div className="container">
          <div className="section-head reveal">
            <p className="section-label">Pro Tips</p>
            <h2>Get more out of Astric.</h2>
            <div className="gold-line" style={{ margin: '1rem auto 0' }} />
          </div>
          <div className="tips-grid">
            {TIPS.map((t, i) => (
              <div key={i} className="tip-card card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <span className="tip-icon">{t.icon}</span>
                <h4>{t.title}</h4>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Token explainer */}
      <section className="section token-section">
        <div className="container">
          <div className="token-box reveal">
            <div className="token-copy">
              <p className="section-label">Understanding Tokens</p>
              <h3>How the token system works</h3>
              <div className="gold-line" />
              <p>Tokens are Astric's currency for AI interactions. Every message you send, and every website generated, costs tokens. Here's how they're allocated:</p>
              <div className="token-table">
                {[
                  { plan: 'Basic',    mo: '10,000', ann: '10,000' },
                  { plan: 'Standard', mo: '50,000', ann: '55,000' },
                  { plan: 'Premium',  mo: '1,00,000', ann: '1,05,000' },
                ].map((r, i) => (
                  <div key={i} className="token-row">
                    <span className="tr-plan">{r.plan}</span>
                    <span className="tr-mo">{r.mo}/mo (monthly billing)</span>
                    <span className="tr-ann">{r.ann}/mo (annual billing)</span>
                  </div>
                ))}
              </div>
              <p className="token-note">Add-on pack: ₹10 = 10,000 tokens. Tokens never expire and stack on top of your monthly allocation.</p>
            </div>
            <div className="token-visual reveal reveal-delay-2">
              <div className="token-bar-demo">
                {[
                  { label: 'Chat message', pct: 15, color: '#007AFF' },
                  { label: 'Website generation', pct: 55, color: '#C8A96E' },
                  { label: 'Website edit', pct: 30, color: '#30D158' },
                ].map((b, i) => (
                  <div key={i} className="bar-item">
                    <div className="bar-label">
                      <span>{b.label}</span>
                      <span className="bar-tokens">~{b.pct * 10} tokens</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${b.pct}%`, background: b.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="bar-note">Approximate token costs per action</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--gray-100)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="reveal">
            <p className="section-label">Ready?</p>
            <h2>Start your free account today.</h2>
            <div className="gold-line" style={{ margin: '1rem auto 2rem' }} />
            <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
              <Link to="/contact" className="btn btn-gold">Join Early Access</Link>
              <Link to="/support" className="btn btn-outline">Read the FAQ →</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
