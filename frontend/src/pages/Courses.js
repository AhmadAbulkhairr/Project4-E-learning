import React, { useState, useContext,useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CardMedia, Button, CircularProgress, Container } from '@mui/material';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const {token} = useContext(UserContext)

  useEffect(() => {
    axios.get('http://localhost:5000/courses/courses')
      .then((response) => {
        console.log(response.data.result);
        setCourses(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch courses:', error);
        setLoading(false);
      });
  }, []);

  const addToMyCourses = async (courseId) => {
    try {
      await axios.get(`http://localhost:5000/courses/addCourse/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
      );
    } catch (error) {
      console.error('Failed to add course to My Courses:', error);
    }
  };
  const transformImageUrl = (url) => {
    return url.replace('/upload/', '/upload/w_300,h_300,c_fill,q_auto,f_auto/');
  };

  return (
    <Container>

      <h2 style={{ textAlign:"center"}}>All Courses</h2>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container  spacing={2}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Card component={Link} to={`/all-courses/${course._id}`} style={{ textDecoration: 'none' }}  >
                <CardMedia
                  component="img"
                  height="300"
                  image={transformImageUrl(course.teacher.imageUrl)}

                  alt={course.teacher.user.name}
                />
                <CardContent>
                  <Typography variant="h6">{course.name}</Typography>
                  <Typography variant="body1" color="textSecondary">{course.description}</Typography>
                  <Typography>Price: ${course.price}</Typography>
                  <Typography>Teacher: {course.teacher.user.name}</Typography>
                  <Typography>Grade: {course.teacher.grade.name}</Typography>
                  <Typography>Subject: {course.teacher.subject.name}</Typography>
                </CardContent>
               
              </Card>
              {token&&<Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToMyCourses(course._id)}
                >
                  Add to My Courses
                </Button>}
            </Grid>
          ))}
        </Grid>
      )}
      </Container>
  );
};

export default Courses;
