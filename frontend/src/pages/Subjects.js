import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Paper,Typography, Grid, Card, CardContent, Box } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import { Link } from 'react-router-dom';

const Subjects = () => {
    const {id} = useParams()
    const [subjects, setSubjects] = useState([]);
    const [error, setError] = useState('');



    
    useEffect(() => {
        axios.get(`http://localhost:5000/subjects/allSubjects/${id}`).then((result)=>{
            console.log(result.data.sub);
            setSubjects(result.data.subjects)
        })
      .catch((err) => {
        setError(err.response?.data?.message || 'Server Error');
      })
      }, [id])
  return(
    <Container>
      <Typography variant="h4" gutterBottom>
        Subjects
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={4}>
        {subjects.map((subject) => (
          <Grid item key={subject._id} xs={12} sm={6} md={4}>
                    <Paper elevation={3} style={{ padding: 20 }}>
            <Card  component={Link} to={`/subjects/${subject._id}/teachers`} style={{ textDecoration: 'none' }} >
              <CardContent>
                <Box display="flex" alignItems="center">
                  <BookIcon style={{ fontSize: 40, marginRight: 10 }} />
                  <Typography variant="h5">
                    {subject.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {subject.grade.name}
                </Typography>
              </CardContent>
            </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Subjects