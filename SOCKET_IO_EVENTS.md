# 🔌 Socket.io Events Documentation

## Connection

### User Join (Establish Connection)
```javascript
// Client sends
socket.emit('user_join', { 
  id: 'user123abc' 
})

// Server responds
socket.on('online_count', (count) => {
  console.log(`${count} users online`)
})
```

---

## 💬 Direct Messages

### Send Direct Message
```javascript
// Client sends
socket.emit('direct_message', {
  receiverId: 'user456xyz',
  text: 'Hey! How are you doing?'
})

// Server responds (sender receives)
socket.on('new_direct_message', (message) => {
  console.log(message)
  // {
  //   id: 'msg123',
  //   senderId: 'user123abc',
  //   receiverId: 'user456xyz',
  //   text: 'Hey! How are you doing?',
  //   createdAt: '2026-04-26T15:30:00Z'
  // }
})

// Receiver also receives (if online)
socket.on('new_direct_message', (message) => {
  // Same message object
})
```

### Edit Direct Message
```javascript
// Client sends
socket.emit('edit_direct_message', {
  messageId: 'msg123',
  newText: 'Hey! How are you doing today?'
})

// Both sender and receiver get
socket.on('message_edited', (updatedMessage) => {
  console.log(updatedMessage)
  // {
  //   id: 'msg123',
  //   senderId: 'user123abc',
  //   receiverId: 'user456xyz',
  //   text: 'Hey! How are you doing today?',
  //   createdAt: '2026-04-26T15:30:00Z'
  // }
})
```

### New DM Notification
```javascript
// Receiver gets notified (if online)
socket.on('new_notification', {
  id: 'notif123',
  type: 'message',
  senderId: 'user123abc',
  senderUsername: 'john_doe',
  senderAvatar: 'JD',
  createdAt: '2026-04-26T15:30:00Z'
})
```

---

## 🏛️ Campus Rooms (Themed Chat)

### Join Room
```javascript
// Client joins room
socket.emit('campus_room_join', 'calculus101')

// Server sends room history
socket.on('campus_room_history', (messages) => {
  console.log(messages)
  // [
  //   {
  //     id: 'msg1',
  //     senderId: 'user123',
  //     senderName: 'john_doe',
  //     senderAvatar: 'JD',
  //     text: 'Anyone need help with derivatives?',
  //     createdAt: '2026-04-26T14:00:00Z'
  //   },
  //   ...
  // ]
})

// Everyone in room notified
socket.on('room_member_joined', { userId: 'user123abc' })
```

### Send Room Message
```javascript
// Client sends message
socket.emit('campus_room_message', {
  roomId: 'calculus101',
  text: 'Anyone need help with derivatives?'
})

// All in room receive
socket.on('new_campus_message', ({
  roomId: 'calculus101',
  msg: {
    id: 'msg456',
    senderId: 'user123abc',
    senderName: 'john_doe', // 'Anonymous' if isAnonymous=true
    senderAvatar: 'JD', // '?' if isAnonymous=true
    text: 'Anyone need help with derivatives?',
    createdAt: '2026-04-26T15:45:00Z'
  }
}))
```

### Leave Room
```javascript
// Client leaves
socket.emit('campus_room_leave', 'calculus101')

// Everyone in room notified
socket.on('room_member_left', { userId: 'user123abc' })
```

### Room Examples

**Default Rooms:**
- `calculus101` - Calculus 101 (Math)
- `chemlab` - Chemistry Lab (Chemistry)
- `codingbootcamp` - Coding Bootcamp (Coding)
- `confessions` - Confessions (Anonymous, General)

---

## 🎓 Classrooms (Google Meet-Style Video)

### Create Classroom
```javascript
// Client creates (via API - emits via Socket)
// POST /api/classrooms
// {
//   name: 'Advanced Calculus',
//   subject: 'Math',
//   description: 'Lecture on integrals'
// }

// All users notified
socket.on('classroom_created', {
  id: 'class123xyz',
  name: 'Advanced Calculus',
  subject: 'Math',
  mentorId: 'user123abc',
  mentorName: 'john_doe',
  isLive: true,
  participants: ['user123abc'],
  participantCount: 1,
  createdAt: '2026-04-26T10:00:00Z',
  startedAt: '2026-04-26T10:00:00Z'
})
```

