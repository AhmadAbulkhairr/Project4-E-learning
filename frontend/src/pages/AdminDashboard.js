import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, Box, Card, CardContent, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [teacher, setTeacher] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    age: '',
    grade: '',
    subject: '',
    image: null,
  });

  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [message, setMessage] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [newSubject, setNewSubject] = useState({ name: '', grade: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/Grades/allGrades')
      .then(response => {
        setGrades(response.data.grades);
      })
      .catch(error => {
        console.error('Error getting grades:', error);
      });
  }, []);

  const handleAddGrade = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/grades/addGrade',
        { name: newGrade },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage(response.data.message);
      setGrades([...grades, response.data.grade]);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Server Error');
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/subjects/addSubject',
        newSubject,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage(response.data.message);
      setSubjects([...subjects, response.data.subject]);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Server Error');
    }
  };

  const handleNewSubjectChange = (e) => {
    const { name, value } = e.target;
    setNewSubject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value,
    }));
    if (name === 'grade') {
      axios.get(`http://localhost:5000/subjects/allSubjects/${value}`)
        .then(response => {
          setSubjects(response.data.subjects);
        })
        .catch(error => {
          console.error('Error getting subjects:', error);
          setSubjects([]);
        });
    }
  };

  const handleFileChange = (e) => {
    setTeacher((prevTeacher) => ({
      ...prevTeacher,
      image: e.target.files[0],
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(teacher).forEach((key) => {
      formData.append(key, teacher[key]);
    });

    try {
      const response = await axios.post(
        'http://localhost:5000/teacher/register',
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
          Admin Dashboard
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Register a New Teacher
            </Typography>
            {message && <Typography color="error">{message}</Typography>}
            <form onSubmit={handleRegister} encType="multipart/form-data">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    name="name"
                    value={teacher.name}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={teacher.email}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={teacher.password}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={teacher.phoneNumber}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Age"
                    name="age"
                    type="number"
                    value={teacher.age}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel id="grades-label">Grade</InputLabel>
                    <Select
                      labelId="grades-label"
                      name="grade"
                      value={teacher.grade}
                      onChange={handleInputChange}
                    >
                      {grades.map((grade) => (
                        <MenuItem key={grade._id} value={grade._id}>
                          {grade.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel id="subjects-label">Subject</InputLabel>
                    <Select
                      labelId="subjects-label"
                      name="subject"
                      value={teacher.subject}
                      onChange={handleInputChange}
                      disabled={!teacher.grade} 
                    >
                      {subjects.map((subject) => (
                        <MenuItem key={subject._id} value={subject._id}>
                          {subject.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <input
                    accept="image/*"
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      Upload Image
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Register Teacher
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
      
      <Box mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add a New Grade
            </Typography>
            <form onSubmit={handleAddGrade}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Grade Name"
                    name="name"
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Add Grade
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>

      <Box mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add a New Subject
            </Typography>
            <form onSubmit={handleAddSubject}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Subject Name"
                    name="name"
                    value={newSubject.name}
                    onChange={handleNewSubjectChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel id="subject-grade-label">Grade</InputLabel>
                    <Select
                      labelId="subject-grade-label"
                      name="grade"
                      value={newSubject.grade}
                      onChange={handleNewSubjectChange}
                    >
                      {grades.map((grade) => (
                        <MenuItem key={grade._id} value={grade._id}>
                          {grade.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Add Subject
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

export default AdminDashboard;
