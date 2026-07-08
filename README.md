# 🇮🇳 Bharath — India Heritage & Culture Website

A full-stack web application celebrating India's rich heritage, culture, and traditions.

---

## 📁 Project Structure

```
india-heritage/
├── backend/                  # Node.js + Express API
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API route handlers
│   ├── middleware/           # Auth middleware
│   ├── uploads/              # Uploaded media (auto-created)
│   ├── server.js             # Entry point
│   ├── .env                  # Environment variables
│   └── package.json
│
└── frontend/                 # React application
    ├── public/               # Static HTML
    ├── src/
    │   ├── components/       # Navbar, shared components
    │   ├── context/          # Auth context (global state)
    │   ├── pages/            # All page components
    │   ├── styles/           # Global CSS
    │   ├── App.js            # Routes
    │   └── index.js          # Entry point
    └── package.json
```

---

## 🛠️ Step-by-Step Installation Guide

### STEP 1 — Install Node.js

1. Go to https://nodejs.org
2. Download the **LTS version** (e.g., 20.x)
3. Run the installer (Next → Next → Install)
4. Verify installation:

```bash
node --version     # Should show v20.x.x
npm --version      # Should show 10.x.x
```

---

### STEP 2 — Install MongoDB Community Edition

1. Go to https://www.mongodb.com/try/download/community
2. Select: Version = Latest, Platform = Windows/macOS/Linux, Package = msi/dmg/tgz
3. Install MongoDB (use default settings)
4. **Windows**: MongoDB installs as a Windows Service and starts automatically
5. **macOS**: Run `brew install mongodb-community` then `brew services start mongodb-community`
6. **Linux (Ubuntu)**:

```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

7. Verify MongoDB is running:

```bash
mongosh
# You should see a MongoDB shell prompt
# Type 'exit' to quit
```

---

### STEP 3 — Install Git (if not already installed)

Download from: https://git-scm.com/downloads and install.

---

### STEP 4 — Set Up the Backend

Open terminal/command prompt and navigate to the project:

```bash
# Navigate to backend folder
cd india-heritage/backend

# Install all dependencies
npm install
```

This installs: express, mongoose, cors, dotenv, jsonwebtoken, bcryptjs, multer, express-validator, nodemon

**Verify the .env file exists** (it's already created):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/india_heritage
JWT_SECRET=indiaHeritage_SuperSecret_2024_Key
ADMIN_EMAIL=admin@indiaheritage.com
ADMIN_PASSWORD=Admin@123
NODE_ENV=development
```

> ⚠️ Change JWT_SECRET and admin credentials before deploying to production!

---

### STEP 5 — Set Up the Frontend

Open a **new terminal window**:

```bash
# Navigate to frontend folder
cd india-heritage/frontend

# Install all dependencies
npm install
```

This installs: react, react-dom, react-router-dom, axios, framer-motion, react-hot-toast, react-icons

---

### STEP 6 — Run the Application

You need **two terminal windows running simultaneously**.

**Terminal 1 — Start Backend:**

```bash
cd india-heritage/backend
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5000
✅ MongoDB connected successfully
✅ Admin user seeded: admin@indiaheritage.com
```

**Terminal 2 — Start Frontend:**

```bash
cd india-heritage/frontend
npm start
```

You should see:
```
Compiled successfully!
Local: http://localhost:3000
```

Your browser will automatically open at **http://localhost:3000** 🎉

---

## 🔑 Login Credentials

### Admin Account
- **Email:** admin@indiaheritage.com
- **Password:** Admin@123

### Create User Account
- Click "Join" in the navbar
- Fill name, email, password
- Start writing blogs immediately

---

