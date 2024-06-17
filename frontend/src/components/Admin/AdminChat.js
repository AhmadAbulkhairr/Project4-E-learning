import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const AdminChat = () => {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('Admin');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit('joinRoom', { roomId, userName });
  };

  useEffect(() => {
    socket.on('receiveMessage', ({ message, sender }) => {
      setMessages((prevMessages) => [...prevMessages, { message, sender }]);
    });

    socket.on('userJoined', ({ id, name }) => {
      setMessages((prevMessages) => [...prevMessages, { message: `${name} joined the chat`, sender: 'system' }]);
    });

    socket.on('userLeft', ({ id }) => {
      setMessages((prevMessages) => [...prevMessages, { message: `A user left the chat`, sender: 'system' }]);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('userJoined');
      socket.off('userLeft');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', { roomId, message });
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Admin Chat</h2>
      <form onSubmit={joinRoom}>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter room ID"
        />
        <button type="submit">Join Room</button>
      </form>
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg.sender === 'system' ? <em>{msg.message}</em> : msg.message}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default AdminChat;
