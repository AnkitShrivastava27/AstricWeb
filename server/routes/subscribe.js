const express   = require('express');
const router    = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Subscriber = require('../models/Subscriber');
const nodemailer  = require('nodemailer');

// ── Rate limit ────────────────────────────────────────────────────────────
const subLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many requests.' },
});

// ── Nodemailer transporter factory ────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST || 'smtp.gmail.com',
    port:   Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ── POST /api/subscribe ───────────────────────────────────────────────────
router.post('/', subLimiter, [
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, message: errors.array()[0].msg });
  }

  const { email, source } = req.body;

  try {
    // 1. Check for duplicate
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(200).json({ success: true, message: "You're already on the list!" });
    }

    // 2. Save to MongoDB Atlas
    await Subscriber.create({ email, source: source || 'website' });

    // 3. Respond immediately
    res.status(201).json({
      success: true,
      message: "You're on the early access list! We'll notify you when Astric launches.",
    });

    // 4. Fire-and-forget notification email
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = createTransporter();
      transporter.sendMail({
        from:    `"Astric Website" <${process.env.SMTP_USER}>`,
        to:      process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
        subject: `[Astric] New Early Access Signup`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;background:#fff;border:1px solid #e8e8e4;border-radius:12px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#A6853F,#C8A96E);padding:24px 32px;">
              <h1 style="color:#fff;margin:0;font-size:20px;font-weight:600;">✦ New Early Access Signup</h1>
              <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px;">Astric Technologies — Waitlist</p>
            </div>
            <div style="padding:32px;">
              <p style="color:#444;font-size:15px;margin:0 0 20px;">Someone just joined the early access waitlist:</p>
              <div style="background:#f8f8f6;border:1px solid #e8e8e4;border-radius:10px;padding:20px;text-align:center;">
                <p style="font-size:22px;font-weight:700;color:#0d0d0d;margin:0 0 6px;">${email}</p>
                <p style="font-size:12px;color:#888;margin:0;">Source: <strong>${source || 'website'}</strong></p>
              </div>
              <p style="color:#888;font-size:13px;margin-top:24px;text-align:center;">
                Saved to MongoDB Atlas · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
              </p>
            </div>
          </div>
        `,
      }).catch(err => console.warn('Subscribe email send failed (non-fatal):', err.message));
    }

  } catch (err) {
    console.error('Subscribe route error:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
