import React, { useState, useContext } from 'react'; // Import useContext
import Button from '@mui/material/Button';
import SignInDialog from './SignInDialog';
import SignUpDialog from './SignUpDialog';
import { AuthContext } from '../auth/AuthContext'; // Import AuthContext

const Navbar = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const { currentUser } = useContext(AuthContext); // Access currentUser from AuthContext

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
      {/* Show Sign In button only if no user is signed in */}
      {!currentUser && (
        <>
          <Button onClick={handleSignInOpen}>Sign In</Button>
          <SignInDialog open={signInOpen} handleClose={handleSignInClose} />
        </>
      )}

      {/* Show Sign Up button only if no user is signed in */}
      {!currentUser && (
        <>
          <Button onClick={handleSignUpOpen}>Sign Up</Button>
          <SignUpDialog open={signUpOpen} handleClose={handleSignUpClose} />
        </>
      )}
    </div>
  );
};

export default Navbar;
