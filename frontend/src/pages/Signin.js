import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import GoogleLoginCom from '../components/GoogleLogin';

const SignIn = () => {
  const {setRole,setToken} = useContext(UserContext)

  const [login, setLogin] = useState({email:"",password:""})

  const [failedLogIn, setFailedLogIn] = useState("")
  const navigate = useNavigate();

  const handleLogIn = (e) => {

    e.preventDefault();

    axios.post('http://localhost:5000/users/login', login).then((result)=>{

      localStorage.setItem('token', result.data.token); 

      setToken( localStorage.getItem('token'))
      localStorage.setItem('role',result.data.role.role); 
      setRole( localStorage.getItem('role'))
      navigate('/')
      //console.log("hi",navigate('/'));
      console.log(result.data.role.role);
    console.log(result.data.token);

        }).catch((error)=>{
            console.error('Login error', error);
     setFailedLogIn(error.response.data.message)
     })
}

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      {failedLogIn && <Typography color="error">{failedLogIn}</Typography>}
      <form onSubmit={handleLogIn}>
        <TextField
          label="Email"
          value={login.email}
          onChange={(e)=> {
            setLogin (prev => ({...prev,...{email: e.target.value}}) )}} 
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={login.password}
          onChange={(e)=> {
            setLogin (prev => ({...prev,...{password: e.target.value}}) )}} 
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      <GoogleLoginCom/>
    </Container>
  );
}

export default SignIn

