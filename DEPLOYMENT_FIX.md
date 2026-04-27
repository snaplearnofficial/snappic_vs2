# 🚀 DEPLOYMENT FIX - Render Setup Guide

## Problem
```
Error: ENOENT: no such file or directory, stat '/opt/render/project/src/snappic-live/public/index.html'
```

## Root Cause
The backend is looking for `public/index.html` but it doesn't exist at build time.

## Solution

This frontend is meant to be **built and then served by the backend**.

### Step 1: Build Frontend

```bash
cd snappic-frontend
npm install
npm run build
```

This creates optimized files in `dist/` folder.

### Step 2: Copy Built Frontend to Backend

Copy the built `dist` folder contents to your backend's `public` folder:

```bash
# From snappic-frontend directory
cp -r dist/* ../path-to-backend/public/
```

**On Windows:**
```bash
xcopy dist\* ..\path-to-backend\public\ /E /I /Y
```

### Step 3: Update Backend package.json

Modify `package.json` to build frontend as part of the deploy process:

```json
{
  "scripts": {
    "install-frontend": "cd snappic-frontend && npm install && npm run build && cp -r dist/* ../public/",
    "build": "npm run install-frontend",
    "dev": "node server.js",
    "start": "node server.js"
  }
}
```

### Step 4: Update server.js

Ensure your backend properly serves static files:

```javascript
// In server.js (around line 20-30)
const path = require('path');
const fs = require('fs');

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// ... your API routes ...

// Serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```

### Step 5: Deploy to Render

On Render.com dashboard:

1. Go to your web service settings
2. Set **Build Command**:
   ```bash
   npm run build
   ```
3. Set **Start Command**:
   ```bash
   npm start
   ```
4. Set environment variables:
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   NODE_ENV=production
   ```

5. Deploy!

## ✅ Verify Deployment

After deployment, you should see:
- ✅ Landing page loads at `https://your-app.onrender.com`
- ✅ Login/registration works
- ✅ API calls succeed
- ✅ Real-time updates work

## 📦 Full Directory Structure

```
snappic-live/ (backend root)
├── server.js
├── package.json
├── snappic-frontend/ (frontend folder)
│   ├── src/
│   ├── dist/ (built files)
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── public/ (served by backend)
│   ├── index.html
│   ├── assets/
│   └── ... (other built files)
├── node_modules/
└── .env
```

## 🔄 Deployment Workflow

```
1. git push → GitHub
   ↓
2. Render detects push → Triggers build
   ↓
3. npm run build executed
   ↓
4. Frontend builds (dist/)
   ↓
5. Files copied to public/
   ↓
6. Backend starts (npm start)
   ↓
7. Static files served from public/
   ↓
8. ✅ App live!
```

## 🐛 If Still Getting Errors

### Error: "public/index.html not found"

**Solution:** Verify the build process:
```bash
# Locally test the build
npm run build
ls -la public/index.html  # Should exist

# Check file size (shouldn't be 0 bytes)
```

### Error: "Cannot GET /"

**Solution:** Ensure fallback route in server.js:
```javascript
// This must be AFTER all API routes!
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```

### Error: API calls failing

**Solution:** Check environment variable in frontend:
- Render frontend should use `VITE_API_URL=/api`
- This makes all API calls relative (not absolute)

## 📝 Render.com render.yaml Alternative

If using `render.yaml` for config:

```yaml
services:
  - type: web
    name: snappic
    env: node
    plan: free
    buildCommand: npm run build
    startCommand: npm start
    envVars:
      - key: MONGO_URI
        scope: build
        value: ${{ secrets.MONGO_URI }}
      - key: JWT_SECRET
        scope: build
        value: ${{ secrets.JWT_SECRET }}
```

## ✨ Summary

1. **Build frontend locally** or during deployment
2. **Copy to `public/` folder** in backend
3. **Backend serves static files** from public/
4. **Backend also serves API routes** at /api
5. **Fallback route** redirects to index.html for SPA routing

This is the **standard setup for serving an SPA with Express**.

---

🎉 You're all set! Your Render deployment should now work perfectly.
