const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true, maxlength: 100 },
  email:   { type: String, required: true, trim: true, lowercase: true },
  company: { type: String, trim: true, maxlength: 100 },
  subject: { type: String, required: true, trim: true, maxlength: 200 },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
  status:  { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  source:  { type: String, default: 'website' },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
