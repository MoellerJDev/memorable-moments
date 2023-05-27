import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { auth } from '../auth/firebase';

const UserProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleUpdateProfile = () => {
    const user = auth.currentUser;

    if (user) {
      // Update display name
      user.updateProfile({
        displayName: displayName,
      }).then(() => {
        console.log("Display name updated successfully");
      }).catch((error) => {
        console.log("Error updating display name: ", error);
      });

      // Update email
      user.updateEmail(email).then(() => {
        console.log("Email updated successfully");
      }).catch((error) => {
        console.log("Error updating email: ", error);
      });
    }
  };

  return (
    <Box>
      <h1>User Profile</h1>
      <TextField
        type="text"
        placeholder="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <TextField
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleUpdateProfile}>Update Profile</Button>
    </Box>
  );
};

export default UserProfile;