import React from 'react';

function Profile() {
  // TODO: Implement actual profile logic

  return (
    <div>
      <h1>User Profile</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;