import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Support.css';

const CATEGORIES = [
  { icon: '🚀', label: 'Getting Started', href: '#getting-started' },
  { icon: '🤖', label: 'AI Assistant',    href: '#ai' },
  { icon: '💰', label: 'Billing & Plans', href: '#billing' },
  { icon: '🌐', label: 'Website Builder', href: '#website' },
  { icon: '👥', label: 'CRM & Leads',     href: '#crm' },
  { icon: '📱', label: 'Android App',     href: '#android' },
];

const FAQS = {
  'getting-started': {
    label: '🚀 Getting Started',
    items: [
      {
        q: 'How do I get access to Astric?',
        a: 'Astric is currently in early access. Submit your email on our landing page or contact form to join the waitlist. You\'ll receive an invite link to download the Android APK or Play Store listing.',
      },
      {
        q: 'Is Astric free to use?',
        a: 'Yes! The Basic plan is completely free with 10,000 tokens per month. No credit card required to sign up. You can upgrade to Standard or Premium at any time from within the app.',
      },
      {
        q: 'How do I set up my organization?',
        a: 'After signing up, you\'ll be guided through creating your organization profile. You can add your company name, invite team members, and configure your billing plan — all from the app settings.',
      },
      {
        q: 'Can I use Astric on iOS or web?',
        a: 'Currently, Astric is available as an Android app only. iOS and web versions are on our roadmap. Join the waitlist to be notified when they launch.',
      },
    ],
  },
  ai: {
    label: '🤖 AI Assistant',
    items: [
      {
        q: 'What can I ask the AI assistant?',
        a: 'Anything related to your business! Ask about overdue tasks, revenue summaries, lead pipeline status, what\'s due today, hot leads, and more. The AI has real-time access to your live Firestore data — it answers with your actual numbers.',
      },
      {
        q: 'What are tokens and how do they work?',
        a: 'Tokens are the unit of AI usage. Every message you send and every website generated costs tokens. Your monthly allocation resets on the 1st of each month. Unused monthly tokens don\'t carry over, but purchased add-on tokens never expire.',
      },
      {
        q: 'What happens when I run out of tokens?',
        a: 'You\'ll see a "Limit Reached" message. You can buy 10,000 add-on tokens for ₹10 instantly, or upgrade your plan for a higher monthly allocation. Add-on tokens stack on top of your monthly allowance.',
      },
      {
        q: 'Why does the AI sometimes give different answers?',
        a: 'The AI is conversational and slightly creative by design (temperature 0.7). For consistent factual answers about your data (revenue, task counts), it always uses your live database. For open-ended questions, slight variation is expected.',
      },
    ],
  },
  billing: {
    label: '💰 Billing & Plans',
    items: [
      {
        q: 'What are the available plans?',
        a: 'Basic (Free, 10,000 tokens/month), Standard (₹499/month, 50,000 tokens), and Premium (₹999/month, 1,00,000 tokens). Annual billing gives you 8–10% more tokens per month at the same price.',
      },
      {
        q: 'How do add-on tokens work?',
        a: 'You can buy 10,000 tokens for ₹10 at any time on any plan. Add-on tokens are deducted after your monthly allocation runs out, and they never expire — they carry over every month until used.',
      },
      {
        q: 'What payment methods are accepted?',
        a: 'We use Razorpay for secure payments. You can pay via UPI (PhonePe, Google Pay, Paytm), debit/credit card, net banking, and popular wallets — all natively within the Android app.',
      },
      {
        q: 'Can I switch plans at any time?',
        a: 'Yes. You can upgrade or downgrade your plan at any time from the billing section in the app. Upgrades take effect immediately. Downgrades take effect at the next billing cycle.',
      },
      {
        q: 'Is there a refund policy?',
        a: 'Add-on token purchases are non-refundable once tokens are consumed. For subscription billing issues, contact support@astrictechnologies.com within 7 days and we\'ll review on a case-by-case basis.',
      },
    ],
  },
  website: {
    label: '🌐 Website Builder',
    items: [
      {
        q: 'Which plans include website generation?',
        a: 'Website generation is available on Standard and Premium plans. Basic plan does not include website generation. Editing an existing generated website is exclusive to the Premium plan.',
      },
      {
        q: 'How do I preview the generated website?',
        a: 'After generation, tap "Preview" on the website message. Astric uses an in-app WebView to render the live HTML — no external browser needed. You can also tap "View HTML" to see the source code.',
      },
      {
        q: 'How do I host my generated website?',
        a: 'Tap "Copy HTML" to copy the code to your clipboard. Save it as index.html on your computer, then upload to any hosting provider — GitHub Pages (free), Netlify, Vercel, or any web host.',
      },
      {
        q: 'Can I edit a generated website?',
        a: 'Yes, on Premium. After generation, tap "Edit" and describe the changes: "change the color scheme to blue", "add a testimonials section", or "make the hero text larger". The AI will update the code accordingly.',
      },
    ],
  },
  crm: {
    label: '👥 CRM & Leads',
    items: [
      {
        q: 'How do I add leads to the CRM?',
        a: 'Open the Leads section, tap the "+" button, and fill in the lead details — name, company, contact, estimated value, priority, and starting stage. You can also ask the AI to summarize your pipeline at any time.',
      },
      {
        q: 'What are the lead stages?',
        a: 'Leads move through: New → Contacted → Qualified → Proposal → Won / Lost. You can drag leads between stages or update them from the lead detail screen.',
      },
      {
        q: 'How is open pipeline value calculated?',
        a: 'Open pipeline value is the sum of estimated values for all leads that are not Won or Lost. The AI can report this to you: just ask "What\'s my open pipeline value?"',
      },
    ],
  },
  android: {
    label: '📱 Android App',
    items: [
      {
        q: 'What Android version does Astric require?',
        a: 'Astric requires Android 8.0 (Oreo) or higher. The app is optimized for phones; tablet support is coming in a future update.',
      },
      {
        q: 'Is my data secure?',
        a: 'Yes. Astric uses Firebase (Google Cloud) for data storage with real-time sync. Your data is encrypted in transit and at rest. We never sell or share your business data with third parties.',
      },
      {
        q: 'Does Astric work offline?',
        a: 'Basic navigation works offline, but AI features and real-time data sync require an internet connection. Firebase caches recent data locally for viewing.',
      },
    ],
  },
};

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="faq-chevron">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="faq-a"><p>{a}</p></div>}
    </div>
  );
}

