import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import SignInDialog from './SignInDialog';
import SignUpDialog from './SignUpDialog';
import { AuthContext } from '../auth/AuthContext';

const Navbar = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const history = useHistory();

  const { currentUser } = useContext(AuthContext);

  const handleSignInOpen = () => {
    setSignInOpen(true);
  };

  const handleSignInClose = () => {
    setSignInOpen(false);
  };

  const handleSignUpOpen = () => {
    setSignUpOpen(true);
  };

  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };

  const handleProfileClick = () => {
    if (currentUser) {
      history.push('/profile'); // Replace with the correct path to the profile page
    } else {
      handleSignInOpen();
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Show Sign In and Sign Up buttons only if no user is signed in */}
        {!currentUser && (
          <>
            <Button onClick={handleSignInOpen}>Sign In</Button>
            <SignInDialog open={signInOpen} handleClose={handleSignInClose} />
            <Button onClick={handleSignUpOpen}>Sign Up</Button>
            <SignUpDialog open={signUpOpen} handleClose={handleSignUpClose} />
          </>
        )}

        {/* Profile button */}
        <IconButton color="inherit" edge="end" onClick={handleProfileClick}>
          <PersonIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
