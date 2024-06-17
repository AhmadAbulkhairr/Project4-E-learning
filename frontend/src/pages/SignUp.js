import React, { useState, useContext,useEffect } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

function SignUp() {

  
const [user, setUser] = useState({
  name: "",
  password: "",
  email: "",
  phoneNumber:""
})
const [message, setMessage] = useState("")

useEffect(() => {
  setMessage ("")
}, [])


const handleRegistered = (e) => {
    
  e.preventDefault();

  axios.post('http://localhost:5000/users/register', user).then((result)=>{
    console.log(result.data.message);
    setMessage(result.data.message)
  }).catch((error)=>{
    console.log(error.response);
    setMessage(error.response.data.message)
  })}

  
  return(
    <Container>
      <Typography variant="h4">Register</Typography>
      {message && <Typography color="error">{message}</Typography>}
      <form onSubmit={handleRegistered}>
        <TextField
          label="Name"
          value={user.name}
          onChange={(e)=> {
            setUser (prev => ({...prev,...{name: e.target.value}}) )}} 
          fullWidth
          margin="normal"
          required

        />
        <TextField
          label="Email"
          value={user.email}
          onChange={(e)=> {
            setUser (prev => ({...prev,...{email: e.target.value}}) )}}
          fullWidth
          margin="normal"
          required

        />
          <TextField
          label="phoneNumber"
          value={user.phoneNumber}
          onChange={(e)=> {
            setUser (prev => ({...prev,...{phoneNumber: e.target.value}}) )}}
          fullWidth
          margin="normal"
          required

        />
        <TextField
          label="Password"
          type="password"
          value={user.password}
          onChange={(e)=> {
            setUser (prev => ({...prev,...{password: e.target.value}}) )}}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </Container>
  );
}

export default SignUp