# 🎓 Snappic Frontend - React + Vite

Modern React frontend for the Snappic Real-Time Learning & Social Platform.

## 🎯 Features

- ✨ Real-time updates with Socket.io
- 🎨 Beautiful Deep Ocean Blue theme with glassmorphism
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 🔐 JWT authentication
- 🚀 Production-ready build

## 📋 Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- Backend server running (http://localhost:3000)

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
snappic-frontend/
├── src/
│   ├── pages/           # Main page components
│   ├── components/      # Reusable components
│   ├── utils/           # API utilities & helpers
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS theme
├── package.json         # Dependencies
└── README.md
```

## 🌐 Environment Variables

Create a `.env` file (copy from `.env.example`):

```env
VITE_API_URL=http://localhost:3000/api
```

For production on Render:
```env
VITE_API_URL=/api
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the Deep Ocean Blue theme:

```javascript
colors: {
  ocean: {
    900: '#020d1a',  // Darkest
    800: '#041628',
    700: '#062040',
    600: '#0a3060',
    // ... more colors
  }
}
```

### Fonts

Uses Google Fonts:
- `Outfit` - Headings (display font)
- `Inter` - Body text (readable font)

## 🔗 Backend Integration

### API Endpoints

The frontend connects to the backend API at `/api`:

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/posts` - Fetch posts
- `GET /api/classrooms` - Fetch classrooms
- `GET /api/campus-rooms` - Fetch campus rooms

### Socket.io Events

Real-time communication:
- `new_post` - New post published
- `new_notification` - New notification
- `new_campus_message` - New room message
- `classroom_created` - New classroom
- And more...

## 📦 Dependencies

- **React** 18.2+ - UI framework
- **Vite** 4.4+ - Build tool
- **Tailwind CSS** 3.3+ - Utility CSS
- **Socket.io Client** 4.6+ - Real-time communication
- **Axios** 1.4+ - HTTP requests

## 🚀 Deployment

### Render.com

1. Push your code to GitHub
2. Create a new Render Web Service
3. Connect your GitHub repository
4. Set environment variables:
   - `VITE_API_URL=/api`
5. Build command: `npm install && npm run build`
6. Start command: Handled by backend

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set VITE_API_URL in environment variables
4. Deploy

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Socket.io Client](https://socket.io/docs/v4/client-api/)

## 🐛 Troubleshooting

### API Connection Issues

If you see CORS errors:
1. Verify backend is running on port 3000
2. Check VITE_API_URL environment variable
3. Ensure backend has CORS enabled

### Socket.io Connection Failed

- Check network tab in browser DevTools
- Verify Socket.io is running on backend
- Check firewall/network settings

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📝 License

MIT License - See LICENSE file

## 🤝 Contributing

Contributions welcome! Please follow the code style and submit pull requests.

---

Built with ❤️ for Snappic
