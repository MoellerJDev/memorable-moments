import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { auth } from '../auth/firebase';
import { AuthContext } from '../auth/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const SignIn = ({ history }) => {
  const handleSignIn = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Box component="form" onSubmit={handleSignIn} noValidate autoComplete="off">
      <TextField label="Email" name="email" type="email" />
      <TextField label="Password" name="password" type="password" />
      <Button type="submit" variant="contained" color="primary">Sign in</Button>
    </Box>
  );
};

export default withRouter(SignIn);
// Compare this snippet from client\src\components\SignOut.js: