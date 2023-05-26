import React, { useCallback, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom'; // Removed history from here
import { auth } from '../auth/firebase';
import { AuthContext } from '../auth/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const SignIn = ({ history, handleClose}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = useCallback(
    async event => {
      event.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        handleClose();
        history.push('/');
      } catch (error) {
        setErrorMessage(error.message);
      }
    },
    [history, handleClose, email, password]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    handleClose();
    return <Redirect to="/" />;
  }

  return (
    <Box component="form" onSubmit={handleSignIn} noValidate autoComplete="off">
      <h1>Sign In</h1>
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
      <Button type="submit" variant="contained" color="primary">Sign In</Button>
    </Box>
  );
};

export default SignIn;
