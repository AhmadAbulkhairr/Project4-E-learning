import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton } from '@mui/material';
import { Home as HomeIcon, School as SchoolIcon, Dashboard as DashboardIcon, Login as LoginIcon, Logout as LogoutIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';

import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Header = () => {
  const { token, role,setToken,setRole,setUser,setUserId } = useContext(UserContext);
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("id");

    localStorage.removeItem("role");
    setToken("")
    setRole("")
    setUser("")
    setUserId("")
}
return (
  <AppBar position="static" color="primary" style={{ background: '#6200ea' }}>
    <Container>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Learno
        </Typography>
        <IconButton color="inherit" component={Link} to="/">
          <HomeIcon />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/grades">
        <SchoolIcon  />
          <Typography marginLeft={0.5} variant='h6' >
            Grades
            </Typography>    
        </IconButton>
        <IconButton color="inherit" component={Link} to="/all-courses">
          <SchoolIcon  />
          <Typography marginLeft={0.5} variant='h6' >
          Courses
            </Typography>    
                </IconButton>
        {token ? (
          <>
            {role === "Admin" && (
              <IconButton color="inherit" component={Link} to="/admin-dashboard">
                <DashboardIcon />
                <Typography marginLeft={0.5} variant='h6' >
                Admin Dashboard
            </Typography> 
              </IconButton>
            )}
            {role === "Teacher" && (
              <IconButton color="inherit" component={Link} to="/teacher-dashboard">
                <DashboardIcon />
                <Typography marginLeft={0.5} variant='h6' >
                Teacher Dashboard
            </Typography>               </IconButton>
            )}
            {role==="Student"&&(<IconButton color="inherit" component={Link} to="/my-courses">
              <SchoolIcon />
              <Typography marginLeft={0.5} variant='h6' >
My Courses            </Typography>    
            </IconButton>)}
            <IconButton color="inherit" onClick={signOut}>
              <LogoutIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton color="inherit" component={Link} to="/signin">
              <LoginIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/signup">
              <PersonAddIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </Container>
  </AppBar>
);

};

export default Header;
