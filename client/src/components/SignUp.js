import React, { useState } from 'react';
import { auth } from '../auth/firebase';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      // User registration successful
    } catch (error) {
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
    <div>
      <h1>Sign Up</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
    );
};

export default SignUp;