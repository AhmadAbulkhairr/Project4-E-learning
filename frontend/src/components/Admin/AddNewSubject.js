import React, { useContext } from 'react'
import { Container, TextField, Button, Typography, Grid, Box, Card, CardContent, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

import { AdminContext } from '../../pages/AdminDashboard';

const AddNewSubject = () => {
    const {handleNewSubjectChange,handleAddSubject,newSubject,grades}=useContext(AdminContext)
  return (
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
  </Box>  )
}

export default AddNewSubject