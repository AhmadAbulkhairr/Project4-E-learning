import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Box } from '@mui/material';
import axios from 'axios';


const AddCourse = () => {

    const [course, setCourse] = useState({
        name: '',
        price: '',
      });

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMaterial((prevMaterial) => ({
          ...prevMaterial,
          [name]: value,
        }));
      };
  return (

    <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Add New course
      </Typography>
      <form onSubmit={handleAddCourse} >
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
          <Grid container spacing={3}>
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
            <Button type="submit" variant="contained" color="primary">
              Add Course 
            </Button>
          </Grid>
        </Grid>
        </Grid>

      </form>
    </CardContent>
  </Card>  
   )
}

export default AddCourse