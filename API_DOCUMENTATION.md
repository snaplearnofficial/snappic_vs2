# 📚 Snappic v2 - Complete API Documentation

## Base URL
```
http://localhost:3000/api
```

---

## 🔐 Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Register User
```
POST /register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user123abc",
    "username": "john_doe",
    "email": "john@example.com",
    "avatar": "JD"
  }
}
```

### Login User
```
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

### Get Current User
```
GET /me
Authorization: Bearer <token>

Response (200):
{
  "user": {
    "id": "user123abc",
    "username": "john_doe",
    "email": "john@example.com",
    "avatar": "JD",
    "bio": "Learning to code",
    "followers": 42,
    "following": 15,
    "interests": ["Coding", "Math"],
    "createdAt": "2026-01-15T10:30:00Z"
  }
}
```

---

## 👤 User Routes

### Update Avatar
```
POST /users/avatar
Authorization: Bearer <token>
Content-Type: application/json

{
  "avatar": "data:image/png;base64,iVBORw0KGgo..."
}

Response (200):
{
  "success": true,
  "avatar": "data:image/png;base64,..."
}
```

### Update Chat Theme
```
POST /users/theme
Authorization: Bearer <token>
Content-Type: application/json

{
  "chatTheme": "dark_ocean"
}

Response (200):
{
  "success": true,
  "chatTheme": "dark_ocean"
}
```

### Get User Profile
```
GET /users/:userId
Authorization: Bearer <token>

Response (200):
{
  "user": {
    "id": "user456xyz",
    "username": "jane_smith",
    "avatar": "JS",
    "bio": "Physics enthusiast",
    "followers": 128,
    "following": 75,
    "isFollowing": false
  },
  "posts": [
    {
      "id": "post123",
      "caption": "Learned about quantum mechanics today!",
      "image": "...",
      "category": "Physics",
      "likes": 24,
      "isLiked": false,
      "commentCount": 5,
      "createdAt": "2026-04-20T14:22:00Z"
    }
  ]
}
```

### Search Users
```
GET /users/search?q=jane
Authorization: Bearer <token>

Response (200):
{
  "users": [
    {
      "id": "user456xyz",
      "username": "jane_smith",
      "avatar": "JS"
    },
    {
      "id": "user789abc",
      "username": "jane_doe",
      "avatar": "JD"
    }
  ]
}
```

### Follow User
```
POST /users/:userId/follow
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "isFollowing": true,
  "followers": 129
}
```

---

## 🎓 Classrooms (Google Meet-Style)

### Create Classroom
```
POST /classrooms
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Advanced Calculus Lecture",
  "description": "Session on derivatives and integrals",
  "subject": "Math"
}

Response (200):
{
  "success": true,
  "classroom": {
    "id": "class123xyz",
    "name": "Advanced Calculus Lecture",
    "description": "Session on derivatives and integrals",
    "mentorId": "user123abc",
    "mentorName": "john_doe",
    "subject": "Math",
    "isLive": true,
    "participants": ["user123abc"],
    "participantCount": 1,
    "maxParticipants": 50,
    "screenShareUserId": null,
    "createdAt": "2026-04-26T10:00:00Z",
    "startedAt": "2026-04-26T10:00:00Z"
  }
}
```

### Get All Live Classrooms
```
GET /classrooms
Authorization: Bearer <token>

Response (200):
{
  "classrooms": [
    {
      "id": "class123xyz",
      "name": "Advanced Calculus Lecture",
      "description": "Session on derivatives and integrals",
      "mentorName": "john_doe",
      "subject": "Math",
      "isLive": true,
      "participantCount": 8,
      "createdAt": "2026-04-26T10:00:00Z"
    },
    {
      "id": "class456abc",
      "name": "Chemistry Lab",
      "mentorName": "alice_student",
      "subject": "Chemistry",
      "participantCount": 12,
      "isLive": true,
      "createdAt": "2026-04-26T09:30:00Z"
    }
  ]
}
```

### Get Classroom Details
```
GET /classrooms/:classroomId
Authorization: Bearer <token>

