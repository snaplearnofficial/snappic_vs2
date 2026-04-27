# ⚡ QUICKSTART - Get Snappic Frontend Running

## 🎯 What You Have

✅ **Complete React Frontend** with:
- Modern UI with Deep Ocean Blue theme
- All features from your backend docs
- Socket.io real-time integration
- Authentication system
- Feed, Classrooms, Campus Rooms, Profile pages

## 🚀 Run in 5 Minutes

### Step 1: Install Dependencies
```bash
cd snappic-frontend
npm install
```

### Step 2: Set Environment Variables
```bash
# Copy example file
cp .env.example .env

# Edit .env
VITE_API_URL=http://localhost:3000/api
```

### Step 3: Start Development Server
```bash
npm run dev
```

Visit: **http://localhost:5173**

### Step 4: Also Start Backend
```bash
# In another terminal
cd .. (go to backend root)
npm start
```

Backend runs at: **http://localhost:3000**

## ✨ What You Can Do Now

1. **Register/Login** - Create an account
2. **Create Posts** - Share what you learned
3. **Browse Feed** - See all posts with filters
4. **Join Classrooms** - Real-time study sessions
5. **Join Campus Rooms** - Chat with others
6. **Set Interests** - Personalize your experience

## 📁 Project Files

```
snappic-frontend/
├── src/
│   ├── pages/
│   │   ├── Auth.jsx          → Login/Register page
│   │   ├── Feed.jsx          → Posts feed
│   │   ├── Classrooms.jsx    → Video classrooms
│   │   ├── CampusRooms.jsx   → Chat rooms
│   │   └── Profile.jsx       → User profile
│   ├── components/
│   │   └── Navigation.jsx    → Top navigation
│   ├── utils/
│   │   └── api.js            → API calls
│   ├── App.jsx               → Main app logic
│   ├── main.jsx              → Entry point
│   └── index.css             → Global styles
├── index.html                → HTML template
├── vite.config.js            → Build config
├── tailwind.config.js        → Theme colors
└── package.json              → Dependencies
```

## 🎨 Customizing the Theme

Edit `tailwind.config.js`:

```javascript
colors: {
  ocean: {
    900: '#020d1a',  // Change these
    800: '#041628',
    700: '#062040',
    // ... etc
  },
  cyan: '#00e5ff',   // Or change accent colors
  purple: '#8b5cf6',
}
```

## 🔄 Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for lint issues
npm run lint
```

## 🌐 Ready to Deploy?

### Build Steps

1. **Build frontend:**
   ```bash
   npm run build
   ```

2. **Copy to backend:**
   ```bash
   cp -r dist/* ../public/
   ```

3. **Deploy backend** (which now serves frontend)

See `DEPLOYMENT_FIX.md` for full Render setup.

## 🐛 Troubleshooting

### "Cannot connect to API"
- Check backend is running on port 3000
- Check `.env` has correct `VITE_API_URL`
- Check browser console for errors

### "WebSocket connection failed"
- Backend Socket.io might not be running
- Check firewall settings
- Verify backend cors config

### "Page not loading"
- Clear browser cache
- Try `npm run dev` again
- Check Node version (need 16+)

## 📚 Next Steps

1. ✅ **Get it running locally** - Done! You're here
2. **Customize** - Edit colors, fonts, content
3. **Add features** - Create new components
4. **Deploy** - Push to Render/Vercel

## 🎓 Learn More

- [React docs](https://react.dev)
- [Vite docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Socket.io](https://socket.io/docs)

## 📝 Architecture Overview

```
┌─────────────────────────────────────┐
│   Browser (Snappic Frontend)        │
│   - React components                │
│   - Tailwind UI                     │
│   - Socket.io client                │
└────────────┬────────────────────────┘
             │ HTTP + WebSocket
             ↓
┌─────────────────────────────────────┐
│   Node.js/Express Backend           │
│   - API endpoints                   │
│   - MongoDB database                │
│   - Socket.io server                │
└─────────────────────────────────────┘
```

## 🎉 You're Ready!

1. Run `npm run dev`
2. Open http://localhost:5173
3. Create an account
4. Start exploring!

---

**Questions?** Check the other docs:
- `README.md` - Full documentation
- `INTEGRATION_GUIDE.md` - Connect frontend + backend
- `DEPLOYMENT_FIX.md` - Deploy to Render
