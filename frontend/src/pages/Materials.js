import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Paper,Typography, Grid, Card, CardContent, Box } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
const Materials = () => {

    
    const {id} = useParams()

const [materials, setMaterials] = useState([])
const [message, setMessage] = useState('');



    
useEffect(() => {
    axios.get(`http://localhost:5000/materials/allMaterials/${id}`).then((result)=>{
        setMaterials(result.data.allMaterials)
    })
  .catch((err) => {
    setMessage(err.response?.data?.message || 'Server Error');
  })
  }, [id])

  return (
< Container>
{ message && <Typography color= "error" >{message}</Typography>}
<Grid container spacing={2}>

    {materials.map((material)=>(
    <Grid item> 
        
        
        
        </Grid>
    ))}

</Grid>
</Container>

    )
}

export default Materials