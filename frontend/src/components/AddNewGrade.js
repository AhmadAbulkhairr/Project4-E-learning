import React, { useContext } from 'react'
import { Container, TextField, Button, Typography, Grid, Box, Card, CardContent, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { AdminContext } from '../pages/AdminDashboard';
const AddNewGrade = () => {
    const {newGrade,setNewGrade,handleAddGrade} = useContext(AdminContext)
  return (
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
      </Box>  )
}

export default AddNewGrade