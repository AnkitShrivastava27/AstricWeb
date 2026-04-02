import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const MODULES = [
  {
    icon: '🤖', tag: 'AI Core', title: 'Astric AI Assistant',
    desc: 'Your built-in AI business partner — powered by DeepSeek. Ask questions in plain English and get answers rooted in your actual live data.',
    bullets: [
      'Queries answered using real-time Firestore data',
      'Summarize revenue, leads, overdue tasks instantly',
      'Generate complete business websites in seconds',
      'Edit and iterate websites with follow-up prompts (Premium)',
      'Token-based usage — 10k to 1L tokens/month depending on plan',
    ],
    accent: '#C8A96E',
  },
  {
    icon: '🌐', tag: 'Website Builder', title: 'AI Website Generation',
    desc: 'Prompt the AI to build a full HTML website for your business — no code, no design skills needed. Preview it in-app with WebView.',
    bullets: [
      'Landing pages, portfolios, product pages, contact pages',
      'One prompt → complete HTML/CSS/JS site',
      'In-app WebView preview before sharing',
      'Copy HTML and host anywhere',
      'Edit with follow-up prompts (Premium only)',
    ],
    accent: '#34C759',
  },
  {
    icon: '👥', tag: 'CRM', title: 'Lead & Customer Management',
    desc: 'Full CRM pipeline to track leads from first contact to closed deal. Know exactly where every opportunity stands.',
    bullets: [
      'Lead stages: New → Contacted → Qualified → Proposal → Won/Lost',
      'Hot lead flagging and priority tracking',
      'Open pipeline value and win rate analytics',
      'Customer database with full history',
      'AI can summarize and report on your pipeline',
    ],
    accent: '#007AFF',
  },
  {
    icon: '✅', tag: 'Tasks', title: 'Project & Task Management',
    desc: 'Never miss a deadline. Assign tasks, track progress, and get notified about overdue items — with AI insights.',
    bullets: [
      'To Do / In Progress / Done workflow',
      'Priority levels: High, Medium, Low',
      'Deadline tracking with overdue alerts',
      'Assignee management across your team',
      'AI reports on what\'s overdue and due today',
    ],
    accent: '#FF9500',
  },
  {
    icon: '💰', tag: 'Finance', title: 'Finance & Transactions',
    desc: 'Real-time financial snapshot — income, expenses, and net balance. Your AI knows your numbers and can explain them.',
    bullets: [
      'Log income and expense transactions',
      'Net balance always visible',
      'Recent transaction history',
      'AI-powered revenue summaries on demand',
      'Financial trend insights',
    ],
    accent: '#30D158',
  },
  {
    icon: '📊', tag: 'Billing', title: 'Subscription & Billing',
    desc: 'Transparent token-based billing with Razorpay integration. Upgrade, downgrade, or buy add-on tokens — seamlessly.',
    bullets: [
      'Basic, Standard, Premium plan tiers',
      'Monthly and annual billing cycles',
      'Add-on token packs: 10,000 tokens for ₹10',
      'Tokens never expire — carry over monthly',
      'In-app Razorpay payment with UPI & wallet support',
    ],
    accent: '#BF5AF2',
  },
];

const COMPARE = [
  { feature: 'Monthly Tokens',    basic: '10,000', std: '50,000',   prem: '1,00,000' },
  { feature: 'AI Chat Assistant', basic: '✓',      std: '✓',        prem: '✓' },
  { feature: 'CRM & Leads',       basic: '✓',      std: '✓',        prem: '✓' },
  { feature: 'Task Management',   basic: '✓',      std: '✓',        prem: '✓' },
  { feature: 'Finance Tracking',  basic: '✓',      std: '✓',        prem: '✓' },
  { feature: 'Website Generation',basic: '—',      std: '✓',        prem: '✓' },
  { feature: 'Website Editing',   basic: '—',      std: '—',        prem: '✓' },
  { feature: 'Annual Discount',   basic: '—',      std: '8% off',   prem: '10% off' },
  { feature: 'Add-on Tokens',     basic: '✓',      std: '✓',        prem: '✓' },
  { feature: 'Support',           basic: 'Email',  std: 'Priority', prem: 'Dedicated' },
];

export default function Product() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="product-page">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="page-hero product-hero">
        <div className="container">
          <div className="badge animate-fade-up"><span>✦</span> APP Overview</div>
          <h1 className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Built for business.<br /><em className="gold-text">Powered by AI.</em>
          </h1>
          <p className="page-hero-sub animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Six integrated modules — CRM, tasks, finance, AI chat, website builder, and billing —
            all in one Android app. Here's everything Astric can do for you.
          </p>
        </div>
        <div className="hero-shimmer-line" />
      </section>

      {/* ── MODULE DEEP DIVES ─────────────────────────────────── */}
      <section className="section modules-section">
        <div className="container">
          {MODULES.map((m, i) => (
            <div key={i} className={`module-row reveal${i % 2 === 1 ? ' module-flip' : ''}`} style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="module-visual">
                <div className="module-card" style={{ borderColor: `${m.accent}30` }}>
                  <div className="module-icon-wrap" style={{ background: `${m.accent}14` }}>
                    <span className="module-icon">{m.icon}</span>
                  </div>
                  <div className="module-accent-bar" style={{ background: `linear-gradient(90deg, ${m.accent}, transparent)` }} />
                  <div className="module-mock">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="mock-row">
                        <div className="mock-dot" style={{ background: m.accent }} />
                        <div className="mock-line" style={{ width: `${70 - j * 12}%`, background: `${m.accent}22` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="module-copy">
                <div className="tag">{m.tag}</div>
                <h3>{m.title}</h3>
                <div className="gold-line" />
                <p>{m.desc}</p>
                <ul className="module-bullets">
                  {m.bullets.map((b, j) => (
                    <li key={j}>
                      <span className="bullet-check" style={{ color: m.accent }}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────────────── */}
      <section className="section compare-section" id="pricing">
        <div className="container">
          <div className="section-head reveal">
            <p className="section-label">Plan Comparison</p>
            <h2>Find your perfect plan.</h2>
            <div className="gold-line" style={{ margin: '1rem auto 0' }} />
          </div>
          <div className="table-wrap reveal">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Basic<br /><span>Free</span></th>
                  <th className="th-highlight">Standard<br /><span>₹499/mo</span></th>
                  <th>Premium<br /><span>₹999/mo</span></th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'tr-alt' : ''}>
                    <td className="td-feature">{row.feature}</td>
                    <td>{row.basic}</td>
                    <td className="td-highlight">{row.std}</td>
                    <td>{row.prem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="compare-cta reveal">
            <p className="compare-note">Add-on tokens: ₹10 for 10,000 tokens · available on all plans · tokens never expire</p>
            <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap', marginTop:'1.5rem' }}>
              <Link to="/contact" className="btn btn-gold">Get Started Free</Link>
              <Link to="/contact" className="btn btn-outline">Talk to Sales</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
