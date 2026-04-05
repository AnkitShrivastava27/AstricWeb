require('dotenv').config();
const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const path      = require('path');

const contactRouter   = require('./routes/contact');
const subscribeRouter = require('./routes/subscribe');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Trust proxy — required on Render / any reverse-proxy host ─────────────────
// Tells Express to trust the X-Forwarded-For header so rate-limit works correctly
app.set('trust proxy', 1);

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://astrictechnologies.com', 'https://www.astrictechnologies.com']
    : process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/contact',   contactRouter);
app.use('/api/subscribe', subscribeRouter);

app.get('/api/health', (_, res) =>
  res.json({ status: 'ok', time: new Date().toISOString() }));

// ── Serve React build in production ──────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (_, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/index.html')));
}

// ── MongoDB Atlas connection ──────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
