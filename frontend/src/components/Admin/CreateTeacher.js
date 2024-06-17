import React, { useContext } from 'react'
import { Container, TextField, Button, Typography, Grid, Box, Card, CardContent, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { AdminContext } from '../../pages/AdminDashboard';
const CreateTeacher = () => {

    const {teacher,grades,subjects,handleInputChange,
        handleFileChange,
        handleRegister} = useContext(AdminContext)

    
  return (

    <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Register a New Teacher
      </Typography>
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
              <InputLabel id="grades-label">Grade </InputLabel>
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
  )
}

export default CreateTeacher