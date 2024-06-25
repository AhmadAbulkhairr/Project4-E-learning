import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { Description } from '@mui/icons-material';

const AddCourse = () => {
  const [course, setCourse] = useState({
    name: '',
    price: '',
    description:""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/courses/course', course, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        setCourse({
          name: '',
          price: '',
          description:""
        });
        setError('');
        alert('Course added successfully!');
      } else {
        setError('Failed to add course');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      setError('Failed to add course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add New Course
        </Typography>
        <form onSubmit={handleAddCourse}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={course.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="description"
                name="description"
                value={course.description}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                name="price"
                value={course.price}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Add Course'}
              </Button>
            </Grid>
          </Grid>
        </form>
        {error && (
          <Typography variant="body2" color="error" style={{ marginTop: '1rem' }}>
            {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default AddCourse;
