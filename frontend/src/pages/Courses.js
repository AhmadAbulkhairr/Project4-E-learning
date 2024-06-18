import React, { useState, useContext,useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CardMedia, Button, CircularProgress } from '@mui/material';
import { UserContext } from '../App';


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const {token} = useContext(UserContext)

  useEffect(() => {
    axios.get('http://localhost:5000/courses/courses')
      .then((response) => {
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
      await axios.post(`http://localhost:5000/courses/addCourse/${courseId}`);
    } catch (error) {
      console.error('Failed to add course to My Courses:', error);
    }
  };

  return (
    <div>
      <h2>All Courses</h2>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={2}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={`http://localhost:5000/${course.teacher.user.image}`} // Adjust URL based on your backend
                  alt={course.teacher.user.name}
                />
                <CardContent>
                  <Typography variant="h6">{course.name}</Typography>
                  <Typography>Price: {course.price}</Typography>
                  <Typography>Teacher: {course.teacher.user.name}</Typography>
                  <Typography>Grade: {course.subject.grade.name}</Typography>
                  <Typography>Subject: {course.subject.name}</Typography>
                </CardContent>
                {token&&<Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToMyCourses(course._id)}
                >
                  Add to My Courses
                </Button>}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Courses;
