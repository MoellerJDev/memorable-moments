import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { auth } from '../auth/firebase'; // Import auth from firebase.js
import { AuthContext } from '../auth/AuthContext';

const SignIn = ({ history }) => {
  const handleSignIn = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await auth
          .signInWithEmailAndPassword(email.value, password.value);
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
    <div>
      <form onSubmit={handleSignIn}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default withRouter(SignIn);
