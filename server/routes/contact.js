const express  = require('express');
const router   = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Contact  = require('../models/Contact');
const nodemailer = require('nodemailer');

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

const validate = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10, max: 2000 }),
];

// POST /api/contact
router.post('/', contactLimiter, validate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, company, subject, message } = req.body;
    const contact = await Contact.create({ name, email, company, subject, message });

    // Send email notification (graceful fail — don't block response)
    try {
      if (process.env.SMTP_USER) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: false,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });
        await transporter.sendMail({
          from: `"Astric Website" <${process.env.SMTP_USER}>`,
          to:   process.env.CONTACT_RECEIVER,
          subject: `[Astric Contact] ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Company:</b> ${company || '—'}</p>
            <p><b>Subject:</b> ${subject}</p>
            <p><b>Message:</b><br>${message.replace(/\n/g, '<br>')}</p>
          `,
        });
      }
    } catch (mailErr) {
      console.warn('Email send failed (non-fatal):', mailErr.message);
    }

    res.status(201).json({ success: true, message: 'Message received! We\'ll be in touch shortly.', id: contact._id });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