Response (200):
{
  "classroom": {
    "id": "class123xyz",
    "name": "Advanced Calculus Lecture",
    "participants": ["user123abc", "user456xyz", "user789def"],
    "participantCount": 3,
    "screenShareUserId": null,
    "isLive": true,
    "subject": "Math"
  }
}
```

### Join Classroom
```
POST /classrooms/:classroomId/join
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "classroom": { ... }
}
```

### Leave Classroom
```
POST /classrooms/:classroomId/leave
Authorization: Bearer <token>

Response (200):
{
  "success": true
}
```

### Toggle Screen Sharing
```
POST /classrooms/:classroomId/screen-share
Authorization: Bearer <token>
Content-Type: application/json

{
  "isSharing": true
}

Response (200):
{
  "success": true
}
```

---

## 🏛️ Campus Rooms (Themed Chat)

### Get All Campus Rooms
```
GET /campus-rooms
Authorization: Bearer <token>

Response (200):
{
  "rooms": [
    {
      "id": "calculus101",
      "name": "Calculus 101",
      "description": "Calculus 101 discussion room",
      "subject": "Math",
      "isAnonymous": false,
      "memberCount": 24,
      "createdAt": "2026-04-01T00:00:00Z"
    },
    {
      "id": "confessions",
      "name": "Confessions",
      "description": "Confessions room",
      "subject": "General",
      "isAnonymous": true,
      "memberCount": 156,
      "createdAt": "2026-04-01T00:00:00Z"
    }
  ]
}
```

### Create Custom Campus Room
```
POST /campus-rooms
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Advanced Physics",
  "subject": "Physics",
  "isAnonymous": false
}

Response (200):
{
  "success": true,
  "room": {
    "id": "room123xyz",
    "name": "Advanced Physics",
    "subject": "Physics",
    "isAnonymous": false,
    "memberCount": 0,
    "createdAt": "2026-04-26T12:45:00Z"
  }
}
```

---

## 📝 Posts (with Categories)

### Get Posts
```
GET /posts
Authorization: Bearer <token>

Query Parameters:
- category=Math (optional) - Filter by category

Response (200):
{
  "posts": [
    {
      "id": "post123",
      "author": {
        "id": "user123abc",
        "username": "john_doe",
        "avatar": "JD"
      },
      "caption": "Solved the quadratic equation problem set!",
      "image": "data:image/png;base64,...",
      "category": "Math",
      "postType": "post",
      "isPromptResponse": false,
      "unlockDate": null,
      "likes": 12,
      "isLiked": false,
      "comments": [
        { "username": "jane_doe", "text": "Nice work!", "createdAt": "2026-04-26T11:20:00Z" }
      ],
      "commentCount": 3,
      "createdAt": "2026-04-26T10:15:00Z"
    }
  ]
}
```

### Create Post
```
POST /posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "caption": "Just finished learning about derivatives!",
  "image": "data:image/png;base64,iVBORw0KGgo...",
  "category": "Math",
  "postType": "post",
  "isPromptResponse": false,
  "unlockHours": 24
}

Response (200):
{
  "success": true,
  "post": {
    "id": "post456xyz",
    "author": { ... },
    "caption": "Just finished learning about derivatives!",
    "category": "Math",
    "unlockDate": "2026-04-27T10:15:00Z",
    "likes": 0,
    "comments": [],
    "createdAt": "2026-04-26T10:15:00Z"
  }
}
```

### Like Post
```
POST /posts/:postId/like
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "liked": true,
  "likes": 13
}
```

### Add Comment
```
POST /posts/:postId/comment
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Great explanation! This helped me understand integrals better."
}

Response (200):
{
  "success": true,
  "comment": {
    "username": "john_doe",
    "text": "Great explanation! This helped me understand integrals better.",
    "createdAt": "2026-04-26T11:30:00Z"
  }
}
```

### Delete Post
```
DELETE /posts/:postId
Authorization: Bearer <token>

