# 📊 Database Schema Documentation

## Overview

Snappic v2 uses **MongoDB** with Mongoose ODM. All collections are defined in `server.js`.

---

## 👤 User Collection

### Schema Definition
```javascript
{
  id: String,
  username: String (unique),
  email: String (unique),
  password: String (hashed with bcryptjs),
  avatar: String,
  bio: String,
  followers: [String],
  following: [String],
  interests: [String],
  chatTheme: String,
  createdAt: Date
}
```

### Example Document
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "id": "user123abc",
  "username": "john_doe",
  "email": "john@example.com",
  "password": "$2a$10$kxGsxvrmfDHQb8f.QYs8F.yWHQa7...",
  "avatar": "data:image/png;base64,iVBORw0KGgo...",
  "bio": "Learning to code 💻",
  "followers": ["user456xyz", "user789abc"],
  "following": ["user456xyz"],
  "interests": ["Coding", "Math", "Physics"],
  "chatTheme": "default",
  "createdAt": ISODate("2026-01-15T10:30:00Z")
}
```

### Indexes
- `username` (unique)
- `email` (unique)

### Notes
- Password is never returned in queries (select: false)
- Avatar can store base64 image or image URL
- Interests: array of selected subject categories
- Followers/Following: store user IDs

---

## 📝 Post Collection

### Schema Definition
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

### Example Document
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "id": "post123xyz",
  "authorId": "user123abc",
  "caption": "Just solved the quadratic equation problem set!",
  "image": "data:image/png;base64,iVBORw0KGgo...",
  "category": "Math",
  "postType": "post",
  "likes": ["user456xyz", "user789abc", "user111def"],
  "comments": [
    {
      "username": "jane_smith",
      "text": "Great work! This helped me understand it",
      "createdAt": ISODate("2026-04-26T11:15:00Z")
    },
    {
      "username": "alice_student",
      "text": "Can you explain step 3 more?",
      "createdAt": ISODate("2026-04-26T12:00:00Z")
    }
  ],
  "isPromptResponse": false,
  "unlockDate": ISODate("2026-04-27T10:15:00Z"),
  "createdAt": ISODate("2026-04-26T10:15:00Z")
}
```

### Categories
- Math
- Coding
- Physics
- Chemistry
- Biology
- History
- Literature
- Art
- Music
- Sports
- Business
- Psychology
- General (default)

### Post Types
- `post` - Regular social post
- `note` - Study note
- `prompt_response` - Response to daily prompt

### Fields Explained
- **unlockDate**: Null if no unlock specified, otherwise datetime when post becomes visible
- **likes**: Array of user IDs who liked the post
- **comments**: Array of comment objects with username, text, and timestamp
- **category**: Used for feed filtering

### Indexes
- `authorId` (for user profile queries)
- `category` (for feed filtering)
- `createdAt` (for sorting)
- `unlockDate` (for scheduled posts)

---

## 💬 Message Collection

### Schema Definition
```javascript
{
  id: String,
  senderId: String,
  receiverId: String,
  text: String,
  createdAt: Date
}
```

### Example Document
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439013"),
  "id": "msg123abc",
  "senderId": "user123abc",
  "receiverId": "user456xyz",
  "text": "Hey! How's the physics exam going?",
  "createdAt": ISODate("2026-04-26T15:30:00Z")
}
```

### Indexes
- `senderId` (for user sent messages)
- `receiverId` (for user received messages)
- `createdAt` (for sorting)

### Features
- Messages are editable via Socket.io events
- No deletion API endpoint (messages persist)
- Direct 1-to-1 messaging only

---

## 🔔 Notification Collection

### Schema Definition
```javascript
{
  id: String,
  userId: String,
  type: String,
  senderId: String,
  senderUsername: String,
  senderAvatar: String,
  postId: String,
  read: Boolean,
  createdAt: Date
}
```

### Example Document
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439014"),
  "id": "notif123xyz",
  "userId": "user456xyz",
  "type": "like",
  "senderId": "user123abc",
  "senderUsername": "john_doe",
  "senderAvatar": "JD",
  "postId": "post123xyz",
  "read": false,
  "createdAt": ISODate("2026-04-26T15:22:00Z")
}
```

### Notification Types
- `like` - User liked your post
- `comment` - User commented on your post
- `follow` - User followed you
- `message` - User sent you a direct message

### Indexes
- `userId` (for user notifications)
- `read` (for unread notification queries)
- `createdAt` (for sorting)

### Limits
- API returns latest 20 notifications
- Older notifications should be archived or deleted separately

---

## 🎓 Classroom Collection

### Schema Definition
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

### Example Document
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439015"),
  "id": "class123xyz",
  "name": "Advanced Calculus Lecture",
  "description": "Session on derivatives and integrals",
  "mentorId": "user123abc",
  "mentorName": "john_doe",
  "subject": "Math",
  "isLive": true,
  "participants": ["user123abc", "user456xyz", "user789abc"],
  "maxParticipants": 50,
  "screenShareUserId": "user456xyz",
  "createdAt": ISODate("2026-04-26T10:00:00Z"),
  "startedAt": ISODate("2026-04-26T10:00:00Z"),
  "endedAt": null
}
```

### Subjects
All academic subjects including:
- Calculus 101
- Chemistry Lab
- Coding Bootcamp
- Physics Study Group
- etc.

### Indexes
- `isLive` (for finding active classrooms)
- `mentorId` (for mentor's classrooms)
- `createdAt` (for sorting)

### Features
- Multiple participants (default max: 50)
- One person can share screen at a time
- EndedAt is populated when last participant leaves
- WebRTC video data handled via Socket.io (not stored in DB)

---

## 🏛️ CampusRoom Collection

### Schema Definition
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

### Example Document
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439016"),
  "id": "calculus101",
  "name": "Calculus 101",
  "description": "Calculus 101 discussion room",
  "subject": "Math",
  "isAnonymous": false,
  "memberCount": 24,
  "createdAt": ISODate("2026-04-01T00:00:00Z")
}
```