### WebRTC Offer
```javascript
// User A initiates video call
socket.emit('webrtc_offer', {
  classroomId: 'class123xyz',
  offer: {
    type: 'offer',
    sdp: 'v=0\no=...'
  },
  to: 'user456xyz'
})

// User B receives
socket.on('webrtc_offer', {
  offer: { type: 'offer', sdp: '...' },
  from: 'user123abc'
})
```

### WebRTC Answer
```javascript
// User B responds
socket.emit('webrtc_answer', {
  classroomId: 'class123xyz',
  answer: {
    type: 'answer',
    sdp: 'v=0\no=...'
  },
  to: 'user123abc'
})

// User A receives
socket.on('webrtc_answer', {
  answer: { type: 'answer', sdp: '...' },
  from: 'user456xyz'
})
```

### WebRTC ICE Candidate
```javascript
// User A sends ICE candidate
socket.emit('webrtc_ice_candidate', {
  classroomId: 'class123xyz',
  candidate: {
    candidate: 'candidate:...',
    sdpMLineIndex: 0,
    sdpMid: '0'
  },
  to: 'user456xyz'
})

// User B receives
socket.on('webrtc_ice_candidate', {
  candidate: { ... },
  from: 'user123abc'
})
```

### Participant Joined
```javascript
// When someone joins the classroom
socket.on('classroom_participant_joined', {
  classroomId: 'class123xyz',
  userId: 'user456xyz',
  participantCount: 5
})
```

### Participant Left
```javascript
// When someone leaves classroom
socket.on('classroom_participant_left', {
  classroomId: 'class123xyz',
  userId: 'user456xyz',
  participantCount: 4
})
```

### Classroom Message
```javascript
// Send message in classroom chat
socket.emit('classroom_message', {
  classroomId: 'class123xyz',
  text: 'Can everyone see my screen?'
})

// All in classroom receive
socket.on('classroom_message', {
  classroomId: 'class123xyz',
  senderId: 'user123abc',
  message: 'Can everyone see my screen?',
  timestamp: '2026-04-26T10:15:00Z'
})
```

### Screen Share Toggle
```javascript
// Client toggles screen share (via API - triggers Socket emit)
// POST /api/classrooms/:id/screen-share
// { isSharing: true }

// All in classroom notified
socket.on('screen_share_toggled', {
  classroomId: 'class123xyz',
  userId: 'user123abc',
  isSharing: true
})
```

### Classroom Ended
```javascript
// When last participant leaves
socket.on('classroom_ended', {
  classroomId: 'class123xyz'
})
```

---

## 📝 Posts & Social

### New Post Created
```javascript
// When user creates new post
socket.on('new_post', {
  id: 'post123',
  author: {
    id: 'user123abc',
    username: 'john_doe',
    avatar: 'JD'
  },
  caption: 'Just solved the hardest physics problem!',
  image: 'data:image/png;base64,...',
  category: 'Physics',
  postType: 'post',
  isPromptResponse: false,
  unlockDate: null,
  likes: 0,
  isLiked: false,
  comments: [],
  commentCount: 0,
  createdAt: '2026-04-26T11:00:00Z'
})
```

### Post Liked
```javascript
// When someone likes a post
socket.on('post_liked', {
  postId: 'post123',
  likes: 15,
  liked: true // true if current user just liked it
})
```

### New Comment
```javascript
// When someone comments on a post
socket.on('new_comment', {
  postId: 'post123',
  comment: {
    username: 'jane_smith',
    text: 'Wow! Great work! This helped me understand it',
    createdAt: '2026-04-26T11:15:00Z'
  },
  commentCount: 3
})
```

### Post Deleted
```javascript
// When post is deleted
socket.on('post_deleted', {
  postId: 'post123'
})
```

---

## 🔔 Notifications

