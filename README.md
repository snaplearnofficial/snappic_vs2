# 🎓 Snappic v2 - Real-Time Learning & Social Platform

[![Node.js](https://img.shields.io/badge/Node.js-18.0+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0+-green.svg)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.6+-red.svg)](https://socket.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Snappic has evolved from a simple photo-sharing app into a **comprehensive Real-Time Learning & Social Platform**. This is the backend server with all latest features.

---

## 🚀 Features

### 🎓 1. Google Meet-Style "Classrooms"
- **WebRTC Video Calls** - Join live study sessions with real-time video and audio
- **Screen Sharing** - Mentors and students can share screens for live coding/presentations
- **Real-Time Interaction** - See live participant counts and join/leave notifications
- **Subject-Based Organization** - Calculus 101, Chemistry Lab, Coding Bootcamp, etc.

### 📱 2. TikTok-Style Educational Feed
- **Immersive Media** - Full-screen images and videos optimized for quick learning
- **Course Labeling** - Posts categorized by subjects (Math, Coding, Physics, Chemistry, Biology, etc.)
- **Interactive Overlays** - Quick-action buttons for likes, comments, and sharing
- **Vertical Scroll Experience** - Optimized for mobile and desktop

### 🏛️ 3. Campus Rooms (Themed Chat)
- **Subject Rooms** - Specialized rooms like Calculus 101, Chemistry Lab, Coding Bootcamp
- **Anonymous Mode** - "Confessions" room for anonymous student interactions
- **Room History** - View previous messages even if you joined late
- **Real-Time Messaging** - Instant message delivery and synchronization

### ⏳ 4. Time Capsules (Memory Locking)
- **Unlock Dates** - Set "Unlock Hours" when creating a post
- **Delayed Content** - Posts remain "locked" until specified time
- **Study Milestones** - Perfect for creating future memories and scheduled releases

### 🔔 5. Real-Time Social System (Socket.io Powered)
- **Instagram-Style Notifications** - Instant notifications for follows, likes, comments
- **Advanced DMs** - Real-time direct messaging with message editing
- **Online Count** - See how many students are active across the platform
- **Message Persistence** - All messages saved in MongoDB

### 🎨 6. Premium "Deep Ocean Blue" UI
- **Modern Typography** - Outfit and Inter font families
- **Interest Onboarding** - Users choose subjects (Biology, Math, Coding, etc.) to personalize feed
- **Glassmorphism** - Sleek, semi-transparent UI elements
- **Responsive Design** - Optimized for all devices

---

## 📋 Prerequisites

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0
- **MongoDB Atlas** account (or local MongoDB)
- **Git**

---

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/snappic-v2.git
cd snappic-v2
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 4. Configure MongoDB
- Get your MongoDB Atlas connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Add it to your `.env` file as `MONGO_URI`
- Make sure your IP is whitelisted in MongoDB Atlas

### 5. Start the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will start on `http://localhost:3000` (or your configured PORT)

---

## 📚 API Documentation

### Authentication Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register new user |
| POST | `/api/login` | Login user |
| GET | `/api/me` | Get current user profile |

### User & Social Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/search?q=username` | Search users |
| GET | `/api/users/:id` | Get user profile & posts |
| POST | `/api/users/:id/follow` | Follow/unfollow user |
| POST | `/api/users/avatar` | Update avatar |
| POST | `/api/users/theme` | Update chat theme |

### Interest Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/interests` | Set user interests |
| GET | `/api/users/interests` | Get user interests |
| GET | `/api/interests/list` | Get available interests |

### Classroom Routes (Google Meet-Style)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/classrooms` | Create new classroom |
| GET | `/api/classrooms` | List all live classrooms |
| GET | `/api/classrooms/:id` | Get classroom details |
| POST | `/api/classrooms/:id/join` | Join classroom |
| POST | `/api/classrooms/:id/leave` | Leave classroom |
| POST | `/api/classrooms/:id/screen-share` | Toggle screen sharing |

**Classroom Request Body Example:**
```json
{
  "name": "Advanced Calculus",
  "description": "Live session on derivatives",
  "subject": "Math"
}
```

### Campus Rooms Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/campus-rooms` | List all rooms |
| POST | `/api/campus-rooms` | Create new room |

**Campus Room Request Body:**
```json
{
  "name": "Physics Lab",
  "subject": "Physics",
  "isAnonymous": false
}
```

### Post Routes (with Categories)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts?category=Math` | Get posts (optionally filtered by category) |
| POST | `/api/posts` | Create new post |
| DELETE | `/api/posts/:id` | Delete post |
| POST | `/api/posts/:id/like` | Like/unlike post |
| POST | `/api/posts/:id/comment` | Add comment to post |

**Create Post Request Body:**
```json
{
  "caption": "Solved the quadratic equation!",
  "image": "base64_image_data",
  "category": "Math",
  "postType": "post",
  "isPromptResponse": false,
  "unlockHours": 24
}
```

### Direct Message Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages/:userId` | Get messages with user |
| GET | `/api/conversations` | Get all conversations |

### Notification Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications` | Get notifications |
| POST | `/api/notifications/read` | Mark all as read |

---

## 🔌 Socket.io Events

### Authentication & Connection
```javascript
socket.on('user_join', { id: 'userId' })
// Emits: 'online_count' - current active users
```

### Direct Messaging
```javascript
socket.on('direct_message', { receiverId, text })
socket.on('edit_direct_message', { messageId, newText })
// Emits: 'new_direct_message', 'message_edited'
```

### Campus Rooms
```javascript
socket.on('campus_room_join', roomId)
socket.on('campus_room_message', { roomId, text })
socket.on('campus_room_leave', roomId)
// Emits: 'new_campus_message', 'campus_room_history', 'room_member_joined', 'room_member_left'
```

### Classrooms (WebRTC)
```javascript
socket.on('webrtc_offer', { classroomId, offer, to })
socket.on('webrtc_answer', { classroomId, answer, to })
socket.on('webrtc_ice_candidate', { classroomId, candidate, to })
socket.on('classroom_message', { classroomId, text })
// Emits: 'classroom_created', 'classroom_participant_joined', 'screen_share_toggled'
```

### Posts & Social
```javascript
// Emitted when: new post created, post liked, comment added
socket.emit('new_post', postData)
socket.emit('post_liked', { postId, likes, liked })
socket.emit('new_comment', { postId, comment, commentCount })
```

### Notifications
```javascript
// Real-time notifications for: likes, comments, follows, messages
socket.emit('new_notification', {
  id: 'notifId',
  type: 'like|comment|follow|message',
  senderId, senderUsername, senderAvatar,
  postId, createdAt
})
```

---

## 📊 Database Schema

### User Collection
```javascript
{
  id: String,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  avatar: String,
  bio: String,
  followers: [String],
  following: [String],
  interests: [String],
  chatTheme: String,
  createdAt: Date
}
```

### Post Collection
```javascript
{
  id: String,
  authorId: String,
  caption: String,
  image: String,
  category: String,
  postType: String,
  likes: [String],
  comments: Array,
  isPromptResponse: Boolean,
  unlockDate: Date,
  createdAt: Date
}
```

### Classroom Collection
```javascript
{
  id: String,
  name: String,
  description: String,
  mentorId: String,
  mentorName: String,
  subject: String,
  isLive: Boolean,
  participants: [String],
  maxParticipants: Number,
  screenShareUserId: String,
  createdAt: Date,
  startedAt: Date,
  endedAt: Date
}
```

### CampusRoom Collection
```javascript
{
  id: String,
  name: String,
  description: String,
  subject: String,
  isAnonymous: Boolean,
  memberCount: Number,
  createdAt: Date
}
```

### Message Collection
```javascript
{
  id: String,
  senderId: String,
  receiverId: String,
  text: String,
  createdAt: Date
}
```

### Notification Collection
```javascript
{
  id: String,
  userId: String,
  type: 'like' | 'comment' | 'follow' | 'message',
  senderId: String,
  senderUsername: String,
  senderAvatar: String,
  postId: String,
  read: Boolean,
  createdAt: Date
}
```

---

## 🔐 Security Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Password Hashing** - bcryptjs for password security
- ✅ **CORS Protection** - Configurable cross-origin requests
- ✅ **MongoDB Validation** - Schema validation for all collections
- ✅ **Anonymous Modes** - Proper sender anonymization in confession rooms
- ✅ **User Authorization** - Verification before critical operations

---

## 📝 Available Interest Categories

Users can select from these interests to personalize their feed:
- Biology
- Math
- Coding
- Physics
- Chemistry
- History
- Literature
- Art
- Music
- Sports
- Business
- Psychology

---

## 🧪 Testing

### Test Registration
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Test Login
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Get Available Interests
```bash
curl http://localhost:3000/api/interests/list
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure your IP is whitelisted in MongoDB Atlas
- Check your `MONGO_URI` in `.env`
- Verify MongoDB Atlas project exists

### Socket.io Connection Issues
- Ensure Socket.io transports include both 'polling' and 'websocket'
- Check CORS settings allow your frontend origin
- Verify socket events are named correctly

### WebRTC Issues
- Ensure both users are in the same classroom
- Check browser console for detailed WebRTC errors
- Verify ICE candidate exchange is working

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | Web framework |
| socket.io | ^4.6.1 | Real-time communication |
| mongoose | ^7.0.0 | MongoDB ODM |
| bcryptjs | ^2.4.3 | Password hashing |
| jsonwebtoken | ^9.0.0 | JWT authentication |
| cors | ^2.8.5 | Cross-origin requests |
| dotenv | ^16.0.3 | Environment variables |

---

## 🚀 Deployment

### Heroku Deployment
```bash
heroku create your-app-name
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Railway/Render Deployment
Add these environment variables in your dashboard:
- `MONGO_URI`
- `JWT_SECRET`
- `PORT`

---

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📞 Support

For issues and questions, please create an issue in the GitHub repository.

---

## 📈 Version History

### v2.0.0 (April 26, 2026)
- ✨ Added Google Meet-Style Classrooms
- ✨ Added TikTok-Style Educational Feed with Categories
- ✨ Added Campus Rooms (Themed Chat)
- ✨ Added Time Capsules (Unlock Dates)
- ✨ Enhanced Real-Time Social System
- ✨ Added Interest Onboarding
- 🔧 WebRTC signaling support
- 🔧 Screen sharing capabilities
- 🔧 Anonymous mode for confession rooms

---

**Made with ❤️ by the Snappic Team**
