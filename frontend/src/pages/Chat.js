import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../App';
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
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('general'); // Default room

  useEffect(() => {
    console.log(socket);
    socket.emit('joinRoom', { room, user: user });
    console.log(socket);

    socket.on('receiveMessage', ({ message, sender }) => {
      setMessages(prevMessages => [...prevMessages, { message, sender }]);
    });
    console.log(socket);

    socket.on('userJoined', ({ user, message }) => {
      setMessages(prevMessages => [...prevMessages, { message, sender: 'system' }]);
    });
    console.log(socket);

    return () => {
      socket.off('receiveMessage');
      socket.off('userJoined');
    };
  }, [room, user]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', { room, sender: user, message });
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
              <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>{msg.sender.charAt(0).toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={msg.sender === 'system' ? <em>{msg.message}</em> : msg.sender}
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
