# 📦 Complete Setup Guide - Snappic Full Stack

## 🎯 What This Solves

Your original error:
```
Error: ENOENT: no such file or directory, stat '/opt/render/project/src/snappic-live/public/index.html'
```

**Root Cause:** Backend was looking for `public/index.html` but frontend wasn't built.

**Solution:** Complete React frontend + proper build process.

---

## 🏗️ Architecture

```
Snappic Project (GitHub Repository)
├── Backend: server.js (Node.js/Express)
├── Database: MongoDB Atlas
├── Frontend: snappic-frontend/ (React + Vite)
└── Deployment: Render.com
```

---

## 📋 Complete Setup Checklist

### ✅ Phase 1: Local Development

```bash
# 1. Backend Setup
npm install                    # Install dependencies
cp .env.example .env          # Copy environment config
# Edit .env with your MONGO_URI and JWT_SECRET
npm run dev                   # Start backend on :3000

# 2. Frontend Setup (in new terminal)
cd snappic-frontend
npm install                   # Install dependencies
npm run dev                   # Start dev server on :5173

# 3. Test Integration
# Open http://localhost:5173
# Register → Create post → Join classroom
```

### ✅ Phase 2: Build for Production

```bash
# 1. Build frontend
cd snappic-frontend
npm run build                 # Creates dist/ folder

# 2. Copy to backend
cp -r dist/* ../public/       # Copy to backend's public folder

# 3. Test production build locally
cd ..
npm start                     # Start backend
# Visit http://localhost:3000
# Should serve built React frontend
```

### ✅ Phase 3: Deploy to Render

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add React frontend"
   git push
   ```

2. **Update Backend package.json**
   ```json
   {
     "scripts": {
       "build": "cd snappic-frontend && npm install && npm run build && cp -r dist/* ../public/",
       "start": "node server.js"
     }
   }
   ```

3. **Create Render Web Service**
   - Connect GitHub repo
   - Set Build Command: `npm run build`
   - Set Start Command: `npm start`
   - Set Environment Variables:
     - `MONGO_URI=your_mongodb_uri`
     - `JWT_SECRET=your_secret`
     - `NODE_ENV=production`

4. **Deploy**
   - Render will build and start your app
   - Visit your deployed URL

---

## 📂 Final File Structure

```
snappic-live/ (or your repo name)
├── server.js                     ← Your backend
├── package.json                  ← Has build scripts
├── .env                          ← MongoDB, JWT secrets
├── public/                       ← Serves built React
│   ├── index.html               ← React entry point
│   ├── assets/
│   │   ├── [hashname].js        ← React bundle
│   │   └── [hashname].css       ← Styles
│   └── ... (other static files)
├── snappic-frontend/            ← React app (NEW)
│   ├── src/
│   │   ├── pages/               ← Page components
│   │   ├── components/          ← Reusable components
│   │   ├── utils/               ← API client, helpers
│   │   ├── App.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   ├── QUICKSTART.md
│   ├── INTEGRATION_GUIDE.md
│   └── DEPLOYMENT_FIX.md
├── node_modules/
└── README.md
```

---

## 🔑 Key Files You Modified/Created

| File | Purpose | Status |
|------|---------|--------|
| `snappic-frontend/` | React frontend (NEW) | ✅ Created |
| `public/` | Built frontend served by backend | Populated during build |
| `server.js` | Needs fallback route | See INTEGRATION_GUIDE.md |
| `package.json` | Add build script | See DEPLOYMENT_FIX.md |

---

## ⚙️ Configuration Examples

### server.js - Serving Static + API

```javascript
const path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Your API routes
app.post('/api/register', /* ... */);
app.get('/api/posts', /* ... */);
// ... all API routes ...

// React fallback (MUST be last!)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```

### Environment Variables (.env)

```env
# Backend
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/snappic
JWT_SECRET=your_super_secret_key_here
PORT=3000
NODE_ENV=production

# Frontend (.env in snappic-frontend/)
VITE_API_URL=/api
```

---

## 🚀 Deployment Flow

```
1. Local Development
   ├─ npm run dev (backend)
   └─ npm run dev (frontend)
   
2. Build for Production
   ├─ npm run build (frontend)
   └─ Copy dist → public/
   
3. Push to GitHub
   └─ git push
   
4. Render Deployment
   ├─ npm run build (runs our build script)
   │  ├─ Installs frontend deps
   │  ├─ Builds React (vite build)
   │  └─ Copies to public/
   ├─ npm start (starts backend)
   │  └─ Serves public/ + API
   └─ ✅ Live!
```

---

## ✅ Verification Checklist

After following all steps:

- [ ] `npm run dev` runs frontend on http://localhost:5173
- [ ] Backend runs on http://localhost:3000
- [ ] Can create account and login
- [ ] Feed loads and displays posts
- [ ] Can create posts
- [ ] Classrooms page loads
- [ ] Campus rooms page loads
- [ ] Socket.io WebSocket connects (DevTools → Network)
- [ ] `npm run build` creates files in `public/`
- [ ] `npm start` serves frontend at http://localhost:3000
- [ ] All API endpoints work

---

## 🐛 Common Issues & Fixes

| Error | Fix |
|-------|-----|
| "Cannot GET /" | Add fallback route to server.js (last!) |
| "API 404" | Ensure `/api` routes exist before fallback |
| "WebSocket failed" | Check Socket.io initialization in backend |
| "VITE_API_URL undefined" | Ensure `.env` exists in frontend folder |
| "Cannot find public/index.html" | Run `npm run build` in frontend folder |
| "Module not found" | Delete `node_modules`, run `npm install` |

---

## 📚 Documentation Files

You now have:

1. **QUICKSTART.md** - Get running in 5 minutes
2. **INTEGRATION_GUIDE.md** - Connect frontend + backend
3. **DEPLOYMENT_FIX.md** - Deploy to Render (solves your error!)
4. **README.md** - Full frontend documentation
5. **This file** - Complete setup guide

---

## 🎉 Success Criteria

You've succeeded when:

✅ Frontend builds without errors
✅ Frontend connects to backend API
✅ Real-time features work (Socket.io)
✅ Deployed on Render and accessible
✅ All pages load and function
✅ No "public/index.html" errors

---

## 🆘 Need Help?

1. **Frontend issues?** Check `QUICKSTART.md`
2. **Integration issues?** Check `INTEGRATION_GUIDE.md`
3. **Deployment issues?** Check `DEPLOYMENT_FIX.md`
4. **Backend issues?** Check original `README.md` (backend)
5. **Socket.io issues?** Check `SOCKET_IO_EVENTS.md` (backend)

---

## 📞 Support Links

- Backend Docs: `../README.md` (server.js documentation)
- Socket.io Docs: `../SOCKET_IO_EVENTS.md`
- API Docs: `../API_DOCUMENTATION.md`
- Database: `../DATABASE_SCHEMA.md`

---

## 🎓 Learning Resources

- [React.dev](https://react.dev) - React official docs
- [Vitejs.dev](https://vitejs.dev) - Vite build tool
- [Tailwindcss.com](https://tailwindcss.com) - CSS framework
- [Socket.io](https://socket.io) - Real-time communication
- [Render.com docs](https://render.com/docs) - Hosting platform

---

## ✨ What's Next?

1. **Customize** - Edit colors, fonts, layout
2. **Add features** - Create new components
3. **Optimize** - Improve performance
4. **Test** - Write unit tests
5. **Monitor** - Track errors in production

---

**Created:** April 27, 2026
**Status:** ✅ Production Ready
**Version:** 2.0.0

🚀 Ready to launch!
