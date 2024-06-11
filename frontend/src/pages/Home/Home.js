import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Button, Typography, Container, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import learnoImage from '../../assets/images/element5-digital-OyCl7Y4y0Bk-unsplash.jpg';
import learnoImage1 from '../../assets/images/kenny-eliason-zFSo6bnZJTw-unsplash.jpg';
import learnoImage2 from '../../assets/images/priscilla-du-preez-XkKCui44iM0-unsplash.jpg';
import './Home.css'; 


const Home = () => {
  return (
    <Container>

      <Carousel showThumbs={false} autoPlay infiniteLoop>
        <div>
          <img src={learnoImage} alt="Learno" style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }} />
          <Box p={3} textAlign="center" style={{ background: 'rgba(0, 0, 0, 0.5)', color: 'white' }}>
            <Typography variant="h3" gutterBottom>Learno</Typography>
            <Typography variant="h6" gutterBottom>Start your journey with us</Typography>
            <Button variant="contained" color="secondary" component={Link} to="/login">
              Login
            </Button>
          </Box>
        </div>
        <div>
          <img src={learnoImage2} alt="Learno" style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }} />
          <Box p={3} textAlign="center" style={{ background: 'rgba(0, 0, 0, 0.5)', color: 'white' }}>
            <Typography variant="h3" gutterBottom>Learno</Typography>
            <Typography variant="h6" gutterBottom>best teachers in town</Typography>
            <Button variant="contained" color="secondary" component={Link} to="/teachers">
              Teachers
            </Button>
          </Box>
        </div>
      </Carousel>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom align="center">Welcome to Learno</Typography>
        <Typography variant="body1" align="center" paragraph>
          Explore our wide range of courses and start learning today. Whether you're a student looking to enhance your skills or a teacher looking to share your knowledge, Learno has something for everyone.
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Button variant="contained" color="primary" component={Link} to="/all-courses">
            View Courses
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" component={Link} to="/signup">
            Get Started
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