Response (200):
{
  "success": true
}
```

---

## 💬 Direct Messages

### Get Conversation with User
```
GET /messages/:userId
Authorization: Bearer <token>

Response (200):
{
  "messages": [
    {
      "id": "msg123",
      "senderId": "user123abc",
      "receiverId": "user456xyz",
      "text": "Hey! How's the coding bootcamp going?",
      "createdAt": "2026-04-26T14:00:00Z"
    },
    {
      "id": "msg124",
      "senderId": "user456xyz",
      "receiverId": "user123abc",
      "text": "It's going great! Just learned about async/await",
      "createdAt": "2026-04-26T14:05:00Z"
    }
  ]
}
```

### Get All Conversations
```
GET /conversations
Authorization: Bearer <token>

Response (200):
{
  "users": [
    {
      "id": "user456xyz",
      "username": "jane_smith",
      "avatar": "JS"
    },
    {
      "id": "user789abc",
      "username": "alice_student",
      "avatar": "AS"
    }
  ]
}
```

---

## 🔔 Notifications

### Get Notifications
```
GET /notifications
Authorization: Bearer <token>

Response (200):
{
  "notifications": [
    {
      "id": "notif123",
      "type": "like",
      "senderId": "user456xyz",
      "senderUsername": "jane_smith",
      "senderAvatar": "JS",
      "postId": "post123",
      "read": false,
      "createdAt": "2026-04-26T15:22:00Z"
    },
    {
      "id": "notif124",
      "type": "follow",
      "senderId": "user789abc",
      "senderUsername": "alice_student",
      "senderAvatar": "AS",
      "read": false,
      "createdAt": "2026-04-26T15:10:00Z"
    }
  ]
}
```

### Mark All Notifications as Read
```
POST /notifications/read
Authorization: Bearer <token>

Response (200):
{
  "success": true
}
```

---

## 🎯 Interests

### Get Available Interests
```
GET /interests/list

Response (200):
{
  "interests": [
    "Biology",
    "Math",
    "Coding",
    "Physics",
    "Chemistry",
    "History",
    "Literature",
    "Art",
    "Music",
    "Sports",
    "Business",
    "Psychology"
  ]
}
```

### Set User Interests
```
POST /users/interests
Authorization: Bearer <token>
Content-Type: application/json

{
  "interests": ["Math", "Coding", "Physics"]
}

Response (200):
{
  "success": true,
  "interests": ["Math", "Coding", "Physics"]
}
```

### Get User Interests
```
GET /users/interests
Authorization: Bearer <token>

Response (200):
{
  "interests": ["Math", "Coding", "Physics"]
}
```

---

## 🔄 Prompt of the Day

### Get Current Prompt
```
GET /prompt
Authorization: Bearer <token>

Response (200):
{
  "prompt": "What's the weirdest thing on your desk right now?"
}
```

---

## ❌ Error Responses

All error responses follow this format:

```
{
  "error": "Error message describing what went wrong"
}
```

### Common Status Codes
- `200` - Success
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (don't have permission)
- `404` - Not Found
- `500` - Server Error

### Example Error Responses

**Missing Authentication Token:**
```
Status: 401
{
  "error": "Unauthorized"
}
```

**Invalid Request Body:**
```
Status: 400
{
  "error": "All fields required"
}
```

**User Not Found:**
```
Status: 404
{
  "error": "User not found"
}
```

---

## 📊 Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:
- Express rate limiter middleware
- IP-based rate limits
- User-based rate limits

---

## 🔒 Security Best Practices

1. **Always use HTTPS** in production
2. **Keep JWT_SECRET secure** - use strong, random string
3. **Validate all inputs** on the backend
4. **Sanitize user content** before storing
5. **Use environment variables** for sensitive data
6. **Implement rate limiting** for production
7. **Regular security audits** recommended

---

## 📞 API Support

For issues or questions about the API, please:
1. Check this documentation
2. Review example requests
3. Create an issue on GitHub

