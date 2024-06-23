const Chat = require('../models/Chat');

const handleSocketConnection = (socket, io) => {
  console.log('A user connected');

  socket.on('joinRoom', ({ room, user }) => {
    socket.join(room);
    io.to(room).emit('userJoined', { user, message: `${user} has joined the room.` });
  });

  socket.on('sendMessage', async ({ room, sender, message }) => {
    const chatMessage = new Chat({ room, sender, message });
    await chatMessage.save();
    io.to(room).emit('receiveMessage', { sender, message, timestamp: chatMessage.timestamp });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
};

module.exports = { handleSocketConnection };
