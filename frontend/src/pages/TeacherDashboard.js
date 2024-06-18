import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Box } from '@mui/material';
import axios from 'axios';
import AddMaterial from '../components/Teacher/AddMaterial';
import AddCourse from '../components/Teacher/AddCourse';

const TeacherDashboard = () => {

  const [message, setMessage] = useState('');

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
        TeacherDashboard
                </Typography>
        {message && <Typography color="error">{message}</Typography>}
< AddMaterial message = {message} setMessage = {setMessage} />
< AddCourse/>
      </Box>
    </Container>
  );
};

export default TeacherDashboard;
