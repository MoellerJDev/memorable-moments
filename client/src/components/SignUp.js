import React, { useState } from 'react';
import { auth } from '../firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        console.log(errorMessage);
        // Display errorMessage to the user
      }
      
  };

  return (
    <div>
      <h1>Sign Up</h1>
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // User login successful
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
        console.log(errorMessage);
        // Display errorMessage to the user
      }      
  };

  return (
    <div>
      <h1>Login</h1>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export { SignUp, Login };
