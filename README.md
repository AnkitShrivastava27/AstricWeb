# Astric Technologies — Marketing Website

MERN stack website for **Astric** — all-in-one AI business suite (Android).

## Stack
- **Backend**: Node.js, Express, MongoDB Atlas, Mongoose, Nodemailer, Razorpay-ready
- **Frontend**: React 18, Vite, React Router v6, react-hot-toast
- **Design**: Cormorant Garamond + DM Sans · Marble white · Metallic gold · Black

## Pages
| Route | Page |
|-------|------|
| `/` | Landing — hero, features, pricing, CTA |
| `/product` | Product — all 6 module deep-dives + comparison table |
| `/how-to-use` | How to Use — 8-step guide + token explainer |
| `/support` | Help & Support — FAQ accordion by category |
| `/about` | About Us — mission, values, timeline, team |
| `/contact` | Contact — form wired to MongoDB + email notification |

## API Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/contact` | Saves contact form to MongoDB, sends email via Nodemailer |
| POST | `/api/subscribe` | Saves email to waitlist/subscribers collection |
| GET | `/api/health` | Health check |

---

## Quick Start

### 1. Clone & install
```bash
# Root (server dependencies)
npm install

# Client dependencies
cd client && npm install && cd ..
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your MongoDB Atlas URI and SMTP credentials
```

### 3. MongoDB Atlas setup
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free M0 cluster
3. Under **Database Access** → Add user with read/write
4. Under **Network Access** → Add IP `0.0.0.0/0` (or your server IP)
5. Click **Connect** → **Drivers** → Copy the connection string
6. Paste into `.env` as `MONGODB_URI`, replace `<password>`

### 4. Dev server (runs both frontend & backend)
```bash
npm run dev
# React: http://localhost:5173
# Express: http://localhost:5000
```

### 5. Production build
```bash
npm run build   # builds React into client/dist
npm start       # serves everything from Express on PORT 5000
```

---

## Deployment

### Render / Railway / Fly.io
1. Set `NODE_ENV=production`
2. Set all env vars from `.env.example`
3. Build command: `npm install && npm run build`
4. Start command: `npm start`

### Vercel (frontend only)
- Deploy `client/` as a Vite app
- Set API base URL in the Vite proxy or use `VITE_API_URL`

---

## Placeholders to Replace
- `About.jsx` — Replace `[Founder Name]`, `[Co-Founder Name]`, `[Team Member]` with real names + bios
- `Footer.jsx` — Replace social links with real profile URLs
- `.env` — Replace all placeholder values with real credentials
- `contact@astrictechnologies.com` — Replace with your real email
- `AppEnv.razorpayKeyId` in the Android app — already configured separately

---

## Project Structure
```
astric/
├── server/
│   ├── index.js           # Express entry point
│   ├── models/
│   │   ├── Contact.js     # Contact form model
│   │   └── Subscriber.js  # Email waitlist model
│   └── routes/
│       ├── contact.js     # POST /api/contact
│       └── subscribe.js   # POST /api/subscribe
├── client/
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css      # Global design system
│       ├── components/
│       │   ├── Navbar.jsx / .css
│       │   └── Footer.jsx / .css
│       ├── pages/
│       │   ├── Landing.jsx / .css
│       │   ├── Product.jsx / .css
│       │   ├── HowToUse.jsx / .css
│       │   ├── Support.jsx / .css
│       │   ├── About.jsx / .css
│       │   └── Contact.jsx / .css
│       └── hooks/
│           └── useReveal.js
├── package.json
├── .env.example
└── README.md
```
