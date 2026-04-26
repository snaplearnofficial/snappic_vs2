# ⚡ Quick Start Guide

Get Snappic v2 running in 5 minutes!

---

## 📋 Prerequisites

- Node.js 16+ ([Download](https://nodejs.org/))
- npm 8+ (comes with Node.js)
- MongoDB Atlas account ([Sign up free](https://www.mongodb.com/cloud/atlas))

---

## 🚀 Setup (5 minutes)

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/snappic-v2.git
cd snappic-v2
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs all required packages:
- express, socket.io, mongoose, bcryptjs, jsonwebtoken, cors, dotenv

### Step 3: Setup Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Whitelist your IP address

### Step 4: Configure Environment
```bash
cp .env.example .env
```

Edit `.env` file:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/snappic?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key_here
PORT=3000
NODE_ENV=development
```

### Step 5: Start Server
```bash
npm run dev
```

You should see:
```
✅ Connected to MongoDB Atlas!
📡 Database Ping Successful: Connection is healthy!
🚀 Snappic Premium running on port 3000
```

---

## ✅ Verify It Works

### Test 1: Health Check
```bash
curl http://localhost:3000/api/interests/list
```

Should return:
```json
{
  "interests": [
    "Biology",
    "Math",
    "Coding",
    ...
  ]
}
```

### Test 2: Register User
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

Should return:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

### Test 3: Login
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Complete feature overview |
| [API_DOCUMENTATION.md](API_DOCUMENTATION.md) | All API endpoints |
| [SOCKET_IO_EVENTS.md](SOCKET_IO_EVENTS.md) | Real-time events |
| [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) | Data structure |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute |

---

## 🔥 Popular API Endpoints

### Get Available Interests
```bash
curl http://localhost:3000/api/interests/list
```

### Get All Posts
```bash
curl http://localhost:3000/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create a Classroom
```bash
curl -X POST http://localhost:3000/api/classrooms \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Math 101",
    "subject": "Math",
    "description": "Calculus basics"
  }'
```

### Get Campus Rooms
```bash
curl http://localhost:3000/api/campus-rooms \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Set User Interests
```bash
curl -X POST http://localhost:3000/api/users/interests \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "interests": ["Math", "Coding", "Physics"]
  }'
```

---

## 🧪 Testing with Postman/Insomnia

### Import Collection

1. Download [Snappic Postman Collection](https://github.com/yourusername/snappic-v2/releases)
2. Open Postman/Insomnia
3. Import the collection file
4. Set `base_url` to `http://localhost:3000`
5. Set `token` from login response
6. Start testing!

---

## 🔌 Real-Time Features (Socket.io)

Create a simple test client:

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
</head>
<body>
  <script>
    const socket = io('http://localhost:3000');
    
    socket.on('connect', () => {
      console.log('Connected!');
      socket.emit('user_join', { id: 'user123abc' });
    });
    
    socket.on('online_count', (count) => {
      console.log(`${count} users online`);
    });
    
    socket.on('new_post', (post) => {
      console.log('New post:', post);
    });
  </script>
</body>
</html>
```

---

## 🐛 Troubleshooting

### Error: "MONGO_URI is not set"
**Solution:** Check your `.env` file has correct MongoDB connection string

### Error: "Cannot connect to database"
**Solution:** 
- Whitelist your IP in MongoDB Atlas
- Check connection string is correct
- Ensure MongoDB cluster is running

### Error: "Port 3000 already in use"
**Solution:**
```bash
# Find and kill process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Error: "npm command not found"
**Solution:** Install Node.js from https://nodejs.org/

---

## 📁 Project Structure

```
snappic-v2/
├── server.js                  # Main server file (762 lines)
├── package.json              # Dependencies
├── .env.example              # Environment template
├── README.md                 # Full documentation
├── API_DOCUMENTATION.md      # API endpoints
├── SOCKET_IO_EVENTS.md      # Real-time events
├── DATABASE_SCHEMA.md        # Data structure
├── CONTRIBUTING.md           # Contributing guide
├── LICENSE                   # MIT License
└── .gitignore               # Git ignore rules
```

---

## 🎯 Next Steps

1. ✅ **Server Running** - You're here!
2. 📱 **Build Frontend** - Create React/Vue/Angular app
3. 🔗 **Connect Frontend** - Use API endpoints & Socket.io
4. 🎨 **Add UI Theme** - Implement Deep Ocean Blue theme
5. 🚀 **Deploy** - Host on Heroku, Railway, or Vercel

---

## 📚 Learn More

- [Express.js Guide](https://expressjs.com/)
- [MongoDB Atlas Guide](https://docs.mongodb.com/cloud/atlas/getting-started/)
- [Socket.io Tutorial](https://socket.io/get-started/chat)
- [REST API Best Practices](https://restfulapi.net/)

---

## 💡 Pro Tips

1. **Use Postman** for API testing before frontend integration
2. **Monitor console logs** for debugging Socket.io connections
3. **Save tokens** from login to use in subsequent requests
4. **Test with multiple users** to verify real-time features
5. **Check MongoDB Atlas dashboard** to see database activity

---

## ❓ Need Help?

- 📖 Check [README.md](README.md) for full documentation
- 🐛 Search [GitHub Issues](https://github.com/yourusername/snappic-v2/issues)
- 💬 Create new issue with detailed description
- 📧 Email: team@snappic.dev

---

## 🎉 Success!

Your Snappic v2 backend is now running! Time to build the frontend. 🚀

