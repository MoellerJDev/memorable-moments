import React, { useState } from 'react';

const UserProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdateProfile = () => {
    // Perform the profile update logic
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