### New Notification
```javascript
// User receives notification (for like, comment, or follow)
socket.on('new_notification', {
  id: 'notif123',
  userId: 'user123abc',
  type: 'like', // or 'comment', 'follow', 'message'
  senderId: 'user456xyz',
  senderUsername: 'jane_smith',
  senderAvatar: 'JS',
  postId: 'post123', // null for follow/message
  read: false,
  createdAt: '2026-04-26T11:20:00Z'
})
```

---

## 👥 Online Presence

### Online User Count
```javascript
// Updated whenever user joins/leaves
socket.on('online_count', (count) => {
  console.log(`${count} students online`)
})
```

---

## 🏢 Classroom Management Events

### Classroom Created
```javascript
socket.on('classroom_created', {
  id: 'class123',
  name: 'Advanced Calculus',
  subject: 'Math',
  mentorId: 'user123abc',
  mentorName: 'john_doe',
  isLive: true,
  participants: ['user123abc'],
  createdAt: '2026-04-26T10:00:00Z'
})
```

### Campus Room Created
```javascript
socket.on('campus_room_created', {
  id: 'room123',
  name: 'Quantum Physics Discussion',
  subject: 'Physics',
  isAnonymous: false,
  memberCount: 0,
  createdAt: '2026-04-26T12:00:00Z'
})
```

---

## 📋 Complete Socket.io Flow Example

**Scenario: Two users in a classroom with WebRTC video**

```javascript
// 1. User A connects
socket.emit('user_join', { id: 'user123abc' })
socket.on('online_count', (count) => { /* 1 */ })

// 2. User A creates classroom
POST /api/classrooms { name, subject }
socket.on('classroom_created', classroomData)

// 3. User B connects
socket.emit('user_join', { id: 'user456xyz' })
socket.on('online_count', (count) => { /* 2 */ })

// 4. User B joins classroom
POST /api/classrooms/class123xyz/join
socket.on('classroom_participant_joined', {
  classroomId: 'class123xyz',
  userId: 'user456xyz',
  participantCount: 2
})

// 5. WebRTC handshake (User A initiates)
socket.emit('webrtc_offer', { classroomId, offer, to: 'user456xyz' })
socket.on('webrtc_offer', { offer, from: 'user123abc' })

socket.emit('webrtc_answer', { classroomId, answer, to: 'user123abc' })
socket.on('webrtc_answer', { answer, from: 'user456xyz' })

// 6. ICE candidates exchange
socket.emit('webrtc_ice_candidate', { ... })
socket.on('webrtc_ice_candidate', { ... })

// 7. Chat in classroom
socket.emit('classroom_message', { classroomId, text: '...' })
socket.on('classroom_message', { classroomId, senderId, message, timestamp })

// 8. User B shares screen
POST /api/classrooms/class123xyz/screen-share { isSharing: true }
socket.on('screen_share_toggled', { classroomId, userId: 'user456xyz', isSharing: true })

// 9. User A leaves
POST /api/classrooms/class123xyz/leave
socket.on('classroom_participant_left', {
  classroomId: 'class123xyz',
  userId: 'user123abc',
  participantCount: 1
})

// 10. User B leaves
POST /api/classrooms/class123xyz/leave
socket.on('classroom_ended', { classroomId: 'class123xyz' })
```

---

## ⚙️ Implementation Tips

### Reconnection
```javascript
const socket = io('http://localhost:3000', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
})

socket.on('connect', () => {
  socket.emit('user_join', { id: userId })
})
```

### Error Handling
```javascript
socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error)
})

socket.on('disconnect', () => {
  console.log('Disconnected from server')
})
```

### Message Acknowledgment
```javascript
socket.emit('direct_message', { receiverId, text }, (response) => {
  if (response.success) {
    console.log('Message sent successfully')
  }
})
```

---

## 🔒 Security Notes

- Always validate the user ID on the server
- Don't send sensitive data via Socket.io
- Sanitize all user messages
- Verify classroom access before operations
- Check anonymous room requirements before sending sender info

---

## 📞 Debugging

### Enable Socket.io Debug Mode
```javascript
// Client
import io from 'socket.io-client'
const socket = io('http://localhost:3000', {
  extraHeaders: {
    'Authorization': 'Bearer ' + token
  }
})
localStorage.debug = '*'
```

### Server Logs
```javascript
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  // All events logged
})
```

