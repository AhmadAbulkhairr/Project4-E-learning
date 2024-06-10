import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton } from '@mui/material';
import { Home as HomeIcon, School as SchoolIcon, Dashboard as DashboardIcon, Login as LoginIcon, Logout as LogoutIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const Header = () => {
  const { token, role,setToken,setRole } = useContext(UserContext);

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken("")
    setRole("")


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
        <IconButton color="inherit" component={Link} to="/all-grades">
          <SchoolIcon />
          Courses
        </IconButton>
        <IconButton color="inherit" component={Link} to="/all-courses">
          <SchoolIcon />

          Grades
        </IconButton>
        {token ? (
          <>
            {role === "Admin" && (
              <IconButton color="inherit" component={Link} to="/admin-dashboard">
                <DashboardIcon />
              </IconButton>
            )}
            {role === "Teacher" && (
              <IconButton color="inherit" component={Link} to="/teacher-dashboard">
                <DashboardIcon />
              </IconButton>
            )}
            <IconButton color="inherit" component={Link} to="/my-courses">
              <SchoolIcon />
            </IconButton>
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