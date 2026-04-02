import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import './Contact.css';

const SUBJECTS = [
  'General Inquiry',
  'Early Access Request',
  'Billing & Pricing',
  'Technical Support',
  'Bug Report',
  'Partnership',
  'Press / Media',
  'Other',
];

const INFO = [
  { icon: '📧', label: 'Email', value: 'support@astrictechnologies.com', href: 'mailto:support@astrictechnologies.com' },
  { icon: '📍', label: 'Location', value: 'India', href: null },
  { icon: '⏰', label: 'Response time', value: 'Within 24 hours', href: null },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        toast.success(data.message);
        setForm({ name: '', email: '', company: '', subject: '', message: '' });
      } else {
        const errMsg = data.errors ? data.errors[0].msg : (data.message || 'Something went wrong.');
        toast.error(errMsg);
      }
    } catch { toast.error('Connection error. Please try again.'); }
    finally { setLoading(false); }
  }

  return (
    <div className="contact-page">

      {/* Hero */}
      <section className="page-hero contact-hero">
        <div className="container">
          <div className="badge animate-fade-up"><span>✦</span> Get in Touch</div>
          <h1 className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Let's talk<br /><em className="gold-text">business.</em>
          </h1>
          <p className="page-hero-sub animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Have a question, want early access, or just want to say hi? We read every message and reply within 24 hours.
          </p>
        </div>
        <div className="hero-shimmer-line" />
      </section>

      {/* Main */}
      <section className="section contact-section">
        <div className="container contact-inner">

          {/* Left info */}
          <div className="contact-info reveal">
            <div className="info-block">
              <p className="section-label">Contact Info</p>
              <h3>We're real people,<br />not a chatbot.</h3>
              <div className="gold-line" />
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', lineHeight: 1.75 }}>
                Every message goes directly to our team. Whether you're reporting a bug, asking about pricing, or requesting early access — we'll get back to you personally.
              </p>
            </div>

            <div className="info-items">
              {INFO.map((item, i) => (
                <div key={i} className="info-item">
                  <span className="info-icon">{item.icon}</span>
                  <div>
                    <div className="info-label">{item.label}</div>
                    {item.href
                      ? <a href={item.href} className="info-value link">{item.value}</a>
                      : <div className="info-value">{item.value}</div>}
                  </div>
                </div>
              ))}
            </div>

            <div className="info-card">
              <div className="info-card-icon">📱</div>
              <div>
                <h4>Join Early Access</h4>
                <p>Be among the first to run your business on Astric. Android only, free to start.</p>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="contact-form-wrap reveal reveal-delay-2">
            {sent ? (
              <div className="sent-state">
                <div className="sent-icon">✅</div>
                <h3>Message sent!</h3>
                <p>Thanks for reaching out. We'll reply to <strong>{form.email || 'your email'}</strong> within 24 hours.</p>
                <button className="btn btn-outline" onClick={() => setSent(false)} style={{ marginTop: '1rem' }}>Send another message</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-title">
                  <h3>Send a message</h3>
                  <p>All fields marked * are required.</p>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} className="input" placeholder="Jane Doe" required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} className="input" placeholder="jane@company.com" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Company <span className="opt">(optional)</span></label>
                    <input name="company" value={form.company} onChange={handleChange} className="input" placeholder="Acme Corp" />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Subject *</label>
                    <select name="subject" value={form.subject} onChange={handleChange} className="input select-input" required>
                      <option value="">Select a subject…</option>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} className="input" placeholder="Tell us what's on your mind…" rows={5} required />
                </div>

                <button type="submit" className="btn btn-gold submit-btn" disabled={loading}>
                  {loading ? (
                    <><span className="spinner" /> Sending…</>
                  ) : (
                    <>Send Message ✦</>
                  )}
                </button>

                <p className="form-note">
                  By submitting, you agree that we may use your information to respond to your enquiry. We never spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Bottom cards */}
      <section className="section quick-links-section">
        <div className="container">
          <div className="quick-links-grid">
            {[
              { icon: '📖', title: 'Read the Docs', desc: 'Step-by-step guides for every feature in Astric.', href: '/how-to-use', label: 'View Guides' },
              { icon: '❓', title: 'Browse FAQ', desc: 'Quick answers to the most common questions.', href: '/support', label: 'See FAQ' },
              { icon: '🐛', title: 'Report a Bug', desc: 'Something not working? We fix bugs fast.', href: null, label: 'Email Us' },
            ].map((c, i) => (
              <div key={i} className="quick-card card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <span className="quick-icon">{c.icon}</span>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
                {c.href
                  ? <a href={c.href} className="btn btn-ghost" style={{ marginTop: '0.5rem' }}>{c.label} →</a>
                  : <a href="mailto:support@astrictechnologies.com" className="btn btn-ghost" style={{ marginTop: '0.5rem' }}>{c.label} →</a>}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
