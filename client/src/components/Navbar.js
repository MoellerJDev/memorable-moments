import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SignInDialog from './SignInDialog';
import SignUpDialog from './SignUpDialog';

const Navbar = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

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

  return (
    <div>
      <Button onClick={handleSignInOpen}>Sign In</Button>
      <SignInDialog open={signInOpen} handleClose={handleSignInClose} />
      <Button onClick={handleSignUpOpen}>Sign Up</Button>
      <SignUpDialog open={signUpOpen} handleClose={handleSignUpClose} />
    </div>
  );
};

export default Navbar;
