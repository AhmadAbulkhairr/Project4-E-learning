const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const Chat = require('./models/Chat');
const { saveMessage } = require('./controllers/Chat');

const setupSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return next(new Error('Authentication error'));
        socket.user = user;
        next();
      });
    } else {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected', socket.user);

    socket.on('joinRoom', ({ room, user }) => {
      socket.join(room);
      io.to(room).emit('userJoined', { user, message: `${user} has joined the room.` });
    });

    socket.on('sendMessage', async ({ room, sender, message }) => {
      const chatMessage = await saveMessage(room, sender, message);
      io.to(room).emit('receiveMessage', { sender, message, timestamp: chatMessage.timestamp });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

module.exports = setupSocket;
