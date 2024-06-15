import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const GoogleLoginCom = () => {
  const { setRole, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    console.log(response);

    try {
      const res = await axios.post('http://localhost:5000/users/google-login', {
        token: response.credential,
      });

      localStorage.setItem('token', res.data.token);
      setToken(localStorage.getItem('token'));
      localStorage.setItem('role', res.data.role.role);
      setRole(localStorage.getItem('role'));

      navigate('/');
    } catch (error) {
      console.error('Google login error', error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={responseGoogle}
      onError={() => {
        console.error('Login Failed');
      }}
    />
  );
};

export default GoogleLoginCom;
