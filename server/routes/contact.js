const express   = require('express');
const router    = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Contact   = require('../models/Contact');
const nodemailer = require('nodemailer');

// ── Rate limit: 5 submissions per IP per hour ─────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

// ── Validation rules ──────────────────────────────────────────────────────
const validate = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 5, max: 2000 }),
];

// ── Nodemailer transporter factory ────────────────────────────────────────
// Port 465 + secure:true (SSL) — required on Render which blocks port 587 (STARTTLS)
// In your .env set: SMTP_HOST=smtp.gmail.com  SMTP_PORT=465
function createTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST || 'smtp.gmail.com',
    port:   Number(process.env.SMTP_PORT) || 465,
    secure: true, // SSL — must be true for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ── POST /api/contact ─────────────────────────────────────────────────────
router.post('/', contactLimiter, validate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  const { name, email, company, subject, message } = req.body;

  try {
    // 1. Save to MongoDB Atlas
    const contact = await Contact.create({ name, email, company, subject, message });

    // 2. Send notification email (non-blocking — we respond to user first)
    res.status(201).json({
      success: true,
      message: "Message received! We'll be in touch shortly.",
      id: contact._id,
    });

    // 3. Fire-and-forget email notification
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = createTransporter();
      transporter.sendMail({
        from:    `"Astric Website" <${process.env.SMTP_USER}>`,
        to:      process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
        replyTo: email,
        subject: `[Astric Contact] ${subject}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e8e8e4;border-radius:12px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#A6853F,#C8A96E);padding:24px 32px;">
              <h1 style="color:#fff;margin:0;font-size:20px;font-weight:600;">✦ New Contact Message</h1>
              <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px;">Astric Technologies — Website Contact Form</p>
            </div>
            <div style="padding:32px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:13px;width:100px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#0d0d0d;">${name}</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;"><a href="mailto:${email}" style="color:#A6853F;">${email}</a></td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:13px;">Company</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#444;">${company || '—'}</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:13px;">Subject</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#0d0d0d;">${subject}</td></tr>
              </table>
              <div style="margin-top:24px;">
                <p style="color:#888;font-size:13px;margin-bottom:8px;">Message</p>
                <div style="background:#f8f8f6;border-left:3px solid #C8A96E;padding:16px 20px;border-radius:0 8px 8px 0;color:#0d0d0d;line-height:1.7;white-space:pre-wrap;">${message}</div>
              </div>
              <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f0f0f0;text-align:center;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display:inline-block;background:linear-gradient(135deg,#A6853F,#C8A96E);color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Reply to ${name}</a>
              </div>
            </div>
            <div style="background:#f8f8f6;padding:16px 32px;text-align:center;color:#888;font-size:12px;">
              Saved to MongoDB Atlas · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </div>
          </div>
        `,
      }).catch(err => console.warn('Contact email send failed (non-fatal):', err.message));
    }

  } catch (err) {
    console.error('Contact route error:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
