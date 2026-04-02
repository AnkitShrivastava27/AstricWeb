const express  = require('express');
const router   = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Subscriber = require('../models/Subscriber');

const subLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many requests.' },
});

// POST /api/subscribe
router.post('/', subLimiter, [
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, message: errors.array()[0].msg });
  }
  try {
    const { email, source } = req.body;
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(200).json({ success: true, message: 'You\'re already on the list!' });
    }
    await Subscriber.create({ email, source: source || 'footer' });
    res.status(201).json({ success: true, message: 'You\'re on the early access list!' });
  } catch (err) {
    console.error('Subscribe error:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
