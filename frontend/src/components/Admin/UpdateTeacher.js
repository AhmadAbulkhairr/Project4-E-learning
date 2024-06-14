import React, { useState, useEffect, useContext } from 'react';
import { Container, TextField, Button, Typography, Grid, Box, Card, CardContent, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { AdminContext } from '../../pages/AdminDashboard';

const UpdateTeacher = () => {
  const [updatedTeacher, setUpdatedTeacher] = useState({
    age: '',
    grade: '',
    subject: '',
    image: null,
    phoneNumber: '',
  });

  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [subjectsForUpdating, setSubjectsForUpdating] = useState([]);
  const { setSubjects, setMessage, subjects, grades } = useContext(AdminContext);

  useEffect(() => {
    axios.get('http://localhost:5000/teachers/allTeachers')
      .then(response => {
        setTeachers(response.data.allTeachers);
      })
      .catch(error => {
        console.error('Error getting teachers:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value,
    }));
    if (name === 'grade') {
      axios.get(`http://localhost:5000/subjects/allSubjects/${value}`)
        .then(response => {
          setSubjectsForUpdating(response.data.subjects);
        })
        .catch(error => {
          console.error('Error getting subjects:', error);
        });
    }
  };

  const handleFileChange = (e) => {
    setUpdatedTeacher((prevTeacher) => ({
      ...prevTeacher,
      image: e.target.files[0],
    }));
  };

  const updateTeacher = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(updatedTeacher).forEach((key) => {
      formData.append(key, updatedTeacher[key]);
    });

    try {
      const response = await axios.put(
        `http://localhost:5000/teachers/Teacher/${selectedTeacherId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(response.data.teacher);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Server Error');
    }
  };

  return (
    <Container>
      <Box mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Update Teacher
            </Typography>
            <FormControl fullWidth required>
              <InputLabel id="teacher-label">Select Teacher</InputLabel>
              <Select
                labelId="teacher-label"
                name="selectedTeacher"
                value={selectedTeacherId}
                onChange={(e)=>{setSelectedTeacherId(e.target.value)}}
              >
                {teachers.map((teacher) => (
                  <MenuItem key={teacher._id} value={teacher._id}>
                    {teacher.user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedTeacherId && (
              <form onSubmit={updateTeacher} encType="multipart/form-data">
                <Grid container spacing={3} mt={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone Number"
                      name="phoneNumber"
                      required
                      value={updatedTeacher.phoneNumber}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Age"
                      name="age"
                      type="number"
                      required

                      value={updatedTeacher.age}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl required fullWidth >
                      <InputLabel id="grades-label">Grade</InputLabel>
                      <Select
                        labelId="grades-label"
                        name="grade"
                        value={updatedTeacher.grade}
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
                    <FormControl required fullWidth >
                      <InputLabel id="subjects-label">Subject</InputLabel>
                      <Select
                        labelId="subjects-label"
                        name="subject"
                        value={updatedTeacher.subject}
                        onChange={handleInputChange}
                        disabled={!updatedTeacher.grade}
                      >
                        {subjectsForUpdating.map((subject) => (
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
                      Update Teacher
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default UpdateTeacher;
