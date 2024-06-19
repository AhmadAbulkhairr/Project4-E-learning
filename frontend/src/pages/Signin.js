import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import GoogleLoginCom from '../components/GoogleLogin';

const SignIn = () => {
  const {setRole,setToken,setUser} = useContext(UserContext)

  const [login, setLogin] = useState({email:"",password:""})

  const [failedLogIn, setFailedLogIn] = useState("")

  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryMessage, setRecoveryMessage] = useState('');
  
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetPasswordMessage, setResetPasswordMessage] = useState('');
  
  const navigate = useNavigate();

  const handleLogIn = (e) => {

    e.preventDefault();

    axios.post('http://localhost:5000/users/login', login).then((result)=>{

      localStorage.setItem('token', result.data.token); 

      setToken( localStorage.getItem('token'))
      localStorage.setItem('role',result.data.role.role); 
      setRole( localStorage.getItem('role'))
      localStorage.setItem('user', result.data.user); 
      setUser( localStorage.getItem('user'))

      navigate('/')
      //console.log("hi",navigate('/'));
      console.log(result.data.role.role);
    console.log(result.data.token);

        }).catch((error)=>{
            console.error('Login error', error);
     setFailedLogIn(error.response.data.message)
     })
}

const handlePasswordRecovery = (e) => {
  e.preventDefault();

  axios.post('http://localhost:5000/password/password-recovery', { email: recoveryEmail })
    .then((response) => {
      setRecoveryMessage(response.data.message);
    })
    .catch((error) => {
      console.error('Password recovery error', error);
      setRecoveryMessage('Failed to send recovery code');
    });
};

const handleResetPassword = (e) => {
  e.preventDefault();

  axios.post('http://localhost:5000/password/reset-password', {
    email: recoveryEmail,
    verificationCode,
    newPassword,
    
  })
    .then((response) => {
      setResetPasswordMessage(response.data.message);
    })
    .catch((error) => {
      console.error('Password reset error', error);
      setResetPasswordMessage('Failed to reset password');
    });
};
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

      <form onSubmit={handlePasswordRecovery}>
        <TextField
          label="Email for Recovery"
          value={recoveryEmail}
          onChange={(e) => setRecoveryEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="secondary">
          Send Recovery Code
        </Button>
      </form>
      {recoveryMessage && <Typography>{recoveryMessage}</Typography>}

      {recoveryMessage && (
        <form onSubmit={handleResetPassword}>
          <TextField
            label="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
         
          <Button type="submit" variant="contained" color="primary">
            Reset Password
          </Button>
        </form>
      )}
      {resetPasswordMessage && <Typography>{resetPasswordMessage}</Typography>}
    </Container>
  );
}

export default SignIn

