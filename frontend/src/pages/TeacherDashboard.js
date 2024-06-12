import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Box } from '@mui/material';
import axios from 'axios';

const TeacherDashboard = () => {
  const [material, setMaterial] = useState({
    name: '',
    contentType: '',
    file: null,
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaterial((prevMaterial) => ({
      ...prevMaterial,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setMaterial((prevMaterial) => ({
      ...prevMaterial,
      file: e.target.files[0],
    }));
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(material).forEach((key) => {
      formData.append(key, material[key]);
    });

    try {
      const response = await axios.post(
        'http://localhost:5000/materials/addMaterial',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Server Error');
    }
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
        TeacherDashboard
                </Typography>
        {message && <Typography color="error">{message}</Typography>}

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add New Material
            </Typography>
            <form onSubmit={handleAddMaterial} encType="multipart/form-data">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    name="name"
                    value={material.name}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
              
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel id="contentType-label">Content Type</InputLabel>
                    <Select
                      labelId="contentType-label"
                      name="contentType"
                      value={material.contentType}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="video">Video</MenuItem>
                      <MenuItem value="document">Document</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <input
  accept="video/*,application/pdf"
    type="file"
                    name="file"
                    onChange={handleFileChange}
                    id="file-upload"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file-upload">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      Upload File
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Add Material
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default TeacherDashboard;
