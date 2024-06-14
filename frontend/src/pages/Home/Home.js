// src/pages/Home/Home.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Button, Typography, Container, Box, Grid, Card, CardContent, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import learnoImage from '../../assets/images/element5-digital-OyCl7Y4y0Bk-unsplash.jpg';
import learnoImage2 from '../../assets/images/priscilla-du-preez-XkKCui44iM0-unsplash.jpg';
import './Home.css'; 
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import RateReviewIcon from '@mui/icons-material/RateReview';

const Home = () => {
  const faqs = [
    { question: "What is Learno?", answer: "Learno is an e-learning platform that offers various courses for students." },
    { question: "How do I sign up?", answer: "Click on the 'Sign Up' button and fill in the required details." },
    { question: "How do I access my courses?", answer: "Once logged in, navigate to 'My Courses' to view your enrolled courses." },
  ];

  const reviews = [
    { name: "John Doe", review: "Learno has transformed the way I learn. The courses are comprehensive and easy to follow." },
    { name: "Jane Smith", review: "I love the interactive content and the support from the instructors." },
    { name: "Michael Lee", review: "A fantastic platform with a wide range of courses. Highly recommended!" },
  ];

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
            <Typography variant="h6" gutterBottom>Best teachers in town</Typography>
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

      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          <QuestionAnswerIcon fontSize="large" style={{ marginRight: 10 }} /> Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <Paper key={index} elevation={3} style={{ padding: 20, margin: '20px 0' }}>
            <Typography variant="h6" style={{ fontWeight: 600 }}>{faq.question}</Typography>
            <Typography variant="body1" color="textSecondary">{faq.answer}</Typography>
          </Paper>
        ))}
      </Box>

      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          <RateReviewIcon fontSize="large" style={{ marginRight: 10 }} /> Student Reviews
        </Typography>
        <Grid container spacing={4}>
          {reviews.map((review, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" style={{ fontWeight: 600 }}>{review.name}</Typography>
                  <Typography variant="body1" color="textSecondary">{review.review}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={5} mb={5} textAlign="center">
        <Button variant="contained" color="primary" component={Link} to="/contact">
          Contact Us
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
