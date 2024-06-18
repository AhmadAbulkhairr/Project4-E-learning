import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import CheckoutForm from '../components/CheckoutForm'; // Import your CheckoutForm component

const MyCourses = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/courses/coursesUser/`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    )
      .then((response) => {
        setMyCourses(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch My Courses:', error);
        setLoading(false);
      });
  }, []);

  const removeFromMyCourses = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/courses/removeCourse/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
      );
      setMyCourses(myCourses.filter(course => course._id !== courseId)); // Update state after deletion
    } catch (error) {
      console.error('Failed to remove course from My Courses:', error);
    }
  };

  return (
    <div>
      <h2>My Courses</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </div>
          ) : (
            <Grid container spacing={2}>
              {myCourses.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{course.name}</Typography>
                      <Typography>Price: {course.price}</Typography>
                      <Typography>Teacher: {course.teacher.user.name}</Typography>
                      <Typography>Grade: {course.teacher.grade.name}</Typography>
                      <Typography>Subject: {course.teacher.subject.name}</Typography>
                    </CardContent>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => removeFromMyCourses(course._id)}
                    >
                      Remove from My Courses
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Checkout</Typography>
              <CheckoutForm courses={myCourses} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyCourses;
