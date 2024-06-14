import React, { useContext } from 'react'

import { Container, TextField, Button, Typography, Grid, Box, Card, CardContent, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { AdminContext } from '../../pages/AdminDashboard';
const DeleteSubject = () => {
    const {deletedSubject,
        setDeletedSubject,
        handleDeleteSubjectGrade,
        handleDeleteSubject,subjects,grades} = useContext(AdminContext)
  return (

    <Box mt={4}>
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
Delete subject
        </Typography>
        <form onSubmit={handleDeleteSubject}>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="grades-label"> Grade</InputLabel>
                <Select
                  labelId="grades-label"
                  name="grade"
                  onChange={handleDeleteSubjectGrade} 
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
                  value={deletedSubject}
                  onChange={(e)=> {setDeletedSubject(e.target.value)
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
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Delete Subject
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  </Box>  )
}

export default DeleteSubject