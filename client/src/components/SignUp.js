import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../auth/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const SignUp = ({ history, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleSignUp = async () => {
    if (password !== passwordConfirm) {
      setPasswordError(true);
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMessage('');
      setPasswordError(false);
      handleClose();
      history.push('/');
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
        case "auth/email-already-in-use":
          errorMessage = "Email already in use.";
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
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
        helperText={passwordError ? 'Passwords do not match.' : ''}
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        error={passwordError}
        helperText={passwordError ? 'Passwords do not match.' : ''}
      />
      <Button variant="contained" color="primary" onClick={handleSignUp}>Sign Up</Button>
    </Box>
  );
};

export default withRouter(SignUp);