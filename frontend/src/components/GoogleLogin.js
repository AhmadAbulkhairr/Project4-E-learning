import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const GoogleLoginCom = () => {
  const { setRole, setToken ,setUser,setUserId} = useContext(UserContext);
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    console.log(response);

    console.log(response.credential);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/google-login`, {
        token: response.credential,
      });
      localStorage.setItem('id', res.data.userID);
      console.log(res.data.userID); 
      setUserId(localStorage.getItem('id'))
      localStorage.setItem('token', res.data.token);
      setToken(localStorage.getItem('token'));
      localStorage.setItem('role', res.data.role.role);
      setRole(localStorage.getItem('role'));
      localStorage.setItem('user', res.data.user);
      setUser(localStorage.getItem('user'));

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
