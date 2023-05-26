import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Memorable Moments
          </Link>
        </Typography>
        <Button color="inherit">
          <Link to="/signin" style={{ textDecoration: 'none', color: 'inherit' }}>
            SignIn
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
            SignUp
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