### Default Rooms
```javascript
[
  {
    id: 'calculus101',
    name: 'Calculus 101',
    subject: 'Math',
    isAnonymous: false
  },
  {
    id: 'chemlab',
    name: 'Chemistry Lab',
    subject: 'Chemistry',
    isAnonymous: false
  },
  {
    id: 'codingbootcamp',
    name: 'Coding Bootcamp',
    subject: 'Coding',
    isAnonymous: false
  },
  {
    id: 'confessions',
    name: 'Confessions',
    subject: 'General',
    isAnonymous: true
  }
]
```

### Anonymous Mode
- When `isAnonymous: true`, sender name appears as "Anonymous"
- Sender avatar appears as "?" 
- Still tracked by userId internally for moderation

### Indexes
- `isAnonymous` (for filtering room types)
- `subject` (for subject-based browsing)
- `createdAt` (for sorting)

### Notes
- Room messages are stored in-memory on server
- History limited to last 100 messages per room
- For persistence, consider archiving old messages separately

---

## 📋 Relationships Diagram

```
User
├── Posts (via authorId)
├── Messages (via senderId/receiverId)
├── Notifications (via userId/senderId)
├── Classrooms (via mentorId/participants)
└── Follows (via followers/following arrays)

Post
├── Author (via authorId → User)
├── Likes (via likes array of userIds)
├── Comments (embedded documents)
└── Notifications (via postId)

Classroom
├── Mentor (via mentorId → User)
├── Participants (via participants array of userIds)
└── Screen Share User (via screenShareUserId → User)

CampusRoom
└── Members (stored in-memory during session)
```

---

## 🔄 Data Flow Examples

### Post Creation Flow
1. User creates post via `POST /api/posts`
2. Post document created with:
   - `authorId` = current user
   - `category` = specified category or "General"
   - `unlockDate` = calculated if unlockHours provided
   - `createdAt` = current timestamp
3. Socket.io broadcasts `new_post` event
4. Post appears in feed

### Like Notification Flow
1. User clicks like on post
2. Post document updated: `likes` array includes userId
3. If liker is not post author:
   - Notification created with type: 'like'
   - Socket.io sends `new_notification` to post author
4. Like count incremented in feed

### Classroom Participant Flow
1. Mentor creates classroom via `POST /api/classrooms`
2. Classroom document created with mentor in participants
3. Other users join via `POST /api/classrooms/:id/join`
4. Participants array updated
5. Socket.io broadcasts participant updates
6. When last participant leaves, `isLive` set to false

---

## 🔒 Data Validation

### User Schema Validation
```javascript
- username: required, unique, min 3 chars
- email: required, unique, valid email format
- password: required, min 6 chars (hashed before storage)
- avatar: optional, can be base64 image
- bio: optional, max 500 chars
- interests: optional, array of valid interest strings
```

### Post Schema Validation
```javascript
- caption: required
- image: optional, base64 or URL
- category: optional, must be from predefined list
- unlockHours: optional, must be positive number
- postType: optional, one of ['post', 'note']
```

### Classroom Schema Validation
```javascript
- name: required
- subject: required
- description: optional
- maxParticipants: optional, default 50
```

---

## 📈 Database Performance Tips

### Indexes to Create
```javascript
db.users.createIndex({ username: 1 })
db.users.createIndex({ email: 1 })
db.posts.createIndex({ authorId: 1 })
db.posts.createIndex({ category: 1 })
db.posts.createIndex({ createdAt: -1 })
db.messages.createIndex({ senderId: 1, receiverId: 1 })
db.notifications.createIndex({ userId: 1, read: 1 })
db.classrooms.createIndex({ isLive: 1 })
```

### Query Optimization
- Always filter by indexed fields when possible
- Use `.limit()` for large result sets
- Use `.select()` to exclude unnecessary fields
- Sort by indexed fields only

### Aggregation Pipeline Example
```javascript
// Get posts by category with author info
db.posts.aggregate([
  { $match: { category: 'Math' } },
  { $lookup: { from: 'users', localField: 'authorId', foreignField: 'id', as: 'author' } },
  { $unwind: '$author' },
  { $sort: { createdAt: -1 } },
  { $limit: 50 }
])
```

---

## 🔄 Data Retention Policy

### Recommended
- **Active User Data**: Keep indefinitely
- **Posts**: Keep indefinitely (allow user deletion)
- **Messages**: Keep 1 year, then archive
- **Notifications**: Keep 30 days
- **Classrooms**: Archive after endedAt + 7 days
- **Old Room Messages**: Keep last 100 per room only

### Cleanup Script Example
```javascript
// Delete old notifications
db.notifications.deleteMany({
  createdAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
})

// Archive old classrooms
db.classrooms.updateMany(
  { endedAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
  { $set: { archived: true } }
)
```

---

## 🔐 Backup Recommendations

- Daily automated backups via MongoDB Atlas
- Point-in-time recovery enabled
- Regular backup restoration tests
- Separate backup cluster for disaster recovery