export default function Support() {
  const [active, setActive] = useState('getting-started');

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="support-page">

      {/* Hero */}
      <section className="page-hero support-hero">
        <div className="container">
          <div className="badge animate-fade-up"><span>✦</span> Help & Support</div>
          <h1 className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            How can we<br /><em className="gold-text">help you?</em>
          </h1>
          <div className="support-search animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <span className="search-icon">🔍</span>
            <input type="text" className="input support-search-input" placeholder="Search help articles…" readOnly />
          </div>
        </div>
        <div className="hero-shimmer-line" />
      </section>

      {/* Categories */}
      <section className="section categories-section">
        <div className="container">
          <div className="categories-grid">
            {CATEGORIES.map((c, i) => (
              <button
                key={i}
                className={`cat-card reveal${active === c.href.slice(1) ? ' cat-active' : ''}`}
                style={{ transitionDelay: `${i * 0.06}s` }}
                onClick={() => setActive(c.href.slice(1))}
              >
                <span className="cat-icon">{c.icon}</span>
                <span className="cat-label">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section" id="faq">
        <div className="container faq-inner">
          <div className="faq-sidebar reveal">
            <h3>Categories</h3>
            <div className="gold-line" />
            {Object.entries(FAQS).map(([key, val]) => (
              <button
                key={key}
                className={`sidebar-item${active === key ? ' sidebar-active' : ''}`}
                onClick={() => setActive(key)}
              >
                {val.label}
              </button>
            ))}
          </div>
          <div className="faq-content reveal reveal-delay-2">
            {FAQS[active] && (
              <>
                <h2 className="faq-section-title">{FAQS[active].label}</h2>
                <div className="gold-line" />
                <div className="faq-list">
                  {FAQS[active].items.map((item, i) => (
                    <FAQItem key={i} {...item} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section support-cta-section">
        <div className="container">
          <div className="support-cta-grid">
            <div className="support-cta-card card reveal">
              <span className="cta-icon">💬</span>
              <h4>Still need help?</h4>
              <p>Can't find your answer? Our support team typically replies within 24 hours.</p>
              <Link to="/contact" className="btn btn-gold" style={{ marginTop: '0.5rem' }}>Contact Support</Link>
            </div>
            <div className="support-cta-card card reveal reveal-delay-2">
              <span className="cta-icon">📖</span>
              <h4>Explore How-to Guides</h4>
              <p>Step-by-step walkthroughs for every feature, from setup to AI website generation.</p>
              <Link to="/how-to-use" className="btn btn-outline" style={{ marginTop: '0.5rem' }}>Read Guides →</Link>
            </div>
            <div className="support-cta-card card reveal reveal-delay-3">
              <span className="cta-icon">🐛</span>
              <h4>Report a Bug</h4>
              <p>Found something that isn't working right? Let us know and we'll fix it fast.</p>
              <Link to="/contact" className="btn btn-outline" style={{ marginTop: '0.5rem' }}>Report Issue →</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
