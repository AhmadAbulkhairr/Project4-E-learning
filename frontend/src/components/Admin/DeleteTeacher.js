import React from 'react'
import { Container, TextField, Button, Typography, Grid, Box, Card, CardContent, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { useState,useContext } from 'react';
import { AdminContext } from '../../pages/AdminDashboard';
const DeleteTeacher = () => {

const [teachers, setTeachers] = useState([])
const [deletedTeacher, setDeletedTeacher] = useState("")
    const {setSubjects,setMessage,
        subjects,grades} = useContext(AdminContext)
    
const handleDeleteTeacherGrade =  (e) => {
    axios.get(`${process.env.REACT_APP_API_URL}/subjects/allSubjects/${e.target.value}`)
          .then(response => {
            console.log(response.data.subjects);
            setSubjects(response.data.subjects);
            console.log(subjects);
          })
          .catch(error => {
console.log(error);          });
  }

          
const handleDeleteTeacherSubject =  (e) => {
    axios.get(`${process.env.REACT_APP_API_URL}/teachers/allTeachers/${e.target.value}`)
          .then(response => {
            setTeachers(response.data.allTeachers);
          })
          .catch(error => {
            setTeachers([]);
          });
  }
    
    const handleDeleteTeacher = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/teachers/Teacher/${deletedTeacher}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Server Error');
      }
    }


  return (

    <Box mt={4}>
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
Delete Teacher
        </Typography>
        <form onSubmit={handleDeleteTeacher}>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="grades-label"> Grade</InputLabel>
                <Select
                  labelId="grades-label"
                  name="grade"
                  onChange={handleDeleteTeacherGrade} 
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
                <InputLabel id="subject-grade-label">Subject</InputLabel>
                <Select
                  labelId="subject-grade-label"
                  name="subject"
                  onChange={(e)=> {handleDeleteTeacherSubject(e)
                  }}
                 
                >
                  {subjects.map((subject) => (
                    <MenuItem key={subject._id} value={subject._id}>
                      {subject.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="teacher-subject-label">Teacher</InputLabel>
                <Select
                  labelId="teacher-subject-label"
                  name="teacher"
                  onChange={(e)=> {setDeletedTeacher(e.target.value)
                  }}
                 
                >
                  {teachers.map((teacher) => (
                    <MenuItem key={teacher._id} value={teacher._id}>
                      {teacher.user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Delete Teacher
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  </Box>  )
}

export default DeleteTeacher