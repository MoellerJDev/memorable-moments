import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { auth } from '../auth/firebase'; // Import auth from firebase.js
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
    <Box>
      <form onSubmit={handleSignIn}>
        <TextField name="email" type="email" placeholder="Email" />
        <TextField name="password" type="password" placeholder="Password" />
        <Button type="submit">Sign in</Button>
      </form>
    </Box>
  );
};

export default withRouter(SignIn);
