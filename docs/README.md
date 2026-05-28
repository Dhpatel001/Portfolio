# PromptLab - AI Prompt Analyzer & Improver  

A professional, full-stack web application built with React + Node.js that analyzes and improves AI prompts using Google's Generative AI (Gemini).

![React](https://img.shields.io/badge/React-18+-blue)
![Node.js](https://img.shields.io/badge/Node.js-v16+-green)
![Express](https://img.shields.io/badge/Express-5.2+-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-9.5+-green)
![Frontend](https://img.shields.io/badge/Frontend-Complete-brightgreen)
![Backend](https://img.shields.io/badge/Backend-Complete-brightgreen)

## 📚 Quick Links

- 🚀 **[Quick Start](#-quick-start-running-both-servers)** - Get running in 5 minutes
- 📖 **[Full Setup Guide](SETUP_GUIDE.md)** - Detailed installation
- 🏗️ **[Project Structure](PROJECT_STRUCTURE.md)** - Architecture overview
- 📘 **[Frontend Docs](frontend/README.md)** - Frontend details
- 📘 **[API Docs](#-api-endpoints)** - Available endpoints

## 📚 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#-quick-start-running-both-servers)
- [Installation](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#-api-endpoints)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Documentation](#documentation)
- [License](#license)

## 🎯 Overview

PromptLab is a professional full-stack application that helps users master prompt engineering by:
- **Analyzing prompts** with AI-powered feedback using Google Gemini
- **Providing improvement suggestions** for better prompt effectiveness
- **Tracking prompt history** with tags and metadata
- **Managing prompts** with a beautiful, responsive React UI
- **Securing data** with JWT authentication and MongoDB

Perfect for developers, content creators, and AI enthusiasts!

## ✨ Features

### Frontend Features
✅ **Premium Editorial Design** - Sleek, considered layouts with modern typography, glassmorphism overlays, and curated color palettes
✅ **User Authentication** - Secure register and login via JWT tokens, supporting both email and username sign-in
✅ **Interactive Dashboard** - Analyze prompts in real-time
✅ **Prompt History** - View and manage all your prompts
✅ **Responsive Design** - Mobile-first layout with smooth transitions
✅ **Refined micro-interactions** - Customized loading spinners, input icons, and password visibility toggles
✅ **Toast Notifications** - Real-time feedback messages
✅ **Copy to Clipboard** - Easy sharing and saving
✅ **Tag Organization** - Organize prompts by tags
✅ **Pagination** - Efficient handling of large datasets
✅ **Token Usability Verification** - Auto-expires stale client sessions to prevent loading state bugs

### Backend Features
✅ **JWT Authentication** - Secure token-based auth
✅ **Unified Login Endpoint** - Accepts either email or username (identifier)
✅ **MongoDB Integration** - Persistent data storage with lowercased email database enforcement
✅ **Google Gemini AI** - Advanced prompt analysis
✅ **Field-specific Input Validation** - Map errors back to precise form fields on validation failure
✅ **Error Handling** - Global error management
✅ **Rate Limiting** - Prevent abuse
✅ **CORS Support** - Cross-origin requests
✅ **Swagger Documentation** - Interactive API docs
✅ **Winston Logger** - Comprehensive logging

## 🛠️ Tech Stack

### Frontend
- **React** 18 - UI library
- **React Router** v6 - Client-side routing
- **Vite** - Build tool (Lightning fast ⚡)
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client
- **React Context API** - State management
- **React Hot Toast** - Notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express** v5 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Google Generative AI** - Gemini integration
- **Winston** - Logger
- **Swagger** - API documentation

## 📋 Prerequisites

Make sure you have installed:

| Requirement | Version | Download |
|------------|---------|----------|
| Node.js | v16+ (v24 recommended) | https://nodejs.org |
| npm | v8+ | Included with Node.js |
| MongoDB | Latest | https://www.mongodb.com/try/download/community |
| Git | v2.30+ | https://git-scm.com |
| Google Gemini API Key | Free | https://makersuite.google.com/app/apikey |

### Verify Installation
```bash
node --version    # Should show v16 or higher
npm --version     # Should show v8 or higher
```

## 📁 Project Structure

```
prompt/
├── frontend/                      # React Frontend
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Error.jsx
│   │   │   ├── Toast.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── AuthShell.jsx
│   │   ├── pages/                # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Prompts.jsx
│   │   ├── services/             # API calls
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── promptService.js
│   │   ├── context/              # State management
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/                # Custom hooks
│   │   │   ├── useForm.js
│   │   │   └── useAsync.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
│
├── server/                        # Express Backend
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   ├── logger.js
│   │   ├── swagger.js
│   │   └── default.json
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   └── promptController.js   # Prompt logic
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Prompt.js             # Prompt schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── promptRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── app.js                    # Main app
│   ├── package.json
│   ├── .env.example
│   └── logs/                     # Application logs
│
├── README.md                      # This file
├── SETUP_GUIDE.md                # Detailed guide
└── PROJECT_STRUCTURE.md          # Architecture

## 🚀 Quick Start: Running Both Servers

### Prerequisites Setup (First Time Only)

1. **Get Google Gemini API Key**
   - Visit: https://makersuite.google.com/app/apikey
   - Click "Get API Key"
   - Copy the key and save it

2. **Ensure MongoDB is Running**
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux (Ubuntu)
   sudo systemctl start mongod
   
   # Windows
   # Use MongoDB Compass or start service
   ```

### Run the Application

**Terminal 1: Start Backend**
```bash
cd server
npm install              # First time only
cp .env.example .env     # First time only
# Edit .env and add your GEMINI_API_KEY
npm start                # Starts at http://localhost:5000
```

**Terminal 2: Start Frontend**
```bash
cd frontend
npm install              # First time only
npm run dev              # Starts at http://localhost:3000
```

✅ **Your app is now running!**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Docs: http://localhost:5000/api/docs

## Installation & Setup

### Step 1: Clone & Navigate
```bash
git clone <repository-url>
cd prompt
```

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
```bash
# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Linux (Ubuntu/Debian)
sudo apt-get install -y mongodb
sudo systemctl start mongod

# Windows
# Download from: https://www.mongodb.com/try/download/community
```

**Option B: MongoDB Atlas (Cloud)**
1. Visit: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string (looks like: mongodb+srv://user:pass@cluster.mongodb.net/dbname)

### Step 3: Backend Installation & Configuration

```bash
cd server

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env
```

**Edit `server/.env`:**
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/promptlab
JWT_SECRET=your_super_secret_key_here_change_this_min_32_chars
JWT_EXPIRE=7d
GEMINI_API_KEY=your_google_gemini_api_key_here
GEMINI_MODEL=gemini-flash-latest
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

**For MongoDB Atlas**, use:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/promptlab
```

### Step 4: Frontend Installation & Configuration

```bash
# Open NEW terminal/tab
cd frontend

# Install dependencies
npm install

# Create .env file (optional, defaults work)
cp .env.example .env.local
```

**Edit `frontend/.env.local`:**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Running the Application

### Option 1: Two Terminal Tabs (Recommended)

**Tab 1 - Backend:**
```bash
cd server
npm start
# Output: Server running on port 5000
```

**Tab 2 - Frontend:**
```bash
cd frontend
npm run dev
# Output: VITE v5.0.8 ready in XXX ms
```

### Option 2: Run in Parallel (One Command)

```bash
# From root directory
npm run dev:all  # If configured

# Or manually:
npm install --legacy-peer-deps
cd server && npm start & cd ../frontend && npm run dev
```

### Verify Everything Works

1. **Frontend loads:** http://localhost:3000
2. **Backend API working:** 
   ```bash
   curl http://localhost:5000/health
   # Should return: {"status":"OK"}
   ```
3. **Swagger docs:** http://localhost:5000/api/docs

### First Time Using the App

1. **Register** - Create a new account
2. **Login** - Sign in with credentials
3. **Dashboard** - Enter a prompt and click "Analyze"
4. **View Results** - See AI-generated improvements
5. **History** - Check "My Prompts" to see all saved prompts

## 🔌 API Endpoints

### Authentication Endpoints

#### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "your_username",
  "email": "your@email.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "your_username",
    "email": "your@email.com"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "identifier": "your@email.com_or_username",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "your_username",
    "email": "your@email.com",
    "createdAt": "2026-05-05T10:00:00Z"
  }
}
```

#### Get Current User Profile
```http
GET /api/auth/me
Authorization: Bearer <your_token>
```

**Response (200 OK):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "your_username",
    "email": "your@email.com",
    "createdAt": "2026-05-05T10:00:00Z"
  }
}
```

### Prompt Endpoints

#### Analyze Prompt
```http
POST /api/prompts/analyze
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "originalPrompt": "Tell me about AI",
  "title": "AI Overview",
  "tags": ["ai", "technology"]
}
```

**Response (201 Created):**
```json
{
  "prompt": {
    "_id": "507f1f77bcf86cd799439012",
    "originalPrompt": "Tell me about AI",
    "improvedPrompt": "Provide a comprehensive overview of artificial intelligence...",
    "feedback": "Your prompt could be more specific...",
    "title": "AI Overview",
    "tags": ["ai", "technology"],
    "createdAt": "2026-05-05T10:30:00Z"
  },
  "score": 7.5
}
```

#### Get All Prompts
```http
GET /api/prompts?page=1&limit=10
Authorization: Bearer <your_token>
```

**Response (200 OK):**
```json
{
  "prompts": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "originalPrompt": "Tell me about AI",
      "improvedPrompt": "Provide a comprehensive...",
      "title": "AI Overview",
      "tags": ["ai"],
      "createdAt": "2026-05-05T10:30:00Z"
    }
  ],
  "total": 5,
  "page": 1,
  "pages": 1
}
```

#### Delete Prompt
```http
DELETE /api/prompts/:id
Authorization: Bearer <your_token>
```

**Response (200 OK):**
```json
{
  "message": "Prompt deleted successfully"
}
```

### System Endpoints

#### Health Check
```http
GET /health
```

**Response (200 OK):**
```json
{
  "status": "OK"
}
```

#### Swagger API Documentation
```
GET http://localhost:5000/api/docs
```

## ⚙️ Configuration

### Environment Variables

**Backend (`server/.env`):**
```env
# Server
NODE_ENV=development          # development, production, test
PORT=5000                     # Backend port
LOG_LEVEL=info               # debug, info, warn, error

# Database
MONGO_URI=mongodb://localhost:27017/promptlab
# OR for Atlas: mongodb+srv://user:pass@cluster.mongodb.net/dbname

# Authentication
JWT_SECRET=your_secret_key_min_32_chars_change_this
JWT_EXPIRE=7d                # Token expiration

# AI/Gemini
GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=gemini-flash-latest

# CORS
CORS_ORIGIN=http://localhost:3000
```

**Frontend (`frontend/.env.local`):**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Production Deployment

For production, update `.env`:
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=strong_random_secret_key_here
CORS_ORIGIN=https://yourdomain.com
```

## � Troubleshooting

### Backend Issues

#### Port Already in Use
```bash
# Error: listen EADDRINUSE: address already in use :::5000

# Find process using port 5000
lsof -i :5000         # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>         # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or change PORT in .env to 5001
```

#### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017

# Solutions:
1. Start MongoDB:
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
2. Check MongoDB is running:
   mongosh  # Should connect successfully

3. Use MongoDB Atlas instead (Cloud):
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
```

#### GEMINI_API_KEY Error
```
Error: GEMINI_API_KEY is required

# Solution:
1. Get key from https://makersuite.google.com/app/apikey
2. Add to server/.env:
   GEMINI_API_KEY=your_key_here
3. Restart server
```

#### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Frontend Issues

#### Port 3000 Already in Use
```bash
# Error: Port 3000 is already in use

# Option 1: Change port in vite.config.js
export default {
  server: {
    port: 3001
  }
}

# Option 2: Kill process on port 3000
lsof -i :3000         # macOS/Linux
kill -9 <PID>         # macOS/Linux
```

#### Cannot Connect to Backend
```bash
# Error: Cannot reach http://localhost:5000

# Check:
1. Backend is running: npm start (in server directory)
2. Check VITE_API_BASE_URL in frontend/.env.local
3. Backend CORS_ORIGIN includes http://localhost:3000
4. No firewall blocking port 5000

# Solution:
# Manually test backend:
curl http://localhost:5000/health
```

#### Auth Token Issues
```bash
# Error: 401 Unauthorized on API calls

# Solution:
1. Clear browser localStorage:
   DevTools > Application > Clear All
2. Login again
3. Check JWT_SECRET in server/.env matches

# Or check token in DevTools:
# Application > Local Storage > token
```

#### Module Not Found Error
```bash
# Error: Module not found: 'react-router-dom'

# Solution:
cd frontend
npm install
npm run dev
```

### Database Issues

#### MongoDB Shows Duplicate Index Warning
```
E11000 duplicate key error

# This is minor and can be ignored for development
# For production, recreate indexes:
db.users.dropIndexes()
db.prompts.dropIndexes()
```

#### Prompts Not Saving
```bash
# Check:
1. MongoDB is running
2. MONGO_URI is correct in .env
3. User is authenticated (token present)
4. Database is accessible:
   mongosh  # Connect to database
   use promptlab
   db.prompts.find()
```

### Common Solutions

| Issue | Solution |
|-------|----------|
| Nothing loads at localhost:3000 | Run `npm run dev` in frontend/ |
| API not responding | Run `npm start` in server/ |
| Blank page | Check browser console (F12) for errors |
| Can't login | Verify backend is running, check GEMINI_API_KEY |
| Database errors | Start MongoDB, check MONGO_URI |
| Styling looks broken | Clear browser cache (Ctrl+Shift+Delete) |

### Get Help

1. **Check Logs:**
   ```bash
   # Backend logs
   tail -f server/logs/combined.log
   
   # Browser console
   F12 → Console tab
   ```

2. **Verify Installation:**
   ```bash
   node -v    # v16+
   npm -v     # v8+
   mongod -v  # Latest
   ```

3. **Read Documentation:**
   - [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed troubleshooting
   - [Project Structure](PROJECT_STRUCTURE.md) - Architecture
   - [Frontend README](frontend/README.md) - Frontend details

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Overview & quick start |
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Detailed installation & configuration |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Codebase architecture |
| [frontend/README.md](frontend/README.md) | Frontend documentation |
| [API Docs](/api/docs) | Interactive Swagger UI |

## 🔐 Security

✅ JWT authentication for all protected endpoints  
✅ Bcrypt password hashing (10 salt rounds)  
✅ Input validation on all endpoints  
✅ CORS configured to only accept frontend origin  
✅ Rate limiting on auth endpoints  
✅ Environment variables for sensitive data  
✅ Helmet.js for security headers  
✅ No passwords returned in API responses  

**In Production:**
- Use HTTPS only
- Set NODE_ENV=production
- Use strong JWT_SECRET (32+ characters)
- Enable rate limiting
- Use MongoDB Atlas (not local)
- Deploy backend on secure server
- Deploy frontend on CDN

## 🚀 Deployment

### Backend Deployment Options

1. **Railway** (Recommended - free tier)
   - Push to GitHub
   - Connect to Railway
   - Set environment variables
   - Auto-deploy on push

2. **Heroku**
   ```bash
   heroku login
   heroku create your-app-name
   git push heroku main
   ```

3. **DigitalOcean**
   - Create droplet
   - Install Node.js and MongoDB
   - Deploy code

4. **AWS EC2**
   - Launch instance
   - Install dependencies
   - Run with PM2

### Frontend Deployment Options

1. **Netlify**
   - Connect GitHub repo
   - Auto-deploy on push
   - Set `VITE_API_BASE_URL` in env

2. **GitHub Pages**
   ```bash
   npm run build
   # Push dist/ to gh-pages branch
   ```

## 📝 Development

### Code Style
- Use ESLint for linting
- Use Prettier for formatting
- Follow React best practices
- Add comments for complex logic

### Testing
```bash
# Backend
cd server
npm test

# Frontend  
cd frontend
npm run test
```

### Building for Production
```bash
# Backend (no build needed)
NODE_ENV=production npm start

# Frontend
cd frontend
npm run build
# Generates optimized build in dist/
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📞 Support

- 📖 **Documentation**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- 🔌 **API Docs**: http://localhost:5000/api/docs
- 🐛 **Issues**: Report on GitHub
- 💬 **Questions**: Check existing issues or create new one

---

**Version**: 1.0.0  
**Last Updated**: May 2026  
**Status**: ✅ Fully Functional - Ready for Production

**Built with ❤️ using React, Node.js, and MongoDB**

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 📞 Support

For support, email: support@promptlab.com or create an issue in the repository.

## 🗺️ Roadmap

- Q2 2026: Launch v1.1 with batch analysis and templates
- Q3 2026: Add collaborative features and webhooks
- Q4 2026: Implement analytics dashboard and advanced metrics

---

**Made with ❤️ by PromptLab Team**

Last Updated: May 5, 2026
