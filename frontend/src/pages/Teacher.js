import React from 'react'
import { useParams } from 'react-router-dom';
import  { useEffect, useState } from 'react';
import { Container, Typography, Grid, Avatar, Card, CardContent, Box } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Teacher = () => {

    const {id} = useParams()

const [teachers, setTeachers] = useState([])
const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/teachers/allTeachers/${id}`).then((result)=>{
            setTeachers(result.data.allTeachers)
        })
      .catch((err) => {
        setMessage(err.response?.data?.message || 'Server Error');
      })
      }, [id])


      const transformImageUrl = (url) => {
        return url.replace('/upload/', '/upload/w_300,h_300,c_fill,q_auto,f_auto/');
      };
    


  return (
    <Container>
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Teachers
      </Typography>
      {message && <Typography color="error">{message}</Typography>}
      <Grid container spacing={4}>
        {teachers.map((teacher) => (
          <Grid item key={teacher._id} xs={12} sm={6} md={4}>
            <Card component={Link} to={`/teachers/${teacher._id}/materials`} style={{ textDecoration: 'none' }} >
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Avatar 
                    src={transformImageUrl(teacher.imageUrl) || '/path/to/default/avatar.png'} 
                    alt={teacher.user.name} 
                    style={{ marginRight: 10, width: 60, height: 60 }}
                  />
                  <Box>
                    <Typography variant="h6">{teacher.user.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{teacher.user.email}</Typography>
                  </Box>
                </Box>
                <Typography variant="body1" style={{ marginTop: 10 }}>
                  Subject: {teacher.subject.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Grade: {teacher.subject.grade.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Container>  )
}

export default Teacher