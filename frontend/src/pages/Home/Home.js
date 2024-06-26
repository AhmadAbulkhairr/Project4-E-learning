// src/pages/Home/Home.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Button, Typography, Container, Box, Grid, Card, CardContent, Paper, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import learnoImage from '../../assets/images/element5-digital-OyCl7Y4y0Bk-unsplash.jpg';
import learnoImage2 from '../../assets/images/priscilla-du-preez-XkKCui44iM0-unsplash.jpg';
import omar from '../../assets/images/omar.jpg'
import islam from '../../assets/images/islam.jpg'
import yousef from '../../assets/images/yousef.jpg'
import chat from '../../assets/images/chat.jpg'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './Home.css'; 
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MapComponent from "../../components/MapComponent"
import { Description } from '@mui/icons-material';
const Home = () => {
  const faqs = [
    { question: "What is Learno?", answer: "Learno is an e-learning platform that offers various courses for students." },
    { question: "How do I sign up?", answer: "Click on the 'Sign Up' button and fill in the required details." },
    { question: "How do I access my courses?", answer: "Once logged in, navigate to 'My Courses' to view your enrolled courses." },
  ];

  const reviews = [
    { name: "ahmad kheir", review: "Learno has transformed the way I learn. The courses are comprehensive and easy to follow." },
    { name: "Roaa wael", review: "I love the interactive content and the support from the instructors." },
    { name: "khalid", review: "A fantastic platform with a wide range of courses. Highly recommended!" },
  ];
  
  const teachers = [
    { name: "Omar", bio: "a teacher who deeply cares about his students with more than 6 years experience." ,img:omar},
    { name: "Islam", bio: " a professional who teaches students based on national curriculum guidelines within their specialist subject areas.",img:islam },
    { name: "Yousef", bio: "on of the Top 3 teachers in learno based on his students results",img:yousef },
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
            <Button variant="contained" color="primary" component={Link} to="/teachers">
              Teachers
            </Button>
          </Box>
        </div>
        <div>
          <img src={chat} alt="Learno" style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }} />
          <Box p={3} textAlign="center" style={{ background: 'rgba(0, 0, 0, 0.5)', color: 'white' }}>
            <Typography variant="h3" gutterBottom>Learno</Typography>
            <Typography variant="h6" gutterBottom>place to chat with your mates and teachers</Typography>
            <Button variant="contained" color="success" component={Link} to="/chat">
              Chat
            </Button>
          </Box>
        </div>
      </Carousel>

      <Box mt={5} style={{ backgroundColor: '#f5f5f5', padding: '40px 0' }}>
  <Container>
    <Typography variant="h4" gutterBottom align="center">Welcome to Learno</Typography>
    <Typography variant="body1" align="center" paragraph>
      Explore our wide range of courses and start learning today. Whether you're a student looking to enhance your skills or a teacher looking to share your knowledge, Learno has something for everyone.
    </Typography>
  </Container>
</Box>
<Grid container spacing={4} justifyContent="center" style={{ marginTop: '20px' }}>
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
        <Typography variant="h4" gutterBottom align="center">
          Teacher Spotlight
        </Typography>
        <Grid container spacing={4}>
          {teachers.map((teacher, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card elevation={3} component={Link} to= "/teachers" style={{ textDecoration: 'none' }} >
                <CardMedia
                  component="img"
                  height="400"
                  image={teacher.img}
                  alt={teacher.name}
                />
                <CardContent>
                  <Typography variant="h6" style={{ fontWeight: 600 }}>{teacher.name}</Typography>
                  <Typography variant="body1" color="textSecondary">{teacher.bio}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>



      <Box mt={5} mb={5}>
        <Typography variant="h4" gutterBottom align="center">
          Learno Office Location
        </Typography>
        <MapComponent />
      </Box>
      <Box mt={5} mb={5} textAlign="center">
        <Button variant="contained" color="primary" component={Link} to="/contact">
          Contact Us
        </Button>
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

      <Box mt={5}>
  <Typography variant="h4" gutterBottom>
    <QuestionAnswerIcon fontSize="large" style={{ marginRight: 10 }} /> Frequently Asked Questions
  </Typography>
  {faqs.map((faq, index) => (
    <Accordion key={index}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" style={{ fontWeight: 600 }}>{faq.question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1" color="textSecondary">{faq.answer}</Typography>
      </AccordionDetails>
    </Accordion>
  ))}
</Box>
     
    </Container>
  );
};

export default Home;
