const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

// Real-time communication
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"]
  }
});

const rooms = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  // Join a room
  socket.on('joinRoom', ({ roomId, userName }) => {
    socket.join(roomId);
    rooms[roomId] = rooms[roomId] || [];
    rooms[roomId].push({ id: socket.id, name: userName });
    io.to(roomId).emit('userJoined', { id: socket.id, name: userName });
    console.log(`${userName} joined room: ${roomId}`);
  });

  // Handle sending messages
  socket.on('sendMessage', ({ roomId, message }) => {
    io.to(roomId).emit('receiveMessage', { message, sender: socket.id });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    for (let roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter(user => user.id !== socket.id);
      io.to(roomId).emit('userLeft', { id: socket.id });
    }
    console.log('User disconnected');
  });
});

// Users Router
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
const email = require('./routes/email')
app.use('/contact', email);
const teacherRouter = require("./routes/teachers");
app.use("/teachers", teacherRouter);
const gradeRouter = require('./routes/grades');
app.use('/grades', gradeRouter);
const subjectRouter = require('./routes/subjects');
app.use('/subjects', subjectRouter);
const materialRouter = require('./routes/materials');
app.use("/materials", materialRouter);
const courseRouter = require('./routes/courses');
app.use('/courses', courseRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
