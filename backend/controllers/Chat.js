const Chat = require('../models/Chat');

const handleSocketConnection = (socket, io) => {
  console.log('A user connected');

  socket.on('joinRoom', ({ room, user ,role }) => {
    socket.join(room);
    io.to(room).emit('userJoined', { user,role, message: `${user} has joined the room.` });
  });

  socket.on('sendMessage', async ({ room, sender,role, message }) => {
    const chatMessage = new Chat({ room, sender, role , message });
    await chatMessage.save();
    io.to(room).emit('receiveMessage', { sender, role,message, timestamp: chatMessage.timestamp });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
};
const getAllHistory = async (req, res) => {
  try {
    const room = req.params.room;
    const messages = await Chat.find({ room }).sort({ timestamp: 1 }); 
    res.json(messages);
  } catch (error) {
    res.status(500).send('Server error');
  }
}
module.exports = { handleSocketConnection ,getAllHistory };
