import React, { useState } from 'react';
import { auth } from '../auth/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // User registration successful
    } catch (error) {
      console.error(error);
      let errorMessage;
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email.";
          break;
        case "auth/user-disabled":
          errorMessage = "This user has been disabled.";
          break;
        case "auth/user-not-found":
          errorMessage = "User not found.";
          break;
        case "auth/wrong-password":
          errorMessage = "Wrong password.";
          break;
        default:
          errorMessage = "An error occurred. Please try again.";
      }
      setErrorMessage(errorMessage);
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <h1>Sign Up</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSignUp}>Sign Up</Button>
    </Box>
  );
};

export default SignUp;
