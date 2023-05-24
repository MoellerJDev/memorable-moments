import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

const UserProfile = () => {
   const [displayName, setDisplayName] = useState('');
   const [email, setEmail] = useState('');
   const { currentUser } = useContext(AuthContext);

   const handleUpdateProfile = () => {
     const user = currentUser;

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
    <div>
      <h1>User Profile</h1>
      <input
        type="text"
        placeholder="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
};

export default UserProfile;
