import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../App';
import axios from 'axios';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Grid
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const socket = io('http://localhost:5000');

const Chat = () => {
  const { user, role } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('general'); 

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chat/history/${room}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();

    socket.emit('joinRoom', { room, user, role });

    socket.on('receiveMessage', ({ message, sender, role }) => {
      setMessages(prevMessages => [...prevMessages, { message, sender, role }]);
    });

    socket.on('userJoined', ({ user, message, role }) => {
      setMessages(prevMessages => [...prevMessages, { message, sender: 'system', role }]);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('userJoined');
    };
  }, [room, user, role]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', { room, sender: user, message, role });
      setMessage('');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h4" gutterBottom>Live Chat</Typography>
        <Box sx={{ height: '400px', overflowY: 'scroll', padding: 2, marginBottom: 2 }}>
          <List>
            {messages.map((msg, index) => (
              <ListItem 
                key={index} 
                alignItems="flex-start"
                sx={{ textAlign: msg.sender === user ? 'right' : 'left' }} 
              >
                <ListItemAvatar>
                  <Avatar>{msg.sender.charAt(0).toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={msg.sender === 'system' ? <em>{msg.message}</em> : `${msg.sender} (${msg.role})`}
                  secondary={msg.sender !== 'system' && msg.message}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Grid container spacing={2} alignItems="center" component="form" onSubmit={sendMessage}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
            />
          </Grid>
          <Grid item xs={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth endIcon={<SendIcon />}>
              Send
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Chat;
