import React from 'react'

import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Learno
          </Typography>
          <Button color="inherit" component={Link} to="/login">Sign In</Button>
          <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
          <Button color="inherit" component={Link} to="/signout">Sign Out</Button>
        </Toolbar>
      </AppBar>
    );
  };
export default Header