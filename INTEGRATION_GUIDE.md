# 🔗 Integration Guide - Frontend + Backend

This guide shows how to connect your Snappic React frontend with your existing Node.js/Express backend.

## 📁 Project Structure

You should have both folders in the same parent directory:

```
snappic-live/ (or your project root)
├── server.js                          (your backend)
├── package.json                       (backend dependencies)
├── .env                               (MongoDB URI, JWT secret)
├── public/                            (THIS IS WHERE BUILT FRONTEND GOES)
│   ├── index.html
│   ├── assets/
│   └── ... (built React files)
└── snappic-frontend/                  (your React app)
    ├── src/
    ├── dist/                          (built files)
    ├── package.json
    ├── vite.config.js
    └── README.md
```

## ✨ Integration Steps

### Step 1: Update Backend server.js

Your `server.js` needs to serve static files AND have API routes.

**Current Structure (Update this):**
```javascript
// Around line 24-30
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
```

**Improved Structure:**
```javascript
const express = require('express');
const app = express();
const path = require('path');

// ... your middleware setup ...
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ✅ ALL YOUR API ROUTES GO HERE
app.post('/api/register', async (req, res) => { /* ... */ });
app.get('/api/posts', auth, async (req, res) => { /* ... */ });
// ... all other routes ...

// ✅ IMPORTANT: Fallback route for React Router
// This MUST be after all API routes!
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Running on port ${PORT}`));
```

### Step 2: Build Your Frontend

```bash
# Navigate to frontend folder
cd snappic-frontend

# Install dependencies
npm install

# Build for production
npm run build

# Copy built files to backend's public folder
cp -r dist/* ../public/
```

**On Windows:**
```bash
cd snappic-frontend
npm install
npm run build
# Then copy the dist folder contents to the parent's public folder
```

### Step 3: Verify Public Folder

Check that your backend's `public` folder has:
- ✅ `index.html`
- ✅ `assets/` folder
- ✅ JavaScript and CSS files

### Step 4: Test Locally

```bash
# In backend root directory
npm start
# or
npm run dev
```

Visit: `http://localhost:3000`

You should see the Snappic login page with **Deep Ocean Blue theme**.

## 🔌 API Integration Points

The frontend connects to these backend endpoints:

### Authentication
- `POST /api/register` - Create account
- `POST /api/login` - Login
- `GET /api/me` - Get current user

### Posts
- `GET /api/posts` - Get feed
- `POST /api/posts` - Create post
- `POST /api/posts/:id/like` - Like post
- `POST /api/posts/:id/comment` - Comment on post

### Classrooms
- `POST /api/classrooms` - Create classroom
- `GET /api/classrooms` - List classrooms
- `POST /api/classrooms/:id/join` - Join classroom
- `POST /api/classrooms/:id/leave` - Leave classroom

### Campus Rooms
- `GET /api/campus-rooms` - List rooms
- `POST /api/campus-rooms` - Create room

### Interests
- `GET /api/interests/list` - Get available interests
- `POST /api/users/interests` - Set user interests
- `GET /api/users/interests` - Get user interests

## 🔌 Socket.io Integration

Socket.io is already configured in your backend. The frontend automatically connects via:

```javascript
// In frontend App.jsx
const socket = io(apiUrl, {
  auth: { token: token },
  transports: ['websocket', 'polling'],
});
```

**Verify Socket.io is working:**
1. Open browser DevTools → Network tab
2. Look for WebSocket connection
3. Should see messages like `new_post`, `classroom_created`, etc.

## 🌐 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
PORT=3000
NODE_ENV=development
```

### Frontend (.env)
For development:
```env
VITE_API_URL=http://localhost:3000/api
```

For production on Render:
```env
VITE_API_URL=/api
```

## 🚀 Deploy to Render

### Option 1: Simple Deployment

1. Upload both folders to GitHub
2. Create Render Web Service
3. Set build command:
   ```bash
   cd snappic-frontend && npm install && npm run build && cp -r dist/* ../public/
   ```
4. Set start command:
   ```bash
   npm start
   ```

### Option 2: Using Monorepo Structure

Create a root `package.json`:

```json
{
  "name": "snappic",
  "scripts": {
    "build": "cd snappic-frontend && npm install && npm run build && cp -r dist/* ../public/",
    "start": "node server.js",
    "dev": "node server.js"
  }
}
```

Then Render will use this root `package.json`.

## ✅ Deployment Checklist

- [ ] Frontend builds without errors: `npm run build`
- [ ] Built files exist in `public/` folder
- [ ] Backend `server.js` serves static files
- [ ] All API routes work
- [ ] Socket.io connects properly
- [ ] `.env` has correct `MONGO_URI` and `JWT_SECRET`
- [ ] `public/index.html` exists
- [ ] No 404 errors when visiting `/`

## 🐛 Troubleshooting

### "Cannot GET /"
**Issue:** Fallback route not working
**Fix:** Ensure `app.use((req, res) => res.sendFile(...))` is **last** route in server.js

### "API not found"
**Issue:** React is trying to load API as static file
**Fix:** Verify API routes come **before** fallback route

### "Static files not loading"
**Issue:** `express.static` path incorrect
**Fix:** Check that `public/` folder exists with built files

### "Socket not connecting"
**Issue:** Socket.io not running
**Fix:** Verify Socket.io is initialized in backend server.js

## 📚 File Locations Reference

```
Backend:
  /opt/render/project/server.js              (your backend)
  /opt/render/project/public/index.html      ✅ This is what was missing!
  /opt/render/project/public/assets/         ✅ Built React files

Frontend (locally):
  ./snappic-frontend/src/                    (React components)
  ./snappic-frontend/dist/                   (built files)
  ./snappic-frontend/vite.config.js          (build config)
```

## 🎉 Success!

When everything works:
1. ✅ Frontend loads at `https://your-app.onrender.com`
2. ✅ Login/register works
3. ✅ Feed displays
4. ✅ Classrooms appear
5. ✅ Real-time updates work

---

**Need help?** Check:
- Backend logs for API errors
- Browser DevTools → Console for frontend errors
- Network tab to see API calls
- Socket.io connection status
