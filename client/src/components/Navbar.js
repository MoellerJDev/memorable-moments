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
    <Toolbar sx={{ width: '100%', justifyContent: 'space-between' }}>
      {/* Show Sign In and Sign Up buttons only if no user is signed in */}
      {!currentUser && (
        <>
          <Button onClick={handleSignInOpen} sx={{ mr: 1 }}>Sign In</Button>
          <SignInDialog open={signInOpen} handleClose={handleSignInClose} />
          <Button onClick={handleSignUpOpen} sx={{ ml: 1 }}>Sign Up</Button>
          <SignUpDialog open={signUpOpen} handleClose={handleSignUpClose} />
        </>
      )}

      {/* Show user avatar and dropdown menu if user is signed in */}
      {currentUser && (
        <>
          <IconButton color="inherit" edge="end" onClick={handleProfileClick}>
            {currentUser.photoURL ? (
              <Avatar alt={currentUser.displayName} src={currentUser.photoURL} />
            ) : (
              <PersonIcon />
            )}
          </IconButton>
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleProfileClose}
          >
            <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </>
      )}
    </Toolbar>
  </AppBar>
);
};
export default Navbar;