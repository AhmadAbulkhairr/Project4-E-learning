import React, { useContext,useState } from 'react'
import { Container, TextField, Button, Typography, Grid, Box, Card, CardContent, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { AdminContext } from '../pages/AdminDashboard';

const DeleteGrade = () => {
    const {grades,setMessage} = useContext(AdminContext)
const [deletedGrade, setDeletedGrade] = useState("")
   const  handleDeleteGrade = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:5000/grades/deleteGrade/${deletedGrade}`,
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
  return ( <Box mt={4}>
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
Delete Grade
        </Typography>
        <form onSubmit={handleDeleteGrade}>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="grades-label"> Grade</InputLabel>
                <Select
                  labelId="grades-label"
                  name="grade"
                  onChange={(e)=>{
                    setDeletedGrade(e.target.value)
                  }} 
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
                Delete Grade
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  </Box>
  )
}

export default DeleteGrade