## 🌐 All Pages & URLs

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Cultural welcome landing page |
| States | `/states` | All 28 states grid view |
| State Detail | `/states/:id` | Heritage, culture, festivals, attractions |
| Blog List | `/blog` | All published blogs |
| Blog Detail | `/blog/:id` | Full blog reading view |
| Write Blog | `/blog/write` | Rich text blog editor (login required) |
| Edit Blog | `/blog/edit/:id` | Edit your published/draft blog |
| My Blogs | `/my-blogs` | Your blogs dashboard (login required) |
| Admin | `/admin` | Admin dashboard (admin only) |
| Login | `/login` | Sign in page |
| Register | `/register` | Create account |

---

## ✨ Features

### 🗺️ States Section
- All 28 states of India with color-coded cards
- Filter by region (North, South, East, West, Northeast, Central)
- Search by state name or capital
- Detailed state pages with tabs:
  - **Overview** — Description, key stats, quick highlights
  - **Heritage** — Historical background, UNESCO sites
  - **Culture** — Art forms, classical traditions, crafts
  - **Festivals** — Major festivals with descriptions
  - **Attractions** — Top places to visit
  - **Cuisine** — Must-try dishes

### 📝 Blog Section
- Public blog listing with category filters
- Search functionality
- Rich blog editor with:
  - Cover image upload
  - Text formatting toolbar (Bold, Italic, H2, H3, Blockquote, Lists)
  - HTML content with live preview
  - Multiple image gallery upload (up to 10)
  - Video upload (up to 3)
  - Tags and category selection
  - Draft/Publish toggle
- Like system
- View counter
- Author profile card

### 🛡️ Admin Dashboard
- Statistics overview (blogs, users, views, likes)
- Full blog management table (view, edit, archive, delete)
- User management (view all users, delete users)
- Only accessible with admin credentials

### 🔐 Authentication
- JWT-based secure authentication
- Persistent login via localStorage
- Role-based access (user vs admin)
- Auto-seed of admin account on first run

---

## 🐛 Troubleshooting

### "MongoDB connection error"
```bash
# Make sure MongoDB is running
# Windows: Check Services → MongoDB Server
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongodb
```

### "Port 3000 already in use"
```bash
# Kill the process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :3000
kill -9 <PID>
```

### "Port 5000 already in use"
Change PORT in backend/.env to 5001 and update frontend/package.json proxy to `http://localhost:5001`

### Uploads not working
```bash
# Create uploads directory manually
mkdir india-heritage/backend/uploads
```

### npm install fails
```bash
# Clear npm cache and retry
npm cache clean --force
npm install
```

---

## 🚀 Minor Enhancements Included

1. **Animated particle canvas** on the home page (gold floating dots)
2. **Indian flag tricolor stripe** at the top of every page
3. **Sticky navbar** that becomes opaque on scroll
4. **State cards with unique colors** per state matching their cultural identity
5. **Live word count** in the blog editor
6. **Inline content preview** while writing blogs
7. **Publish/Unpublish toggle** without leaving the My Blogs page
8. **View counter** increments on every blog read
9. **Admin credential autofill** button on the login page
10. **Responsive design** works on mobile, tablet, and desktop
11. **Toast notifications** for every user action
12. **Animated state cards** with staggered entrance animations
13. **Sticky tab navigation** on state detail pages
14. **Cultural design system** (Saffron + Gold + Deep Maroon palette throughout)

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios |
| Styling | Pure CSS with design tokens, Google Fonts |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Auth | JWT (JSON Web Tokens) + bcryptjs |
| File Upload | Multer |
| Dev Tools | nodemon, Create React App |

---

## 📦 Deployment (Optional)

To deploy online:

1. **Database**: Use MongoDB Atlas (free tier) — replace MONGODB_URI in .env
2. **Backend**: Deploy to Render.com or Railway.app
3. **Frontend**: Deploy to Vercel or Netlify
   - Set `REACT_APP_API_URL` environment variable to your backend URL
   - Update axios base URL in frontend

---

*Built with ❤️ to celebrate India's incredible 5,000-year civilisation*


# commands
1st terminal: 
cd india-heritage
cd backend
npm install
type .env
npm run dev

2nd terminal:
cd india-heritage
cd frontend
npm install
npm start
